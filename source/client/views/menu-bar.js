/** @file The app-wide menu bar */

const h = require('virtual-dom/h');

module.exports = tr => () => (
    h('nav', [
        h('span', { className: 'title' }, 'WebSeq'),
        h('span', { className: 'menu-entry'}, tr('Song'))
    ])
);
