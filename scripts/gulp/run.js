/**
 * Collections of tasks to run the project.
 */

const gulp = require('gulp');

/* Tasks to run the app on a development environment. */
gulp.task('run.dev', () => require('../../source/server/app'));
gulp.task('run', ['run.dev']);
