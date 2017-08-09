const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');
const wbBuild = require('workbox-build');

// gulp.task('default', ['serve']);

// gulp.task('watch', function() {
//   gulp.watch('styles/*.css', ['processCSS']);
//   gulp.watch('js/*.js', ['minify']);
// });

gulp.task('clean', () => del(['.tmp', 'build/*', '!build/.git'], {dot: true}));

gulp.task('copy', () =>
  gulp.src([
    'app/**/*',
  ]).pipe(gulp.dest('build'))
);

gulp.task('build-sw', () => {
  return wbBuild.injectManifest({
    swSrc: 'app/src/sw.js',
    swDest: 'build/service-worker.js',
    globDirectory: 'app',
    staticFileGlobs: [
      'index.html',
      'style/*.css',
      'js/*.js',
    ]
  })
  .catch((err) => {
    console.log('[ERROR] This happened: ' + err);
  });
});

gulp.task('default', ['clean'], cb => {
  runSequence(
    'copy',
    'build-sw',
    cb
  );
});
