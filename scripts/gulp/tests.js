/**
 * Tasks related to testing.
 */

const gulp     = require('gulp');
const jasmine  = require('gulp-jasmine');
const istanbul = require('gulp-istanbul');

gulp.task('test', ['coverage'], function () {
    return gulp
    .src(['tests/integration/**/*.js', 'tests/unit/**/*.js'])
    .pipe(jasmine({ verbose: true, includeStackTrace: true }))
    .pipe(istanbul.writeReports({
        reportOpts: { dir: 'reports/coverage' },
    }))
});

gulp.task('coverage', function () {
    return gulp
    .src(['source/client/**/*.js', 'source/core/**/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
});
