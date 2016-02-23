/** @file Registers synth components inside the sandal container */

module.exports = sandal => {
    sandal.object(
        'client.synth.Clock',
        require('../synth/clock')
    );

    sandal.factory(
        'client.synth.player',
        ['client.synth.Clock', 'client.redux.store', 'client.redux.getActions'],
        require('../synth/player')
    );
};
