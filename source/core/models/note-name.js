/** @file Note name model class */

const Immutable = require('immutable');

/**
 * Note name immutable model class
 *
 * Note: the default state for this is A4
 *
 * @class
 * @name     NoteName
 * @memberof module:core.models
 */
module.exports = Immutable.Record({
    /**
     * The note's anglo-saxon system name
     *
     * @memberof module:core.models.NoteName
     *
     * @var {String}
     */
    letter: 'A',

    /**
     * The octave of the note, from 0 to 8
     *
     * @memberof module:core.models.NoteName
     *
     * @var {Number}
     */
    octave: 4,

    /**
     * The modifier of the note, ie. one of
     * ♭, #, ♮ or the empty string
     *
     * @memberof module:core.models.NoteName
     *
     * @var {String}
     */
    modifier: ''
});
