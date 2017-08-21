module.exports = {
  "globDirectory": "./",
  "globPatterns": [
    "img/**.*",
    "offline.html",
    "index.html",
    "icons/**.*",
    "shell.html",
    "js/**.js"
  ],
  "swSrc": "src/sw.js",
  "swDest": "service-worker.js",
  "globIgnores": [
    "./workbox-cli-config.js"
  ]
};
