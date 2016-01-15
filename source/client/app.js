/**
 * Entry point of the client application.
 */

// FIXME : Include in router files.
require('./views/pages/composer');

const ReactDOM = require('react-dom');
const React    = require('react');
const di       = require('di4js');

ReactDOM.render(
    React.createElement(di.resolve('fs1-ws.views.pages.Composer')),
    document.getElementsByTagName('body')[0]
);
