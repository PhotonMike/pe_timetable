'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.server = undefined;

var _firebaseFunctions = require('firebase-functions');

var functions = _interopRequireWildcard(_firebaseFunctions);

var _firebaseAdmin = require('firebase-admin');

var admin = _interopRequireWildcard(_firebaseAdmin);

var _preact = require('preact');

var _preactRenderToString = require('preact-render-to-string');

var _App = require('./src/App');

var _App2 = _interopRequireDefault(_App);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var index = _fs2.default.readFileSync(__dirname + '/index.template.html', 'utf8');
var fbapp = admin.initializeApp(functions.config().firebase);
var db = fbapp.firestore();
var quizDb = db.collection("quiz");
var usersDb = db.collection("users");
var metaDb = db.collection("metadata");

var loadTimes = 0;
metaDb.get().then(function (metadata) {
    metadata.forEach(function (doc) {
        var mData = doc.data();
        if (doc.id === "statistics") {
            if ("loadTimes" in mData) {
                loadTimes = mData["loadTimes"];
            }
        }
    });
});

var app = (0, _express2.default)();
// '/' route
app.get(['/', '/app', '/index.html', '/index'], function (req, res) {
    var quest = {};
    var usr = {};
    quizDb.get().then(function (questions) {
        questions.forEach(function (doc) {
            quest[doc.id] = doc.data();
        });
        usersDb.get().then(function (users) {
            users.forEach(function (doc) {
                usr[doc.id] = doc.data();
            });
            var html = (0, _preactRenderToString.render)((0, _preact.h)(_App2.default, { questions: quest, users: usr }));
            var appHtml = index.replace('<!-- ::APP:: -->', html);
            var app1Html = appHtml.replace('/** ::Q:: **/', JSON.stringify(quest));
            var finalHtml = app1Html.replace('/** ::U:: **/', JSON.stringify(usr));
            res.set('Cache-Control', 'public, max-age=60, s-maxage=300');
            res.send(finalHtml);
            loadTimes++;
            metaDb.doc("statistics").set({
                loadTimes: loadTimes
            }).then(function (after) {
                console.log("/ has been loaded " + loadTimes + " times.");
            });
        });
    });
});

// '/questions.json' route
app.get(['/questions.json', '/questions', '/quiz.json', '/quiz'], function (req, res) {
    var fin = {};
    quizDb.get().then(function (questions) {
        questions.forEach(function (doc) {
            fin[doc.id] = doc.data();
        });
        res.set('Cache-Control', 'public, max-age=0, s-maxage=0');
        res.send(fin);
    });
});
// '/users.json' route
app.get(['/users.json', '/users'], function (req, res) {
    var fin = {};
    usersDb.get().then(function (users) {
        users.forEach(function (doc) {
            fin[doc.id] = doc.data();
        });
        res.set('Cache-Control', 'public, max-age=0, s-maxage=0');
        res.send(fin);
    });
});

app.get(['/stat', '/stats'], function (req, res) {
    var fin = {};
    metaDb.get().then(function (mData) {
        mData.forEach(function (doc) {
            fin[doc.id] = doc.data();
        });
        res.set('Cache-Control', 'public, max-age=0, s-maxage=0');
        res.send(fin);
    });
});

var server = exports.server = functions.https.onRequest(app);