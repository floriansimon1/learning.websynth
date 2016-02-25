/** @file Registers react components inside the sandal container */

module.exports = sandal => {
    sandal.object(
        'client.views.components.Note',
        require('../views/components/note')
    );

    sandal.factory(
        'client.views.components.Instrument',
        ['client.views.components.Note'],
        require('../views/components/instrument')
    );

    sandal.factory(
        'client.views.components.Sequencer',
        ['client.redux.getActions', 'client.views.components.Instrument'],
        require('../views/components/sequencer')
    );

    sandal.factory(
        'client.views.pages.Composer',
        ['client.views.components.Sequencer'],
        require('../views/pages/composer')
    );
};
