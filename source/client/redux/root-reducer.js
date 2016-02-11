/** @file The root reducer */

/**
 * The root reducer
 *
 * @function
 * @memberof module:client.redux
 */
module.exports = initialState => (
    (state, action) => state || initialState
);
