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

    /* The master volume audio node. */
    var masterVolume;

    /* Initialization of the service. */
    (() => {
        /* Initialization of the audio context. */
        audioContext = new (window.AudioContext || window.webkitAudioContext)();

        /* Creates a master volume button and connects it to the output. */
        masterVolume = audioContext.createGain();
        masterVolume.connect(audioContext.destination);

        /* Passes the destination audio node to the instrument. */
        instrument.outputTo(audioContext, masterVolume);
    })();

    /* The public interface of the Player service. */
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
