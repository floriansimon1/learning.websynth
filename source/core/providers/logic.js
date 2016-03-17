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
        'core.logic.pitchFunctions',
        require('../logic/pitch')
    );

    sandal.factory(
        'core.logic.tempoFunctions',
        ['core.models.ParameterChange'],
        require('../logic/tempo')
    );

    sandal.factory(
        'core.logic.instrumentFunctions',
        require('../logic/instrument')
    );

    sandal.factory(
        'core.logic.stateFunctions',
        [
            'core.logic.tempoFunctions',
            'core.logic.instrumentFunctions', 'core.errors.NotPlayingError',
            'core.errors.NotInGridError', 'core.errors.NoSuchInstrumentError'
        ],
        require('../logic/state')
    );
};
