var invariant = require('invariant');
var args = require('yargs').argv,
    gulp = require('gulp'),
    opts = {args: args};

module.exports = function(config){
    invariant(
        config && typeof config === 'object',
        'gulpzilla: function argument `config` is required.');

    opts.config = config;

    invariant(
        config.js && typeof config.js === 'object'
            && config.js.srcDir && config.js.target
            && config.js.distDir && config.js.distFilename,
        '{srcDir, target, distDir, distFilename} in config[\'js\'] is required.');

    require('./gulp/browserify')(gulp, opts);

    Object.keys(config).forEach((plugin) => {
        if(['debug', 'js'].indexOf(plugin) > -1) return;
        require('gulpzilla-'+plugin)(gulp, opts)
    });

    return gulp;
}
