'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Table;

var _preact = require('preact');

var _style = require('./style');

var _common = require('./common');

function Table(props) {

    var footers = [];
    footers[0] = (0, _preact.h)(
        'td',
        { 'class': 'mdl-data-table__cell--non-numeric' },
        'Helyes v\xE1laszok'
    );

    var uScores = [];
    var avgScore = 0;

    var headers = [];
    headers[0] = (0, _preact.h)(
        'th',
        { 'class': 'mdl-data-table__cell--non-numeric mdl-data-table__header--sorted-ascending' },
        'Felhaszn\xE1l\xF3'
    );
    Object.keys(props.questions).forEach(function (key) {
        var q = props.questions[key];
        headers[key] = (0, _preact.h)(
            'th',
            { 'class': 'mdl-data-table__cell--non-numeric', style: _style.th },
            (0, _preact.h)(
                'div',
                { style: _style.tableText },
                q.question
            )
        );
        footers[key] = (0, _preact.h)(
            'td',
            { 'class': 'mdl-data-table__cell--non-numeric' },
            Math.round((0, _common.qScore)(props.users, props.questions, key) * 10000) / 100 + "%"
        );
    });
    headers.push((0, _preact.h)(
        'th',
        { style: _style.th },
        (0, _preact.h)(
            'div',
            { style: _style.tableText },
            'Helyesen megv\xE1laszolt k\xE9rd\xE9sek'
        )
    ));

    var rows = [];
    Object.keys(props.users).forEach(function (key) {
        var usr = props.users[key];
        var row = [];
        row[0] = (0, _preact.h)(
            'td',
            { 'class': 'mdl-data-table__cell--non-numeric' },
            key
        );
        for (var i = 1; i <= Object.keys(props.questions).length; i++) {
            var ques = props.questions[i];
            if (i in usr) {
                var q = usr[i];
                if (q === ques.answer) {
                    row[i] = (0, _preact.h)(
                        'td',
                        { 'class': 'mdl-data-table__cell--non-numeric' },
                        (0, _preact.h)(
                            'p',
                            { style: _style.good },
                            ques.answers[q]
                        )
                    );
                } else {
                    row[i] = (0, _preact.h)(
                        'td',
                        { 'class': 'mdl-data-table__cell--non-numeric' },
                        (0, _preact.h)(
                            'p',
                            { style: _style.bad },
                            ques.answers[q]
                        )
                    );
                }
            } else {
                row[i] = (0, _preact.h)('td', { 'class': 'mdl-data-table__cell--non-numeric' });
            }
            var uScore = (0, _common.userScore)(usr, props.questions);
            row.push((0, _preact.h)(
                'td',
                null,
                uScore
            ));
            uScores.push(uScore);
        }
        rows.push((0, _preact.h)(
            'tr',
            null,
            row
        ));
    });

    var allScore = 0;
    uScores.forEach(function (s) {
        allScore += s;
    });
    avgScore = allScore / uScores.length;
    footers.push((0, _preact.h)(
        'td',
        null,
        Math.round(avgScore * 100) / 100
    ));

    return (0, _preact.h)(
        'div',
        { style: _style.padding },
        (0, _preact.h)(
            'table',
            { 'class': 'mdl-data-table mdl-js-data-table mdl-shadow--2dp' },
            (0, _preact.h)(
                'thead',
                null,
                (0, _preact.h)(
                    'tr',
                    null,
                    headers
                )
            ),
            (0, _preact.h)(
                'tbody',
                null,
                rows
            ),
            (0, _preact.h)(
                'thead',
                null,
                (0, _preact.h)(
                    'tr',
                    null,
                    footers
                )
            )
        )
    );
}