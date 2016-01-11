(function () {
	/* Shim node's require. */
	window.require = _.partial(_.property, window);
})();
