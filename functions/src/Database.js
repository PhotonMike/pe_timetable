"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUsers = getUsers;
exports.getQuestions = getQuestions;

var _isomorphicFetch = require("isomorphic-fetch");

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = "https://egeszsegquiz.firebaseapp.com/";
//let url = "http://localhost:5000/";

function getUsers() {
    return (0, _isomorphicFetch2.default)(url + "users.json").then(function (res) {
        return res.json();
    });
}

function getQuestions() {
    return (0, _isomorphicFetch2.default)(url + "questions.json").then(function (res) {
        return res.json();
    });
}