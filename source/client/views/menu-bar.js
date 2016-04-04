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
module.exports = (tr, MasterVolumeKnob, TempoKnob, MenuEntry) => (
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

                /**************/
                /* Menu links */
                /**************/

                MenuEntry({
                    activatedBy: new Set(['sequencer']),
                    path:        Maybe.Just('#/'),
                    title:       tr('Sequencer'),
                    subEntries:  []
                }),

                MenuEntry({
                    path:        Maybe.Just('#/samples'),
                    activatedBy: new Set(['samples']),
                    title:       tr('Samples'),
                    subEntries:  []
                })
            ])
        ])
    )
);
