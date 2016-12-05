var color = require('cli-color');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var babelify = require('babelify');
var watchify = require('watchify');

var util = require('gulp-util');
var uglify = require('gulp-uglify');
var invariant = require('invariant');

module.exports = function(gulp, opts){
    var config = opts.config;

    invariant(
        config.browserify && typeof config.browserify === 'object'
            && config.browserify.srcDir && config.browserify.target
            && config.browserify.distDir && config.browserify.distFilename,
        '{srcDir, target, distDir, distFilename} in config[\'browserify\'] is required.');

    function build(watch, watchCallback){
        var b = browserify({
            debug: config.debug || false,
            cache: {},
            packageCache: {},
            paths: [config.browserify.srcDir],
            extensions: ['js', '.react.js', 'jsx']
        });
        b.transform(babelify, {
            sourceMapsAbsolute: !!config.debug,
            sourceMaps: !!config.debug,
            retainLines: !!config.debug,
            compact: !config.debug,
            minified: !config.debug,
            comments: !!config.debug,
            ast: !!config.debug
        });
        b = watch ? watchify(b) : b;
        b.add(config.browserify.target);

        function rebundle(){
            var p = b.bundle()
            .pipe(source(config.browserify.distFilename || 'bundle.js'));

            if(!config.debug){
                p.pipe(buffer())
                .pipe(uglify());
            }

            return p.pipe(gulp.dest(config.browserify.distDir));
        }

        b.on('update', function(path){
            util.log(color.yellowBright('rebundling...'));
            return rebundle();
        });
        b.on('time', function(time){
            util.log('Finished '+color.yellowBright('rebundle()')+' after '+color.magenta(time+' ms'));
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
};
