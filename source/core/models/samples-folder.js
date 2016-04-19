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
     * The ID of the samples folder
     *
     * @var {String}
     */
    id: null,

    /**
     * The name of the folder
     *
     * @var {Maybe<String>}
     */
    name: Maybe.Nothing()
});
