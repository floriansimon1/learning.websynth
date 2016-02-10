const Sandal = require('sandal');

var sandal = new Sandal();

require('./synth')(sandal);
require('./react')(sandal);
require('./redux')(sandal);

module.exports = sandal;
