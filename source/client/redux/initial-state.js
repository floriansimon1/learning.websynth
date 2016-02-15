/** @file Holds the initial state of the application */

const immutable = require('immutable');

/**
 * The initial state of the app
 *
 * @name initialState
 * @var
 * @memberof module:client.redux
 */
module.exports = instrument => new immutable.Record({
    instruments: [instrument]
});
