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
    const currentFolderName = folder.name.getOrElse(tr('New folder'));

    return h(
        'li',
        { ondblclick: () => actions.toggleEditedSamplesFolder(folder.name) }, [
            store.getState().editedSamplesFolderName !== folder.name
            ? currentFolderName
            : h('input', {
                placeholder: tr('Enter a folder name…'),
                value:       currentFolderName,
                type:        'text'
            }),

            h('i.ion.badge-right', {
                className: (
                    folder
                    .name
                    .map(_.constant('ion-md-remove-circle'))
                    .getOrElse('ion-md-add-circle')
                )
            })
        ]
    );
};
