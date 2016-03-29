/** @file Client-side application routing management */

const Router5         = require('router5').Router5;
const historyPlugin   = require('router5-history');
const listenersPlugin = require('router5-listeners');

module.exports = new Router5()
.setOption('useHash', true)
.setOption('defaultRoute', 'sequencer')
.addNode('sequencer', '/')
.addNode('samples', '/samples')
.usePlugin(historyPlugin.default())
.usePlugin(listenersPlugin.default())
.start();
