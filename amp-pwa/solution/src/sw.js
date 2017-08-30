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
workboxSW.precache([]);

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
