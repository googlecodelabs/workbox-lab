module.exports = {
  "globDirectory": "app/",
  "globPatterns": [
    "**/*.css",
    "index.html",
    "js/animation.js",
    "pages/404.html",
    "pages/offline.html"
  ],
  "swSrc": "app/src/sw.js",
  "swDest": "app/service-worker.js",
  "globIgnores": [
    "../workbox-cli-config.js"
  ]
};
