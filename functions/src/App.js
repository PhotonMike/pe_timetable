'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = App;

var _preact = require('preact');

var _Data = require('./modules/Data');

var _Data2 = _interopRequireDefault(_Data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function App(props) {
    return (0, _preact.h)(_Data2.default, { questions: props.questions, users: props.users });
}