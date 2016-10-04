# gulpzilla-jest

This adds 2 gulp commands to [gulpzilla](https://github.com/blacktangent/gulpzilla):

1. `gulp jest`
2. `gulp watch-jest`

## Install

```
$ npm install --save-dev gulpzilla-jest
```

## Configuration
In `gulpfile.js`:

```
const gulp = gulpzilla({
  jest: {
    srcDir: __dirname + '__tests__' /* the test source code */
  }
});
```

## Requirement

This plugin requires additional script defined: `npm run jest`  

Simply add the script as shown below, in `package.json`:

```
{
  "scripts": {
    "jest": "jest" /* e.g. you can specify NODE_PATH or --[option] here */
  }
}
```

## Jest Configuration

As `jest-cli` is a `peerDependencies`, jest configuration can be done following the usual ways in the official documentation inside `package.json`.  

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
