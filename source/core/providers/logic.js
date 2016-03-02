/** @file Providers for core logic functions */

/**
 * "Business" logic model
 *
 * @namespace 
 * @name      logic
 * @memberof  module:core
 */

module.exports = sandal => {
    sandal.factory(
        'core.logic.instrumentFunctions',
        require('../logic/instrument')
    );

    sandal.factory(
        'core.logic.stateFunctions',
        [
            'core.logic.instrumentFunctions', 'core.errors.NotPlayingError',
            'core.errors.NotInGridError', 'core.errors.NoSuchInstrumentError'
        ],
        require('../logic/state')
    );
};
