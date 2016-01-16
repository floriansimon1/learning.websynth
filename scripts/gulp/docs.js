/**
 * Tasks to generate docs.
 */
const del   = require('del');
const gulp  = require('gulp');
const shell = require('gulp-shell');

const outputDirectory = 'docs/';
const outputFile = 'docs/index.html';
const configFile = 'config/docs/jsdoc.js';

/* Task to clear the docs directory */
gulp.task('clear-docs', () => del(outputDirectory));

/* Task to generate docs out of our codebase */
gulp.task('docs', ['clear-docs'], shell.task([
    './node_modules/.bin/jsdoc -c  ' + configFile
]));

/* Secret task that works only if you have iceweasel installed to open docs */
gulp.task('view-docs', ['docs'], shell.task('iceweasel ' + outputFile));
