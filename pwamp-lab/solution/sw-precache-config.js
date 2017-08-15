/*
 * Copyright 2017 Google Inc.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = {
  staticFileGlobs: [
    'img/**.*',
    'offline.html',
    'shell.html',
    'js/**.js'
  ],
  runtimeCaching: [{
    urlPattern: '*',
    handler: (request, values, options) => {
      // If this is NOT a navigate request, such as a request for
      // an image, use the cacheFirst strategy.
      if (request.mode !== 'navigate') {
        return toolbox.cacheFirst(request, values, options);
      }

      return caches.match('/shell.html', {ignoreSearch: true}); 
    }
  }, {
    urlPattern: /cdn\.ampproject\.org/,
    handler: 'fastest'
  }],
  importScripts: ['service-worker-import.js']
};