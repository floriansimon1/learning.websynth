![Travis build status](https://travis-ci.org/floriansimon1/learning.websynth.svg?branch=development)
[![Coverage Status](https://coveralls.io/repos/github/floriansimon1/learning.websynth/badge.svg?branch=development)](https://coveralls.io/github/floriansimon1/learning.websynth?branch=development)

# WebSynth

*Simple music program using the Web Audio API*

This app displays a grid of notes that you can toggle by checking their associated checkboxes. Each row
corresponds to a frequency. Once you've completed your grid, press the "Play" button to start playing your
new song!

## Launching

Before following the guide below, make sure to have these installed globally:
- `node >= 4.0`
- `gulp`

First, to fetch the dependencies, do:

`$ npm install`

Then, build the app using:

`$ gulp`

Finally, to launch the app, just type:

`$ gulp run`

## Live-rebuild

To rebuild the app at every change, run:

`$ gulp live-rebuild`

Every source code change, except config files changes, will be picked up, and you will
be able to test your new code without restarting the server app, just by pressing the
reload button in your browser tab.

## Runtime environments

The program can run under different runtime environments. To create an environment,
create a config file in the config/app folder, named `${environment}.conf.js`. To
specify the environment when you run the server application, do:

`$ NODE_ENV=your-env gulp run`

Your config files will be `_.merge()`'d with the config defined in template.conf.js. So
you don't have to repeat variables already defined there.

## Testing

Just run `$ gulp test`
