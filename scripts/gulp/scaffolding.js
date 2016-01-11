const gulp    = require('gulp');
const readdir = require('recursive-readdir');
const source  = require('vinyl-source-stream');

const tasks   = {
    concat      : require('gulp-concat'),
    runSequence : require('run-sequence'),
    replace     : require('gulp-replace'),
    browserify  : require('browserify'),
    glob        : require('glob')
};

const vendorCss = [
    'node_modules/materialize-css/bin/materialize.css'
];

/* Paths and file names. */
const indexHtmlTemplate          = 'source/templates/index.html';
const sourceCssFolder            = 'source/assets/css/';
const sourceWebAppFolder         = 'source/client/';
const vendorCssFile              = 'vendor.css';
const cssDestinationFolder       = 'web/css';
const webAppDestinationFileName  = 'app.js';
const webAppDestinationFolder    = 'web/';
const indexHtmlDestinationFolder = 'web/';
const cssUrl                     = 'css/';

/* Returns the parent directory of a file. */
const parent = file => file.substring(0, file.lastIndexOf('/') + 1);

/* Concatenates a list of files into a string to embed in a HTML file. */
const filesListToString = function (files, template, joinWith) {
    return files
    .map(file => template.replace('%s', file))
    .join(joinWith);
};

/* Reads files in a folder and returns them in a list. */
const getFiles = function (directory) {
    return new Promise(function (resolve, reject) {
        readdir(directory, function (error, files) {
            if (error) {
                reject(error);
            } else {
                resolve(files);
            }
        });
    });
};

/* Gulp helper to replace a string in a file. */
const replaceInFile = function (file, destination, what, replacement) {
    return gulp
    .src(file)
    .pipe(tasks.replace(what, replacement))
    .pipe(gulp.dest(destination));
};

/* Copies all vendor css files to the web folder. */
gulp.task('copy-vendor-css', function (vendorFiles, outputFileName, destinationFolder) {
    return function () {
        return gulp
        .src(vendorCss)
        .pipe(tasks.concat(vendorCssFile))
        .pipe(gulp.dest(cssDestinationFolder));
    };
});

/* Copies all of our own css files to the web folder. */
gulp.task('copy-vendor-css', function (vendorFiles, outputFileName, destinationFolder) {
    return function () {
        return gulp
        .src(sourceCssFolder + '/**/*.css', { base : sourceCssFolder })
        .pipe(gulp.dest(cssDestinationFolder));
    };
});

/* Takes all assets files and places them into the web root. */
gulp.task('copy-web-app', function () {
    const files = tasks.glob.sync(sourceWebAppFolder + '/**/*.js');

    return tasks.browserify({ entries : files })
    .bundle()
    .pipe(source(webAppDestinationFileName))
    .pipe(gulp.dest(webAppDestinationFolder));
});

/* Adds the index HTML template. */
gulp.task('copy-templates', function () {
    return gulp
    .src(indexHtmlTemplate, { base : parent(indexHtmlTemplate) })
    .pipe(gulp.dest(indexHtmlDestinationFolder));
});

/* Adds CSS files to the index.html template. */
gulp.task('insert-css', function () {
    return getFiles(sourceCssFolder)
    .then(function (files) {
        replaceInFile(
            indexHtmlTemplate,
            indexHtmlDestinationFolder,
            '%STYLES%',
            filesListToString(
                files,
                '<link href="/'
                + cssUrl
                + '%s" rel="stylesheet" type="text/css" />',
                '\n        '
            )
        );
    });
});

/* Adds JS files to the index.html template. */
gulp.task('insert-js', function () {
    return replaceInFile(
        indexHtmlTemplate,
        indexHtmlDestinationFolder,
        '%SCRIPTS%',
        (
            '<script type="text/javascript" src="'
            + webAppDestinationFileName + '">'
            + '</script>'
        )
    );
});

/* Processes template files and saves them in the root. */
gulp.task('process-templates', function () {
    return tasks.runSequence('copy-templates', 'insert-css', 'insert-js');
});

/* Task that puts assets in the web folder and transforms them. */
gulp.task('create-root', ['copy-vendor-css', 'copy-web-app', 'process-templates']);
