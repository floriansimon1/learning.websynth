const fs     = require('fs');
const gulp   = require('gulp');
const tasks  = {
    concat  : require('gulp-concat'),
    replace : require('gulp-replace')
};

const vendorCss = [
    'node_modules/materialize-css/bin/materialize.css'
];

const vendorJs = [
    'node_modules/materialize-css/bin/materialize.js'
];

/* Paths and file names. */
const rootFolder            = 'web/';
const appSubFolder          = 'app/';
const assetsSubFolder       = 'assets/';
const sourceFolder          = 'source/';
const vendorJsFileName      = 'vendor.js';
const vendorCssFileName     = 'vendor.css';
const cssAssetsSubFolder    = assetsSubFolder + 'css/';
const rootJsFolder          = rootFolder + appSubfolder;
const templatesBase         = sourceFolder + 'templates';
const sourceJsFolder        = sourceFolder + appSubFolder;
const rootAssetsFolder      = rootFolder + assetsSubFolder;
const sourceAssetsFolder    = sourceFolder + assetsSubFolder;
const rootCssFolder         = rootFolder + cssAssetsSubFolder;
const sourceCssAssetsFolder = sourceFolder + cssAssetsSubFolder;
const sourceScripts         = sourceFolder + appSubFolder + '/**/*';
const sourceAssets          = sourceAssetsFolder + '/**/*';
const indexHtmlFile         = templatesBase + 'index.html';

/* Reads files in a folder and returns them in a list. */
const getAndConvertFileNames = function (directory, additional, template, joinWith) {
    return fs
    .readdirSync(sourceAssetsFolder)
    .concat(additional)
    .map(file => template.replace('%s', file))
    .join(joinWith);
};

/* Gulp helper to replace a string in index.html. */
const replaceInFile = function (what, replacement) {
    return gulp
    .src(indexHtmlFile, { base : templatesBase })
    .pipe(tasks.replace(what, replacement))
    .pipe(gulp.dest(rootFolder))
};

/* Copies concatenated vendor files into the root folder. */
const concatAndCopyVendorFiles = function (vendorFiles, outputFileName, destinationFolder) {
    return function () {
        gulp
        .src(vendorFiles)
        .pipe(tasks.concat(outputFileName))
        .pipe(gulp.dest(destinationFolder)
    };
};

/* Copies all vendor assets to the web folder. */
gulp.task('copy-vendor-css', concatAndCopyVendorFiles(vendorCss, vendorCssFileName, rootCssFolder));
gulp.task('copy-vendor-js', concatAndCopyVendorFiles(vendorJs, vendorJsFileName, rootJsFolder));

/* Takes all assets files and places them into the web root. */
gulp.task('copy-assets', function () {
    return gulp
    .src(sourceAssets, { base : sourceAssetsFolder })
    .pipe(gulp.dest(rootAssets));
});

/* Takes all assets files and places them into the web root. */
gulp.task('copy-app', function () {
    return gulp
    .src(sourceFolder, { base : sourceJsFolder })
    .pipe(gulp.dest(rootScripts));
});

/* Adds CSS files to the index.html template. */
gulp.task('add-css', function () {
    return replaceInFile(
        '%STYLES%',
        getAndConvertFileNames(
            sourceCssAssetsFolder,
            [vendorCssFileName],
            (
                '<link href="/'
                + cssAssetsSubFolder
                + '%s" rel="stylesheet" type="text/css" />'
            ),
            '\n        '
        )
    );
});

/* Adds JS files to the index.html template. */
gulp.task('add-js', function () {
    return replaceInFile(
        '%SCRIPTS%',
        getAndConvertFileNames(
            sourceJsFolder,
            [vendorJsFileName],
            (
                '<script type="text/javascript" src="'
                + jsSubFolder
                + '%s"></script>'
            ),
            '\n        '
        )
    );
});

/* Processes template files and saves them in the root. */
gulp.task('process-templates', ['add-css', 'add-js']);

/* Task that puts assets in the web folder and transforms them. */
gulp.task('create-root', [
    'copy-vendor-css',  'copy-vendor-js',
    'copy-assets',      'copy-app',
    'process-templates'
]);
