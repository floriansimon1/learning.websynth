/** @file Global state model */

const Immutable = require('immutable');
const Maybe     = require('data.maybe');

/**
 * The state model
 *
 * Gets query methods from
 * {module:core.logic.stateFuncions}. See
 * {module:core} documentation
 *
 * @name State
 *
 * @class
 * @memberof module:core.models
 */
module.exports = ParameterChange => Immutable.Record({
    /* Some constants */
    maximalTempo:        160,
    minimalTempo:        60,
    maximalMasterVolume: 11,
    minimalMasterVolume: 0,

    /**
     * The master volume, on a scale of 0 to 100
     *
     * @memberof module:core.models.State
     * @var      {Number}
     */
    masterVolume: 0,

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
     * A sequencer list of tempo changes
     *
     * @memberof module:core.models.State
     * @var      {Number}
     */
    tempoMap: Immutable.List([ParameterChange({ position: 0, value: 120 })]),

    /**
     * The currently displayed tempo
     *
     * @memberof module:core.models.State
     * @var      {Number}
     */
    displayedTempo: 120,

    /**
     * The tempo map for the current playback
     *
     * @memberof module:core.models.State
     * @var      {Number}
     */
    playbackTempoMap: Immutable.List([]),

    /**
     * The index of the currently played node
     *
     * @memberof module:core.models.State
     * @var      {Maybe<Number>}
     */
    currentlyPlayedNote: Maybe.Nothing(),

    /**
     * Mandatory delay before playback in seconds
     *
     * @memberof module:core.models.State
     * @var      {Number}
     */
    playbackDelay: 0.2,

    /**
     * A list of displayed sample folders
     *
     * @memberof module:core.models.State
     * @var      {Array<module:core.models.SamplesFolder>}
     */
    samplesFolders: [],

     /**
      * The folder that is currently being edited. Whenever the
      * designated folder is changed, this reference needs to be
      * updated
      *
      * @memberof module:core.models.State
      * @var      {Maybe<SamplesFolder>}
      */
    editedSamplesFolder: Maybe.Nothing(),

    /**
     * The curerntly viewed samples folder's ID
     *
     * @memberof module:core.models.State
     * @var      {Maybe<SamplesFolder>}
     */
    viewedSamplesFolder: Maybe.Nothing()
});
