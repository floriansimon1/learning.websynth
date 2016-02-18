/** @file Redux actions */

/* Helper to define new actions */
const makeActionCreator = (apply) => (...args) => ({
    apply: _.partial.apply(null, [apply].concat(args)),
    type:  Symbol()
});

module.exports = function (initialState) {
    /**
     * Starts playing sounds
     *
     * @function
     * @memberof module:client.redux.actions
     */
    const startPlaying = makeActionCreator(state => (
        state.set('playing', true)
    ));

    /**
     * Starts playing sounds
     *
     * @function
     * @memberof module:client.redux.actions
     */
    const stopPlaying = makeActionCreator(state => (
        state.set('playing', false)
    ));

    /**
     * Redux actions
     *
     * @namespace actions
     * @memberof module:client.redux
     */
    return { startPlaying, stopPlaying };
}
