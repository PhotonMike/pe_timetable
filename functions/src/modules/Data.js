"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Summary_1 = require("./Summary");
var style_1 = require("./style");
var MyAppBar_1 = require("./MyAppBar");
var MyDrawer_1 = require("./MyDrawer");
function Data(props) {
    return (React.createElement("div", null,
        React.createElement(MyAppBar_1.default, null),
        React.createElement(MyDrawer_1.default, null),
        React.createElement("main", null,
            React.createElement("div", { style: style_1.barPad }),
            React.createElement("div", { style: style_1.siteCont },
                React.createElement(Summary_1.default, { fB: props.fireBase, global: props.global })))));
}
exports.default = Data;
//# sourceMappingURL=Data.js.map