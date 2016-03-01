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
 * @function
 *
 * @memberof module:client.views
 */
module.exports = Note => (notesPerTrack, instrument) => h('tr', {}, (
    _.range(notesPerTrack)
    .map(position => h('td', {}, Note(instrument, position)))
));
