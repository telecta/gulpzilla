var open = require('opener');
var disc = require('disc');
var fs = require('fs');
var invariant = require('invariant');

var browserify = require('browserify');
var babelify = require('babelify');

module.exports = function(gulp, opts, $){
    var config = opts.config;

    invariant(config.disc && config.disc.srcDir,
        '{srcDir} in config[\'disc\'] is required.');

    invariant(config.disc && config.disc.target,
        '{target} in config[\'disc\'] is required.');

    invariant(
        config.disc && typeof config.disc === 'object'
            && config.disc.outputPath,
        '{srcDir} in config[\'disc\'] is required.');

    function discify(){
        var b = browserify({
            debug: true,
            cache: {},
            packageCache: {},
            paths: [config.disc.srcDir],
            fullPaths: true
        });
        b.transform(babelify, {
            retainLines: true
        });
        b.add(config.disc.target);

        var outputPath = config.disc.outputPath;
        return b.bundle()
                .pipe(disc())
                .pipe(fs.createWriteStream(outputPath))
                .once('close', function() {
                    open(outputPath);
                });
    }

    gulp.task('disc', function(){
        return discify();
    });
};
