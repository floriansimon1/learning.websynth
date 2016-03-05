const _ = require('lodash');

const sandal = require('../providers');

describe('The synthesis engine', () => {
    var actions;
    var player;
    var store;

    beforeEach(done => {
        sandal.resolve(
            ['client.redux.store', 'client.redux.actions', 'client.synth.player'],
            function (error) {
                store   = arguments[1];
                player  = arguments[3];
                actions = arguments[2];

                if (error) {
                    fail(error);
                }

                done();
            }
        );
    });

    it('should periodically update the currently played note', done => {
        actions.startPlaying();
        player.audioContext.$processTo('00:10.000');

        store.subscribe(_.once(() => {
            expect(store.getState().currentlyPlayedNote.isNothing).toBe(false);
            done();
        }));
    });

    it('should reset the currently played note when it is asked to stop playback', done => {
        actions.startPlaying();
        player.audioContext.$processTo('00:10.000');

        store.subscribe(_.once(() => {
            expect(store.getState().currentlyPlayedNote.isNothing).toBe(true);
            done();
        }));

        actions.stopPlaying();
    });
});
