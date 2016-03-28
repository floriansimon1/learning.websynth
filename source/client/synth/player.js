/** @file The sound player */

const _     = require('lodash');
const kefir = require('kefir');

/**
 * Service that watches the application state and starts playing
 * sounds when it's told to.
 *
 * @member
 * @name     player
 * @memberof module:client.synth
 */
module.exports = function (clock, scheduler, store, actions, AudioContext, pitchFunctions) {
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

    /**
     * kefir stream that emits values when the
     * clock ticks
     *
     * @type {kefir.EventStream}
     */
    var clockTicksStream;

    /***********/
    /* Methods */
    /***********/

    /** @todo Move somewhere else */
    const scaleVolume = volume => volume / store.getState().maximalMasterVolume;

    /**
     * Configures an oscillator corresponding to the given
     * instrument
     *
     * @param {module:core.models.Instrument} instrument The instrument we wish to play
     *
     * @return {AudioContex.OscillatorNode}
     */
    const configureNote = instrument => {
        var note = audioContext.createOscillator();

        note.type = 'square';
        note.frequency.value = parseFloat(
            pitchFunctions.getFrequency(instrument.noteName)
        );

        note.connect(masterVolume);

        return note;
    };

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
        startTime = audioContext.currentTime + store.getState().playbackDelay;

        clock.start();
    };

    /**
     * Starts playing single notes manually
     *
     * @param {module:core.models.Instrument} instrument The instrument we wish to play
     *
     * @return {Void}
     */
    const manualNoteOn = instrument => {
        const note = configureNote(instrument);

        note.start();

        actions.setOffScheduleNote(instrument, note);
    };

    /**
     * Stops playing a manually played note
     *
     * @param {module:core.models.Instrument} instrument The instrument we wish to stop playing
     *
     * @return {Void}
     */
    const manualNoteOff = instrument => {
        instrument.offScheduleNote.get().stop();

        actions.clearOffScheduleNote(instrument);
    };

    /**
     * Takes the updates to bring to the played notes
     * and prepares them for playback
     */
    const prepareNotes = potentialUpdates => {
        potentialUpdates.map(updates => {
            updates.playedNotes.forEach(note => {
                /* Configures the note */
                const preparedNote = configureNote(note.instrument);

                /* Actual scheduling */
                preparedNote.start(startTime + note.time);
                preparedNote.stop(startTime + note.time + note.length);
            });

            actions.updatePlayedNotes(updates);
        });
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

    clockTicksStream = playingStatusChangesStream
    .filter(_.identity)
    .sampledBy(kefir.stream(emitter => clock.onTick(() => emitter.emit())));

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
    clockTicksStream.onValue(() => prepareNotes(
        scheduler.scheduleNotes(
            store.getState(),
            audioContext.currentTime - startTime
        )
    ));

    /* Master volume/tempo updates */
    store.subscribe(() => masterVolume.gain.value = scaleVolume(store.getState().masterVolume));

    /* The public interface */
    return { audioContext, manualNoteOn, manualNoteOff };
};
