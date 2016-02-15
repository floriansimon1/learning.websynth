/**
 * @file Page that allows an user to compose music
 */

const redux      = require('redux');
const React      = require('react');
const ReactRedux = require('react-redux');
const h          = require('react-hyperscript');

module.exports = function (Player, Note, Sequencer, actions) {
    /**
     * React component for the composer page
     *
     * @name Composer
     * @class
     * @memberof module:client.views.pages
     */
    return ReactRedux.connect(
        state => state,
        dispatch => ({ actions: redux.bindActionCreators(actions, dispatch) })
    )(
        React.createClass({
            render () {
                return h(Sequencer);
            }
        })
    );
};
