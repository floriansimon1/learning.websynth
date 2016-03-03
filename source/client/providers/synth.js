/** @file Registers synth components inside the sandal container */

/**
 * Audio synthesis
 *
 * @namespace synth
 * @memberof module:client
 */

module.exports = sandal => {
    sandal.object(
        'client.synth.Clock',
        require('../synth/clock')
    );

    sandal.factory(
        'client.synth.player', [
            'client.synth.Clock', 'client.redux.store',
            'client.redux.actions', 'environment.AudioContext'
        ],
        require('../synth/player')
    );
};
