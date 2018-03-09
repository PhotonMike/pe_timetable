'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Summary;

var _preact = require('preact');

var _style = require('./style');

function Summary(props) {
    return (0, _preact.h)(
        'div',
        { style: _style.padding },
        (0, _preact.h)(
            'div',
            { 'class': 'mdl-card mdl-shadow--2dp' },
            (0, _preact.h)(
                'div',
                { 'class': 'mdl-card__title' },
                (0, _preact.h)(
                    'h2',
                    { 'class': 'mdl-card__title-text' },
                    '\xD6szes\xEDt\xE9s'
                )
            ),
            (0, _preact.h)(
                'div',
                { 'class': 'mdl-card__supporting-text' },
                (0, _preact.h)(
                    'p',
                    null,
                    'K\xE9rd\xE9sek sz\xE1ma: ',
                    props.qNum
                ),
                (0, _preact.h)(
                    'p',
                    null,
                    'Felhaszn\xE1l\xF3k sz\xE1ma: ',
                    props.uNum
                )
            )
        )
    );
}