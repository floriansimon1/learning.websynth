/** @file Global state model */

const Immutable = require('immutable');
const Maybe     = require('data.maybe');

/**
 * The state model
 *
 * @name State
 * @class
 * @memberof module:core.models
 */
module.exports = Immutable.Record({
    /**
     * A list of defined instruments
     *
     * @memberof module:core.models.State
     * @var     {Array<module:core.models.Instrument>}
     */
    instruments: [],

    /**
     * The number of notes per track
     *
     * @memberof module:core.models.State
     * @var     {Number}
     */
    notesPerTrack: 16,

    /**
     * Whether or not we're in playing mode
     *
     * @memberof module:core.models.State
     * @var      {Boolean}
     */
    playing: false,

    /**
     * The tempo
     *
     * @memberof module:core.models.State
     * @var      {Number}
     */
    tempo: 120,

    /**
     * The index of the currently played node
     *
     * @memberof module:core.models.State
     * @var      {Maybe<Number>}
     */
    currentlyPlayedNote: Maybe.Nothing(),

    /**
     * Mandatory delay before playback in number
     * of notes
     *
     * @memberof module:core.models.State
     * @var {Number}
     */
    playbackDelay: 1
});
