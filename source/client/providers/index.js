var sandal = require('../../core/providers');

sandal.object('client.config', 'Client configuration insertion point');

require('./synth')(sandal);
require('./views')(sandal);
require('./redux')(sandal);

module.exports = sandal;
