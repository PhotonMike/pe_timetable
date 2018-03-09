import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { h } from 'preact';
import { render } from 'preact-render-to-string';
import App from './src/App';
import * as express from 'express';
import * as fs from 'fs';

const index = fs.readFileSync(__dirname + '/index.template.html', 'utf8');
const fbapp = admin.initializeApp(functions.config().firebase);
const db = fbapp.firestore();
const quizDb = db.collection("quiz");
const usersDb = db.collection("users");
const metaDb = db.collection("metadata");

let loadTimes = 0;
metaDb.get().then(metadata => {
    metadata.forEach(doc => {
        const mData = doc.data();
        if (doc.id === "statistics") {
            if ("loadTimes" in mData) {
                loadTimes = mData["loadTimes"];
            }
        }
    });
});


const app = express();
// '/' route
app.get(['/', '/app', '/index.html', '/index'], (req, res) => {
    let quest = {};
    let usr = {};
    quizDb.get().then(questions => {
        questions.forEach(doc => {
            quest[doc.id] = doc.data();
        });
        usersDb.get().then(users => {
            users.forEach(doc => {
                usr[doc.id] = doc.data();
            });
            const html = render(<App questions={quest} users={usr}/>);
            const appHtml = index.replace('<!-- ::APP:: -->', html);
            const app1Html = appHtml.replace('/** ::Q:: **/', JSON.stringify(quest));
            const finalHtml = app1Html.replace('/** ::U:: **/', JSON.stringify(usr));
            res.set('Cache-Control', 'public, max-age=60, s-maxage=300');
            res.send(finalHtml);
            loadTimes++;
            metaDb.doc("statistics").set({
                loadTimes
            }).then(after => {
                console.log("/ has been loaded " + loadTimes + " times.")
            });
        })
    });
});

// '/questions.json' route
app.get(['/questions.json', '/questions', '/quiz.json', '/quiz'], (req, res) => {
    let fin = {};
    quizDb.get().then(questions => {
        questions.forEach(doc => {
            fin[doc.id] = doc.data();
        });
        res.set('Cache-Control', 'public, max-age=0, s-maxage=0');
        res.send(fin);
    });
});
// '/users.json' route
app.get(['/users.json', '/users'], (req, res) => {
    let fin = {};
    usersDb.get().then(users => {
        users.forEach(doc => {
            fin[doc.id] = doc.data();
        });
        res.set('Cache-Control', 'public, max-age=0, s-maxage=0');
        res.send(fin);
    })
});

app.get(['/stat', '/stats'], (req, res) => {
    let fin = {};
    metaDb.get().then(mData => {
        mData.forEach(doc => {
            fin[doc.id] = doc.data();
        });
        res.set('Cache-Control', 'public, max-age=0, s-maxage=0');
        res.send(fin);
    })
});


export let server = functions.https.onRequest(app);