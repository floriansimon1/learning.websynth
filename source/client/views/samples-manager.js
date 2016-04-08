/** @file Top-level view to import/manage samples */

const h = require('virtual-dom/h');

/**
 * Page to manage samples
 *
 * @name     SamplesManager
 * @function
 * @memberof module:client.views
 */
module.exports = () => (
    h('div#samples-manager', [
        h('ul#samples-folders-column', ['a', 'b', 'c'].map(
            groupName => h('li.folder', groupName)
        )),

        h('div#samples-list', 'llul2'),
    ])
);
