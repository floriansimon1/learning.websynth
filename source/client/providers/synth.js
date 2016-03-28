/** @file Registers synth components inside the sandal container */

/**
 * Audio synthesis
 *
 * @namespace synth
 * @memberof module:client
 */

module.exports = sandal => {
    sandal.factory(
        'client.synth.clock',
        ['environment.Worker'],
        require('../synth/clock')
    );

    sandal.factory(
        'client.synth.scheduler',
        ['core.models.Note'],
        require('../synth/scheduler')
    );

    sandal.factory(
        'client.synth.player', [
            'client.synth.clock', 'client.synth.scheduler',
            'client.redux.store', 'client.redux.actions',
            'environment.AudioContext', 'core.logic.pitchFunctions'
        ],
        require('../synth/player')
    );

    sandal.factory(
        'client.synth.Controller',
        ['core.errors.NotImplementedError'],
        require('../synth/controller')
    );

    sandal.factory(
        'client.synth.keyboardController', [
            'client.synth.Controller', 'client.synth.player',
            'environment.document', 'client.redux.store'
        ],
        require('../synth/keyboard-controller')
    );
};
