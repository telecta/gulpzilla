var invariant = require('invariant');
var path = require('path');
var args = require('yargs').argv,
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    opts = {args: args};

module.exports = function(config){
    invariant(
        config && typeof config === 'object',
        'gulpzilla: function argument `config` is required.');

    opts.config = config;

    require('./gulp/browserify')(gulp, opts, $);
    invariant(
        config.js && typeof config.js === 'object'
            && config.js.srcDir && config.js.target
            && config.js.distDir && config.js.distFilename,
        '{srcDir, target, distDir, distFilename} in config[\'js\'] is required.');

    gulp.task('default',['browserify']);
    gulp.task('watch', ['watch-browserify']);

    if(config.sass) {
        invariant(
            config.sass && typeof config.sass === 'object'
                && config.sass.srcDir && config.sass.target
                && config.sass.distDir && config.sass.distFilename && config.sass.loadPaths,
            '{srcDir, target, distDir, distFilename, loadPaths} in config[\'sass\'] is required.');

        require('./gulp/bower-copy')(gulp, opts, $);
        require('./gulp/sass')(gulp, opts, $);

        gulp.task('default',['sass', 'browserify']);
        gulp.task('watch', ['watch-browserify', 'watch-sass']);
    }

    if(config.jest) {
        require('./gulp/jest')(gulp, opts, $);
        invariant(
            config.jest && typeof config.jest === 'object'
                && config.jest.srcDir,
            '{srcDir} in config[\'jest\'] is required.');

        gulp.task('test', ['jest']);
        gulp.task('test-one', ['watch-jest']);
    }

    if(config.disc) {
        require('./gulp/disc')(gulp, opts, $);
    }

    return gulp;
}
