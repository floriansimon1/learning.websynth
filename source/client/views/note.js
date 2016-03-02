/**
 * @file Single sequencer note
 */

const _ = require('lodash');
const h = require('virtual-dom/h');

const style = {
    margin:    '5px',
    padding:   '20px',
    transform: 'scale(2)'
};

const backgroundColors = {
    true:  '#66a',
    false: '#338'
};

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
 * @class
 * @memberof module:client.views
 */
module.exports = (currentlyPlayedNote, toggleNote, instrument, position) => {
    const isCurrentNote = currentlyPlayedNote.map(note => note === position).getOrElse(false);
    const toggle        = _.partial(toggleNote, instrument, position);
    const played        = instrument.notes.has(position);

    return h(
        'div', {
            style: {
                backgroundColor: backgroundColors[isCurrentNote],
                height:          '30px',
                width:           '30px'
            }
        },
        h('input', {
            style,

            onchange: toggle,
            checked:  played,
            type:     'checkbox'
        })
    );
};
