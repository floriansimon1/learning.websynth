/** @file Web worker that acts as the clock for the scheduler */

/**
 * The clock web worker for accurate note scheduling
 *
 * @member
 * @name      clock
 * @memberof  module:client.synth
 */
module.exports = Worker => {
    const clockWorker = Worker(require('./worker'));

    return {
        /**
         * Adds a callback to the list of listeners to call
         * when the clock ticks
         *
         * @function
         * @memberof module:client.synth.Clock
         *
         * @param {Function} listener
         *
         * @return {Any}
         */
        onTick: listener => clockWorker.addEventListener('message', listener),

        /**
         * Asks the clock to start ticking
         *
         * @function
         * @memberof module:client.synth.Clock
         *
         * @return {Any}
         */
        start: () => clockWorker.postMessage('start'),

        /**
         * Asks the clock to stop ticking
         *
         * @function
         * @memberof module:client.synth.Clock
         *
         * @return {Any}
         */
        stop: () => clockWorker.postMessage('stop')
    };
};
