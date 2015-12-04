# gulpzilla
The gulp files to shaaaare across your code base

It consists of gulpies:  
- `gulp/browserify.js`    
- `gulp/sass.js`  
- `gulp/bower.js`   
- `gulp/jest.js`

`babel` is used in both `gulp/browserify` and `gulp/jest`

## Usage
Install 

    $ npm install gulpzilla --save-dev                 
    
Create `gulpfile.js`
	
	var config; // = {...see Conguration};
    var gulp = require('gulpzilla')(config);
    
Add `npm run jest` script in `package.json`

```
 "scripts": {
    "test": "eslint src/js/ && npm run jest",
    "jest": "NODE_PATH=src/js:node_modules jest"
  },
  "jest": {
    "scriptPreprocessor": "<rootDir>/node_modules/babel-jest",
    "testPathDirs": [
      "<rootDir>/__tests__"
    ],
    "testPathIgnorePatterns": [
      "pending"
    ],
    "unmockedModulePathPatterns": [
      "node_modules",
      "utils",
      "constants",
      "__mocks__"
    ],
    "modulePathIgnorePatterns": []
  },
```

Run in Terminal

    $ gulp # default tasks to run browserify, bower, compile sass 
    $ gulp watch # tasks to watch changes js/sassand to compile
    $ gulp test # tasks to run all test suites
    $ gulp test-one # tasks to run one test suite with related changed file


### Configuration

    var config = {
    	debug: true, // browserify debug mode (for sourcemaps)
    	publicDir: './public', // public directory to serve assets 
    }

    config.js = {
        srcDir: './src/js', // javascript source directory
        target: './src/js/index.js', // entry point for browserify
        
        distDir: './public/js', // directory for bundled javascript
        distFilename: 'bundle.js' // filename for bundled javascript
    }
    
    config.sass = {
        srcDir: './src/sass', // sass source directory
        target: './src/sass/index.js', // entry point for sass
        
        distDir: './public/css', // directory for bundled css
        distFilename: 'bundle.css', // filename for bundled css
        
        bowerCopy: ['fontawesome'], // array of gulp copy task after bower
        bowerDir: './vendor' // directory where bower.json is
    }
    
    config.jest = {
        srcDir: './__tests__', // test files directory
        noStackTrace: true // jest should/not print stack trace on error
    }