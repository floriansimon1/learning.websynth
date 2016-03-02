/** @file Redux actions */

const redux = require('redux');
const _     = require('lodash');

/* Helper to define new actions */
const makeActionCreator = action => (...args) => ({
    type:  Symbol(),
    apply: state => action.apply(
        null,
        args.slice(0, Math.max(0, action.length - 1)).concat([state])
    ),
});

/**
 * Redux action callbacks
 *
 * @name actions
 * @namespace
 * @memberof module:client.redux
 */
module.exports = (dispatch, actions) => redux.bindActionCreators(
    _.transform(
        Object.keys(actions),
        (actionCreators, actionName) => (
            actionCreators[actionName] = makeActionCreator(actions[actionName])
        ),
        {}
    ),
    dispatch
);
