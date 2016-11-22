const gulp = require('gulp');
require('require-dir')('build');

gulp.task('default', ['build:ts', 'copy']);
