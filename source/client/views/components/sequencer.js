/**
 * @file The sequencer component
 */

const redux        = require('redux');
const React        = require('react');
const ReactRedux   = require('react-redux');
const h            = require('react-hyperscript');
const RaisedButton = require('material-ui').RaisedButton;

module.exports = function (getActions, Instrument) {
    /**
     * React component for the sequencer
     *
     * @name Sequencer
     * @class
     * @memberof module:client.views.components
     */
    return ReactRedux.connect(
        state    => ({ state }),
        dispatch => ({ actions: getActions(dispatch) })
    )(
        React.createClass({
            render () {
                const state   = this.props.state;
                const actions = this.props.actions;

                const playing             = state.playing;
                const notesPerTrack       = state.notesPerTrack;
                const currentlyPlayedNote = state.currentlyPlayedNote;

                return h('div', {}, [
                    /* The play button. */
                    h(
                        RaisedButton, {
                            secondary:   true,
                            onMouseDown: playing ? actions.stopPlaying : actions.startPlaying
                        },
                        playing ? 'Stop' : 'Play'
                    ),

                    /* The instruments table. */
                    h('table', {}, h(
                        'tbody', {}, state.instruments.map(
                            instrument => h(Instrument, {
                                instrument, actions,
                                notesPerTrack, currentlyPlayedNote
                            })
                        )
                    ))
                ]);
            }
        })
    );
};
