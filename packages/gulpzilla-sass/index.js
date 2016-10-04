var sequence = require('run-sequence');
var color = require('cli-color');
var invariant = require('invariant');
var rename = require('gulp-rename');
var rubySass = require('gulp-ruby-sass');
var util = require('gulp-util');

module.exports = function(gulp, opts){
    var config = opts.config;

    invariant(
        config.sass && typeof config.sass === 'object'
            && config.sass.srcDir && config.sass.target
            && config.sass.distDir && config.sass.distFilename && config.sass.loadPaths,
        '{srcDir, target, distDir, distFilename, loadPaths} in config[\'sass\'] is required.');


    gulp.task('sass', function(cb){
        sequence('ruby-sass', cb);
    });

    gulp.task('watch-sass', ['css-rebundle'], function() {
        return gulp.watch(
            [config.sass.srcDir+'/**/*.scss'],
            ['css-rebundle']);
    });

    gulp.task('css-rebundle', function(cb){
        sequence('ruby-sass', function(){
            hightlight("Finished bundling for \'watch-sass\'");
            cb.apply(null, arguments);
        });
    });

    gulp.task('ruby-sass', function() {
        return rubySass(config.sass.target,
            {
                bundleExec: config.sass.bundleExec || false,
                sourcemap: config.debug || false,
                loadPath: [
                    config.sass.srcDir
                ].concat(config.sass.loadPaths)
            })
            .pipe(rename(config.sass.distFilename|| 'bundle.css'))
            .pipe(gulp.dest(config.sass.distDir));
    });

    function hightlight(prefix){
        var c = ['bgRed', 'bgGreen', 'bgYellow', 'bgBlue', 'bgMagenta', 'bgCyan', 'bgWhite'];
        var r = Math.floor(Math.random() * 7);
        var e = color.black[c[r]](prefix);
        util.log(e);
    }
}
