/**
 * @file The sequencer page
 */

const h = require('virtual-dom/h');
/**
 * Web component for the sequencer
 *
 * @param {Boolean}                                playing      Whether or not sound is being played
 * @param {Array<module:client.models.Instrument>} instruments  The full list of instruments to play
 * @param {Function}                               stopPlaying  Callback to call to stop playing
 *                                                              sounds
 * @param {Function}                               startPlaying Callback to call to start playing
 *                                                              sounds
 *
 * @name Sequencer
 * @class
 * @memberof module:client.views
 */
module.exports = (Instrument, MasterVolumeKnob, TempoKnob) => (
    (playing, instruments, stopPlaying, startPlaying) => (
        h('div', {}, [
            /* The play button */
            h(
                'button',
                { onclick: playing ? stopPlaying : startPlaying },
                playing ? 'Stop' : 'Play'
            ),

            /* Tempo & master volume knobs */
            h('span', new TempoKnob()),
            h('span', new MasterVolumeKnob()),

            /* The instruments table */
            h('table', {}, h(
                'tbody', {}, instruments.map(
                    instrument => Instrument(instrument)
                )
            ))
        ])
    )
);
