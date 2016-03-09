/** @file Registers models inside the sandal container */

const uuid = require('node-uuid');

/**
 * Data types
 *
 * @namespace models
 * @memberof  module:core
 */

/**
 * Pointer to the note of a specific instrument
 *
 * @typedef  InstrumentNote
 * @memberof module:core.models
 *
 * @property {String} instrument The instrument
 * @property {Number} position   The position of the note
 */

 /**
  * Type that describes updates to played notes
  *
  * @typedef  PlayedNoteUpdates
  * @memberof module:core.models
  *
  * @property {Number}                         gridNote    The note that's currently being
                                                           played on the grid
  * @property {Array<module:core.models.Note>} playedNotes Newly played notes of instruments
  */

/**
 * An object describing updates to apply to the currently/last played notes
 *
 * @typedef {Object}
 */

module.exports = sandal => {
    /**********/
    /* Models */
    /**********/

    sandal.object('core.models.Instrument', require('../models/instrument'));
    sandal.object('core.models.State', require('../models/state'));
    sandal.object('core.models.Note', require('../models/note'));

    /*************/
    /* Factories */
    /*************/

    sandal.factory(
        'core.models.makeInstrument',
        ['core.models.Instrument'],
        Instrument => frequency => new Instrument({ id: uuid.v4(), frequency }),
        true
    );
};
