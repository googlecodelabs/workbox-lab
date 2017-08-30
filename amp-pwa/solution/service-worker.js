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

const workboxSW = new self.WorkboxSW();
workboxSW.precache([
  {
    "url": "img/amp_logo_white.svg",
    "revision": "ff1c832025faf6ebb36c3385ee1434c5"
  },
  {
    "url": "offline.html",
    "revision": "8687ef36f6a63cb90d8dfd95517f9501"
  },
  {
    "url": "index.html",
    "revision": "ea2af8509d71f621a1b2071e364ae9be"
  },
  {
    "url": "icons/icon-128x128.png",
    "revision": "931389ae9534e0116433ba245d7ccbd2"
  },
  {
    "url": "icons/icon-144x144.png",
    "revision": "fcbfa0e31cbe00db1e7e333b0b4085a9"
  },
  {
    "url": "icons/icon-152x152.png",
    "revision": "15c7666e3262c9a01198cc97e3dfeee2"
  },
  {
    "url": "icons/icon-192x192.png",
    "revision": "15bbfa9c5eda938db344c081acc21160"
  },
  {
    "url": "icons/icon-384x384.png",
    "revision": "435fa69761cfca1bdb521ee34e0b8dd7"
  },
  {
    "url": "icons/icon-512x512.png",
    "revision": "85456ca00d684bfe60a52c57b3416b8b"
  },
  {
    "url": "icons/icon-72x72.png",
    "revision": "3fe1e591c8f138f676c0b4d3f9eb58de"
  },
  {
    "url": "icons/icon-96x96.png",
    "revision": "3c0ded96a9d6cde35894280216bfb5d9"
  },
  {
    "url": "shell.html",
    "revision": "a9c2efe08f1060ee956924881932cf87"
  },
  {
    "url": "js/app.js",
    "revision": "87d8f3c46c5d3c937f98fd5edc511c77"
  },
  {
    "url": "/",
    "revision": "d0e6e1bff5558fce0e8845f7f19f006a"
  }
]);

workboxSW.router.registerRoute(/\/(.*)\.(?:js|css|png|gif|jpg|svg)$/,
  workboxSW.strategies.cacheFirst()
);

workboxSW.router.registerRoute(/\/$|\.html$/, args => {
  return caches.match('/shell.html', {ignoreSearch: true});
});

workboxSW.router.registerRoute(/\/(.*)?shell=false$/,
  workboxSW.strategies.cacheFirst()
);

workboxSW.router.registerRoute(/(.*)cdn\.ampproject\.org(.*)/,
  workboxSW.strategies.staleWhileRevalidate()
);
