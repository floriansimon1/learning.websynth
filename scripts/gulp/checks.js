/**
 * Tasks to run checks on source code.
 */

const gulp   = require('gulp');
const jshint = require('gulp-jshint');

/* Lints JS code. */
gulp.task('check-js', function () {
    return gulp.src([
        'source/client/**/*.js', 'source/server/**/*.js', 'source/docs/**/*.js'
    ])
    .pipe(jshint({ esnext: true }))
    .pipe(jshint.reporter('default', { verbose: true }));
});
