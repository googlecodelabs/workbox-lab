importScripts('workbox-sw.prod.v1.1.0.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const workboxSW = new self.WorkboxSW();
workboxSW.precache([
  {
    "url": "index.html",
    "revision": "cee5c69370a160e169214195abcf0b5a"
  },
  {
    "url": "img/amp_logo_white.svg",
    "revision": "ff1c832025faf6ebb36c3385ee1434c5"
  },
  {
    "url": "offline.html",
    "revision": "4e7d091cb4b6fcf85616e35ddda82bd2"
  },
  {
    "url": "shell.html",
    "revision": "c35261613b220f3c8c4c3c5a57347144"
  },
  {
    "url": "js/app.js",
    "revision": "3aaaaa22f998ed910d6ac352fa4935b2"
  }
]);

workboxSW.router.registerNavigationRoute('/shell.html');
