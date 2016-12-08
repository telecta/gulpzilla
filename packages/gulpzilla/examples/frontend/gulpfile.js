const config = {
    debug: process.env.NODE_ENV !== 'production',

    jest: {
        srcDir: __dirname+'/__tests__'
    },

    browserify: {
        srcDir: __dirname+'/src/js',
        target: __dirname+'/src/js/index.js',

        distDir: __dirname+'/public/js',
        distFilename: 'bundle.js',
    },

    disc: {
        outputPath: __dirname + '/disc.html'
    },

    sass: {
        srcDir: __dirname+'/src/sass',
        target: __dirname+'/src/sass/style.scss',

        distDir: __dirname+'/public/css',
        distFilename: 'bundle.css',

        loadPaths: [ './vendor/bower_components/bootstrap-sass-official/assets/stylesheets'],

        bowerDir: __dirname+'/vendor/'
    }
};

var gulp = require('gulpzilla')(config);

gulp.task('default', ['sass', 'browserify']);
gulp.task('watch', ['watch-sass', 'watch-browserify']);
gulp.task('test', ['jest']);

// gulp.task('bootstrap-icons', function() {
//     return gulp
//     .src(config.sass.bowerDir + '/bootstrap-sass-official/assets/fonts/bootstrap/**.*')
//     .pipe(gulp.dest(config.publicDir+'/fonts'));
// });
//
// gulp.task('bootstrap-js', function() {
//     return gulp
//     .src(config.sass.bowerDir + '/bootstrap-sass-official/assets/javascripts/bootstrap.js')
//     .pipe(gulp.dest(config.browserify.distDir));
// });
