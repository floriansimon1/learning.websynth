/** @file Registers redux related components into the main sandal container */

/**
 * Redux related symbols
 *
 * @namespace redux
 * @memberof module:client
 */

module.exports = sandal => {
    /* We need stateFunctions here to augment the State prototype */
    sandal.factory(
        'client.redux.initialState',
        [
            'core.models.State', 'core.models.makeInstrument',
            'core.models.makeSamplesFolder', 'core.models.NoteName',
            'core.logic.stateFunctions'
        ],
        require('../redux/initial-state')
    );

    sandal.factory(
        'client.redux.rootReducer',
        ['client.redux.initialState'],
        require('../redux/root-reducer')
    );

    sandal.factory(
        'client.redux.store',
        ['client.redux.rootReducer', 'client.redux.initialState'],
        require('../redux/store')
    );

    sandal.factory(
        'client.redux.dispatch',
        ['client.redux.store'],
        store => store.dispatch
    );

    sandal.factory(
        'client.redux.actions',
        ['client.redux.dispatch', 'core.logic.stateFunctions'],
        require('../redux/actions')
    );};
