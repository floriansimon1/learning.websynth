/**
 * @file Button that plays sounds
 */

const di           = require('di4js');
const React        = require('react');
const h            = require('react-hyperscript');
const RaisedButton = require('material-ui').RaisedButton;

var Synth;

/**
 * React component for the play button
 *
 * @class
 * @memberof module:client.views.components
 */
const PlayButton = React.createClass({
    componentWillMount() {
        Synth = di.resolve('fs1-ws.client.synth.Synth');
    },

    render() {
        return h(RaisedButton, {
            secondary: true,
            onMouseUp: Synth.noteOff,
            onMouseDown: Synth.noteOn
        }, 'Play !');
    }
});

di.register('fs1-ws.client.views.components.PlayButton').instance(PlayButton);
