/**
 * @file The sequencer component
 */

const React = require('react');
const h     = require('react-hyperscript');

module.exports = function (Player, Instrument) {
    /**
     * React component for the sequencer
     *
     * @name Sequencer
     * @class
     * @memberof module:client.views.components
     */
    return React.createClass({
        render () {
            return h('table', {}, h(
                'tbody', {}, Player.instruments.map(
                    instrument => h(Instrument(instrument))
                )
            ));
        }
    });
};
