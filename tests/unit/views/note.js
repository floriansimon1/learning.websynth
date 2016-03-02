const Note   = require('../../../source/client/views/note');
const sandal = require('../../../source/client/providers');
const Maybe  = require('data.maybe');
const _      = require('lodash');

describe('The Note component', () => {
    const position   = 3;
    const spies      = {
        toggle: () => {}
    };

    var instrument;

    beforeEach(done => {
        spyOn(spies, 'toggle');

        sandal.resolve('core.models.makeInstrument', (error, makeInstrument) => {
            instrument = makeInstrument();

            if (error) {
                fail(error);
            }

            done();
        });
    });

    it('should tell the store when it is toggled', function () {
        const tree = Note(Maybe.Nothing(), spies.toggle, instrument, position);

        /* Toggles the note's checkbox */
        tree.children[0].properties.onchange();

        expect(spies.toggle).toHaveBeenCalledWith(instrument, position);
    });

    it('should get styled differently when it is played than when it is not', () => {
        const played    = _.range(2).map(() => Note(Maybe.of(0), spies.toggle, instrument, 0));
        const notPlayed = _.range(2).map(() => Note(Maybe.of(0), spies.toggle, instrument, 1));

        expect(played[0].properties.style.backgroundColor).toEqual(
            played[1].properties.style.backgroundColor
        );

        expect(notPlayed[0].properties.style.backgroundColor).toEqual(
            notPlayed[1].properties.style.backgroundColor
        );

        expect(played[0].properties.style.backgroundColor).not.toEqual(
            notPlayed[0].properties.style.backgroundColor
        );
    })
});
