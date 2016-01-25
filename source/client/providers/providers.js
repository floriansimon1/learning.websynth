const Sandal = require('sandal');
const prefix = 'fs1-ws.client';

var sandal = new Sandal();

sandal.factory(
    `${prefix}.synth.Instrument`,
    require('../synth/instrument')
);

sandal.factory(
    `${prefix}.synth.Player`,
    [`${prefix}.synth.Instrument`],
    require('../synth/player'),
    true
);

sandal.factory(
    `${prefix}.views.components.PlayButton`,
    [`${prefix}.synth.Player`],
    require('../views/components/play-button'),
    true
);

sandal.factory(
    `${prefix}.views.pages.Composer`,
    [`${prefix}.views.components.PlayButton`],
    require('../views/pages/composer'),
    true
);

module.exports = sandal;
