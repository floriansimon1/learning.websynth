const sandal = require('../../providers');

describe('The Sequencer component', () => {
    var Sequencer;
    var state;

    beforeEach(done => (
        sandal.resolve(
            ['client.views.Sequencer', 'client.redux.initialState'],
            function (error) {
                Sequencer = arguments[1];
                state     = arguments[2];

                if (error) {
                    fail(error);
                }

                done();
            }
        )
    ));

    it('should contain the correct number of instruments', function () {
        const tree = Sequencer();

        /* Toggles the note's checkbox */
        expect(tree.children.slice(-1)[0].children[0].children.length).toBe(
            state.instruments.length
        );
    });
});
