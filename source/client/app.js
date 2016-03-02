/**
 * @file Entry point of the client application
 */

/**
 * The client application
 *
 * @module client
 */

const diff          = require('virtual-dom/diff');
const patch         = require('virtual-dom/patch');
const createElement = require('virtual-dom/create-element');

const sandal = require('../core/providers');

sandal.resolve(
    ['client.views.Sequencer', 'client.redux.store', 'client.synth.player'],
    (error, Sequencer, store) => {
        if (error) {
            console.log(error, error.stack);
        } else {
            /* Initial rendering */
            var tree = Sequencer();
            var root = createElement(tree);
            document.body.appendChild(root);

            /* Rerender on action */
            store.subscribe(() => {
                /* Computes the diff */
                const newTree = Sequencer();
                const changes = diff(tree, newTree);

                /* Patches the real DOM */
                root = patch(root, changes);
                tree = newTree;
            });
        }
    }
);
