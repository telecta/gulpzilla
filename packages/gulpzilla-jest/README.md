# gulpzilla-jest

This adds 2 gulp commands to [gulpzilla](https://github.com/blacktangent/gulpzilla):

1. `gulp jest`
2. `gulp watch-jest`

## Install

```
$ npm install --save-dev gulpzilla-jest
```

## Requirement

This plugin requires script: `npm run jest`  

In `package.json`:

```
{
  "scripts": {
    "jest": "jest" /* e.g. you can specify NODE_PATH or --[option] here */
  }
}
```

## Configuration
In `gulpfile.js`:

```
const gulp = gulpzilla({
  jest: {
    srcDir: __dirname + '__tests__' // test directory
  }
});
```



## Jest Configuration

Configure jest the usual way explained in their official documentation.  

For example, in `package.json`:

```
{
  "jest": {
    "bail": true,
    "verbose": true,
    "scriptPreprocessor": "<rootDir>/node_modules/babel-jest",
    "testPathDirs": [
      "<rootDir>/__tests__"
    ]
  }
}
```
