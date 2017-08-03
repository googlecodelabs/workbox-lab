importScripts('workbox-sw.prod.v1.1.0.js');

const workboxSW = new WorkboxSW();
workboxSW.precache([
  {
    "url": "style/main.css",
    "revision": "6025581a4a08a44f84a9e1619451153f"
  },
  {
    "url": "index.html",
    "revision": "5c5bf0f67654479e6bbba3d921dbdf5d"
  },
  {
    "url": "pages/offline.html",
    "revision": "dee79998b660d0694adb0e866695f356"
  },
  {
    "url": "pages/404.html",
    "revision": "d6c818c780246906f6e6d7f97eacd631"
  },
  {
    "url": "js/idb-promised.js",
    "revision": "d2ae9f6bf666b5da4f4b221dec8defa1"
  }
]);

workboxSW.router.registerRoute('https://fonts.googleapis.com/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'googleapis',
    cacheExpiration: {
      maxEntries: 20
    },
    cacheableResponse: {statuses: [0, 200]}
  })
);

workboxSW.router.registerRoute(/\.(?:png|gif|jpg)$/,
  workboxSW.strategies.cacheFirst({
    cacheName: 'images-cache',
    cacheExpiration: {
      maxEntries: 50
    }
  })
);

workboxSW.router.registerRoute('http://weloveiconfonts.com/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'iconfonts',
    cacheExpiration: {
      maxEntries: 20,
      maxAgeSeconds: 7 * 24 * 60 * 60
    },
    cacheableResponse: {statuses: [0, 200]}
  })
);

workboxSW.router.registerRoute('/**/images/icon/*',
  workboxSW.strategies.staleWhileRevalidate({
    cacheName: 'icon-cache',
    cacheExpiration: {
      maxEntries: 20
    }
  })
);

var articleHandler = workboxSW.strategies.networkFirst({
  cacheName: 'articles-cache',
  cacheExpiration: {
    maxEntries: 50
  }
});

workboxSW.router.registerRoute('/**/pages/article*.html', function(event) {
  return articleHandler.handle(event).then(function(response) {
    if (!response) {
      return caches.match('pages/offline.html');
    } else if (response.status === 404) {
      return caches.match('pages/404.html');
    }
    return response;
  });
});

// TODO
workboxSW.router.registerRoute('/js/main.js',
  workboxSW.strategies.networkFirst({
    cacheName: 'logic-cache'
  })
);
