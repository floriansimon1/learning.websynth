/**
 * @file Page that allows an user to compose music
 */

const React = require('react');
const di    = require('di4js');
const h     = require('react-hyperscript');

const PlayButton = di.resolve('fs1-ws.client.views.components.PlayButton');

/**
 * React component for the composer page
 *
 * @class
 * @memberof module:client.views.pages
 */
const Composer = React.createClass({
    render () {
        return h(PlayButton);
    }
});

di.register('fs1-ws.client.views.pages.Composer').instance(Composer);
