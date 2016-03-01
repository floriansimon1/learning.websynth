/** @file The sound player */

const Worker = require('webworkify');
const kefir  = require('kefir');
const _      = require('lodash');

/**
 * Service that watches the application state and starts playing
 * sounds when it's told to.
 *
 * @member
 * @memberof module:client.synth
 */
module.exports = function (Clock, store, actions) {
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
     * The clock web worker
     *
     * @type {WebWorker}
     */
    var clock;

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

    /**
     * Stops playback
     *
     * @return {Void}
     */
    const stop = () => clock.postMessage('stop');

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

        clock.postMessage('start');
    };

    /**
     * Schedules notes if they need to be scheduled.
     */
    const scheduleNotes = () => {
        const tempo         = 120;
        const noteLength    = 60 / (tempo * 4);
        const state         = store.getState();
        const delay         = state.playbackDelay;
        const notesPerTrack = state.notesPerTrack;
        const currentNote   = (
            Math.floor((audioContext.currentTime - startTime) / noteLength) -
            delay
        );

        /* Transforms the raw note to a grid position */
        const currentGridNote = currentNote % state.notesPerTrack;

        /*
        * Changes the currently played note if it's not
        * already registered as the note being played
        */
        if (
            state
            .currentlyPlayedNote
            .map(note => currentGridNote !== note)
            .getOrElse(true) &&
            currentNote >= 0
        ) {
            actions.setCurrentlyPlayedNote(currentGridNote);

            state.instruments.forEach(instrument => {
                if (
                    instrument.notes.has(currentGridNote) && (
                        lastPlayedNotes[instrument.id] === undefined ||
                        lastPlayedNotes[instrument.id] < currentNote
                    )
                ) {
                    /* Saves the last played so that we don't schedule it twice */
                    lastPlayedNotes[instrument.id] = currentNote;

                    /* Configures the note */
                    var note = audioContext.createOscillator();
                    note.frequency.value = instrument.frequency;
                    note.type = 'square';
                    note.connect(masterVolume);

                    /* Actual scheduling */
                    note.start(startTime + (currentNote + delay) * noteLength);
                    note.stop(startTime + (currentNote + delay + 1) * noteLength);
                }
            });
        }
    };

    /***********************/
    /* Initialization code */
    /***********************/

    /* Initializes the clock web worker */
    clock = Worker(Clock);

    /* Initialization of the audio context */
    audioContext = new (window.AudioContext || window.webkitAudioContext)();

    /* Creates a master volume button and connects it to the output */
    masterVolume = audioContext.createGain();
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
    clock.addEventListener('message', scheduleNotes);

    /* The currently empty public interface. */
    return {};
};
