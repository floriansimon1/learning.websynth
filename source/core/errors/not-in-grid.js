/**
 * @file Error indicating that the designated position
 *       is an invalid note position
 */

/**
 * Error indicating that the designated position
 * is an invalid note position
 *
 * @class
 * @name     NotInGridError
 * @memberOf module:core.errors
 *
 * @extends {Error}
 *
 * @param {String} position The offending note position
 */
module.exports = Object.assign(
    function (position) {
        /**
         * The offending note position
         *
         * @var {Number}
         */
        this.position = position;
    },
    { prototype: Error.prototype }
);
