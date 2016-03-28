const _                        = require('lodash');
const sandal                   = require('../../providers');
const keyboardControllerGetter = require('../../../source/client/synth/keyboard-controller');

describe('The keyboard controller', () => {
    var Controller;
    var player;
    var store;
    var state;

    const document = {
        addEventListener:    () => {},
        removeEventListener: () => {}
    };

    beforeEach(done => sandal.resolve(
        [
            'client.synth.Controller',
            'client.redux.initialState'
        ],
        function (error) {
            Controller = arguments[1];
            state      = arguments[2];

            store  = { getState: _.constant(state) };
            player = { manualNoteOn: _.noop, manualNoteOff: _.noop };

            spyOn(player, 'manualNoteOn');
            spyOn(player, 'manualNoteOff');
            spyOn(document, 'addEventListener');
            spyOn(document, 'removeEventListener');

            if (error) {
                fail(error);
            }

            done();
        }
    ));

    it('should implement the Controller interface', () => (
        expect(
            keyboardControllerGetter(Controller, player, document, store)
            instanceof Controller
        )
        .toBeTruthy()
    ));

    it('should be attachable to window.document', done => (
        keyboardControllerGetter(Controller, player, document, store)
        .attach()
        .then(() => {
            expect(document.addEventListener).toHaveBeenCalledTimes(2);
            expect(document.removeEventListener).not.toHaveBeenCalled();
        })
        .catch(fail)
        .then(done)
    ));

    it('should be detachable from window.document', done => (
        keyboardControllerGetter(Controller, player, document, store)
        .detach()
        .then(() => {
            expect(document.removeEventListener).toHaveBeenCalledTimes(2);
            expect(document.addEventListener).not.toHaveBeenCalled();
        })
        .catch(fail)
        .then(done)
    ));

    it('should tell the player to play notes when a key with a valid instrument is pressed', () => {
        const keyboardController = keyboardControllerGetter(Controller, player, document, store);

        keyboardController.listeners['keydown']({ key: 'a' });
        expect(player.manualNoteOff).not.toHaveBeenCalled();
        expect(player.manualNoteOn).toHaveBeenCalledWith(state.instruments[0]);

        keyboardController.listeners['keyup']({ key: 'a' });
        expect(player.manualNoteOff).toHaveBeenCalledWith(state.instruments[0]);
    });

    it('should not tell the player to play notes when an unknown key is pressed', () => {
        const keyboardController = keyboardControllerGetter(Controller, player, document, store);

        keyboardController.listeners['keydown']({ key: 'Control' });
        keyboardController.listeners['keyup']({ key: 'Control' });
        expect(player.manualNoteOff).not.toHaveBeenCalled();
        expect(player.manualNoteOn).not.toHaveBeenCalled();
    });
});
