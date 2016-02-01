/**
 * @file Single sequencer note.
 */

const React      = require('react');
const _          = require('lodash');
const MaterialUI = require('material-ui');
const h          = require('react-hyperscript');

const Paper    = MaterialUI.Paper;
const Checkbox = MaterialUI.Checkbox;

const checkboxStyle = {
    position: 'relative',
    margin: '0px',
    left: '-3px'
};

const normalContainerStyle = {
    backgroundColor: '#E87B58',
    textAlign: 'center'
};

const highlightedContainerStyle = Object.assign(
    {}, normalContainerStyle, { backgroundColor: '#F88B68' }
);

/**
 * React component for a single note
 *
 * @name PlayButton
 * @class
 * @memberof module:client.views.components
 */
module.exports = React.createClass({
    getInitialState () {
        return { played: this.played() };
    },

    togglePlayed () {
        this.props.instrument.togglePlayed(this.props.position);
        this.setState({ played: this.played() });
    },

    played () {
        return this.props.instrument.played(this.props.position);
    },

    render () {
        return h(Paper, { style: normalContainerStyle }, h(
            Checkbox, {
                defaultChecked: this.state.played,
                onCheck: this.togglePlayed,
                style: checkboxStyle
            }
        ));
    }
});
