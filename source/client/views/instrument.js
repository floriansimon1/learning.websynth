/** @file A visual instrument */

const _ = require('lodash');
const h = require('virtual-dom/h');

/**
 * Virtual DOM component for a single instrument
 *
 * @param {Number}                          notesPerTrack The number of notes in a single track
 * @param {module:client.models.Instrument} instrument    The displayed instrument
 *
 * @name Instrument
 * @class
 *
 * @memberof module:client.views
 */
module.exports = Note => (notesPerTrack, instrument) => h('tr.instrument', {}, (
    [
        h('td', {}, h('i.ion.ion-md-musical-note'))
    ].concat(
        _.range(notesPerTrack)
        .map((position, i) => h('td', Note(instrument, position)))
    )
));
