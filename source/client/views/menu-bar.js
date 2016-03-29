/** @file The app-wide menu bar */

const h     = require('virtual-dom/h');
const Maybe = require('data.maybe');

/**
 * The app-wide menu bar
 *
 * @param {Boolean}  playing      Whether or not sound is being played
 * @param {Function} stopPlaying  Callback to call to stop playing
 *                                sounds
 * @param {Function} startPlaying Callback to call to start playing
 *
 * @function
 * @name     MenuBar
 * @memberof module:client.views
 */
module.exports = (tr, MasterVolumeKnob, TempoKnob, MenuBar) => (
    (playing, stopPlaying, startPlaying) => (
        h('nav', [
            h('span.title', {}, 'WebSeq'),

            h('span#playback-controls', [
                /* The play button */
                h(
                    'span.button-like',
                    { onclick: playing ? stopPlaying : startPlaying },
                    playing ? '■' : '▶'
                ),

                /* Tempo & master volume knobs */
                h('span.knobs-container', [new TempoKnob(), new MasterVolumeKnob()]),

                /* Menu links */
                MenuBar({ title: tr('Sequencer'), path: Maybe.Just('#/'), subEntries: [] }),
                MenuBar({ title: tr('Samples'), path: Maybe.Just('#/samples'), subEntries: [] })
            ])
        ])
    )
);
