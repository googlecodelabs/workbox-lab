/*
Copyright 2018 Google Inc.

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

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');

const THIRTY_DAYS = 30 * 24 * 60 * 60;

if (workbox) {
  console.log('WORKBOX INITIALIZED, HUMAN');

  workbox.precaching.precacheAndRoute([]);

  const handlers = {
    articleHandler: workbox.strategies.networkFirst({
      cacheName: 'articles-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 50,
        })
      ]
    }),

    iconHandler: workbox.strategies.staleWhileRevalidate({
      cacheName: 'icon-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 5,
        })
      ],
    }),

    imageHandler: workbox.strategies.cacheFirst({
      cacheName: 'images-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 50,
          maxAgeSeconds: THIRTY_DAYS,
        })
      ],
    }),

    offlinePage: response => {
      if (!response) {
        return caches.match('pages/offline.html');
      } else if (response.status === 404) {
        return caches.match('pages/404.html');
      }
      return response;
    }
  }

  // Register route which caches all icons
  workbox.routing.registerRoute(
    /(.*)images\/icon(.*)/,
    args => handlers.iconHandler.handle(args)
  );

  // Register route that caches article images
  workbox.routing.registerRoute(
    new RegExp('(.*)articles(.*)\.(?:png|gif|jpg)'),
    args => handlers.imageHandler.handle(args)
  );

  // Register route that caches artile html
  workbox.routing.registerRoute(
    /(.*)article(.*)\.html/, 
    args => handlers.articleHandler.handle(args).then(response => handlers.offlinePage(response))
  );
} else {
  console.log('CATASTROPHIC ERROR: WORKBOX FAILED TO INITIALIZE');
}
