/*
Copyright 2016 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
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

gulp.task('default', ['clean'], cb => {
  runSequence(
    'copy',
    'build-sw',
    cb
  );
});

gulp.task('watch', function() {
  gulp.watch('app/**/*', ['default']);
});

gulp.task('build-sw', () => {
  return wbBuild.injectManifest({
    swSrc: 'app/src/sw.js',
    swDest: 'build/service-worker.js',
    globDirectory: 'build',
    staticFileGlobs: [
      'style/main.css',
      'index.html',
      'js/idb-promised.js',
      'js/main.js',
      'images/**/*.*',
      'manifest.json'
    ],
    templatedUrls: {
      '/': ['index.html']
    }
  }).catch((err) => {
    console.log('[ERROR] This happened: ' + err);
  });
});
