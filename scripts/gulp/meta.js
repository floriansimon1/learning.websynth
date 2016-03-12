/**
 * Contains tasks composed using other tasks.
 */

var gulp = require('gulp');

gulp.task('default', ['create-root']);

gulp.task('live-rebuild', ['create-root'], function () {
    gulp.watch([
        'package.json',       'source/client/**/*',
        'source/assets/**/*', 'source/templates/*',
        'source/core/**/*'
    ], ['create-root', 'docs']);
});
