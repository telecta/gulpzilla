# gulpzilla-browserify

This adds 2 gulp commands to [gulpzilla](https://github.com/blacktangent/gulpzilla):

1. `gulp browserify`
2. `gulp watch-browserify`

## Install

    $ npm install gulpzilla-browserify --save-dev   
    
## Configuration          

In `gulpfile.js`:

```
var gulp = require('gulpzilla')({

	/* gulpzilla-browserify configuration */  
	browserify: {
        srcDir: './src/js', // source, top level directory.
        target: './src/js/index.js', // entry point for browserify

        distDir: './public/js', // directory for bundled javascript
        distFilename: 'bundle.js' // filename for bundled javascript
    }
    
    /* more configuration for additional setup: gulpzilla-[setup] */
});
```
