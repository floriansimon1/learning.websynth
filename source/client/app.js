/**
 * @file Entry point of the client application
 */

const React    = require('react');
const ReactDOM = require('react-dom');
const h        = require('react-hyperscript');
const Provider = require('react-redux').Provider;
const Composer = require('./views/pages/composer');

const sandal = require('./providers');

sandal.resolve(
    ['client.views.pages.Composer', 'client.redux.store'],
    (error, Composer, store) => {
        if (error) {
            console.log(error);
        } else {
            ReactDOM.render(
                h(Provider, { store }, h(Composer)),
                document.getElementsByTagName('websynth')[0]
            );
        }
    }
);
