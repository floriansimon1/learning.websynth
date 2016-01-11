const fs     = require('fs');
const gulp   = require('gulp');
const tasks  = {
    concat      : require('gulp-concat'),
	runSequence : require('run-sequence'),
    replace     : require('gulp-replace')
};

const vendorCss = [
    'node_modules/materialize-css/bin/materialize.css'
];

const vendorJs = [
    'node_modules/materialize-css/bin/materialize.js',
	'node_modules/lodash/index.js',
	'node_modules/bacon/dist/Bacon.js',
	'node_modules/react/dist/react.js',
	'node_modules/react-stampit/dist/react-stampit.js',
	'node_modules/routerjs/src/router.js',
	'node_modules/di4js/lib/di4js.js'
];

/* Paths and file names. */
const rootFolder            = 'web/';
const appSubFolder          = 'app/';
const assetsSubFolder       = 'assets/';
const sourceFolder          = 'source/';
const vendorJsFileName      = 'vendor.js';
const vendorCssFileName     = 'vendor.css';
const cssAssetsSubFolder    = assetsSubFolder + 'css/';
const rootJsFolder          = rootFolder + appSubFolder;
const templatesBase         = sourceFolder + 'templates/';
const sourceJsFolder        = sourceFolder + 'client/';
const rootAssetsFolder      = rootFolder + assetsSubFolder;
const sourceAssetsFolder    = sourceFolder + assetsSubFolder;
const rootCssFolder         = rootFolder + cssAssetsSubFolder;
const sourceCssAssetsFolder = sourceFolder + cssAssetsSubFolder;
const sourceScripts         = sourceFolder + appSubFolder + '/**/*';
const sourceAssets          = sourceAssetsFolder + '/**/*';
const indexHtmlTemplate     = templatesBase + 'index.html';
const indexHtmlFile         = rootFolder + 'index.html';

/* Reads files in a folder and returns them in a list. */
const getAndConvertFileNames = function (directory, additional, template, joinWith) {
    return [additional]
	.concat(fs.readdirSync(directory))
    .map(file => template.replace('%s', file))
    .join(joinWith);
};

/* Gulp helper to replace a string in index.html. */
const replaceInFile = function (file, what, replacement) {
    return gulp
    .src(file)
    .pipe(tasks.replace(what, replacement))
    .pipe(gulp.dest(file.substring(0, file.lastIndexOf('/') + 1)));
};

/* Copies concatenated vendor files into the root folder. */
const concatAndCopyVendorFiles = function (vendorFiles, outputFileName, destinationFolder) {
    return function () {
        return gulp
        .src(vendorFiles)
        .pipe(tasks.concat(outputFileName))
        .pipe(gulp.dest(destinationFolder));
    };
};

/* Copies all vendor assets to the web folder. */
gulp.task('copy-vendor-css', concatAndCopyVendorFiles(vendorCss, vendorCssFileName, rootCssFolder));
gulp.task('copy-vendor-js', concatAndCopyVendorFiles(vendorJs, vendorJsFileName, rootJsFolder));

/* Takes all assets files and places them into the web root. */
gulp.task('copy-assets', function () {
    return gulp
    .src(sourceAssets, { base : sourceAssetsFolder })
    .pipe(gulp.dest(rootAssetsFolder));
});

/* Takes all assets files and places them into the web root. */
gulp.task('copy-app', function () {
    return gulp
    .src(sourceFolder, { base : sourceJsFolder })
    .pipe(gulp.dest(rootJsFolder));
});

/* Adds the index HTML template. */
gulp.task('copy-templates', function () {
    return gulp
    .src(indexHtmlTemplate, { base : templatesBase })
    .pipe(gulp.dest(rootFolder));
});

/* Adds CSS files to the index.html template. */
gulp.task('add-css', function () {
    return replaceInFile(
		indexHtmlFile,
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
		indexHtmlFile,
        '%SCRIPTS%',
        getAndConvertFileNames(
            sourceJsFolder,
            [vendorJsFileName],
            (
                '<script type="text/javascript" src="'
                + appSubFolder
                + '%s"></script>'
            ),
            '\n        '
        )
    );
});
/* Processes template files and saves them in the root. */
gulp.task('process-templates', function () {
	return tasks.runSequence('copy-templates', 'add-css', 'add-js');
});

/* Task that puts assets in the web folder and transforms them. */
gulp.task('create-root', [
    'copy-vendor-css',  'copy-vendor-js',
    'copy-assets',      'copy-app',
    'process-templates'
]);
