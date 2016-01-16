/**
 * Functions that returns the correct config file based on the NODE_ENV.
 *
 * @global
 * @function getConfig
 * @memberof module:server
 *
 * @return {Object} The loaded configuration.
 */
module.exports = function () {
    return require('../../config/app/' + (process.env.NODE_ENV || 'dev') + '.conf');
};
