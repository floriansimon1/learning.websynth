/**
 * @file Entry-point of the server that just delivers the web content for now
 */

const express = require('express');

const getConfig = require('./getConfig')();

const app = express();

/* Static content service. */
app.get('/', express.static('./web'));
app.use(express.static('./web'));

/* Starts the web server. */
app.listen(config.port, function () {
    console.log('Webserver started on port ' + config.port + '.');
});
