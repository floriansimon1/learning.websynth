/** @file Service to schedule notes at the appropriate time */

const Maybe = require('data.maybe');
const _     = require('lodash');

/**
 * Service that schedules notes at the appropriate time
 *
 * @member
 * @name     scheduler
 * @memberof module:client.synth
 */
module.exports = () => {
    /* Returns the duration in seconds of a 16th note */
    const noteLength = tempo => 60 / (tempo * 4);

    /**
     * Uses a tempo map and a current time to return the currently
     * played note and the current tempo
     *
     * @todo This is something that can be used with other parameter change maps too. It is
     *       not only interesting for tempo. It could be moved elsewhere
     *
     * @method
     * @private
     * @memberof {module:synth.scheduler}
     *
     * @param {Immutable.List<module:core.models.ParameterChange>} map  The tempo map
     * @param {Number}                                             time The current time in seconds
     *
     * @return {Maybe<Object>} Object with 3 number properties. One's named note, the other tempo,
     *                         and the last one is named noteLength.
     *                         If there is no currently played note, a Nothing is returned. This can
     *                         happen when we are at the point where playback has not yet started
     */
    const currentNoteAndTempo = (map, time) => {
        if (time < 0) {
            /* We're still in the playback delay */
            return Maybe.Nothing();
        } else {
            const makeInfoObject = (change, offset) => Object.assign(
                { offset, noteLength: noteLength(change.value) },
                change
            );

            /*
            * Progresses through the tempo map until we've reached the
            * last point in the tempo map or a future tempo change
            */
            const currentTempoChangeInfo = map
            .slice(1)
            .reduce(
                (current, change) => {
                    const offset = current.offset + (
                        (change.position - current.position)
                        * current.noteLength
                    );

                    if (offset > time) {
                        return current;
                    } else {
                        return makeInfoObject(change, offset);
                    }
                },
                makeInfoObject(map.get(0).toJSON(), 0)
            );

            return Maybe.Just({
                tempo:      currentTempoChangeInfo.value,
                noteLength: currentTempoChangeInfo.noteLength,
                note:       currentTempoChangeInfo.position + Math.floor(
                    (time - currentTempoChangeInfo.offset)
                    / currentTempoChangeInfo.noteLength
                )
            });
        }
    };

    /**
     * Schedules notes if they need to be scheduled
     *
     * @method
     * @memberof {module:synth.scheduler}
     *
     * @param {module:core.models.State} state       The current application state
     * @param {Number}                   currentTime The current time returned by the high-precision
     *                                               clock
     *
     * @return {Maybe<module:core.models.PlayedNoteUpdates>} If there is no updates to apply,
     *                                                       returns a nothing
     */
    const scheduleNotes = (state, currentTime) => (
        currentNoteAndTempo(state.playbackTempoMap, currentTime)
        .chain(currentTempoChangeInfo => {
            const notesPerTrack   = state.notesPerTrack;
            const currentNote     = currentTempoChangeInfo.note;
            const currentGridNote = currentNote % notesPerTrack;
            const noteLength      = currentTempoChangeInfo.noteLength;

            /* If we have not advanced to a new note, we leave early on */
            if (
                state
                .currentlyPlayedNote
                .map(note => currentGridNote === note)
                .getOrElse(false)
            ) {
                return Maybe.Nothing();
            }

            /*
            * Changes the currently played notes of instruments. Filters
            * out notes that have already been scheduled for playback
            */
            const instrumentUpdates = state.instruments.reduce((updates, instrument) => {
                if (
                    instrument.notes.has(currentGridNote) &&
                    instrument
                    .lastPlayedNote
                    .map(note => note < currentNote)
                    .getOrElse(true)
                ) {
                    return updates.concat({
                        instrument,

                        length:   noteLength,
                        position: currentNote
                    });
                } else {
                    return updates;
                }
            }, []);

            return Maybe.Just({
                songNote:    currentNote,
                playedNotes: instrumentUpdates,
                tempo:       currentTempoChangeInfo.tempo
            });
        })
    );

    return { scheduleNotes, currentNoteAndTempo };
};
