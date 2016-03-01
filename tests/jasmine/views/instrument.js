const Instrument = require('../../../source/client/views/instrument')(() => '');
const sandal     = require('../../../source/client/providers');

const notesPerTrack = 5;

describe('The Instrument component', () => {
    var instrument;

    beforeEach(done => sandal.resolve('client.models.makeInstrument', (error, makeInstrument) => {
        instrument = makeInstrument();
        done();
    }));

    it('should contain the right number of notes', function () {
        const tree = Instrument(notesPerTrack, instrument);

        expect(tree.children.length).toEqual(notesPerTrack);
    });
});
