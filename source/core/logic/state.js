/** @file Functions to work with State instances */

const Maybe = require('data.maybe');
const _     = require('lodash');

/**
 * Functions to work with State instances
 *
 * @namespace
 * @name      stateFunctions
 * @memberof  module:core.logic
 */
module.exports = (instrumentFunctions, NotPlayingError, NotInGridError, NoSuchInstrumentError) => {
    /* Helper to apply an update on an instrument looked up by ID */
    const updateInstrument = (state, instrument) => {
        var found = false;

        const updated = state.set('instruments', state.instruments.map(
            listedInstrument => {
                if (listedInstrument.id === instrument.id) {
                    found = true;
                    return instrument;
                } else {
                    return listedInstrument;
                }
            }
        ));

        if (found) {
            return updated;
        } else {
            throw new NoSuchInstrumentError(instrument._id);
        }
    };

    /**
     * Returns a list of played notes
     *
     * @memberof module:core.logic.stateFunctions
     *
     * @param {module:core.models.State} state The state instance to operate on
     *
     * @return {Array<module:core.models.InstrumentNote>} Played notes
     */
    const getPlayedNotes = state => (
        _.flatMap(
            state.instruments, instrument => (
                instrument
                .notes
                .toArray()
                .map(position => ({ instrument, position }))
            )
        )
    );

    /**
     * Updates the currently played note
     * We have to be in playing mode in order
     * to set the currently played note
     *
     * @memberof module:core.logic.stateFunctions
     *
     * @param {module:core.models.State} state    The state instance to operate on
     * @param {Number}                   position The position of the note in the grid
     *
     * @return {module:core.models.State} A new instance of the state with the change
     */
    const setCurrentlyPlayedNote = (state, note) => {
        if (state.playing) {
            return state.set('currentlyPlayedNote', Maybe.of(note))
        } else {
            throw new NotPlayingError();
        }
    };

    /**
     * Starts playing sounds
     *
     * @memberof module:core.logic.stateFunctions
     *
     * @param {module:core.models.State} state The state instance to operate on
     *
     * @return {module:core.models.State} A new instance of the state with the change
     */
    const startPlaying = state => state.set('playing', true);

    /**
     * Stops playing sounds
     *
     * @memberof module:core.logic.stateFunctions
     *
     * @param {module:core.models.State} state The state instance to operate on
     *
     * @return {module:core.models.State} A new instance of the state with the change
     */
    const stopPlaying = state => (
        state
        .set('playing', false)
        .set('currentlyPlayedNote', Maybe.Nothing())
        .set('instruments', state.instruments.map(
            instrument => instrument.set('lastPlayedNote', Maybe.Nothing())
        ))
    );

    /**
     * Toggles a note of an instrument
     *
     * @memberof module:core.logic.stateFunctions
     *
     * @param {module:core.models.State}      state      The state instance to operate on
     * @param {module:core.models.Instrument} instrument The instrument to change
     * @param {Number}                        position   The position of the note to toggle
     *
     * @return {module:core.models.State} A new instance of the state with the change
     *
     * @memberof module:core.logic.stateFunctions
     */
    const toggleNote = (state, instrument, position) => {
        if (position < 0 || position >= state.notesPerTrack) {
            throw new NotInGridError(position);
        } else {
            return updateInstrument(state, instrumentFunctions.toggleNote(instrument, position));
        }
    };

    /**
     * Updates the tempo
     *
     * @memberof module:core.logic.stateFunctions
     *
     * @param {module:core.models.State} state The state instance to operate on
     * @param {Number}                   tempo The new temo
     *
     * @return {module:core.models.State} A new instance of the state with the change
     */
    const setTempo = (state, tempo) => state.set('tempo', tempo);

    /**
     * Updates the master volume
     *
     * @memberof module:core.logic.stateFunctions
     *
     * @param {module:core.models.State} state  The state instance to operate on
     * @param {Number}                   volume The new master volume
     *
     * @return {module:core.models.State} A new instance of the state with the change
     */
    const setMasterVolume = (state, volume) => state.set('masterVolume', volume);

    const commands = {
        setCurrentlyPlayedNote, startPlaying,
        stopPlaying, toggleNote, setTempo,
        setMasterVolume
    };

    return Object.assign({ commands, getPlayedNotes }, commands);
};
