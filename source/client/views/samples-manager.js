/** @file Top-level view to import/manage samples */

const h = require('virtual-dom/h');

const samples    = [];
const makeFolder = name => ({ name });
const folders    = [makeFolder('Folder #1'), makeFolder('Folder #2')];

/**
 * Page to manage samples
 *
 * @name     SamplesManager
 * @function
 * @memberof module:client.views
 */
module.exports = (tr, store, SamplesFolderView, SamplesFolder) => () => (
    h('div#samples-manager', [
        h('ul#samples-folders-column', (
            store
            .getState()
            .samplesFolders
            .map(SamplesFolderView)
        )),

        h('div#samples-list', {
            ondrop: (a, b, c) => {
                a.preventDefault();
                console.log(a, b, c);
            }
        }, (
            !samples.length
            ? h('div#no-sample-yet-box', [
                h('i.ion.ion-md-images'),
                h('span.caption', tr('No sample in your library'))
            ])
            : h('l')
        )),
    ])
);
