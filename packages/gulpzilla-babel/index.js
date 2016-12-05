var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var invariant = require('invariant');

module.exports = function(gulp, opts){
    var config = opts.config;

    invariant(
        config.js && typeof config.js === 'object'
            && config.js.srcDir && config.js.target
            && config.js.distDir && config.js.distFilename,
        '{srcDir, target, distDir, distFilename} in config[\'js\'] is required.');

    gulp.task('default', function () {
        return gulp.src(config.js.target)
            .pipe(sourcemaps.init())
            .pipe(babel({sourceRoot: config.js.srcDir}))
            .pipe(concat(config.js.distFilename))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(config.js.distDir));
    });
};
