/** @file The sound player */

const Worker = require('webworkify');
const Bacon  = require('baconjs');
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
     * Mandatory delay before playback in number
     * of notes
     *
     * @type {Number}
     */
    const playbackDelay = 2;

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
     * Bacon stream that contains playing status updates
     *
     * @type {Bacon.EventStream}
     */
    var playingStatusChangesStream;

    /**
     * Bacon stream that contains clock ticks
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
        const tempo       = 120;
        const noteLength  = 60 / (tempo * 4);
        const state       = store.getState();
        const currentNote = (
            Math.floor((audioContext.currentTime - startTime) / noteLength) -
            playbackDelay
        );

        /*
        * Changes the currently played note if it's not
        * already registered as the note being played.
        */
        if (
            state
            .currentlyPlayedNote
            .map(note => currentNote !== note)
            .orElse(true)
        ) {
            actions.setCurrentlyPlayedNote(currentNote);
        };

        state.instruments.forEach(instrument => {
            if (
                instrument.notes.has(currentNote % state.notesPerTrack) && (
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
                note.start(startTime + (currentNote + playbackDelay) * noteLength);
                note.stop(startTime + (currentNote + playbackDelay + 1) * noteLength);
            }
        });
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

    /********************************/
    /* Setup of BaconJS observables */
    /********************************/

    playing = Bacon.fromBinder(subscribe => store.subscribe(
        () => subscribe(store.getState().playing))
    )
    .toProperty(false)
    .skip(1);

    playingStatusChangesStream = playing.skipDuplicates();

    playbackTick = Bacon.fromEvent(clock, 'message');

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
    playbackTick.onValue(scheduleNotes);

    /* The currently empty public interface. */
    return {};
};
