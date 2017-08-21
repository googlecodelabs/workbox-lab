const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');
// const wbBuild = require('workbox-build');

gulp.task('clean', () => del(['.tmp', 'build/*', '!build/.git'], {dot: true}));

gulp.task('copy', () =>
  gulp.src([
    'app/**/*',
  ]).pipe(gulp.dest('build'))
);

gulp.task('default', ['clean'], cb => {
  runSequence(
    'copy',
    // 'build-sw',
    cb
  );
});

gulp.task('watch', function() {
  gulp.watch('app/**/*', ['default']);
});
