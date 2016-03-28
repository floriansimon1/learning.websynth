const _ = require('lodash');

/**
 * Functions that returns the correct config file based on the NODE_ENV
 *
 * @name     getConfig
 * @memberof module:server
 *
 * @param {String} application One of 'client' and 'server'
 * @param {String} envrionment The name of the environment the caller is from
 *
 * @return {Object} The loaded configuration.
 */
module.exports = () => {
    const templateConfig = require('../../config/app/template.conf');
    const environment    = process.env.NODE_ENV || 'dev';

    try {
        return _.merge(templateConfig, require(
            `../../config/app/${environment}.conf`
        ));
    } catch (error) {
        return templateConfig;
    }
};
