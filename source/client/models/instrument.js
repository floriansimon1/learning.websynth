/** @file The instrument class */

const Immutable = require('immutable');

/**
 * Class that represents instruments
 *
 * @name Instrument
 * @class
 * @memberof module:client.models
 */
module.exports = Immutable.Record({
    /**
     * The ID of the instrument.
     *
     * @var {Number}
     */
    id: null,

    /**
     * A list of enabled notes for the instrument
     *
     * @name notes
     * @memberof module:client.models.Instrument
     * @var {Immutable.Set<Position>}
     */
    notes: new Immutable.Set(),

    /**
     * The actual played note
     *
     * @name frequency
     * @memberof module:client.models.Instrument
     * @var {Number}
     */
    frequency: 440
});
