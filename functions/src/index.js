'use strict';

var _preact = require('preact');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _Database = require('./Database');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (window.__questions__ && window.__users__) {
    renderApp(window.__questions__, window.__users__);
} else {
    (0, _Database.getQuestions)().then(function (questions) {
        (0, _Database.getUsers)().then(function (users) {
            renderApp(questions, users);
        });
    });
}

function renderApp(q, u) {
    (0, _preact.render)((0, _preact.h)(_App2.default, { questions: q, users: u }), document.querySelector('body'), document.querySelector('#root'));
}