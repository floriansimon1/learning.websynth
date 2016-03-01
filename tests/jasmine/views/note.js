const sandal = require('../../../source/client/providers');
const Note   = require('../../../source/client/views/note');
const Maybe  = require('data.maybe');

const position   = 3;
const spies      = {
    toggle: () => {}
};

describe('The Note component', () => {
    var instrument;

    beforeEach(done => {
        spyOn(spies, 'toggle');

        sandal.resolve('client.models.makeInstrument', (error, makeInstrument) => {
            instrument = makeInstrument();
            done();
        });
    });

    it('should tell the store when it is toggled', function () {
        const tree = Note(Maybe.Nothing(), spies.toggle, instrument, position);

        /* Toggles the note's checkbox */
        tree.children[0].properties.onchange();

        expect(spies.toggle).toHaveBeenCalledWith(instrument, position);
    });
});
