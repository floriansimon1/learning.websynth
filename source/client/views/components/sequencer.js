/**
 * @file The sequencer component
 */

const redux        = require('redux');
const React        = require('react');
const ReactRedux   = require('react-redux');
const h            = require('react-hyperscript');
const RaisedButton = require('material-ui').RaisedButton;

module.exports = function (actions, Instrument) {
    /**
     * React component for the sequencer
     *
     * @name Sequencer
     * @class
     * @memberof module:client.views.components
     */
    return ReactRedux.connect(
        state => ({ state }),
        dispatch => ({ actions: redux.bindActionCreators(actions, dispatch) })
    )(
        React.createClass({
            render () {
                const { state, actions } = this.props;

                return h('div', {}, [
                    /* The play button. */
                    h(
                        RaisedButton, {
                            secondary: true,
                            onMouseUp: actions.startPlaying(),
                            onMouseDown: actions.stopPlaying()
                        },
                        'Play'
                    ),

                    /* The instruments table. */
                    h('table', {}, h(
                        'tbody', {}, state.instruments.map(
                            instrument => h(Instrument, {
                                instrument, actions
                            })
                        )
                    ))
                ]);
            }
        })
    );
};
