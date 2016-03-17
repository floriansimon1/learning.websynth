const _ = require('lodash');

const sandal = require('../../providers');

describe('Pitch functions', () => {
    var pitchFunctions;
    var NoteName;

    beforeEach(done => sandal.resolve(
        ['core.logic.pitchFunctions', 'core.models.NoteName'],
        function (error) {
            pitchFunctions = arguments[1];
            NoteName       = arguments[2];

            if (error) {
                fail(error);
            }

            done();
        }
    ));

    it('should return the same frequencies for enharmonically equivalent notes', () => {
        expect(pitchFunctions.getFrequency(
            NoteName({ letter: 'B', octave: 2, modifier: '#' }))
        )
        .toEqual(pitchFunctions.getFrequency(
            NoteName({ letter: 'C', octave: 3, modifier: '' })
        ));

        expect(pitchFunctions.getFrequency(
            NoteName({ letter: 'F', octave: 2, modifier: '♭' }))
        )
        .toEqual(pitchFunctions.getFrequency(
            NoteName({ letter: 'E', octave: 2, modifier: '' })
        ));

        expect(pitchFunctions.getFrequency(
            NoteName({ letter: 'B', octave: 7, modifier: '♭' }))
        )
        .toEqual(pitchFunctions.getFrequency(
            NoteName({ letter: 'A', octave: 7, modifier: '#' })
        ));
    });

    it('should return correct frequencies for notes near the end of an octave', () => {
        expect(
            pitchFunctions
            .getFrequency(NoteName({ letter: 'D', octave: 3, modifier: '#' }))
        )
        .toEqual('155.56');
    });

    it('should return correct frequencies for notes at the end of an octave', () => {
        expect(
            pitchFunctions
            .getFrequency(NoteName({ letter: 'G', octave: 2, modifier: '#' }))
        )
        .toEqual('103.83');
    });

    it('should return correct frequencies for notes at the beginning of an octave', () => {
        expect(
            pitchFunctions
            .getFrequency(NoteName({ letter: 'B', octave: 6, modifier: '♭' }))
        )
        .toEqual('1864.65');
    });

    it('should return the correct frequency for A♭0', () => {
        expect(
            pitchFunctions
            .getFrequency(NoteName({ octave: 0, modifier: '♭' }))
        )
        .toEqual('25.96');
    });

    it('should return correct frequencies for all natural A notes', () => {
        _
        .range(8)
        .map(octave => {
            expect(
                pitchFunctions
                .getFrequency(NoteName({ octave }))
            )
            .toEqual((27.5 * Math.pow(2, octave)).toFixed(2));
        })
    });
});
