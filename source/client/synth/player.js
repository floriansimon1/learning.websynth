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
        /* Initialization of the audio context. */
        audioContext = new (window.AudioContext || window.webkitAudioContext)();

        /* Passes the audio context to the instrument so that it can initialize itself. */
        instrument.connect(audioContext);
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
        }
    };
};

module.exports = Player;
