/** @file Service to schedule notes at the appropriate time */

/**
 * Service that schedules notes at the appropriate time
 *
 * @class
 * @name     scheduler
 * @memberof module:client.synth
 */
module.exports = PlayedNoteUpdates => {
    /**
     * Schedules notes if they need to be scheduled.
     *
     * @method
     *
     * @param {module:core.models.State} state       The current application state
     * @param {Number}                   currentTime The current time returned by the high-precision
     *                                               clock
     *
     * @return {Maybe<module:core.models.PlayedNoteUpdates>} If there is no updates to apply, returns
     *                                                       a nothing
     */
    const scheduleNotes = (state, currentTime) => {
        const noteLength    = 60 / (state.tempo * 4);
        const delay         = state.playbackDelay;
        const notesPerTrack = state.notesPerTrack;
        const currentNote   = (
            Math.floor((currentTime - startTime) / noteLength) -
            delay
        );

        /* If we have not advanced to a new note, we leave early on */
        if (
            currentNote < 0 ||
            state
            .currentlyPlayedNote
            .map(note => currentGridNote === note)
            .getOrElse(false)
        ) {
            return Maybe.Nothing();
        }

        /* Transforms the raw note to a grid position */
        const currentGridNote = currentNote % state.notesPerTrack;

        /*
        * Changes the currently played notes of instruments. Filters
        * out notes that have already been scheduled for playback
        */
        const instrumentUpdates = state.instruments.reduce((updates, instrument) => {
            if (
                instrument.notes.has(currentGridNote) &&
                instrument
                .lastPlayedNote
                .map(note => note !== currentGridNote)
                .getOrElse(true)
            ) {
                return updates.concat({ instrument, position: currentGridNote });
            } else {
                return updates;
            }
        });

        return {
            currentlyPlayedNote: currentGridNote,
            lastPlayedNotes:     instrumentUpdates
        };
    };

    return { scheduleNotes };
};
