module.exports = {
  "globDirectory": "app/",
  "globPatterns": [
    "style/main.css",
    "index.html",
    "js/idb-promised.js",
    "js/main.js",
    "images/*.jpg",
    "images/**/*.svg",
    "manifest.json"
  ],
  "swSrc": "app/src/sw.js",
  "swDest": "app/service-worker.js",
  "globIgnores": [
    "../workbox-cli-config.js"
  ]
};
