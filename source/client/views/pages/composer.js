/**
 * @file Page that allows an user to compose music
 */

const React = require('react');
const h     = require('react-hyperscript');

module.exports = function (PlayButton) {
    /**
     * React component for the composer page
     *
     * @name Composer
     * @class
     * @memberof module:client.views.pages
     */
    return React.createClass({
        render () {
            return h(PlayButton);
        }
    });
};
