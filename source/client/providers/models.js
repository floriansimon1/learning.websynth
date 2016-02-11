/** @file Registers models inside the sandal container */

module.exports = sandal => {
    sandal.object('client.models.Instrument', require('../models/instrument'));
    sandal.factory(
        'client.models.instrument',
        ['client.models.Instrument'],
        Instrument => new Instrument(),
        true
    );
};
