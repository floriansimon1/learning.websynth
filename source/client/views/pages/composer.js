/**
 * @file Page that allows an user to compose music
 */

const di           = require('di4js');
const React        = require('react');
const h            = require('react-hyperscript');
const RaisedButton = require('material-ui').RaisedButton;

/**
 * React component for the composer page
 *
 * @class
 * @memberof module:client.views.pages
 */
const Composer = React.createClass({
    render () {
        return h(RaisedButton, { secondary: true }, 'Stuff');
    }
});

di.register('fs1-ws.client.views.pages.Composer').instance(Composer);
