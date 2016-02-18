/** @file Redux actions */

/*
* Helper to define new actions.
* Note: The arity includes the state argument.
*/
const makeActionCreator = (arity, apply) => (...args) => ({
    apply: _.partial.apply(null, [apply].concat(args.slice(0, arity - 1))),
    type:  Symbol()
});

module.exports = function (initialState) {
    /**
     * Starts playing sounds
     *
     * @function
     * @memberof module:client.redux.actions
     */
    const startPlaying = makeActionCreator(1, state => (
        state.set('playing', true)
    ));

    /**
     * Starts playing sounds
     *
     * @function
     * @memberof module:client.redux.actions
     */
    const stopPlaying = makeActionCreator(1, state => (
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
