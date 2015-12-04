var sequence = require('run-sequence');

module.exports = function(gulp, opts, $){
    var config = opts.config;

    gulp.task('bower-copy', function(cb){
        if(config.sass.bowerCopy)
            sequence('bower', config.sass.bowerCopy, cb);
        else {
            sequence('bower', cb);
        }
    });

    gulp.task('bower', function(){
        return $.bower({
            cwd: config.sass.bowerDir
        });
    });
}
