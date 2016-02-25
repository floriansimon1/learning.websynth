/** @file Global state model */

const Immutable = require('immutable');
const Maybe     = require('data.maybe');

/**
 * Class that represents global state
 *
 * @name State
 * @class
 * @memberof module:client.models
 */
module.exports = Immutable.Record({
    /**
     * A list of defined instruments
     *
     * @name instruments
     * @memberof module:client.models.State
     * @var {Array<module:client.models.Instrument>}
     */
    instruments: [],

    /**
     * The number of notes per track
     *
     * @name notesPerTrack
     * @memberof module:client.models.State
     * @var {Number}
     */
    notesPerTrack: 16,

    /**
     * Whether or not we're in playing mode
     *
     * @name playing
     * @memberof module:client.models.State
     * @var {Boolean}
     */
    playing: false,

    /**
     * The tempo
     *
     * @name tempo
     * @memberof module:client.models.State
     * @var {Number}
     */
    tempo: 120,

    /**
     * The index of the currently played node
     *
     * @name tempo
     * @memberof module:client.models.State
     * @var {Maybe<Number>}
     */
    currentlyPlayedNote: Maybe.Nothing()
});
