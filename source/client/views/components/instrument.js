/** @file A visual instrument */

const React = require('react');
const _     = require('lodash');
const h     = require('react-hyperscript');

module.exports = function (Note) {
    return function (instrument) {
        /**
         * React component for a single instrument
         *
         * @name Instrument
         * @class
         * @memberof module:client.views.components
         */
        return React.createClass({
            render () {
                return h(
                    'tr', {}, _.range(16).map(
                        position => h(
                            'td', {}, h(
                                Note, { instrument, position }
                            )
                        )
                    )
                )
            }
        });
    };
};
