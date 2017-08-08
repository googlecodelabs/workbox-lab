const gulp = require('gulp');
// const browserSync = require('browser-sync');
const wbBuild = require('workbox-build');

// gulp.task('default', ['serve']);

// gulp.task('watch', function() {
//   gulp.watch('styles/*.css', ['processCSS']);
//   gulp.watch('js/*.js', ['minify']);
// });

gulp.task('build-sw', () => {
  return wbBuild.injectManifest({
    swSrc: 'app/src/sw.js',
    swDest: 'app/service-worker.js',
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

// gulp.task('serve', ['build-sw'], function() {
//   browserSync.init({
//     server: './app/',
//     port: 3000
//   });
//   // gulp.watch('styles/*.css', ['processCSS']).on('change', browserSync.reload);
//   gulp.watch('**/style/*.css').on('change', browserSync.reload);
//   gulp.watch('**/js/*.js').on('change', browserSync.reload);
//   gulp.watch('**/*.html').on('change', browserSync.reload);
// });
