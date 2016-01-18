/**
 * Functions that returns the correct config file based on the NODE_ENV
 *
 * @name getConfig
 * @memberof module:server
 *
 * @return {Object} The loaded configuration.
 */
module.exports = function () {
    const environment = process.env.NODE_ENV || 'dev';

    return require(`../../config/app/${environment}.conf`);
};
