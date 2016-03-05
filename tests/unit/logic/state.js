const sandal = require('../../providers');

describe('State functions', () => {
    var NoSuchInstrumentError;
    var NotPlayingError;
    var NotInGridError;
    var makeInstrument;
    var stateFunctions;
    var state;

    beforeEach(done => sandal.resolve(
        [
            'client.redux.initialState',
            'core.logic.stateFunctions',
            'core.models.makeInstrument',
            'core.errors.NotInGridError',
            'core.errors.NotPlayingError',
            'core.errors.NoSuchInstrumentError'
        ],
        (error, initialState, stateMethods, newInstrument, NotInGrid, NotPlaying, NoSuchInstrument) => {
            NoSuchInstrumentError = NoSuchInstrument;
            makeInstrument        = newInstrument;
            stateFunctions        = stateMethods;
            state                 = initialState;
            NotPlayingError       = NotPlaying;
            NotInGridError        = NotInGrid;

            if (error) {
                fail(error);
            }

            done();
        }
    ));

    it('should allow to set the playing state', () => {
        const playingState = stateFunctions.startPlaying(state);
        const stoppedState = stateFunctions.stopPlaying(playingState);

        expect(playingState.playing).toBe(true);
        expect(stoppedState.playing).toBe(false);
    });

    it('should allow to set the currently played note when in playing mode', () => {
        const note          = 2;
        const playingState  = stateFunctions.startPlaying(state);
        const stateWithNote = stateFunctions.setCurrentlyPlayedNote(playingState, note);

        expect(stateWithNote.currentlyPlayedNote.getOrElse(note + 1)).toBe(note);
    });

    it('should not allow to set the currently played note when not in playing mode', () => {
        expect(() => stateFunctions.setCurrentlyPlayedNote(stateFunctions.stopPlaying(state), 3))
        .toThrowError(NotPlayingError, '');
    });

    it('should report an error when an attempt to update a non-existing instrument is made', () => {
        expect(() => stateFunctions.toggleNote(stateFunctions.stopPlaying(state), makeInstrument(), 3))
        .toThrowError(NoSuchInstrumentError, '');
    });

    it('should report an error when an attempt to toggle a non-existing instrument note is made', () => {
        expect(() => stateFunctions.toggleNote(state, state.instruments[0], state.notesPerTrack))
        .toThrowError(NotInGridError, '');

        expect(() => stateFunctions.toggleNote(state, state.instruments[0], -1))
        .toThrowError(NotInGridError, '');
    });

    it('should allow to toggle notes to play on existing instruments', () => {
        const note        = 2;
        const noteOn      = stateFunctions.toggleNote(state, state.instruments[0], note);
        const noteOff     = stateFunctions.toggleNote(noteOn, noteOn.instruments[0], note)
        const playedNotes = stateFunctions.getPlayedNotes(noteOn);

        expect(playedNotes.length).toBe(1);
        expect(playedNotes[0].position).toBe(note);
        expect(noteOn.instruments[0].notes.has(note)).toBe(true);
        expect(playedNotes[0].instrument.id).toBe(noteOn.instruments[0].id);

        expect(noteOff.instruments[0].notes.has(note)).toBe(false);
        expect(stateFunctions.getPlayedNotes(noteOff).length).toBe(0);
    });
});
