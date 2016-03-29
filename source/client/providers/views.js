/** @file Registers react components inside the sandal container */

const _ = require('lodash');

/**
 * Client views
 *
 * @namespace views
 * @memberof module:client
 */

module.exports = sandal => {
    sandal.factory(
        'client.views.Knob',
        ['client.redux.store'],
        require('../views/knob')
    );

    /**
     * Tempo knob
     *
     * @class
     * @name     TempoKnob
     * @memberof module:client.views
     */
    sandal.factory(
        'client.views.TempoKnob',
        ['client.redux.store', 'client.redux.actions', 'client.views.Knob'],
        (store, actions, Knob) => {
            const state = store.getState();

            return Knob(
                state.minimalTempo,
                state.maximalTempo,
                () => store.getState().displayedTempo,
                _.debounce(actions.setTempo, 200)
            );
        }
    );

    /**
     * Tempo knob
     *
     * @class
     * @name     MasterVolumeKnob
     * @memberof module:client.views
     */
    sandal.factory(
        'client.views.MasterVolumeKnob',
        ['client.redux.store', 'client.redux.actions', 'client.views.Knob'],
        (store, actions, Knob) => {
            const state = store.getState();

            return Knob(
                state.minimalMasterVolume,
                state.maximalMasterVolume,
                () => store.getState().masterVolume,
                actions.setMasterVolume
            );
        }
    );

    /* Binary that expects an instrument and a note position */
    sandal.factory(
        'client.views.Note',
        ['client.redux.actions', 'client.redux.store', 'core.logic.stateFunctions'],
        (actions, store, stateFunctions) => () => _.partial(
            require('../views/note'),
            stateFunctions.currentGridNote(store.getState()),
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
        ['client.views.Instrument', 'client.redux.store'],
        (Instrument, store) => () => (
            require('../views/sequencer')(Instrument())(store.getState().instruments)
        )
    );

    sandal.object('client.views.MenuEntry', require('../views/menu-entry'));

    sandal.factory(
        'client.views.MenuBar', [
            'core.i18n.tr', 'client.views.MasterVolumeKnob',
            'client.views.TempoKnob', 'client.redux.actions',
            'client.redux.store', 'client.views.MenuEntry'
        ],
        (tr, MasterVolumeKnob, TempoKnob, actions, store, MenuEntry) => () => (
            require('../views/menu-bar')(tr, MasterVolumeKnob, TempoKnob, MenuEntry)(
                store.getState().playing, actions.stopPlaying, actions.startPlaying
            )
        )
    );

    sandal.factory(
        'client.views.Webseq',
        ['client.views.MenuBar', 'client.views.Sequencer'],
        require('../views/webseq')
    );
};
