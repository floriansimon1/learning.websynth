/** @file Model for song parameter changes */

const Immutable = require('immutable');

/**
 * Model for song parameter changes. The
 * parameter could be anything; tempo, volume,
 * etc.
 *
 * @class
 * @name     ParameterChange
 * @memberof module:core.models
 */
module.exports = Immutable.Record({
    /**
     * Song position of the change
     *
     * @memberof module:core.models.ParameterChange
     * @var      {Number}
     */
    position: 0,

    /**
     * The new value for the change
     *
     * @memberof module:core.models.ParameterChange
     * @var      {Any}
     */
    value: null
});
