/** @file The main component of the app */

const h = require('virtual-dom/h');

module.exports = (MenuBar, Sequencer) => () => h(
    'div', {}, [MenuBar(), Sequencer()]
);
