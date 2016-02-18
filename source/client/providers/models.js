/** @file Registers models inside the sandal container */

const uuid = require('node-uuid');

module.exports = sandal => {
    sandal.object('client.models.Instrument', require('../models/instrument'));
    sandal.factory(
        'client.models.instrument',
        ['client.models.Instrument'],
        Instrument => new Instrument({ id: uuid.v4() }),
        true
    );

    sandal.object('client.models.State', require('../models/state'));
};
