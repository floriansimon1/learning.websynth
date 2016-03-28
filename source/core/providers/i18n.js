/** @file i18n symbols */

/**
 * i18n-related symbols
 *
 * @namespace
 * @memberof  module:core
 */

/**
 * Takes an english string and translates into the language the app
 * is configured to serve
 *
 * @todo Implement, someday
 *
 * @function
 * @memberof module:core.i18n
 *
 * @param {String} text The string to translate
 *
 * @return {String} The translated string
 */
module.exports = sandal => sandal.object('core.i18n.tr', require('lodash').identity);
