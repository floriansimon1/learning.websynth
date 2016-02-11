const Sandal = require('sandal');

var sandal = new Sandal();

require('./models')(sandal);
require('./synth')(sandal);
require('./views')(sandal);
require('./redux')(sandal);

module.exports = sandal;
