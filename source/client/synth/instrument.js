/** @file A musical instrument that emits sounds when the player asks it to do so */

/**
 * Factory for building instruments.
 *
 * @name Instrument
 * @class
 * @memberof module:client.synth
 */
const Instrument = function () {
    return {
        /**
         * Starts playing a note
         *
         * @method
         * @memberof module:client.synth.Instrument
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
         * @memberof module:client.synth.Instrument
         *
         * @return {Void}
         */
        noteOff () {
            console.log('Note stopped playing !');
        }
    }
};

module.exports = Instrument;
