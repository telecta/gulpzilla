var open = require('opener')
var disc = require('disc');
var fs = require('fs');

var browserify = require('browserify');
var babelify = require('babelify');

module.exports = function(gulp, opts, $){
    var config = opts.config;

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

        return b.bundle()
                .pipe(disc())
                .pipe(fs.createWriteStream(__dirname + '/disc.html'))
                .once('close', function() {
                    open(__dirname + '/disc.html')
                });
    }

    gulp.task('disc', function(){
        return disc();
    });
}
