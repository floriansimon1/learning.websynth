/** @file The app-wide menu bar */

const h = require('virtual-dom/h');

module.exports = (tr, MasterVolumeKnob, TempoKnob) => (
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
            ])
        ])
    )
);
