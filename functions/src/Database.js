"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("firebase");
require("firebase/firestore");
function getFirebase() {
    var config = {
        apiKey: "AIzaSyA15Zh5xBg_rqA40thmaR9uTnTYTP7hhZE",
        authDomain: "tesiorarend.firebaseapp.com",
        databaseURL: "https://tesiorarend.firebaseio.com",
        projectId: "tesiorarend",
        storageBucket: "tesiorarend.appspot.com",
        messagingSenderId: "168977344998"
    };
    if (!firebase.apps.length) {
        return firebase.initializeApp(config);
    }
    else {
        return firebase.app();
    }
}
exports.getFirebase = getFirebase;
function getMetaDb(fB) {
    var db = fB.firestore();
    var metaDb = db.collection("metadata");
    return metaDb.get();
}
exports.getMetaDb = getMetaDb;
function getGlobalAnd(fB, fn) {
    var out = {};
    getMetaDb(fB).then(function (meta) {
        meta.forEach(function (doc) {
            out[doc.id] = doc.data();
        });
        fn(out);
    });
}
exports.getGlobalAnd = getGlobalAnd;
//# sourceMappingURL=Database.js.map