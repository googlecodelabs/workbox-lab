var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('default', ['serve']);

// gulp.task('watch', function() {
//   gulp.watch('styles/*.css', ['processCSS']);
//   gulp.watch('js/*.js', ['minify']);
// });

gulp.task('serve', [], function() {
  browserSync.init({
    server: './app/',
    port: 3000
  });
  // gulp.watch('styles/*.css', ['processCSS']).on('change', browserSync.reload);
  gulp.watch('**/style/*.css').on('change', browserSync.reload);
  gulp.watch('**/js/*.js').on('change', browserSync.reload);
  gulp.watch('**/*.html').on('change', browserSync.reload);
});
