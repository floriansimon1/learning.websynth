/** @file Registers redux related components into the main sandal container */

module.exports = sandal => {
    sandal.factory(
        'client.redux.RootReducer',
        require('../redux/store')
    );

    sandal.factory(
        'client.redux.Store',
        ['client.redux.RootReducer']
        require('../redux/store')
    );
};
