const fs     = require('fs');
const gulp   = require('gulp');
const tasks  = {
    concat  : require('gulp-concat'),
    replace : require('gulp-replace')
};

const vendorCss = [
    'node_modules/materialize-css/bin/materialize.css'
];

const vendorScripts = [
    'node_modules/materialize-css/bin/materialize.js'
];

/* Paths and file names. */
const rootFolder         = 'web/';
const assetsSubFolder    = 'assets/';
const sourceFolder       = 'source/';
const vendorCssFileName  = 'vendor.css';
const cssAssetsSubFolder = assetsSubFolder + 'css/';
const templatesBase      = sourceFolder + 'templates';
const rootAssetsFolder   = rootFolder + assetsSubFolder;
const sourceAssetsFolder = sourceFolder + assetsSubFolder;
const rootCssFolder      = rootFolder + cssAssetsSubFolder;
const sourceAssets       = sourceAssetsFolder + '/**/*';

/* Task that puts assets in the web folder and transforms them. */
gulp.task('create-root', [
    'copy-vendor-css',  'copy-vendor-scripts',
    'copy-assets',      'copy-app',
    'process-templates'
]);

/* Copies all vendor assets to the web folder. */
gulp.task('copy-vendor-css', function () {
    return gulp
    .src(vendorCss)
    .pipe(tasks.concat(vendorCssFileName))
    .pipe(gulp.dest(rootCssFolder);
});

/* Takes all assets files and places them into the web root. */
gulp.task('copy-assets', function () {
    return gulp
    .src(sourceAssets, { base : sourceAssets })
    .pipe(gulp.dest(rootAssets));
});

/* Adds CSS files to the index.html template. */
gulp.task('add-css', function () {

    return gulp
    .src(templatesBase + '/index.html', { base : templatesBase })
    .pipe(tasks.replace(
        '%STYLES%',
        fs
        .readdirSync('lib/assets/css')
        .concat([vendorCssFileName])
        .map(style => (
            '<link href="/assets/css/'
            + style
            + '" rel="stylesheet" type="text/css" />'
        )).join('\n        ')
    ))
    .pipe(gulp.dest('./web'))
});

/* Adds JS files to the index.html template. */
gulp.task('add-js', function () {
    var templatesBase = 'lib/templates';

    return gulp
    .src(templatesBase + '/index.html', { base : templatesBase })
    .pipe(tasks.replace(
        '%STYLES%',
        fs
        .readdirSync('lib/assets/css')
        .concat([vendorCssFileName])
        .map(style => (
            '<link href="/assets/css/'
            + style
            + '" rel="stylesheet" type="text/css" />'
        )).join('\n        ')
    ))
    .pipe(gulp.dest('./web'))
});

/* Processes template files and saves them in the root. */
gulp.task('process-templates', ['add-css', 'add-js']);
