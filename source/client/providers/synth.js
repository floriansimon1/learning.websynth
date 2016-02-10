/** @file Registers synth components inside the sandal container */

module.exports = sandal => {
    sandal.factory(
        'client.synth.Instrument',
        require('../synth/instrument')
    );

    sandal.factory(
        'client.synth.Player',
        ['client.synth.Instrument'],
        require('../synth/player'),
        true
    );

    sandal.object(
        'client.views.components.Note',
        require('../views/components/note')
    );
};
