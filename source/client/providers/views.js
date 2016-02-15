/** @file Registers react components inside the sandal container */

module.exports = sandal => {
    sandal.factory(
        'client.views.components.Instrument',
        ['client.views.components.Note'],
        require('../views/components/instrument'),
        true
    );

    sandal.factory(
        'client.views.components.Sequencer',
        ['client.synth.Player', 'client.views.components.Instrument'],
        require('../views/components/sequencer'),
        true
    );

    sandal.factory(
        'client.views.pages.Composer',
        [
            'client.synth.Player',
            'client.views.components.Note',
            'client.views.components.Sequencer',
            'client.redux.actions'
        ],
        require('../views/pages/composer'),
        true
    );
};
