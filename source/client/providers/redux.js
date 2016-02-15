/** @file Registers redux related components into the main sandal container */

module.exports = sandal => {
    sandal.factory(
        'client.redux.initialState',
        ['client.models.instrument'],
        require('../redux/initial-state')
    );

    sandal.factory(
        'client.redux.rootReducer',
        ['client.redux.initialState'],
        require('../redux/root-reducer')
    );

    sandal.object(
        'client.redux.actions',
        require('../redux/actions')
    );

    sandal.factory(
        'client.redux.store',
        ['client.redux.rootReducer', 'client.redux.initialState'],
        require('../redux/store')
    );
};
