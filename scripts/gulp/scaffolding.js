const gulp    = require('gulp');
const path    = require('path');
const readdir = require('recursive-readdir');
const source  = require('vinyl-source-stream');

const tasks   = {
    replace:     require('gulp-replace-task'),
    runSequence: require('run-sequence'),
    notify:      require('gulp-notify'),
    concat:      require('gulp-concat'),
    browserify:  require('browserify'),
    babelify:    require('babelify'),
    glob:        require('glob')
};

const vendorCss = [
];

/* Paths and file names. */
const indexHtmlTemplate          = 'source/templates/index.html';
const sourceCssFolder            = 'source/assets/css/';
const indexHtmlDestionationFile  = 'web/index.html';
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
    .src(file, { base: parent(file) })
    .pipe(tasks.replace(what, replacement))
    .pipe(gulp.dest(destination));
};

/* Copies all vendor css files to the web folder. */
gulp.task('copy-vendor-css', function (vendorFiles, outputFileName, destinationFolder) {
	if (vendorCss.length) {
	    return gulp
	    .src(vendorCss)
	    .pipe(tasks.concat(vendorCssFile))
	    .pipe(gulp.dest(cssDestinationFolder));
	} else {
		return Promise.resolve();
	}
});

/* Copies all of our own css files to the web folder. */
gulp.task('copy-css', function (vendorFiles, outputFileName, destinationFolder) {
    return gulp
    .src(sourceCssFolder + '/**/*.css', { base: sourceCssFolder })
    .pipe(gulp.dest(cssDestinationFolder));
});

/* Takes all assets files and places them into the web root. */
gulp.task('copy-web-app', function () {
    const files = tasks.glob.sync(sourceWebAppFolder + '/**/*.js');

    return tasks.browserify({ entries: files })
    .transform(tasks.babelify.configure({ presets: ['es2015'] }))
    .bundle()
    .on('error', error => {
        console.log(
            'Could not run browserify !\n',
            error.message, error.stack
        );

        this.emit('end');
    })
    .on('error', tasks.notify.onError('Could not browserify your code !'))
    .pipe(source(webAppDestinationFileName))
    .pipe(gulp.dest(webAppDestinationFolder))
    .on('error', () => this.emit('end'));
});

/* Adds the index HTML template. */
gulp.task('copy-templates', function () {
    return gulp
    .src(indexHtmlTemplate, { base: parent(indexHtmlTemplate) })
    .pipe(gulp.dest(indexHtmlDestinationFolder));
});

/* Adds app files to the index.html template. */
gulp.task('insert-app', function () {
    return getFiles(sourceCssFolder)
    .then(function (files) {
        replaceInFile(
            indexHtmlDestionationFile,
            indexHtmlDestinationFolder, { patterns: [
                {
                    match:       /--STYLES--/,
                    replacement: filesListToString(
                        files.map(file => path.basename(file)).concat(vendorCss.length ? [vendorCssFile] : []),
                        '<link href="/'
                        + cssUrl
                        + '%s" rel="stylesheet" type="text/css" />',
                        '\n        '
                    )
                },
                {
                    match:       /--SCRIPTS--/,
                    replacement: (
                        '<script type="text/javascript" src="'
                        + webAppDestinationFileName + '">'
                        + '</script>'
                    )
                }
            ] }
        );
    });
});

/* Processes template files and saves them in the root. */
gulp.task('process-templates', function () {
    return tasks.runSequence('copy-templates', 'insert-app');
});

/* Task that puts assets in the web folder and transforms them. */
gulp.task('create-root', ['copy-vendor-css', 'copy-css', 'copy-web-app', 'process-templates']);
