/**
 * @file Button that plays sounds
 */

const React        = require('react');
const h            = require('react-hyperscript');
const RaisedButton = require('material-ui').RaisedButton;

module.exports = function (Player) {
    /**
     * React component for the play button
     *
     * @name PlayButton
     * @class
     * @memberof module:client.views.components
     */
    return React.createClass({
        render () {
            return h(RaisedButton, {
                secondary: true,
                onMouseUp: Player.stop,
                onMouseDown: Player.play
            }, 'Play !');
        }
    });
};
