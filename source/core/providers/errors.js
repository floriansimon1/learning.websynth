/** @file Providers for our custom error types */

/**
 * Application error types
 *
 * @namespace
 * @name      errors
 * @memberof  module:core
 */

module.exports = sandal => {
    sandal.object(
        'core.errors.NotImplementedError',
        require('../errors/not-implemented')
    );

    sandal.object(
        'core.errors.NoSuchInstrumentError',
        require('../errors/no-such-instrument')
    );

    sandal.object(
        'core.errors.NotPlayingError',
        require('../errors/not-playing')
    );

    sandal.object(
        'core.errors.NotInGridError',
        require('../errors/not-playing')
    );
};
