/**
 * Entry-point of the server that just delivers the web content for now.
 */

const express = require('express');

const config = require('./config');

const app = express();

/* Static content service. */
app.get('/', express.static('./web'));
app.use(express.static('./web'));

/* Starts the web server. */
app.listen(config.port);
