const _         = require('lodash');
const Immutable = require('immutable');
const Maybe     = require('data.maybe');

const sandal = require('../../providers');

describe('The synthesis scheduler', () => {
    var ParameterChange;
    var stateFunctions;
    var scheduler
    var state;

    beforeEach(done => sandal.resolve(
        [
            'core.models.ParameterChange',
            'client.redux.initialState',
            'core.logic.stateFunctions',
            'client.synth.scheduler'
        ],
        function (error) {
            ParameterChange = arguments[1];
            stateFunctions  = arguments[3];
            scheduler       = arguments[4];
            state           = arguments[2];

            if (error) {
                fail(error);
            }

            done();
        }
    ));

    it('should not return note updates when we are at the same note as previously', () => {
        const newState = stateFunctions
        .startPlaying(stateFunctions.toggleAllNotes(state, state.instruments[0], true))
        .set('currentlyPlayedNote', Maybe.Just(8));

        expect(scheduler.scheduleNotes(newState, 1).isNothing).toBe(true);
    });

    it('should not schedule notes when playback has not yet started', () => {
        expect(scheduler.currentNoteAndTempo(Immutable.List([]), -1).isNothing).toBeTruthy();
    })

    it('should be able to unwind the tempo map correctly', () => {
        const map = Immutable.List([
            ParameterChange({ position: 0,  value: 120 }),
            ParameterChange({ position: 16, value:  60 }),
            ParameterChange({ position: 32, value: 240 })
        ]);

        const inspect = (time, expectedTempo, expectedNote, expectedLength) => {
            const info = scheduler.currentNoteAndTempo(
                map,
                time
            );

            expect(info.get().note).toBe(expectedNote);
            expect(info.get().tempo).toBe(expectedTempo);
            expect(info.get().noteLength).toBe(expectedLength);
        };

        inspect(0,    120, 0, 0.125);
        inspect(0.25, 120, 2, 0.125);

        inspect(2, 60, 16, 0.25);
        inspect(3, 60, 20, 0.25);

        inspect(6, 240, 32, 0.0625);
    });

    it('should schedule notes of the appropriate insrument at the right time', () => {
        const newState = stateFunctions.startPlaying(
            stateFunctions.toggleAllNotes(state, state.instruments[0], true)
        );

        const updates = scheduler.scheduleNotes(newState, 10);

        expect(updates.isNothing).toBeFalsy();
        updates.map(actualUpdates => {
            expect(actualUpdates.playedNotes[0].instrument).toBe(newState.instruments[0]);
            expect(actualUpdates.playedNotes.length).toBe(1);
        });
    });
});
