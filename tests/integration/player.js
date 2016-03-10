const _ = require('lodash');

const sandal = require('../providers');

describe('The synthesis engine', () => {
    var stateFunctions;
    var actions;
    var player;
    var store;

    beforeEach(done => {
        sandal.resolve(
            [
                'client.redux.store', 'client.redux.actions',
                'client.synth.player', 'core.logic.stateFunctions'
            ],
            function (error) {
                stateFunctions = arguments[4];
                store          = arguments[1];
                player         = arguments[3];
                actions        = arguments[2];

                if (error) {
                    fail(error);
                }

                done();
            }
        );
    });

    it('should periodically update currently played notes', done => {
        actions.startPlaying();
        actions.toggleAllNotes(store.getState().instruments[0], true);

        player.audioContext.$processTo('00:01.000');

        store.subscribe(_.once(() => {
            expect(store.getState().currentlyPlayedNote.isNothing).toBe(false);
            expect(store.getState().instruments[0].lastPlayedNote.isNothing).toBe(false);
            done();
        }));
    });

    it('should never return grid notes higher than the actual number of notes per track', done => {
        actions.startPlaying();
        player.audioContext.$processTo('01:00.000');

        store.subscribe(_.once(() => {
            const state = store.getState();
            expect(stateFunctions.currentGridNote(state).get()).toBeLessThan(state.notesPerTrack);
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
