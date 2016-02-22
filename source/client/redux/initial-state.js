/** @file Holds the initial state of the application */

/**
 * The initial state of the app
 *
 * @name initialState
 * @var
 * @memberof module:client.redux
 */
module.exports = (State, instrument) => new State({
    instruments:   [instrument],
    playing:       false,
    notesPerTrack: 16
});
