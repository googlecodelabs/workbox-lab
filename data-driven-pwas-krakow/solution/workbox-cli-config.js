module.exports = {
  "globDirectory": "app/",
  "globPatterns": [
    "style/main.css",
    "index.html",
    "pages/offline.html",
    "pages/404.html",
    "js/idb-promised.js",
    "js/main.js"
    // TODO whole app shell - fonts & image & icon
    // TODO want a pattern in here though to demonstrate
    // TODO index.html? staleWhileRevalidate? and/or cache timeout!
  ],
  "swSrc": "app/src/sw.js",
  "swDest": "app/service-worker.js",
  "globIgnores": [
    "../workbox-cli-config.js"
  ]
};
