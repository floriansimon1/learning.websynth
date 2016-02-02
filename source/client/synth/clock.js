/** @file Web worker that acts as the clock for the scheduler */

/**
 * The clock web worker for accurate note scheduling
 *
 * @name clock
 * @var {WebWorker}
 * @memberof module:client.synth
 */
module.exports = function (worker) {
    var interval = 25;
    var timerID  = null;

    const tick = () => worker.postMessage('tick');

    worker.start = function () {
        console.log('started');
        timerID = setInterval(tick, interval);
    };

    worker.stop = function () {
        console.log('stopped');
        clearInterval(timerID);
        timerID = null;
    };

    worker.addEventListener('message', message => worker[message.data]());
};
