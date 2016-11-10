var sequence = require('run-sequence');
var color = require('cli-color');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var babelify = require('babelify');
var watchify = require('watchify');
var row_flow = require('browserify-row-flow');

var util = require('gulp-util');

module.exports = function(gulp, opts){
    var config = opts.config;

    function build(watch, watchCallback){
        var b = browserify({
            debug: config.debug || false,
            cache: {},
            packageCache: {},
            paths: [config.js.srcDir],
            extensions: ['js', '.react.js', 'jsx']
        });
        b.transform("babelify", {
            sourceMapsAbsolute: !!config.debug,
            sourceMaps: !!config.debug,
            retainLines: !!config.debug,
            compact: !config.debug,
            minified: !config.debug,
            comments: !!config.debug,
        });
        b = watch ? watchify(b) : b;
        b.add(config.js.target);

        function rebundle(){
            return b.bundle()
            .pipe(source(config.js.distFilename || 'bundle.js'))
            .pipe(gulp.dest(config.js.distDir));
        }

        b.on('update', function(path){
            util.log(color.yellowBright('rebundling...'));
            return rebundle();
        });
        b.on('time', function(time){
            util.log("Finished "+color.yellowBright("rebundle()")+" after "+color.magenta(time+" ms"));
            watchCallback();
        });

        return rebundle();
    }

    gulp.task('browserify', function(){
        return build(false);
    });

    gulp.task('watch-browserify', ['browserify'], function() {
        return build(true, function(){
            hightlight('Finished bundling for \'watch-js\'');
        });
    });

    function hightlight(prefix){
        var c = ['bgRed', 'bgGreen', 'bgYellow', 'bgBlue', 'bgMagenta', 'bgCyan', 'bgWhite'];
        var r = Math.floor(Math.random() * 7);
        var e = color.black[c[r]](prefix);
        util.log(e);
    }
}
