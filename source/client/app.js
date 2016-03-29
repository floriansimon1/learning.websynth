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
const router = require('./routing');

sandal.object('client.router', router);

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

/**
 * The browser's document
 *
 * @namespace
 * @name      document
 * @memberof  module:environment
 */
sandal.object('environment.document', document);

sandal.resolve('client.config', (configError, config) => sandal.resolve(
    [
        'client.views.Webseq', 'client.redux.store',
        'client.synth.player', config.defaultController
    ],
    (error, Webseq, store, _, controller) => {
        const anyError = configError || error;

        if (anyError) {
            console.log(anyError, anyError.stack);
        } else {
            controller.attach().then(() => {
                /* Initial rendering */
                var tree = Webseq();
                var root = createElement(tree);
                document.body.appendChild(root);

                /* Rerender function */
                const rerender = (f, t) => {
                    console.log(f, t);
                    /* Computes the diff */
                    const newTree = Webseq();
                    const changes = diff(tree, newTree);

                    /* Patches the real DOM */
                    root = patch(root, changes);
                    tree = newTree;
                };

                /* Rerender on action */
                store.subscribe(rerender);
                router.addListener(rerender);
            });
        }
    }
));
