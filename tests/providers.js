var sandal = require('../source/client/providers');

sandal.object('environment.document', {});
sandal.object('environment.AudioContext', require('web-audio-test-api').AudioContext);

sandal.object('environment.Worker', workerFunction => {
    var internal = [];
    var external = [];

    var makeInterface = (internal, external) => ({
        addEventListener: (_, listener) => internal.push(listener),
        postMessage:      message       => external.forEach(listener => listener({
            data: message
        }))
    });

    workerFunction(makeInterface(internal, external));

    return makeInterface(external, internal);
});

module.exports = sandal;
