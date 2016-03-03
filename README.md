![Travis build status](https://travis-ci.org/floriansimon1/learning.websynth.svg?branch=development)
[![Coverage Status](https://coveralls.io/repos/floriansimon1/learning.websynth/badge.svg?branch=development)](https://coveralls.io/r/floriansimon1/learning.websynth?branch=development)

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

## Testing

Just run `$ gulp test`
