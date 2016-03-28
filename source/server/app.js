/**
 * @file Entry-point of the server that just delivers the web content for now
 */

/**
 * The server application
 *
 * @module server
 */

const fs      = require('fs');
const express = require('express');

const config = require('./get-config')();
const app    = express();

/* Inserts config into the front-end application */
var cachedJsMtime;
var cachedJsPromise;
const insertConfigIntoFrontendApp = mtime => {
    if (cachedJsMtime !== mtime) {
        cachedJsMtime   = mtime;
        cachedJsPromise = new Promise((resolve, reject) => (
            fs.readFile('./web/app.js', (error, contents) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(contents.toString().replace(
                        '\'Client configuration insertion point\'',
                        `${JSON.stringify(config.client)}`
                    ))
                }
            })
        ))
    }

    return cachedJsPromise;
};

/* JS bundle request */
app.get('/app.js', (request, response) => (
    fs.stat('./web/app.js', (error, info) => (
        Promise[error ? 'reject' : 'resolve']()
        .then(() => insertConfigIntoFrontendApp(info.mtime))
        .then(js => response.send(js).end)
        .catch(error => response.status(500))
    ))
));

/* Static content service */
app.get('/', express.static('./web'));
app.use(express.static('./web'));

/* Starts the web server */
app.listen(config.server.port, function () {
    console.log(`Webserver started on port ${config.server.port}.`);
});
