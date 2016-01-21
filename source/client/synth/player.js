/** @file The sound player */

/**
 * Service that plays sounds.
 *
 * @class
 * @memberof module:client.synth
 */
const Player = function (instrument) {
    /* Private audio context to play sounds. */
    var audioContext;

    /* Initialization of the service. */
    (() => {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    })();

    return {
        /**
         * Starts playing notes
         *
         * @method
         * @memberof module:client.synth.Synth
         *
         * @return {Void}
         */
        play () {
            instrument.noteOn();
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
        stop () {
            instrument.noteOff();
            console.log('Note stopped playing !');
        }
    };
};
