var sequence = require('run-sequence');

module.exports = function(gulp, opts, $){
    var config = opts.config;

    if(config.sass.bowerCopy) {
        gulp.task('bower-copy', function(cb){
            if(config.sass.bowerCopy)
                sequence('bower', config.sass.bowerCopy, cb);
            else {
                sequence('bower', cb);
            }
        });
    }

    if(config.sass.bowerDir) {
        gulp.task('bower', function(){
            return $.bower({
                cwd: config.sass.bowerDir
            });
        });
    }
}
