/**
 * @file Single sequencer note.
 */

const React = require('react');
const _     = require('lodash');
const h     = require('react-hyperscript');

const style = {
    margin:    '5px',
    padding:   '20px',
    transform: 'scale(2)'
};

const backgroundColors = {
    true:  '#66a',
    false: '#338'
};

/**
 * React component for a single note
 *
 * @name PlayButton
 * @class
 * @memberof module:client.views.components
 */
module.exports = React.createClass({
    render () {
        const position        = this.props.position;
        const instrument      = this.props.instrument;
        const currentlyPlayed = this.props.currentlyPlayed;
        const played          = instrument.notes.has(position);
        const toggle          = _.partial(this.props.actions.toggleNote, instrument, position);

        return h(
            'div', {
                style: {
                    backgroundColor: backgroundColors[currentlyPlayed],
                    height:          '30px',
                    width:           '30px'
                }
            },
            h('input', {
                style,

                onClick: toggle,
                checked: played,
                type:    'checkbox'
            })
        );
    }
});
