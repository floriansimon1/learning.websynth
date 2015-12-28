/**
 * Contains tasks composed using other tasks.
 */

var gulp = require('gulp');

gulp.task('live-rebuild', function () {
    gulp.watch(['package.json', 'lib/client/**/*', 'lib/assets/**/*', 'lib/templates/*'], ['create-root']);
});
