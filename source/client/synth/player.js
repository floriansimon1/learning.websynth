/** @file The sound player */

const di = require('di4js');

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

    console.log(instrument);

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

di
.register('fs1-ws.client.synth.Player')
.as(Player)
.asSingleton()
.withConstructor()
.param('instrument').val(3)
.setFactory(Player);
