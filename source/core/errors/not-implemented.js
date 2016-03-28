/**
 * @file Error indicating that someone tried to execute
 *       an unimplemented interface function
 */

/**
 * Error indicating that someone tried to execute
 * an unimplemented interface function
 *
 * @class
 * @name     NotImplementedError
 * @memberof module:core.errors
 *
 * @extends {Error}
 */
module.exports = Object.assign(
    function () {},
    { prototype: Error.prototype }
);
