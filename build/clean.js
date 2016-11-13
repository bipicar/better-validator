const gulp = require('gulp');
const del = require('del');

gulp.task('clean:js', function () {
  return del([
    'dist/js/**/*'
  ]);
});

gulp.task('clean', ['clean:js']);
