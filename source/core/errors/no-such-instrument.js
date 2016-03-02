/**
 * @file Error indicating that a sought instrument
 *       does not exist inside the considered state
 *       object
 */

/**
 * Error indicating that a sought instrument
 * does not exist inside the considered state
 * object
 *
 * @class
 * @name     NoSuchInstrumentError
 * @memberOf module:core.errors
 *
 * @extends {Error}
 *
 * @param {String} instrumentId The instrument ID that wasn't found
 */
module.exports = Object.assign(
    function (instrumentId) {
        /**
         * The ID of the sought instrument that was not found
         *
         * @var {String}
         */
        this.instrumentId = instrumentId;
    },
    { prototype: Error.prototype }
);
