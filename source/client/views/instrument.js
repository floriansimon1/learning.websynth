/** @file A visual instrument */

const _ = require('lodash');
const h = require('virtual-dom/h');

/**
 * Virtual DOM component for a single instrument
 *
 * @param {Number}                          notesPerTrack The number of notes in a single track
 * @param {module:client.models.Instrument} instrument    The displayed instrument
 * @param {Boolean}                         even          Whether the position of the Instrument
 *                                                        is an even/odd number
 *
 * @name Instrument
 * @class
 *
 * @memberof module:client.views
 */
module.exports = Note => (notesPerTrack, instrument, even) => h(
    `div.instrument.${even ? 'even' : 'odd'}`, {}, (
        [h('span.instrument-header', {}, [
            h('i.ion.ion-md-musical-note'),
            h('span.note-name', {}, instrument.noteName.toString()),
        ])]
        .concat(
            _.range(notesPerTrack)
            .map((position, i) => Note(instrument, position))
        )
    )
);
