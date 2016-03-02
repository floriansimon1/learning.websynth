/** @file Redux actions */

const redux = require('redux');
const _     = require('lodash');

/*
* Helper to define new actions. Passes the state as the
* first parameter to actions, then all other arguments
* the action actually needs.
*
* Uses a function () {} because istanbul chokes
* on the (...args) notation.
*/
const makeActionCreator = action => function () {
    return {
        type:  Symbol(),
        apply: state => action.apply(
            null,
            [state].concat([].slice.call(arguments, 0, Math.max(0, action.length - 1)))
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
module.exports = (dispatch, stateFunctions) => redux.bindActionCreators(
    _.transform(
        Object.keys(stateFunctions.commands),
        (actionCreators, actionName) => (
            actionCreators[actionName] = makeActionCreator(actions[actionName])
        ),
        {}
    ),
    dispatch
);
