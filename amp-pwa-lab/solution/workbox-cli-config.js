module.exports = {
  "globDirectory": "./",
  "globPatterns": [
    "index.html",
    "img/**.*",
    "offline.html",
    "shell.html",
    "js/**.js"
  ],
  "swSrc": "sw.js",
  "swDest": "service-worker.js",
  "globIgnores": [
    "./workbox-cli-config.js"
  ]
};
