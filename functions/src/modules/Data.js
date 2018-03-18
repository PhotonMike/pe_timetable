"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Summary_1 = require("./Summary");
var style_1 = require("./style");
function Data(props) {
    return (React.createElement("div", { style: style_1.body },
        React.createElement("div", { style: style_1.siteCont },
            React.createElement(Summary_1.default, { fB: props.fireBase, global: props.global }))));
}
exports.default = Data;
//# sourceMappingURL=Data.js.map