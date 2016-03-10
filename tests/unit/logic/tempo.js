const sandal = require('../../providers');

describe('Tempo functions', () => {
    var ParameterChange;
    var tempoFunctions;
    var state;

    beforeEach(done => sandal.resolve(
        [
            'core.logic.tempoFunctions',
            'client.redux.initialState',
            'core.models.ParameterChange'
        ],
        function (error) {
            ParameterChange = arguments[3];
            tempoFunctions  = arguments[1];
            state           = arguments[2];

            if (error) {
                fail(error);
            }

            done();
        }
    ));

    it(
        'should modify the template tempo map when there is a tempo change and playback is stopped',
        () => {
            const tempo  = state.tempoMap.get(0).value + 1;
            const update = tempoFunctions.changeTempo(
                false,
                0,
                tempo,
                state.tempoMap,
                state.playbackTempoMap
            ).get();

            expect(update.template.size).toBe(1);
            expect(update.template.get(0).position).toBe(0);
            expect(update.template.get(0).value).toBe(tempo);
        }
    );

    it(
        'should not change tempo maps when the tempo stays the same',
        () => {
            const tempo = state.tempoMap.get(0).value;

            expect(tempoFunctions.changeTempo(
                false,
                0,
                tempo,
                state.tempoMap,
                state.playbackTempoMap
            ).isNothing).toBeTruthy();

            expect(tempoFunctions.changeTempo(
                true,
                5,
                tempo,
                state.tempoMap,
                state.tempoMap
            ).isNothing).toBeTruthy();
        }
    );

    it(
        'should insert playback tempo changes at the correct position',
        () => {
            const tempo       = state.tempoMap.get(0).value;
            const newTempo    = tempo + 1;
            const futureTempo = tempo + 2;

            const update = tempoFunctions.changeTempo(
                true,
                5,
                tempo + 1,
                state.tempoMap,
                state.tempoMap.push(ParameterChange({ value: futureTempo, position: 10 }))
            ).get();

            expect(update.playback.size).toBe(3)
            expect(update.playback.get(0).value).toBe(tempo);
            expect(update.playback.get(1).value).toBe(newTempo);
            expect(update.playback.get(2).value).toBe(futureTempo);
        }
    );
});
