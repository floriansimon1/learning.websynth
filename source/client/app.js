/**
 * @file Entry point of the client application
 */

/**
 * Environment-of-execution specific symbols
 *
 * @module environment
 */

/**
 * The client application
 *
 * @module client
 */

const diff          = require('virtual-dom/diff');
const patch         = require('virtual-dom/patch');
const createElement = require('virtual-dom/create-element');

const sandal = require('./providers');

/**
 * The WebAudio API implementation to use
 *
 * @class
 * @name     AudioContext
 * @memberof module:environment
 */
sandal.object('environment.AudioContext', window.AudioContext || window.webkitAudioContext);

/**
 * The WebWorker implementation to use
 *
 * @class
 * @name     Worker
 * @memberof module:environment
 */
sandal.object('environment.Worker', require('webworkify'));

sandal.resolve(
    ['client.views.Webseq', 'client.redux.store', 'client.synth.player'],
    (error, Webseq, store) => {
        if (error) {
            console.log(error, error.stack);
        } else {
            /* Initial rendering */
            var tree = Webseq();
            var root = createElement(tree);
            document.body.appendChild(root);

            /* Rerender on action */
            store.subscribe(() => {
                /* Computes the diff */
                const newTree = Webseq();
                const changes = diff(tree, newTree);

                /* Patches the real DOM */
                root = patch(root, changes);
                tree = newTree;
            });
        }
    }
);
