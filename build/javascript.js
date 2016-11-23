const gulp = require('gulp');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('build:ts', ['clean:js'], function() {
  const options = {
    target: 'es6',
    module: 'commonjs',
    moduleResolution: 'node',
    declaration: true,
    strictNullChecks: true
  };

  gulp.src('ts/**/*.ts', {base: 'ts'})
    .pipe(sourcemaps.init())
    .pipe(typescript(options))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('js'));
});
