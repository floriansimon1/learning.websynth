/** @file The sound player */

const _      = require('lodash');
const kefir  = require('kefir');

/**
 * Service that watches the application state and starts playing
 * sounds when it's told to.
 *
 * @member
 * @memberof module:client.synth
 */
module.exports = function (clock, scheduler, store, actions, AudioContext) {
    /***********/
    /* Members */
    /***********/

    /**
     * Last played notes, by instrument ID
     *
     * @type {Map<String, Number>}
     */
    var lastPlayedNotes;

    /**
     * Private audio context to play sounds
     *
     * @type {AudioContext}
     */
    var audioContext;

    /**
     * The master volume node
     *
     * @type {GainNode}
     */
    var masterVolume;

    /**
     * The timestamp at which playback started
     *
     * @type {Number}
     */
    var startTime;

    /*********************/
    /* kefir observables */
    /*********************/

    /**
     * kefir stream that contains playing status updates
     *
     * @type {kefir.EventStream}
     */
    var playingStatusChangesStream;

    /***********/
    /* Methods */
    /***********/

    /** @todo Move somewhere else */
    const scaleVolume = volume => volume / store.getState().maximalMasterVolume;

    /**
     * Stops playback
     *
     * @return {Void}
     */
    const stop = clock.stop;

    /**
     * Starts playback
     *
     * @return {Void}
     */
    const play = () => {
        const state = store.getState();

        /* Resets playback state */
        startTime       = audioContext.currentTime;
        lastPlayedNotes = {};

        clock.start();
    };

    /**
     * Takes the updates to bring to the played notes
     * and prepares them for playback
     */
    const prepareNotes = updates => {
        updates.lastPlayedNotes.forEach(note => {
            /* Configures the note */
            var note = audioContext.createOscillator();
            note.frequency.value = instrument.frequency;
            note.type = 'square';
            note.connect(masterVolume);

            /* Actual scheduling */
            note.start(startTime + (currentNote + delay) * noteLength);
            note.stop(startTime + (currentNote + delay + 1) * noteLength);
        });

        actions.playedNoteUpdates(updates);
    };

    /***********************/
    /* Initialization code */
    /***********************/

    var initialState = store.getState();

    /* Initialization of the audio context */
    audioContext = new AudioContext();

    /* Creates a master volume button and connects it to the output */
    masterVolume = audioContext.createGain();
    masterVolume.gain.value = scaleVolume(initialState.masterVolume);
    masterVolume.connect(audioContext.destination);

    /******************************/
    /* Setup of kefir observables */
    /******************************/

    playingStatusChangesStream = kefir.stream(emitter => store.subscribe(
        () => emitter.emit(store.getState().playing))
    )
    .toProperty()
    .skipDuplicates();

    /*******************************/
    /* Configures the control flow */
    /*******************************/

    /* Playback start/interruption */
    playingStatusChangesStream.onValue(playing => {
        if (playing) {
            play();
        } else {
            stop();
        }
    });

    /* Clock tick */
    clock.onTick(prepareNotes(scheduler.scheduleNotes(audioContext.currentTime)));

    /* Master volume/tempo updates */
    store.subscribe(() => masterVolume.gain.value = scaleVolume(store.getState().masterVolume));

    /* The public interface */
    return { audioContext };
};
