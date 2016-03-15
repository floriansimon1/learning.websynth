/** @file The sequencer page */

const h = require('virtual-dom/h');

/**
 * Web component for the sequencer
 *
 * @param {Array<module:client.models.Instrument>} instruments The full list of instruments to show
 *
 * @name Sequencer
 * @class
 * @memberof module:client.views
 */
module.exports = Instrument => instruments => (
    h('div', {}, instruments.map(
        (instrument, i) => Instrument(instrument, !(i % 2))
    ))
);
