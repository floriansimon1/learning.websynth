/**
 * @file Page that allows an user to compose music
 */

const React = require('react');
const ioc   = require('micro-ioc');
const h     = require('react-hyperscript');

const Composer = function (PlayButton) {
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
}

ioc.define(
    'fs1-ws.views.pages.Composer',
    ['fs1-ws.views.components.PlayButton'],
    Composer
);
