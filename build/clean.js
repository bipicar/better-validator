const gulp = require('gulp');
const del = require('del');

gulp.task('clean:js', function () {
  return del([
    'js/**/*'
  ]);
});

gulp.task('clean', ['clean:js']);
