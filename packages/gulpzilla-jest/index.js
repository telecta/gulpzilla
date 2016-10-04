var npm = require('npm');
var color = require('cli-color');
var fs = require('fs');
var invariant = require('invariant');
var util = require('gulp-util');

module.exports = function(gulp, opts){
    var config = opts.config;
    var prev = "";

    invariant(
        config.jest && typeof config.jest === 'object'
            && config.jest.srcDir,
        '{srcDir} in config[\'jest\'] is required.');

    gulp.task('watch-jest', function() {
        var jestWithPath = function(file){
            var path = file.path;
            if(!file.path.match(config.jest.srcDir)
                && file.path.match(config.js.srcDir)){
                var parts = file.path.split(config.js.srcDir);
                //console.log(parts);
                var name = parts[1].replace('.js', '-test.js');
                path = parts[0]+'__tests__'+name;
            }
            else if(file.path.match('__mocks__')){
                path = prev;
            }

            var filename = path.split('/').slice(-1);
            var jest = function(){
                hightlight('Starting jest for ' + filename);
                prev = path;
                npm.load(function (er, npm) {
                    var command = config.jest.noStackTrace ? ['jest', path, '--noStackTrace'] : ['jest', path];
                    npm.commands.run(
                        command,
                        function(){
                            hightlight("Finished jest for " + filename, true);
                        });
                });
            }

            fs.exists(path, function(yes){
                if(!yes) util.log(color.black['bgRed']('No test found in ' + path));
                else jest();
            });
        };

        gulp.watch([config.jest.srcDir+'/**/*-test.js', config.js.srcDir+'/**/*.js']).on('change', jestWithPath);
    });

    gulp.task('jest', ['npm-run-jest'], function() {
       gulp.watch(
            [config.jest.srcDir+'/**/*-test.js', config.js.srcDir+'/**/*.js'],
            ['npm-test']);
    });

    gulp.task('npm-run-jest', function(){
        npm.load(function (er, npm) {
            npm.commands.run(['jest', config.jest.noStackTrace ? '--noStackTrace' : ''], function(){});
        });
    });

    var prevColor = null;
    function hightlight(prefix, usePrevColor){
        var c = ['bgRed', 'bgGreen', 'bgYellow', 'bgBlue', 'bgMagenta', 'bgCyan', 'bgWhite'];
        var r = Math.floor(Math.random() * 7);
        var e = usePrevColor && prevColor? prevColor(prefix) : color.black[c[r]](prefix);
        util.log(e);
        prevColor = color.black[c[r]];
    }
}
