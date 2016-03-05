/** @file The Note class */

const Immutable = require('immutable');
const Maybe     = require('data.maybe');

/**
 * The note model
 *
 * @name Note
 * @class
 * @memberof module:core.models
 */
module.exports = Immutable.Record({
    /**
     * The position of the note to play
     *
     * @memberof module:core.models.Note
     * @var      {Number}
     */
    position: null,

    /**
     * The length of the note, in seconds
     *
     * @memberof module:core.models.Note
     * @var      {Number}
     */
    length: null,
});
