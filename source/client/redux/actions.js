/** @file Redux actions */

/*
* Helper to define new actions.
* Note: The arity includes the state argument.
*/
const makeActionCreator = (arity, apply) => (...args) => ({
    apply: _.partial.apply(null, [apply].concat(args.slice(0, arity - 1))),
    type:  Symbol()
});

const _     = require('lodash');
const redux = require('redux');
const Maybe = require('data.maybe');

/**
 * Redux action callbacks
 *
 * @name actions
 * @namespace
 * @memberof module:client.redux
 */
module.exports = _.partial(redux.bindActionCreators, {
    /**
     * Updates the currently played note
     *
     * @function
     * @memberof module:client.redux.actions
     */
    setCurrentlyPlayedNote: makeActionCreator(2, (note, state) => (
        state.set('currentlyPlayedNote', Maybe.of(note))
    )),

    /**
     * Starts playing sounds
     *
     * @function
     * @memberof module:client.redux.actions
     */
    startPlaying: makeActionCreator(1, state => (
        state.set('playing', true)
    )),

    /**
     * Starts playing sounds
     *
     * @function
     * @memberof module:client.redux.actions
     */
    stopPlaying: makeActionCreator(1, state => (
        state.set('playing', false).set('currentlyPlayedNote', Maybe.Nothing())
    )),

    /**
     * Toggles a note of an instrument
     *
     * @param {Instrument} instrument
     * @param {Number}     position
     *
     * @function
     * @memberof module:client.redux.actions
     */
    toggleNote: makeActionCreator(3, (instrument, position, state) => (
        state.set(
            'instruments',
            state.instruments.map(
                listedInstrument => {
                    if (listedInstrument.id === instrument.id) {
                        return listedInstrument.set(
                            'notes',
                            instrument.notes[instrument.notes.has(position) ? 'delete' : 'add'](
                                position
                            )
                        );
                    } else {
                        return listedInstrument;
                    }
                }
            )
        )
    ))
});
