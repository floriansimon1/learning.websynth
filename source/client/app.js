/**
 * @file Entry point of the client application
 */

const React      = require('react');
const ReactDOM   = require('react-dom');
const ReactRedux = require('react-redux');
const h          = require('react-hyperscript');
const Composer   = require('./views/pages/composer');

const sandal = require('./providers');

sandal.resolve(
    ['client.views.pages.Composer', 'client.redux.store'],
    (error, Composer, store) => {
        if (error) {
            console.log(error, error.stack);
        } else {
            ReactDOM.render(
                h(ReactRedux.Provider, { store }, h(Composer)),
                document.getElementsByTagName('websynth')[0]
            );
        }
    }
);
