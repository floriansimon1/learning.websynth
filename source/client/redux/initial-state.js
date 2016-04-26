/** @file Holds the initial state of the application */

const Maybe = require('data.maybe');

/**
 * The initial state of the app
 *
 * @name initialState
 * @var
 * @memberof module:client.redux
 */
module.exports = (State, makeInstrument, makeSamplesFolder, NoteName, tr, stateFunctions) => {
    const notes = [
        NoteName({ letter: 'C', octave: 2, modifier:  '' }),
        NoteName({ letter: 'E', octave: 2, modifier: '♭' }),
        NoteName({ letter: 'F', octave: 2, modifier:  '' }),
        NoteName({ letter: 'G', octave: 2, modifier:  '' }),
        NoteName({ letter: 'B', octave: 2, modifier: '♭' }),
        NoteName({ letter: 'C', octave: 3, modifier:  '' })
    ];

    return new State({
        samplesFolders: [makeSamplesFolder(Maybe.Nothing())],
        instruments:    notes.map(makeInstrument),
        playing:        false,
        tempo:          120,
        masterVolume:   10,
        notesPerTrack:  16
    });
};
