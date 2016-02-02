/** @file Web worker that acts as the clock for the scheduler */

module.exports = function (worker) {
    var interval = 25;
    var timerID  = null;

    const tick = () => worker.postMessage('tick');

    worker.start = function () {
        timerID = setInterval(tick, interval);
    };

    worker.stop = function () {
        clearInterval(timerID);
        timerID = null;
    };

    worker.addEventListener('message', message => worker[message.action](message.data));
};
