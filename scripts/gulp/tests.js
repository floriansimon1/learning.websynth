/**
 * Tasks related to testing.
 */

const gulp     = require('gulp');
const jasmine  = require('gulp-jasmine');
const istanbul = require('gulp-istanbul');

gulp.task('test', ['coverage'], function () {
    return gulp
    .src('tests/jasmine/**/*.js')
    .pipe(jasmine({ verbose: true }))
    .pipe(istanbul.writeReports({
        reportOpts: { dir: 'reports/coverage' },
    }))
});

gulp.task('coverage', function () {
    return gulp
    .src('source/client/**/*.js ')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
});
