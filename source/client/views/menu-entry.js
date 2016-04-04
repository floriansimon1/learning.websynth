const h = require('virtual-dom/h');

/**
 * @typedef MenuEntry
 *
 * @property {String}           title       Title for the menu entry
 * @property {Set<String>}      activatedBy List of router states that activate the menu entry
 * @property {Maybe<String>}    path        An optional path to go to when the menu action is chosen
 * @property {Array<MenuEntry>} subEntries  Child menu entries
 */

/**
 * Component for menu entries
 *
 * @param {MenuAction} entry  The menu tree to render
 * @param {Router5}    router The application router
 *
 * @function
 * @name     MenuEntry
 * @memberof module:client.views
 */
const MenuEntry = router => entry => {
    const attributes = Object.assign(
        entry
        .path
        .map(path => ({ href: path }))
        .getOrElse({ onclick: 'return false;' }), {
            className: entry.activatedBy.has(router.getState().name) ? 'active' : ''
        }
    );

    return h('a.menu-entry', attributes, [entry.title].concat(
        entry.subEntries.map(MenuEntry)
    ));
};

module.exports = MenuEntry;
