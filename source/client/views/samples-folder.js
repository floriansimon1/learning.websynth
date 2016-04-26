/** @file Component for sample folders */

const h = require('virtual-dom/h');
const _ = require('lodash');

/**
 * Component for sample folders
 *
 * @param {module:core.models.SamplesFolder} folder The folder to display
 *
 * @name     SamplesFolder
 * @function
 * @memberof module:client.views
 */
module.exports = (tr, store, actions) => folder => {
    const hasName = folder.name.isJust;

    const validateName = name => !!name.trim();

    const handleFolderNameKeyEvents = event => {
        if (_.includes([event.key, event.code], 'Escape')) {
            actions.toggleEditedSamplesFolder(folder);
        } else if (
            validateName(event.target.value) && (
                _.includes([event.key, event.code], 'Enter') ||
                _.includes([event.key, event.code], 'NumpadEnter')
            )
        ) {
            actions.saveFolderName(folder, event.target.value);
        }
    };

    return h(
        'li',
        { ondblclick: () => actions.toggleEditedSamplesFolder(folder) }, [
            !store.getState().isCurrentlyEditedFolder(folder)
            ? h(
                `span.${hasName ? 'has-name' : 'unnamed'}`,
                folder.name.getOrElse(tr('New folder…'))
            )
            : h('input', {
                placeholder: tr('Enter a folder name…'),
                value:       folder.name.getOrElse(''),
                onkeyup:     handleFolderNameKeyEvents,
                type:        'text'
            }),

            h('i.ion.badge-right', {
                onclick: event => {
                    const input = event.target.parentElement.querySelector('input[type=text]');

                    if (input && validateName(input.value)) {
                        actions.saveFolderName(folder, input.value);
                    } else if (folder.name.isJust) {
                        actions.removeSamplesFolder(folder);
                    } else {
                        actions.toggleEditedSamplesFolder(folder);
                    }
                },

                className: (
                    folder
                    .name
                    .map(_ => {
                        if (store.getState().samplesFolders.length > 1) {
                            return 'ion-md-remove-circle';
                        } else {
                            return '';
                        }
                    })
                    .getOrElse('ion-md-add-circle')
                )
            })
        ]
    );
};
