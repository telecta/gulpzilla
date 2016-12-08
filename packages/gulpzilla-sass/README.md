# gulpzilla-jest

This adds 2 gulp commands to [gulpzilla](https://github.com/blacktangent/gulpzilla):

1. `gulp sass`
2. `gulp watch-sass`

## Install

```
$ gem install sass # sass compilation is using sass rubygem
$ npm install --save-dev gulpzilla-sass
```

## Configuration
In `gulpfile.js`:

```
const gulp = gulpzilla({
  sass: {
    srcDir: __dirname+'/src/sass', // sass source files
    target: __dirname+'/src/sass/style.scss', // sass entry point

    distDir: __dirname+'/public/css', // destination directory for compiled css
    distFilename: 'bundle.css', // destination filename for compiled css

    loadPaths: [ './vendor/bower_components/bootstrap-sass-official/assets/stylesheets',
    './vendor/bower_components/fontawesome/scss'], // additional load paths
   }
});
```
