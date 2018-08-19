module.exports = function clockWorker(worker) {
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
