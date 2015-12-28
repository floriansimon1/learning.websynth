/**
 * Functions that returns the correct config file.
 *
 * @return {Object} The loaded configuration.
 */
module.exports = function () {
    return require('../../config/app/' + (process.env.NODE_ENV || 'dev') + '.conf');
};
