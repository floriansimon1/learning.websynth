/**
 * @file Entry point of the client application
 */

const React    = require('react');
const ReactDOM = require('react-dom');
const Composer = require('./views/pages/composer');

const sandal = require('./providers/providers');

ReactDOM.render(
    React.createElement(sandal.resolve('fs1-ws.client.views.pages.Composer')),
    document.getElementsByTagName('body')[0]
);
