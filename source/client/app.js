/**
 * @file Entry point of the client application
 */

const ReactDOM = require('react-dom');
const React    = require('react');
const di       = require('di4js');

require('./includes');

ReactDOM.render(
    React.createElement(di.resolve('fs1-ws.client.views.pages.Composer')),
    document.getElementsByTagName('body')[0]
);
