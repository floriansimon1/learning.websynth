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
module.exports = tr => folder => h('li', [
    folder.name.getOrElse(tr('New folder')),
    h('i.ion.badge-right', {
        className: (
            folder
            .name
            .map(_.constant('ion-md-add-circle'))
            .getOrElse('ion-md-remove-circle')
        )
    })
]);
