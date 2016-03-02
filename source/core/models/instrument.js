/** @file The instrument class */

const Immutable = require('immutable');

/**
 * The instrument model
 *
 * @name Instrument
 * @class
 * @memberof module:core.models
 */
module.exports = Immutable.Record({
    /**
     * The ID of the instrument
     *
     * @memberof module:core.models.Instrument
     * @var      {String}
     */
    id: null,

    /**
     * A list of enabled notes for the instrument,
     * represented by their position in the grid
     *
     * @memberof module:core.models.Instrument
     * @var     {Immutable.Set<Number>}
     */
    notes: new Immutable.Set(),

    /**
     * The frequency of the actual played note
     *
     * @memberof module:core.models.Instrument
     * @var      {Number}
     */
    frequency: 440
});
