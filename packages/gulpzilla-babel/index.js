var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var invariant = require('invariant');

module.exports = function(gulp, opts){
    var config = opts.config;

    invariant(
        config.babel && typeof config.babel === 'object'
            && config.babel.srcDir && config.babel.target
            && config.babel.distDir && config.babel.distFilename,
        '{srcDir, target, distDir, distFilename} in config[\'babel\'] is required.');

    gulp.task('babel', function () {
        return gulp.src(config.babel.target)
            .pipe(sourcemaps.init())
            .pipe(babel({sourceRoot: config.babel.srcDir}))
            .pipe(concat(config.babel.distFilename))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(config.babel.distDir));
    });
};
