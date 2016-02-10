/** @file The main redux store */

const _ = require('lodash');

/**
 * Main redux store
 *
 * @memberof module:client.redux
 */
module.exports = initialState => _.partialRight(require('redux').createStore, initialState);
