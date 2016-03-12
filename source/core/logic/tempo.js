/** @file Functions to work with tempo */

const Maybe     = require('data.maybe');
const Immutable = require('immutable');

/**
 * Tempo map updates
 *
 * @typedef  TempoMapUpdates
 * @memberof module:core.models
 *
 * @property {Immutable.List<module:core.models.ParameterChange>} template The template tempo map
 * @property {Immutable.List<module:core.models.ParameterChange>} playback The playback tempo map
 */

/**
 * Functions to work with tempo
 *
 * @namespace
 * @name      tempoFunctions
 * @memberof  module:core.logic
 */
module.exports = (ParameterChange) => {
    /**
     * Helper that returns the current tempo map value
     * @todo This is interesting for all parameters change in general, not just for tempo
     */
    const getCurrentTempo = (map, currentNote) => map.reduce((matching, change) => {
        if (change.position <= currentNote) {
            return change.value;
        } else {
            return matching;
        }
    }, map.get(0).value);

    /**
     * Inserts a tempo change inside tempo maps
     *
     * @memberof module:core.logic.tempoFunctions
     *
     * @param {Boolean}                                            playing  True if we're in playing
     *                                                                      mode
     * @param {Maybe<Number>}                                      songNote The current song note
     * @param {Number}                                             tempo    The new tempo
     * @param {Immutable.List<module:core.models.ParameterChange>} template The template tempo map
     * @param {Immutable.List<module:core.models.ParameterChange>} playback The playback tempo map
     *
     * @return {Maybe<module:core.models.TempoMapUpdates>}
     */
    const changeTempo = (playing, currentNote, tempo, template, playback) => {
        const currentTempo = (
            playing ?
            getCurrentTempo(playback, currentNote) :
            template.get(0).value
        );

        /* We're already at the desired value */
        if (currentTempo === tempo) {
            return Maybe.Nothing();
        } else if (playing) {
            return Maybe.Just({
                template,
                displayedTempo: tempo,
                playback: (
                    playback
                    .push({ position: currentNote, value: tempo })
                    .sortBy(change => change.position)
                )
            });
        } else {
            return Maybe.Just({
                displayedTempo: tempo,
                template: Immutable.List([ParameterChange({ position: 0, value: tempo })]),
                playback
            });
        }
    };

    return { changeTempo };
};
