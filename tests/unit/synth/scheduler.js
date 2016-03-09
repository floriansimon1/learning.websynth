const _ = require('lodash');

const sandal = require('../../providers');

describe('The synthesis scheduler', () => {
    var stateFunctions;
    var scheduler
    var state;

    beforeEach(done => sandal.resolve(
        [
            'client.redux.initialState',
            'core.logic.stateFunctions',
            'client.synth.scheduler'
        ],
        function (error) {
            stateFunctions = arguments[2];
            scheduler      = arguments[3];
            state          = arguments[1];

            if (error) {
                fail(error);
            }

            done();
        }
    ));

    it('should schedule notes of the appropriate insrument at the right time', () => {
        const newState = stateFunctions.toggleAllNotes(state, state.instruments[0], true);
        const updates = scheduler.scheduleNotes(newState, 10);

        expect(updates.isNothing).toBeFalsy();
        updates.map(actualUpdates => {
            expect(actualUpdates.playedNotes[0].instrument).toBe(newState.instruments[0]);
            expect(actualUpdates.playedNotes.length).toBe(1);
        });
    });
});
