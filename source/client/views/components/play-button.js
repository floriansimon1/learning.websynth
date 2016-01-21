/**
 * @file Button that plays sounds
 */

const React        = require('react');
const h            = require('react-hyperscript');
const RaisedButton = require('material-ui').RaisedButton;

/**
 * React component for the play button
 *
 * @class
 * @memberof module:client.views.components
 */
const PlayButton = React.createClass({
    render () {
        return h(RaisedButton, {
            secondary: true,
            onMouseUp: Player.stop,
            onMouseDown: Player.play
        }, 'Play !');
    }
});
