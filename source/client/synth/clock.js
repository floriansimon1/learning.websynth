/** @file Web worker that acts as the clock for the scheduler */

/**
 * The clock web worker for accurate note scheduling
 *
 * @name Clock
 * @var {WebWorker}
 * @memberof module:client.synth
 */
module.exports = function (worker) {
    var interval = 50;
    var timerID  = null;

    const tick = () => worker.postMessage('tick');

    worker.start = () => timerID = setInterval(tick, interval);

    worker.stop = () => {
        clearInterval(timerID);
        timerID = null;
    };

    worker.addEventListener('message', message => worker[message.data]());
};
