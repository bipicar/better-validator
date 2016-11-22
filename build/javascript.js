const gulp = require('gulp');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('build:ts', ['clean:js'], function() {
  const options = {
    target: 'es6',
    module: 'commonjs',
    moduleResolution: 'node',
    declaration: true
  };

  gulp.src('src/**/*.ts', {base: 'src'})
    .pipe(sourcemaps.init())
    .pipe(typescript(options))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});
