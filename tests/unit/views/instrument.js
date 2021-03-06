const Instrument = require('../../../source/client/views/instrument')(() => '');
const sandal     = require('../../providers');

describe('The Instrument component', () => {
    const notesPerTrack = 5;

    var instrument;

    beforeEach(done => sandal.resolve(
        ['core.models.makeInstrument', 'core.models.NoteName'],
        (error, makeInstrument, NoteName) => {
            instrument = makeInstrument(NoteName());

            if (error) {
                fail(error);
            }

            done();
        }
    ));

    it('should contain the right number of notes', function () {
        const tree = Instrument(notesPerTrack, instrument);

        expect(tree.children.length).toEqual(notesPerTrack + 1);
    });
});
