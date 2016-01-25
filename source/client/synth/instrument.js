/** @file A musical instrument that emits sounds when the player asks it to do so */

/**
 * Factory for building instruments.
 *
 * @name Instrument
 * @class
 * @memberof module:client.synth
 */
const Instrument = function () {
    var oscillator;
    var audioContext;

    const minorHarmonicFrequencies = [
        138.59, /* C# 3 */
        155.56, /* D# 3 */
        164.81, /* E  3 */
        185.00, /* F# 3 */
        207.65, /* G# 3 */
        220.00, /* A  3 */
        261.63, /* C  4 */
        277.18  /* C# 4 */
    ];

    return {
        /**
         * Connects the instrument to the given audio context
         *
         * @param {AudioContext} context The destination audio context.
         *
         * @return {Void}
         */
        connect (context) {
            /* Saves the audio context on the instrument. */
            audioContext = context;

            /* Initializes the oscillator. */
            oscillator = audioContext.createOscillator();
            oscillator.type = 'square';
            oscillator.frequency.value = 440;
            oscillator.start();
        },

        /**
         * Starts playing a note
         *
         * @method
         * @memberof module:client.synth.Instrument
         *
         * @return {Void}
         */
        noteOn () {
            const frequency = minorHarmonicFrequencies[
                Math.max(0, Math.round(Math.random() * minorHarmonicFrequencies.length) - 1)
            ];

            /* Chooses a random frequency in the minor harmonic scale. */
            oscillator.frequency.value = frequency;

            /* Connects the oscillator to the audio context. */
            oscillator.connect(audioContext.destination);
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
            oscillator.disconnect(audioContext.destination);
        }
    }
};

module.exports = Instrument;
