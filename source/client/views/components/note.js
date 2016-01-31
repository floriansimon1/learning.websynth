/**
 * @file Single sequencer note.
 */

const React    = require('react');
const h        = require('react-hyperscript');
const Checkbox = require('material-ui').Checkbox;

/**
 * React component for a single note
 *
 * @name PlayButton
 * @class
 * @memberof module:client.views.components
 */
module.exports = React.createClass({
    render () {
        return h(Checkbox, {
            checked: this.props.played,
            onCheck: () => {}
        });
    }
});
