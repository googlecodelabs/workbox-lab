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
importScripts('workbox-sw.dev.v2.0.0.js');

const workboxSW = new WorkboxSW();
workboxSW.precache([]);

workboxSW.router.registerRoute(/(.*)articles(.*)\.(?:png|gif|jpg)/,
  workboxSW.strategies.cacheFirst({
    cacheName: 'images-cache',
    cacheExpiration: {
      maxEntries: 50
    },
    cacheableResponse: {statuses: [0, 200]}
  })
);

const articleHandler = workboxSW.strategies.networkFirst({
  cacheName: 'articles-cache',
  cacheExpiration: {
    maxEntries: 50
  }
});

workboxSW.router.registerRoute('/pages/article*.html', args => {
  console.log(args);
  return articleHandler.handle(args).then(response => {
    if (!response) {
      return caches.match('pages/offline.html');
    } else if (response.status === 404) {
      return caches.match('pages/404.html');
    }
    return response;
  });
});

const postHandler = workboxSW.strategies.cacheFirst({
  cacheName: 'posts-cache',
  cacheExpiration: {
    maxEntries: 50
  }
});

workboxSW.router.registerRoute('/pages/post*.html', args => {
  return postHandler.handle(args).then(response => {
    if (response.status === 404) {
      return caches.match('pages/404.html');
    }
    return response;
  })
  .catch(function() {
    return caches.match('pages/offline.html');
  });
});
