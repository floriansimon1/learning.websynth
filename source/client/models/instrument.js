/** @file The instrument class */

/**
 * Class that represents instruments
 *
 * @class
 * @memberof module:client.models
 */
const Instrument = {};

module.exports = () => {
    /* Returns a new instance of the instrument class */
    return Object.create(Instrument.prototype, {
        /**
         * A list of enabled notes for the instrument
         *
         * @var {Set<Position>}
         */
        notes: new Set()
    });
};
