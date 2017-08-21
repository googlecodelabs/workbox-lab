module.exports = {
  "globDirectory": "./",
  "globPatterns": [
    "img/**.*",
    "offline.html",
    "index.html",
    "shell.html",
    "js/app.js"
  ],
  "swSrc": "src/sw.js",
  "swDest": "service-worker.js",
  "globIgnores": [
    "./workbox-cli-config.js"
  ]
};
