import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as fs from 'fs';
import * as compression from 'compression';
import * as firebase from 'firebase';
import * as Database from './src/Database';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import App from "./src/App";
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from 'material-ui/styles';
import { green, red } from 'material-ui/colors';
import theme from './src/theme';

console.log("server script start");

const index = fs.readFileSync(__dirname + '/index.template.html', 'utf8');
const bundlejs = fs.readFileSync(__dirname + '/bundle.js', 'utf8');

/*const fbDetails = functions.config().firebase;
const fbapp = admin.initializeApp(fbDetails);
const db = fbapp.firestore();*/
const fireBase = Database.getFirebase();
const db = fireBase.firestore();

const tableDb = db.collection("tables");
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

app.use(compression());

// '/' route
app.get(['/', '/app', '/index.html', '/index'], (req, res) => {
    Database.getGlobalAnd(fireBase, (global) => {
        const sheetsRegistry = new SheetsRegistry();
        const generateClassName = createGenerateClassName();
        const renderHtml = renderToString(
            <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
                <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
                    <App fireBase={fireBase} global={global}/>
                </MuiThemeProvider>
            </JssProvider>
        );
        const css = sheetsRegistry.toString();
        const appHtml = index.replace('<!-- ::APP:: -->', renderHtml)
            .replace("<!-- ::style:: -->", css);
        const finalHtml = appHtml.replace('/** ::GLOBAL:: **/', JSON.stringify(global));
        res.set('Cache-Control', 'public, max-age=0, s-maxage=0');
        //res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
        res.send(finalHtml);

        loadTimes = global["statistics"]["loadTimes"];
        if(loadTimes){
            loadTimes++;
            metaDb.doc("statistics").set({
                loadTimes
            });
        }
    });
});

app.get(['/bundle.js'], (req, res) => {
    res.set('Cache-Control', 'public, max-age=0, s-maxage=0');
    //res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
    res.send(bundlejs);
});

// '/questions.json' route
app.get(['/tables.json', '/tables'], (req, res) => {
    let fin = {};
    tableDb.get().then(table => {
        table.forEach(doc => {
            fin[doc.id] = doc.data();
        });
        res.set('Cache-Control', 'public, max-age=0, s-maxage=0');
        res.send(fin);
    });
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