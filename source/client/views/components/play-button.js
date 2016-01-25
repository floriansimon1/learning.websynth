/**
 * @file Button that plays sounds
 */

const React        = require('react');
const _            = require('lodash');
const Note         = require('./note');
const h            = require('react-hyperscript');
const RaisedButton = require('material-ui').RaisedButton;

/*return h(RaisedButton, {
    secondary: true,
    onMouseUp: Player.stop,
    onMouseDown: Player.play
}, 'Play !');*/

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
            return h('table', {}, h(
                'tbody', {}, h(
                    'tr', {}, _.range(16).map(
                        () => h('td', {}, h(Note))
                    )
                )
            ));
        }
    });
};
