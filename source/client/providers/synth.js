/** @file Registers synth components inside the sandal container */

module.exports = sandal => {
    sandal.object(
        'client.synth.clock',
        require('../synth/clock')
    );

    sandal.object(
        'client.synth.Instrument',
        require('../synth/instrument')
    );

    sandal.factory(
        'client.synth.Player',
        ['client.synth.clock', 'client.synth.Instrument'],
        require('../synth/player'),
        true
    );
};
