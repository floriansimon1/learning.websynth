/** @file Registers react components inside the sandal container */

const _ = require('lodash');

/**
 * Client views
 *
 * @namespace views
 * @memberof module:client
 */

module.exports = sandal => {
    /* Binary that expects an instrument and a note position */
    sandal.factory(
        'client.views.Note',
        ['client.redux.actions', 'client.redux.store'],
        (actions, store) => () => _.partial(
            require('../views/note'),
            store.getState().currentlyPlayedNote,
            actions.toggleNote
        )
    );

    /* Unary that expects only an instrument */
    sandal.factory(
        'client.views.Instrument',
        ['client.views.Note', 'client.redux.store'],
        (Note, store) => () => _.partial(
            require('../views/instrument')(Note()),
            store.getState().notesPerTrack
        )
    );

    /* Nullary that renders the whole sequencer */
    sandal.factory(
        'client.views.Sequencer',
        ['client.views.Instrument', 'client.redux.actions', 'client.redux.store'],
        (Instrument, actions, store) => () => {
            const state = store.getState();

            return require('../views/sequencer')(Instrument())(
                state.playing, state.instruments,
                actions.stopPlaying, actions.startPlaying
            );
        }
    );
};
