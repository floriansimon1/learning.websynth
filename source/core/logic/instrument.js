/** @file Functions to work with Instrument instances */

/**
 * Functions to extract information from Instrument instances
 *
 * @namespace
 * @name      instrumentFunctions
 * @memberof  module:core.logic
 */
module.exports = () => {
    /**
     * Toggles playback of the note of the given instrument
     *
     * @param {module:core.models.Instrument} instrument The instrument to update
     * @param {Number}                        position   The note to toggle
     *
     * @return {module:core.models.Instrument} A copy of the instrument with the toggled note
     */
    const toggleNote = (instrument, position) => instrument.set(
        'notes',
        instrument.notes[instrument.notes.has(position) ? 'delete' : 'add'](position)
    );

    return { toggleNote };
};
