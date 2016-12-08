var invariant = require('invariant');
var args = require('yargs').argv,
    gulp = require('gulp'),
    opts = {args: args};

module.exports = function(config){
    invariant(
        config && typeof config === 'object',
        'gulpzilla: function argument `config` is required.');

    opts.config = config;
    Object.keys(config).forEach((plugin) => {
        if(['debug'].indexOf(plugin) > -1) return;
        require('gulpzilla-'+plugin)(gulp, opts);
    });
    return gulp;
};
