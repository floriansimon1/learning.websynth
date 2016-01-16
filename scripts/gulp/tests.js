/**
 * Tasks related to testing.
 */

const gulp    = require('gulp');
const jasmine = require('gulp-jasmine');

gulp.task('test', function () {
    gulp.src('tests/jasmine/**/*.js')
    .pipe(jasmine());
});
