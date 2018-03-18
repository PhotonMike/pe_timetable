"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var functions = require("firebase-functions");
var express = require("express");
var fs = require("fs");
var compression = require("compression");
var Database = require("./src/Database");
var React = require("react");
var server_1 = require("react-dom/server");
var App_1 = require("./src/App");
var jss_1 = require("react-jss/lib/jss");
var JssProvider_1 = require("react-jss/lib/JssProvider");
var styles_1 = require("material-ui/styles");
var theme_1 = require("./src/theme");
console.log("server script start");
var index = fs.readFileSync(__dirname + '/index.template.html', 'utf8');
var bundlejs = fs.readFileSync(__dirname + '/bundle.js', 'utf8');
var fireBase = Database.getFirebase();
var db = fireBase.firestore();
var tableDb = db.collection("tables");
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
var app = express();
app.use(compression());
app.get(['/', '/app', '/index.html', '/index'], function (req, res) {
    Database.getGlobalAnd(fireBase, function (global) {
        var sheetsRegistry = new jss_1.SheetsRegistry();
        var generateClassName = styles_1.createGenerateClassName();
        var renderHtml = server_1.renderToString(React.createElement(JssProvider_1.default, { registry: sheetsRegistry, generateClassName: generateClassName },
            React.createElement(styles_1.MuiThemeProvider, { theme: theme_1.default, sheetsManager: new Map() },
                React.createElement(App_1.default, { fireBase: fireBase, global: global }))));
        var css = sheetsRegistry.toString();
        var appHtml = index.replace('<!-- ::APP:: -->', renderHtml)
            .replace("<!-- ::style:: -->", css);
        var finalHtml = appHtml.replace('/** ::GLOBAL:: **/', JSON.stringify(global));
        res.set('Cache-Control', 'public, max-age=0, s-maxage=0');
        res.send(finalHtml);
        loadTimes = global["statistics"]["loadTimes"];
        if (loadTimes) {
            loadTimes++;
            metaDb.doc("statistics").set({
                loadTimes: loadTimes
            });
        }
    });
});
app.get(['/bundle.js'], function (req, res) {
    res.set('Cache-Control', 'public, max-age=0, s-maxage=0');
    res.send(bundlejs);
});
app.get(['/tables.json', '/tables'], function (req, res) {
    var fin = {};
    tableDb.get().then(function (table) {
        table.forEach(function (doc) {
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
exports.server = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map