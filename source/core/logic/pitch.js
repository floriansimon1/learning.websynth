/** @file Pitch-related function */

const _     = require('lodash');
const Big   = require('big.js');

/**
 * Pitch-related functions
 *
 * Note: all this works because we're assuming TET-12
 *
 * @name      pitchFunctions
 * @namespace
 * @memberof module:core.logic
 */
module.exports = () => {
    const modifiersImpact = { '♭': -1, '#': 1, '♮': 0 };
    const noteLetters     = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const noteLettersMap  = _.zipObject(noteLetters, _.range(noteLetters.length));

    /* Takes a note letter and returns the previous letter */
    const adjacentLetter = (increment, letter) => {
        const newLetterPosition = noteLettersMap[letter] + increment;

        if (newLetterPosition < 0) {
            return noteLetters[noteLetters.length - 1];
        } else if (newLetterPosition >= noteLetters.length) {
            return noteLetters[0];
        } else {
            return noteLetters[newLetterPosition];
        }
    };

    const previousLetter = _.partial(adjacentLetter, -1);
    const nextLetter     = _.partial(adjacentLetter,  1);

    /*
    * Predicate that tells whether the note represented by
    * the passed letter, when """sharped""", is enharmonically
    * equivalent to the natural next letter note
    */
    const sharpedIsEquivalentToNaturalNext     = _.partial(_.includes, ['B', 'E']);
    const flattedIsEquivalentToNaturalPrevious = _.partial(_.includes, ['C', 'F']);

    /* List of normalized notes ordered (assuming they're on the same octave) */
    const orderedNormalizedNotes = _.flatMap(noteLetters, letter => (
        sharpedIsEquivalentToNaturalNext(letter)
        ? [letter]
        : [letter, `${letter}#`]
    ));

    /* For a given normalized note, contains its order in the ordered notes list above */
    const normalizedNotesMap = _.zipObject(
        orderedNormalizedNotes,
        _.range(orderedNormalizedNotes.length)
    );

    /*
    * Helper that converts a raw note name to an enharmonically
    * equivalent note that can only have sharp accidentals or
    * none
    */
    const normalizeNoteName = noteName => {
        /*
        * Scientific notation starts counting octaves from Cs. We
        * need to count starting from As for our algorithm to work
        */
        const correctOctave = (
            noteLettersMap[noteName.letter] > noteLettersMap['B']
            ? noteName.set('octave', noteName.octave - 1)
            : noteName
        );

        if (modifiersImpact[correctOctave.modifier] === -1) {
            return (
                correctOctave
                .set('letter', previousLetter(correctOctave.letter))
                .set('octave', (
                    correctOctave.letter === 'A'
                    ? correctOctave.octave - 1
                    : correctOctave.octave
                ))

                /* B#, E# do exist, but they're enharmonically equivalent to C and F */
                .set('modifier', (
                    flattedIsEquivalentToNaturalPrevious(correctOctave.letter)
                    ? ''
                    : '#'
                ))
            );
        } else if (
            sharpedIsEquivalentToNaturalNext(correctOctave.letter)
            && modifiersImpact[correctOctave.modifier] === 1
        ) {
            return (
                correctOctave
                .set('modifier', '')
                .set('letter', nextLetter(correctOctave.letter))
            );
        } else {
            return correctOctave;
        }
    };

    /* Δ number of semitones from A♭0. Expects normalized note names */
    const rank = noteName => {
        if (
            noteName.letter === 'G'
            && noteName.octave === -1
            && modifiersImpact[noteName.modifier] === 1
        ) {
            return 0;
        } else {
            /* Builds semitones deltas, starting from A0 */
            const Δoctaves      = noteName.octave * 12;
            const ΔnotePosition = normalizedNotesMap[
                `${noteName.letter}${noteName.modifier}`
            ];

            /* Returns the Δ of semitones from A♭0 (hence the + 1) */
            return Δoctaves + ΔnotePosition + 1;
        }
    };

    /**
     * Returns the name of the note corresponding to the given pitch
     *
     * Algorithm: go to the nearest A (for which we have exact frequencies),
     * and divide/multiply by the 1-semitone constant as many times as needed
     *
     * @memberof module:core.logic.pitchFunctions
     * @see      https://en.wikipedia.org/wiki/Equal_temperament#Calculating_absolute_frequencies
     *
     * @param {module:core.models.NoteName} noteName The note name to convert to a frequency
     *
     * @return {Number} The frequency for the given note name
     */
    const getFrequency = _.memoize(noteName => {
        const normalized = normalizeNoteName(noteName);

        const sameOctaveA   = normalized.set('letter', 'A').set('modifier', '');
        const higherOctaveA = sameOctaveA.set('octave', sameOctaveA.octave + 1);

        const noteRank = rank(normalized);
        const lowerA   = { octave: sameOctaveA.octave, rank: rank(sameOctaveA) };
        const higherA  = { octave: higherOctaveA.octave, rank: rank(higherOctaveA) };

        const reference = _([lowerA, higherA])
        .map(reference => ({
            octave:   reference.octave,
            distance: Math.abs(reference.rank - noteRank),
            method:   reference.rank < noteRank ? 'times' : 'div'
        }))
        .minBy('distance')

        return (
            Big(27.5)
            .times(Math.pow(2, reference.octave))
            [reference.method](
                Big('1.059463').pow(reference.distance)
            )
            .toFixed(2)
        );
    });

    return { getFrequency };
};
