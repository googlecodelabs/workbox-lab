const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');
const wbBuild = require('workbox-build');

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
      'style/main.css',
      'index.html',
      'js/idb-promised.js',
      'js/main.js',
      'images/*.jpg',
      'images/**/*.svg',
      'manifest.json'
    ]
  }).catch((err) => {
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

gulp.task('watch', function() {
  gulp.watch('app/js/main.js', ['default']);
  gulp.watch('app/src/sw.js', ['default']);
  gulp.watch('app/index.html', ['default']);
});
