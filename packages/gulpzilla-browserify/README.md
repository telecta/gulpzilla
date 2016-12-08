# gulpzilla
Gulpzilla adds `gulp [commands]` to your [gulp](http://gulpjs.com/) setup.

In `gulpzilla v2.x.x`, `gulp jest` and ` gulp sass` are removed from default.   
You can enable them by installing additional setup below:  

- [gulpzilla-sass](https://github.com/blacktangent/gulpzilla-sass)  
- [gulpzilla-jest](https://github.com/blacktangent/gulpzilla-jest)  
- [gulpzilla-disc](https://github.com/blacktangent/gulpzilla-disc)  
- or your own gulpzilla-[setup]

By default, `gulpzilla` has 2 gulp commands ready  
1. `gulp browserify`  
2. `gulp watch-browserify`  

## Install

    $ npm install gulpzilla --save-dev   
    
## Usage          

Add this in your `gulpfile.js`:

```
var gulp = require('gulpzilla')({

	/* enable/disable debug mode for browserify */
	debug: process.env.NODE_ENV !== 'production',

	/* `browserify` configuration  
	js: {
        srcDir: './src/js', // javascript source directory
        target: './src/js/index.js', // entry point for browserify

        distDir: './public/js', // directory for bundled javascript
        distFilename: 'bundle.js' // filename for bundled javascript
    }
    
    /* more configuration for additional setup: gulpzilla-[setup] */
});
```

## Examples
```
$ git clone https://github.com/blacktangent/gulpzilla.git
```

Checkout [examples/frontend](https://github.com/blacktangent/gulpzilla/tree/master/examples/frontend) directory to try out how `gulpzilla` setup is integrated with other setups. e.g. `gulpzilla-jest`, `gulpzilla-sass`, `gulpzilla-disc`