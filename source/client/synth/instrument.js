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
    var context;
    var output;
    var notes;

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
         * Connects the instrument to the given output
         *
         * @param {AudioContext} context The context from which we create audio nodes
         * @param {AudioNode}    out     The destination audio node
         *
         * @return {Void}
         */
        outputTo (audioContext, out) {
            /* Saves the audio context on the instrument, as well as the output node */
            context = audioContext
            output  = out;

            /* Initializes the oscillator */
            oscillator = audioContext.createOscillator();
            oscillator.type = 'square';
            oscillator.frequency.value = 440;
            oscillator.start();
        },

        /**
         * (Un)schedules a note's played status
         *
         * @param {Integer} position The note position in the sequencer grid
         *
         * @return {Void}
         */
        togglePlayed (position) {
            /* The undefined case in handled gracefully in that case. */
            notes[position] = !notes[position];
        },

        /**
         * Starts playing a note
         *
         * @method
         * @memberof module:client.synth.Instrument
         *
         * @param {Integer} position The note position in the sequencer grid
         *
         * @return {Void}
         */
        noteOn (position) {
            if (notes[position]) {
                const frequency = minorHarmonicFrequencies[
                    Math.max(0, Math.round(Math.random() * minorHarmonicFrequencies.length) - 1)
                ];

                /* Chooses a random frequency in the minor harmonic scale. */
                oscillator.frequency.value = frequency;

                /* Connects the oscillator to the audio context. */
                oscillator.connect(output);
            }
        },

        /**
         * Stops playing a note.
         *
         * @method
         * @memberof module:client.synth.Instrument
         *
         * @return {Void}
         */
        noteOff (position) {
            if (notes[position]) {
                oscillator.disconnect(output);
            }
        }
    }
};

module.exports = Instrument;
