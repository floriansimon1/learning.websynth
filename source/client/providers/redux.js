/** @file Registers redux related components into the main sandal container */

/**
 * Redux related symbols
 *
 * @namespace redux
 * @memberof module:client
 */

module.exports = sandal => {
    sandal.factory(
        'client.redux.initialState',
        [
            'core.models.State', 'core.models.makeInstrument',
            'core.models.NoteName'
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
