/** @file Functions to work with State instances */

const Immutable = require('immutable');
const Maybe     = require('data.maybe');
const _         = require('lodash');

/**
 * Functions to work with State instances
 *
 * @namespace
 * @name      stateFunctions
 * @memberof  module:core.logic
 */
module.exports = (
    tempoFunctions, instrumentFunctions,
    NotPlayingError, NotInGridError,
    NoSuchInstrumentError
) => {
    /**
     * Returns the song note converted to a grid note
     *
     * @param {module:core.models.State} state
     *
     * @return {Number}
     */
    const currentGridNote = state => state.currentlyPlayedNote.map(
        note => note % state.notesPerTrack
    );

    /**
     * Applies an update on an instrument looked up by ID
     *
     * @memberof module:core.logic.stateFunctions
     *
     * @param {module:core.models.State}      state      The state instance to operate on
     * @param {module:core.models.Instrument} instrument The updated instrument
     *
     * @return {module:core.models.State} A new instance of the state with the change
     */
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
     * Sets information on an instrument about the note, if any, it's currently playing
     *
     * @param {module:core.models.State}      state      The state instance to operate on
     * @param {module:core.models.Instrument} instrument The instrument to update
     * @param {Unspecified}                   note       The opaque note data used by the synthesis engine
     *
     * @return {[type]}            [description]
     */
    const setOffScheduleNote = (state, instrument, note) => (
        updateInstrument(state, instrument.set('offScheduleNote', Maybe.Just(note)))
    );

    /**
     * Clears information on an instrument about the note, if any, it's currently playing
     *
     * @param {module:core.models.State}      state      The state instance to operate on
     * @param {module:core.models.Instrument} instrument The instrument to update
     *
     * @return {[type]}            [description]
     */
    const clearOffScheduleNote = (state, instrument) => (
        updateInstrument(state, instrument.set('offScheduleNote', Maybe.Nothing()))
    );

    /**
     * Enables/disables all notes of an instrument
     *
     * @memberof module:core.logic.stateFunctions
     *
     * @param {module:core.models.State}      state      The state instance to operate on
     * @param {module:core.models.Instrument} instrument The instrument to change
     * @param {Boolean}                       enable     (Optional) Whether we should enable all
     *                                                   notes (true) or disable (false, default)
     *                                                   them
     *
     * @return {module:core.models.State} A new instance of the state with the change
     */
    const toggleAllNotes = (state, instrument, enable) => (
        updateInstrument(state, instrument.set('notes', new Set(
            enable ? _.range(state.notesPerTrack) : []
        )))
    );

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
    const startPlaying = state => (
        state
        .set('playing', true)
        .set('playbackTempoMap', state.tempoMap)
    );

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
        .set('playbackTempoMap', Immutable.List([]))
        .set('currentlyPlayedNote', Maybe.Nothing())
        .set('displayedTempo', state.tempoMap.get(0).value)
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
    const setTempo = (state, tempo) => (
        tempoFunctions.changeTempo(
            state.playing, state.currentlyPlayedNote.getOrElse(0),
            tempo, state.tempoMap, state.playbackTempoMap
        )
        .map(update => (
            state
            .set('tempoMap', update.template)
            .set('playbackTempoMap', update.playback)
            .set('displayedTempo', update.displayedTempo)
        ))
        .getOrElse(state)
    );

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

    /**
     * Applies currently played note updates atomically.
     *
     * @param {module:core.models.State}             state   The state instance to operate on
     * @param {module:core.models.PlayedNoteUpdates} updates Object describing changes to bring to
     *                                                       currently played notes
     *
     * @return {module:core.models.State} A new instance of the state with the change
     */
    const updatePlayedNotes = (state, updates) => {
        const updatesByInstrument  = _.once(
            () => _(updates.playedNotes).keyBy(note => note.instrument.id).value()
        );

        return setCurrentlyPlayedNote(state, updates.songNote)
        .set('instruments', updates.playedNotes.length === 0 ? state.instruments : (
            state.instruments.map(instrument => (
                updatesByInstrument()[instrument.id] ?
                instrument.set('lastPlayedNote', Maybe.Just(
                    updatesByInstrument()[instrument.id].position
                )) :
                instrument
            ))
        ))
        .set('displayedTempo', updates.tempo);
    };

    const commands = {
        setOffScheduleNote, clearOffScheduleNote,
        setCurrentlyPlayedNote, startPlaying,
        setMasterVolume, updatePlayedNotes,
        stopPlaying, toggleNote, setTempo,
        updateInstrument, toggleAllNotes,
    };

    return Object.assign({ commands, getPlayedNotes, currentGridNote }, commands);
};
