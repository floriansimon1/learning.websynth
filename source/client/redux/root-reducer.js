/** @file The root reducer */

/**
 * The root reducer
 *
 * @function
 * @memberof module:client.redux
 */
module.exports = initialState => (
    (state, action) => {
        const actualState = state || initialState;

        if (action.apply) {
            return action.apply(actualState);
        } else {
            return actualState;
        }
    }
);
