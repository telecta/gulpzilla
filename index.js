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

    invariant(
        config.js && typeof config.js === 'object'
            && config.js.srcDir && config.js.target
            && config.js.distDir && config.js.distFilename,
        '{srcDir, target, distDir, distFilename} in config[\'js\'] is required.');

    invariant(
        config.sass && typeof config.sass === 'object'
            && config.sass.srcDir && config.sass.target
            && config.sass.distDir && config.sass.distFilename && config.sass.loadPaths,
        '{srcDir, target, distDir, distFilename, loadPaths} in config[\'sass\'] is required.');

    invariant(
        config.sass.bowerDir && config.sass.bowerCopy,
        '{bowerDir, bowerCopy} in config[\'sass\'] is required.');

    invariant(
        config.jest && typeof config.jest === 'object'
            && config.jest.srcDir,
        '{srcDir} in config[\'jest\'] is required.');

    opts.config = config;

    require('./gulp/browserify')(gulp, opts, $);
    require('./gulp/bower-copy')(gulp, opts, $);
    require('./gulp/sass')(gulp, opts, $);
    require('./gulp/jest')(gulp, opts, $);

    require('./gulp/disc')(gulp, opts, $);

    gulp.task('default',['sass', 'browserify']);
    gulp.task('watch', ['watch-browserify', 'watch-sass']);
    gulp.task('test', ['jest']);
    gulp.task('test-one', ['watch-jest']);

    return gulp;
}
