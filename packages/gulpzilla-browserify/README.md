# gulpzilla-browserify
gulpzilla-browserify adds:
```
$ gulp browserify
```
```
$ gulp watch-browserify
```

## Install

    $ npm install gulpzilla-browserify --save-dev   
    
## Configuration          

Add this in your `gulpfile.js`:

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
