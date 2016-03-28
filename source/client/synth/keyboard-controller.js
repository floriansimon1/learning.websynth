const _     = require('lodash');
const Maybe = require('data.maybe');

module.exports = (Controller, player, document, store) => {
    const eventTypes         = ['keyup', 'keydown'];
    const letters            = 'azertyuiopqsdfghjklmwxcvbn';
    const lettersMap         = _.zipObject(letters, _.map(letters, (letter, i) => i));
    const actionsByEventType = {
        keyup:   player.manualNoteOff,
        keydown: player.manualNoteOn
    };
console.log(lettersMap);
    const translateNoteEvent = event => Maybe.fromNullable(
        console.log(store.getState().instruments[lettersMap[event.key]]) ||
        store.getState().instruments[lettersMap[event.key]]
    );

    const handleKeyEvent = _.curry((eventType, event) => (
        translateNoteEvent(event).map(actionsByEventType[eventType])
    ));

    const listeners = _.transform(eventTypes, (listeners, eventType) => (
        listeners[eventType] = handleKeyEvent(eventType)
    ));

    const toggleListeners = enable => () => Promise.resolve(
        eventTypes.forEach(eventType => (
            document[`${enable ? 'add' : 'remove'}EventListener`](
                eventType, listeners[eventType], true
            )
        ))
    );

    const attach = toggleListeners(true);
    const detach = toggleListeners(false);

    /**
     * The keyboard controller service
     *
     * @name       keyboardController
     * @implements client.synth.Controller
     * @memberof   client.synth
     * @var
     */
    return Object.create(Controller.prototype, {
        attach: { get: () => attach },
        detach: { get: () => detach }
    });
};
