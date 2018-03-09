'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = SummaryCard;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Card = require('material-ui/Card');

var _Card2 = _interopRequireDefault(_Card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SummaryCard(props) {
    return _react2.default.createElement(
        _Card2.default,
        null,
        _react2.default.createElement(
            'p',
            null,
            'K\xE9rd\xE9sek sz\xE1ma: ',
            props.qNum
        ),
        _react2.default.createElement(
            'p',
            null,
            'Felhaszn\xE1l\xF3k sz\xE1ma: ',
            props.uNum
        )
    );
}