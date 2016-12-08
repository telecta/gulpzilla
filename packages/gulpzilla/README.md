# gulpzilla
Gulpzilla adds `gulp [commands]` to your [gulp](http://gulpjs.com/) setup.

In packages, we have include:
- [gulpzilla-browserify](https://github.com/blacktangent/gulpzilla/tree/master/packages/gulpzilla-browserify)
- [gulpzilla-sass](https://github.com/blacktangent/gulpzilla/tree/master/packages/gulpzilla-sass)  
- [gulpzilla-jest](https://github.com/blacktangent/gulpzilla/tree/master/packages/gulpzilla-jest)  
- [gulpzilla-disc](https://github.com/blacktangent/gulpzilla/tree/master/packages/gulpzilla-disc)  
- or your own gulpzilla-[setup]

Refer to each individual gulpzilla-[setup] package to see what it enables. 

## Install

    $ npm install gulpzilla --save-dev   
    
## Usage          

Add this in your `gulpfile.js`:

```
var gulp = require('gulpzilla')({

	/* enable/disable debug mode for browserify */
	debug: process.env.NODE_ENV !== 'production',

	/* `browserify` configuration  
	browserify: {
        srcDir: './src/js', // javascript source directory
        target: './src/js/index.js', // entry point for browserify

        distDir: './public/js', // directory for bundled javascript
        distFilename: 'bundle.js' // filename for bundled javascript
    }
    
    /* more configuration for additional setup: gulpzilla-[setup] */
});
```

Run the gulp setup:

```
$ gulp browserify 
```

