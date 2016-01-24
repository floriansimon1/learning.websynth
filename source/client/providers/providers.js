const Sandal = require('sandal');
const prefix = 'fs1-ws.client';

var sandal = new Sandal();

sandal.object(`${prefix}.views.components.PlayButton`, require('../views/components/play-button'));
sandal.factory(`${prefix}.views.pages.Composer`, [`${prefix}.views.components.PlayButton`], require('../views/pages/composer'));

module.exports = sandal;
