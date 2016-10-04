# gulpzilla-disc

This adds 1 gulp command to [gulpzilla](https://github.com/blacktangent/gulpzilla):

1. `gulp disc`

## Install

```
$ npm install --save-dev gulpzilla-disc
```

## Configuration
In `gulpfile.js`:

```
const gulp = gulpzilla({
  disc: {
    outputPath: __dirname + '/disc.html' /* the output file path */
  }
});
```
