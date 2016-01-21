/** @file A musical instrument that emits sounds when the player asks it to do so */

const di = require('di4js');

/**
 * Factory for building instruments.
 *
 * @class
 * @memberof module:client.synth
 */
const Instrument = function () {
    return {
        /**
         * Starts playing a note
         *
         * @method
         * @memberof module:client.synth.Synth
         *
         * @return {Void}
         */
        noteOn () {
            console.log('Note started playing !');
        },

        /**
         * Stops playing notes
         *
         * @method
         * @memberof module:client.synth.Synth
         *
         * @return {Void}
         */
        noteOff () {
            console.log('Note stopped playing !');
        }
    }
};

di.register('fs1-ws.client.synth.Instrument')
.as(Instrument)
.setFactory(Instrument);
