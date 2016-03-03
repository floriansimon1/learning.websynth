const sandal = require('../providers');

describe('Initially,', () => {
    var state;
    var stateFunctions;

    beforeEach(done => {
        sandal.resolve(
            ['client.redux.initialState', 'core.logic.stateFunctions'],
            (error, initialState, stateMethods) => {
                state          = initialState;
                stateFunctions = stateMethods;

                if (error) {
                    fail(error);
                }

                done();
            }
        );
    });

    it('we should not be in playing mode', () => {
        expect(state.playing).toBe(false);
    });

    it('there should not be a currently played note', () => {
        expect(state.currentlyPlayedNote.isNothing).toBe(true);
    });

    it('no note should be marked as to play', () => {
        expect(stateFunctions.getPlayedNotes(state).length).toBe(0);
    });
});
