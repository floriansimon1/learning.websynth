/** @file The app-wide menu bar */

const h = require('virtual-dom/h');

module.exports = tr => () => (
    h('navbar', [
        h('nav', { className: 'title' }, 'WebSeq'),
        h('nav', { className: 'menu-entry'}, tr('Song'))
    ])
);
