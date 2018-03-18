"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_dom_1 = require("react-dom");
var App_1 = require("./App");
var db = require("./Database");
var Database_1 = require("./Database");
var styles_1 = require("material-ui/styles");
var theme_1 = require("./theme");
var fB = db.getFirebase();
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.componentDidMount = function () {
        var jssStyles = document.getElementById('jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    };
    Main.prototype.render = function () {
        return React.createElement(App_1.default, __assign({}, this.props));
    };
    return Main;
}(React.Component));
if (window.__global__) {
    renderApp(fB, window.__global__);
    window.__fb__ = fB;
}
else {
    Database_1.getGlobalAnd(fB, function (global) {
        renderApp(fB, global);
    });
}
function renderApp(fb, global) {
    react_dom_1.hydrate(React.createElement(styles_1.MuiThemeProvider, { theme: theme_1.default },
        React.createElement(Main, { fireBase: fb, global: global })), document.querySelector('#root'));
}
//# sourceMappingURL=index.js.map