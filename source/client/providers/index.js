var sandal = require('../../core/providers');

sandal.object('client.config', {
    defaultController: 'client.synth.keyboardController'
});

require('./synth')(sandal);
require('./views')(sandal);
require('./redux')(sandal);

module.exports = sandal;
