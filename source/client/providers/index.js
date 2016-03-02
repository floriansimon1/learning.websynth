var sandal = require('../../core/providers');

require('./synth')(sandal);
require('./views')(sandal);
require('./redux')(sandal);

module.exports = sandal;
