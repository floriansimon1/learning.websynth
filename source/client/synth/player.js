/** @file The sound player */

const Worker = require('webworkify');
const Bacon  = require('baconjs');

/**
 * Service that watches the application state and starts playing
 * sounds when it's told to.
 *
 * @member
 * @memberof module:client.synth
 */
module.exports = function (Clock, store) {
    /***********/
    /* Members */
    /***********/

    /**
     * Private audio context to play sounds
     *
     * @type {AudioContext}
     */
    var audioContext;

    /**
     * The clock web worker
     *
     * @type {WebWorker}
     */
    var clock;

    /**
     * The instruments audio nodes
     *
     * @type {Array<module:client.synth.Instrument>}
     */
    var instruments;

    /***********************/
    /* BaconJS observables */
    /***********************/

    /**
     * Bacon property that models the playing
     * property.
     *
     * @type {Bacon.Property<Boolean>}
     */
    var playing;

    /**
     * Bacon stream that contains playing status updates.
     *
     * @type {Bacon.EventStream}
     */
    var playingStatusChangesStream;

    /**
     * Bacon stream that contains clock ticks.
     *
     * @type {Bacon.EventStream}
     */
    var playbackTick;

    /***********/
    /* Methods */
    /***********/

    /**
     * Stops playback
     *
     * @return {Void}
     */
    const stop = () => {
        clock.postMessage('stop');
    };

    /**
     * Starts playback
     *
     * @return {Void}
     */
    const play = () => {
        const state = store.getState();

        clock.postMessage('start');
    };

    /* @TODO */
    const notUsedYet = () => {
        /* Creates a master volume button and connects it to the output */
        masterVolume = audioContext.createGain();
        masterVolume.connect(audioContext.destination);

        /* Passes the destination audio node to the instrument */
        instrument.outputTo(audioContext, masterVolume);
    };

    /***********************/
    /* Initialization code */
    /***********************/

    /* Initializes the clock web worker */
    clock = Worker(Clock);

    /* Initialization of the audio context */
    audioContext = new (window.AudioContext || window.webkitAudioContext)();

    /********************************/
    /* Setup of BaconJS observables */
    /********************************/

    /* Setting up BaconJS observables. */
    playing = Bacon.fromBinder(subscribe => store.subscribe(
        () => subscribe(store.getState().playing))
    )
    .toProperty();

    playingStatusChangesStream = playing.skipDuplicates();

    playbackTick = Bacon.fromEvent(clock, 'message');

    /*******************************/
    /* Configures the control flow */
    /*******************************/

    /* Playback start/interruption. */
    playingStatusChangesStream.onValue(playing => {
        if (playing) {
            play();
        } else {
            stop();
        }
    });

    playbackTick.onValue(() => {
        console.log('adz');
    });

    /* The currently empty public interface. */
    return {};
};
