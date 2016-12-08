# gulpzilla-sass

This adds 2 gulp commands to [gulpzilla](https://github.com/blacktangent/gulpzilla):

1. `gulp sass`
2. `gulp watch-sass`
3. `gulp css-rebundle`
4. `gulp ruby-sass`

## Install

    $ npm install gulpzilla-sass --save-dev   
    
## Requirement

    $ gem install sass # sass compiler
    
## Configuration          

In `gulpfile.js`:

```
var gulp = require('gulpzilla')({

	/* gulpzilla-browserify configuration */  
	sass: {
        bundleExec: true, // using bundler for sass rubygem
        srcDir: './styles/', // source, top level directory
        target: './styles/v1/components.scss', // entry file
        distDir: 'dist/styles/', // folder for bundled css 
        distFilename: 'bundle.css', // filename for bundled css
        loadPaths: ['./vendor/'] // additional load path for sass import
    }
    
    /* more configuration for additional setup: gulpzilla-[setup] */
});
```
