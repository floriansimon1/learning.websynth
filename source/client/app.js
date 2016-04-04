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

const h             = require('virtual-dom/h');
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
        'client.router', 'client.redux.store',
        'client.synth.player', config.defaultController,
        'client.views.MenuBar'
    ],
    (error, router, store, _, controller, MenuBar) => {
        const anyError = configError || error;

        if (anyError) {
            console.log(anyError, anyError.stack);
        } else {
            controller.attach().then(() => {
                var tree;
                var root;

                const render = () => {
                    sandal.resolve(router.views[router.getState().name], (error, View) => {
                        if (error) {
                            console.log(error, error.stack);
                        } else {
                            /* Computes the diff */
                            const newTree = h('div', [MenuBar(), View()]);
                            const changes = tree ? diff(tree, newTree) : newTree;

                            /* Alters the real DOM */
                            if (!tree) {
                                root = createElement(newTree);
                                document.body.appendChild(root);
                            } else {
                                root = patch(root, changes);
                            }

                            /* Saves the current tree */
                            tree = newTree;
                        }
                    });
                };

                /* Rerender on action */
                store.subscribe(render);
                router.addListener(render);

                /* Initial rendering */
                render();
            });
        }
    }
));
