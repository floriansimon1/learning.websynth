/** @file Redux actions */

/*
* Helper to define new actions.
* Note: The arity includes the state argument.
*/
const makeActionCreator = (arity, apply) => (...args) => ({
    apply: _.partial.apply(null, [apply].concat(args.slice(0, arity - 1))),
    type:  Symbol()
});

module.exports = function (initialState) {
    /**
     * Starts playing sounds
     *
     * @function
     * @memberof module:client.redux.actions
     */
    const startPlaying = makeActionCreator(1, state => (
        state.set('playing', true)
    ));

    /**
     * Starts playing sounds
     *
     * @function
     * @memberof module:client.redux.actions
     */
    const stopPlaying = makeActionCreator(1, state => (
        state.set('playing', false)
    ));

    /**
     * Toggles a note of an instrument
     *
     * @param {Instrument} instrument
     * @param {Number}     position
     *
     * @function
     * @memberof module:client.redux.actions
     */
    const toggleNote = makeActionCreator(3, (instrument, position, state) => (
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
    ));

    /**
     * Redux actions
     *
     * @namespace actions
     * @memberof module:client.redux
     */
    return { startPlaying, stopPlaying, toggleNote };
}
