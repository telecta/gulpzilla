var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var invariant = require('invariant');

module.exports = function(gulp, opts){
    var config = opts.config;

    invariant(
        config.babel && typeof config.babel === 'object'
            && config.babel.srcDir
            && config.babel.distDir && config.babel.distFilename,
        '{srcDir, distDir, distFilename} in config[\'babel\'] is required.');

    gulp.task('babel', function () {
        return gulp.src(config.babel.srcDir)
            .pipe(sourcemaps.init())
            .pipe(babel(config.babel.options))
            .pipe(concat(config.babel.distFilename))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(config.babel.distDir));
    });
};
