/**
 * @file Single sequencer note
 */

const _ = require('lodash');
const h = require('virtual-dom/h');

/**
 * Web component for a note in the grid of a single instrument
 *
 * @param {Maybe<Boolean>}                  currentlyPlayedNote The note that is currently being
 *                                                              played
 * @param {module:client.models.Instrument} instrument          The instrument the note belongs to
 * @param {Number}                          position            The position in the grid of the note
 * @param {Function}                        toggleNote          Callback to call to toggle a note.
 *                                                              Expects the instrument as its first
 *                                                              argument, and the position of the
 *                                                              note as its second argument.
 *
 * @name Note
 * @function
 * @memberof module:client.views
 */
module.exports = (currentlyPlayedNote, toggleNote, instrument, position) => {
    const isCurrentNote = currentlyPlayedNote.map(note => note === position).getOrElse(false);
    const toggle        = _.partial(toggleNote, instrument, position);
    const played        = instrument.notes.has(position);

    const classes = ['']
    .concat(
        isCurrentNote ? ['current'] : [],
        played        ? ['played']  : []
    )
    .join('.');

    return h(`span.note-container${classes}`, { onclick: toggle }, h(`span.note`, {}, '•'));
};
