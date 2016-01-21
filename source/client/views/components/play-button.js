/**
 * @file Button that plays sounds
 */

const di           = require('di4js');
const React        = require('react');
const h            = require('react-hyperscript');
const RaisedButton = require('material-ui').RaisedButton;

/* The sound playing service */
var Player;

/**
 * React component for the play button
 *
 * @class
 * @memberof module:client.views.components
 */
const PlayButton = React.createClass({
    componentWillMount () {
        Player = di.resolve('fs1-ws.client.synth.Player');
    },

    render () {
        return h(RaisedButton, {
            secondary: true,
            onMouseUp: Player.stop,
            onMouseDown: Player.play
        }, 'Play !');
    }
});

di.register('fs1-ws.client.views.components.PlayButton').instance(PlayButton);
