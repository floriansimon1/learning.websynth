/** @file The instrument class */

const Immutable = require('immutable');

/**
 * Class that represents instruments
 *
 * @memberof module:client.models
 */
class Instrument {
    constructor () {
        this.notes = new Set();
    }
};

module.exports = Instrument;

/******************************************/
/* Documentation for members of the class */
/******************************************/

/**
 * A list of enabled notes for the instrument
 *
 * @name notes
 * @memberof module:client.models.Instrument
 * @var {Set<Position>}
 */
