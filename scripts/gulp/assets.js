const fs     = require('fs');
const gulp   = require('gulp');
const tasks  = { replace : require('gulp-replace') };

/* Task that puts assets in the web folder and transforms them. */
gulp.task('create-root', ['copy-assets', 'process-templates']);

/* Takes all assets files and places them into the web root. */
gulp.task('copy-assets', function () {
    const assetsBase = 'lib/assets';

    return gulp
    .src(assetsBase + '/**/*', { base : assetsBase })
    .pipe(gulp.dest('./web/assets'));
});

/* Processes template files and saves them in the root. */
gulp.task('process-templates', function () {
    var templatesBase = 'lib/templates';

    return gulp
    .src(templatesBase + '/index.html', { base : templatesBase })
    .pipe(tasks.replace(
        '%STYLES%',
        fs.readdirSync('lib/assets/css').map(style => (
            '<link href="/assets/css/'
            + style
            + '" rel="stylesheet" type="text/css" />'
        )).join('\n        ')
    ))
    .pipe(gulp.dest('./web'))
});
