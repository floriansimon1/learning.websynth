const Sandal = require('sandal');
const prefix = 'fs1-ws.client';

var sandal = new Sandal();

sandal.object(
    `${prefix}.synth.Clock`,
    require('../synth/clock')
);

sandal.factory(
    `${prefix}.synth.Instrument`,
    require('../synth/instrument')
);

sandal.factory(
    `${prefix}.synth.Player`,
    [`${prefix}.synth.Clock`, `${prefix}.synth.Instrument`],
    require('../synth/player'),
    true
);

sandal.object(
    `${prefix}.views.components.Note`,
    require('../views/components/note')
);

sandal.factory(
    `${prefix}.views.components.Instrument`,
    [`${prefix}.views.components.Note`],
    require('../views/components/instrument'),
    true
);

sandal.factory(
    `${prefix}.views.components.Sequencer`,
    [`${prefix}.synth.Player`, `${prefix}.views.components.Instrument`],
    require('../views/components/sequencer'),
    true
);

sandal.factory(
    `${prefix}.views.pages.Composer`,
    [
        `${prefix}.synth.Player`,
        `${prefix}.views.components.Note`,
        `${prefix}.views.components.Sequencer`
    ],
    require('../views/pages/composer'),
    true
);

module.exports = sandal;
