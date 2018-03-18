"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var style_1 = require("./style");
var common_1 = require("./common");
function Table(props) {
    var footers = [];
    footers[0] = (React.createElement("td", { class: "mdl-data-table__cell--non-numeric" }, "Helyes v\u00E1laszok"));
    var uScores = [];
    var avgScore = 0;
    var headers = [];
    headers[0] = (React.createElement("th", { class: "mdl-data-table__cell--non-numeric mdl-data-table__header--sorted-ascending" }, "Felhaszn\u00E1l\u00F3"));
    Object.keys(props.questions).forEach(function (key) {
        var q = props.questions[key];
        headers[key] = (React.createElement("th", { class: "mdl-data-table__cell--non-numeric", style: style_1.th },
            React.createElement("div", { style: style_1.tableText }, q.question)));
        footers[key] = (React.createElement("td", { class: "mdl-data-table__cell--non-numeric" }, (Math.round(common_1.qScore(props.users, props.questions, key) * 10000) / 100) + "%"));
    });
    headers.push(React.createElement("th", { style: style_1.th },
        React.createElement("div", { style: style_1.tableText }, "Helyesen megv\u00E1laszolt k\u00E9rd\u00E9sek")));
    var rows = [];
    Object.keys(props.users).forEach(function (key) {
        var usr = props.users[key];
        var row = [];
        row[0] = (React.createElement("td", { class: "mdl-data-table__cell--non-numeric" }, key));
        for (var i = 1; i <= Object.keys(props.questions).length; i++) {
            var ques = props.questions[i];
            if (i in usr) {
                var q = usr[i];
                if (q === ques.answer) {
                    row[i] = (React.createElement("td", { class: "mdl-data-table__cell--non-numeric" },
                        React.createElement("p", { style: style_1.good }, ques.answers[q])));
                }
                else {
                    row[i] = (React.createElement("td", { class: "mdl-data-table__cell--non-numeric" },
                        React.createElement("p", { style: style_1.bad }, ques.answers[q])));
                }
            }
            else {
                row[i] = (React.createElement("td", { class: "mdl-data-table__cell--non-numeric" }));
            }
            var uScore = common_1.userScore(usr, props.questions);
            row.push(React.createElement("td", null, uScore));
            uScores.push(uScore);
        }
        rows.push(React.createElement("tr", null, row));
    });
    var allScore = 0;
    uScores.forEach(function (s) {
        allScore += s;
    });
    avgScore = allScore / uScores.length;
    footers.push(React.createElement("td", null, Math.round(avgScore * 100) / 100));
    return (React.createElement("div", { style: style_1.padding },
        React.createElement("table", { class: "mdl-data-table mdl-js-data-table mdl-shadow--2dp" },
            React.createElement("thead", null,
                React.createElement("tr", null, headers)),
            React.createElement("tbody", null, rows),
            React.createElement("thead", null,
                React.createElement("tr", null, footers)))));
}
exports.default = Table;
//# sourceMappingURL=Table.js.map