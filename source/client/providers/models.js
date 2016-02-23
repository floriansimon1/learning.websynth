/** @file Registers models inside the sandal container */

const uuid = require('node-uuid');

module.exports = sandal => {
    sandal.object('client.models.Instrument', require('../models/instrument'));
    sandal.factory(
        'client.models.makeInstrument',
        ['client.models.Instrument'],
        Instrument => frequency => new Instrument({ id: uuid.v4(), frequency }),
        true
    );

    sandal.object('client.models.State', require('../models/state'));
};
