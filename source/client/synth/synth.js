/** @file The synthesizer */

const di = require('di4js');

/**
 * Service for audio synthesis.
 *
 * @class
 * @memberof module:client.synth
 */
const Synth = function () {
    return {
        /**
         * Starts playing a note.
         *
         * @method
         * @memberof module:client.synth.Synth
         *
         * @return {Void}
         */
        noteOn() {
            console.log('Note started playing !');
        },

        /**
         * Stops playing notes.
         *
         * @method
         * @memberof module:client.synth.Synth
         *
         * @return {Void}
         */
        noteOff() {
            console.log('Note stopped playing !');
        }
    }
};

di.register('fs1-ws.client.synth.Synth').as(Synth).asSingleton();
