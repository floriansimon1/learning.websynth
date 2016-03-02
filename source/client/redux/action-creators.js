/** @file Redux actions */

const redux = require('redux');
const _     = require('lodash');

/*
* Helper to define new actions
*
* Uses a function () {} because istanbul chokes
* on the (...args) notation.
*/
const makeActionCreator = action => function () {
    return {
        type:  Symbol(),
        apply: state => action.apply(
            null,
            [].slice.call(arguments, 0, Math.max(0, action.length - 1)).concat([state])
        )
    };
};

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
