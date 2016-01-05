/**
 * Contains tasks composed using other tasks.
 */

var gulp = require('gulp');

gulp.task('live-rebuild', function () {
    gulp.watch(['package.json', 'source/client/**/*', 'source/assets/**/*', 'source/templates/*'], ['create-root']);
});
