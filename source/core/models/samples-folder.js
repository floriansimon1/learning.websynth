/** @file Sample folder data type */

const Immutable = require('immutable');
const Maybe     = require('data.maybe');

/**
 * Sample folder data type
 *
 * @class
 * @name     NoteName
 * @memberof module:core.models
 */
module.exports = Immutable.Record({
    /**
     * The name of the folder
     *
     * @var String
     */
    name: Maybe.Nothing()
});
