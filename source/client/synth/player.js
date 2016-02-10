/** @file The sound player */

const Worker = require('webworkify');

/**
 * Service that plays sounds.
 *
 * @class
 * @memberof module:client.synth
 */
const Player = function (Clock, instrument) {
    /* Private audio context to play sounds */
    var audioContext;

    /* The master volume audio node */
    var masterVolume;

    /* The clock web worker */
    var clock;

    /* Initialization of the service */
    (() => {
        /* Initialization of the audio context */
        audioContext = new (window.AudioContext || window.webkitAudioContext)();

        /* Creates a master volume button and connects it to the output */
        masterVolume = audioContext.createGain();
        masterVolume.connect(audioContext.destination);

        /* Passes the destination audio node to the instrument */
        instrument.outputTo(audioContext, masterVolume);

        /* Initializes the clock web worker */
        clock = Worker(Clock);
    })();

    /* The public interface of the Player service. */
    return {
        /**
         * The list of dispayed instruments
         *
         * @var
         * @memberof module:client.synth.Synth
         *
         * @type {Array<Instrument>}
         */
        instruments: [instrument],

        /**
         * Starts playing notes
         *
         * @method
         * @memberof module:client.synth.Synth
         *
         * @return {Void}
         */
        play () {
            clock.postMessage('start');
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
            clock.postMessage('stop');
        }
    };
};

module.exports = Player;
