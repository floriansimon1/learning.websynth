/**
 * @file Single sequencer note.
 */

const React    = require('react');
const h        = require('react-hyperscript');
const Checkbox = require('material-ui').Checkbox;

/*return h(RaisedButton, {
    secondary: true,
    onMouseUp: Player.stop,
    onMouseDown: Player.play
}, 'Play !');*/

/**
 * React component for a single note
 *
 * @name PlayButton
 * @class
 * @memberof module:client.views.components
 */
module.exports = React.createClass({
    render () {
        return h(Checkbox);
    }
});
