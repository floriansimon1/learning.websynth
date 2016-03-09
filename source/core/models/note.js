/** @file The Note class */

const Immutable = require('immutable');

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

    /**
     * The instrument playing the note
     *
     * @memberof module:core.models.Note
     * @var      {module:core.models.Instrument}
     */
    instrument: null
});
