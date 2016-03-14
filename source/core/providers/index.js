/** @file Providers that provide shared code */

/**
 * Common code
 *
 * @module core
 */

const Sandal = require('sandal');

var sandal = new Sandal();

require('../i18n')(sandal);

require('./errors')(sandal);
require('./models')(sandal);
require('./logic')(sandal);

module.exports = sandal;
