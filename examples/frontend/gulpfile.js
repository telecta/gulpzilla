const config = {
    debug: true,

    rootDir: __dirname,
    publicDir: __dirname+'/public',

    jest: {
        srcDir: __dirname+'/__tests__',
        noStackTrace: false
    },

    js: {
        srcDir: __dirname+'/src/js',
        target: __dirname+'/src/js/index.js',

        distDir: __dirname+'/public/js',
        distFilename: 'bundle.js',
    },

    sass: {
        srcDir: __dirname+'/src/sass',
        target: __dirname+'/src/sass/style.scss',

        distDir: __dirname+'/public/css',
        distFilename: 'bundle.css',

        loadPaths: [ './vendor/bower_components/bootstrap-sass-official/assets/stylesheets',
        './vendor/bower_components/fontawesome/scss'],

        bowerDir: __dirname+'/vendor/',
        bowerCopy: ['bootstrap-js', 'bootstrap-icons', 'fontawesome']
    }
};

var gulp = require('gulpzilla')(config);

gulp.task('fontawesome', function() {
    return gulp
    .src(config.sass.bowerDir + '/fontawesome/fonts/**.*')
    .pipe(gulp.dest(config.publicDir+'/fonts'));
});

gulp.task('bootstrap-icons', function() {
    return gulp
    .src(config.sass.bowerDir + '/bootstrap-sass-official/assets/fonts/bootstrap/**.*')
    .pipe(gulp.dest(config.publicDir+'/fonts'));
});

gulp.task('bootstrap-js', function() {
    return gulp
    .src(config.sass.bowerDir + '/bootstrap-sass-official/assets/javascripts/bootstrap.js')
    .pipe(gulp.dest(config.js.distDir));
});
