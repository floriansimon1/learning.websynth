/**
 * @file Entry point of the client application
 */

const React    = require('react');
const ReactDOM = require('react-dom');
const Composer = require('./views/pages/composer');

ReactDOM.render(
    React.createElement(Composer),
    document.getElementsByTagName('body')[0]
);
