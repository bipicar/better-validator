const gulp = require('gulp');

gulp.task('copy', ['clean:js'], function() {

  gulp.src('readme.md')
    .pipe(gulp.dest('dist'));
  gulp.src('package.json')
    .pipe(gulp.dest('dist'));
});
