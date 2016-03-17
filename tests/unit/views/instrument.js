const Instrument = require('../../../source/client/views/instrument')(() => '');
const sandal     = require('../../providers');

describe('The Instrument component', () => {
    const notesPerTrack = 5;

    var instrument;

    beforeEach(done => sandal.resolve('core.models.makeInstrument', (error, makeInstrument) => {
        instrument = makeInstrument(440);

        if (error) {
            fail(error);
        }

        done();
    }));

    it('should contain the right number of notes', function () {
        const tree = Instrument(notesPerTrack, instrument);

        expect(tree.children.length).toEqual(notesPerTrack + 1);
    });
});
