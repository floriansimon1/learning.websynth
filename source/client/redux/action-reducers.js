/**
 * @file Redux actions
 *
 * The state parameter for all actions can not be passed.
 * It is passed automatically by action creators.
 */

const Maybe = require('data.maybe');

module.exports = () => ({
    /**
     * Updates the currently played note
     *
     * @function
     * @memberof module:client.redux.actions
     */
    setCurrentlyPlayedNote: (note, state) => (
        state.set('currentlyPlayedNote', Maybe.of(note))
    ),

    /**
     * Starts playing sounds
     *
     * @function
     * @memberof module:client.redux.actions
     */
    startPlaying: state => state.set('playing', true),

    /**
     * Starts playing sounds
     *
     * @function
     * @memberof module:client.redux.actions
     */
    stopPlaying: state => (
        state.set('playing', false).set('currentlyPlayedNote', Maybe.Nothing())
    ),

    /**
     * Toggles a note of an instrument
     *
     * @param {Instrument} instrument
     * @param {Number}     position
     *
     * @function
     * @memberof module:client.redux.actions
     */
    toggleNote: (instrument, position, state) => (
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
    )
});
