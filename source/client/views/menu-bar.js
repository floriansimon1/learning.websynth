/** @file The app-wide menu bar */

const h = require('virtual-dom/h');

module.exports = (tr, MasterVolumeKnob, TempoKnob) => (
    (playing, stopPlaying, startPlaying) => (
        h('nav', [
            h('span', { className: 'title' }, 'WebSeq'),

            h('span', { id: 'playback-controls' }, [
                /* The play button */
                h(
                    'span', {
                        onclick: playing ? stopPlaying : startPlaying,
                        className: 'button-like'
                    },
                    playing ? '■' : '▶'
                ),

                /* Tempo & master volume knobs */
                h('span', new TempoKnob()),
                h('span', new MasterVolumeKnob())
            ]),

            h('span', { className: 'menu-entry'}, tr('Song'))
        ])
    )
);
