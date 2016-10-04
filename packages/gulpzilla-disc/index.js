var open = require('opener')
var disc = require('disc');
var fs = require('fs');
var invariant = require('invariant');

var browserify = require('browserify');
var babelify = require('babelify');

module.exports = function(gulp, opts, $){
    var config = opts.config;

    invariant(config.js && config.js.srcDir,
        '{srcDir} in config[\'js\'] is required.');

    invariant(config.js && config.js.target,
        '{target} in config[\'js\'] is required.');

    invariant(
        config.disc && typeof config.disc === 'object'
            && config.disc.outputPath,
        '{srcDir} in config[\'disc\'] is required.');

    function disc(){
        var b = browserify({
            debug: true,
            cache: {},
            packageCache: {},
            paths: [config.js.srcDir],
            fullPaths: true
        });
        b.transform("babelify", {
            retainLines: true
        });
        b.add(config.js.target);

        var outputPath = config.disc.outputPath;
        return b.bundle()
                .pipe(disc())
                .pipe(fs.createWriteStream(outputPath))
                .once('close', function() {
                    open(outputPath)
                });
    }

    gulp.task('disc', function(){
        return disc();
    });
}
