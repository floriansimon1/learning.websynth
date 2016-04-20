/** @file Providers that provide shared code */

/**
 * Common code
 *
 * @module core
 */

const Sandal = require('sandal');

var sandal = new Sandal();

sandal.object('core.utils', require('../utils'));

require('./errors')(sandal);
require('./models')(sandal);
require('./logic')(sandal);
require('./i18n')(sandal);

module.exports = sandal;
