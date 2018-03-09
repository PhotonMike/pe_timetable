'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Data;

var _preact = require('preact');

var _Summary = require('./Summary');

var _Summary2 = _interopRequireDefault(_Summary);

var _Table = require('./Table');

var _Table2 = _interopRequireDefault(_Table);

var _style = require('./style');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Data(props) {
    return (0, _preact.h)(
        'div',
        { style: _style.body },
        (0, _preact.h)(_Summary2.default, { qNum: Object.keys(props.questions).length, uNum: Object.keys(props.users).length }),
        (0, _preact.h)(
            'div',
            { style: _style.siteCont },
            (0, _preact.h)(_Table2.default, { questions: props.questions, users: props.users }),
            (0, _preact.h)('div', { style: _style.sitePad })
        )
    );
}