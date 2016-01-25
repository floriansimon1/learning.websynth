/**
 * @file Entry point of the client application
 */

const React    = require('react');
const ReactDOM = require('react-dom');
const Composer = require('./views/pages/composer');

const sandal = require('./providers/providers');

sandal.resolve('fs1-ws.client.views.pages.Composer', (_, Composer) => {
    ReactDOM.render(
        React.createElement(Composer),
        document.getElementsByTagName('websynth')[0]
    );
});
