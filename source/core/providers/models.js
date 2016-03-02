/** @file Registers models inside the sandal container */

const uuid = require('node-uuid');

/**
 * Data types
 *
 * @namespace models
 * @memberof  module:core
 */

/**
 * Pointer to the note of a specific instrument.
 *
 * @typedef  {Object} InstrumentNote
 * @memberof module:core.models
 *
 * @property {String} instrumentId The ID of the instrument
 * @property {Number} position     The position of the note
 */

module.exports = sandal => {
    /**********/
    /* Models */
    /**********/

    sandal.object('core.models.Instrument', require('../models/instrument'));
    sandal.object('core.models.State', require('../models/state'));

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
