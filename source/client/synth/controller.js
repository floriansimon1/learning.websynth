module.exports = NotImplementedError => {
    const throwNotImplemented = function () {
        throw new NotImplementedError()
    };

    /**
     * Controller control interface
     *
     * @interface
     * @memberof  module:client.synth
     */
    var Controller = throwNotImplemented;

    /**
     * Asks the controller to start capturing control events
     *
     * @memberof module:client.synth.Controller
     *
     * @return {Promise}
     */
    Controller.prototype.attach = throwNotImplemented;


    /**
     * Asks the controller to stop capturing control events
     *
     * @memberof module:client.synth.Controller
     *
     * @return {Promise}
     */
    Controller.prototype.detach = throwNotImplemented;

    return Controller;
};
