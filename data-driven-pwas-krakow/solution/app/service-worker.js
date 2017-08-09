importScripts('workbox-sw.prod.v1.1.0.js');
importScripts('workbox-background-sync.prod.v1.2.0.js');

const workboxSW = new WorkboxSW();
workboxSW.precache([
  {
    "url": "style/main.css",
    "revision": "41ab768361c661c628bb4e42f3dc04f1"
  },
  {
    "url": "index.html",
    "revision": "1744ec660baa209c08138ea8c350ff44"
  },
  {
    "url": "js/idb-promised.js",
    "revision": "d2ae9f6bf666b5da4f4b221dec8defa1"
  },
  {
    "url": "js/main.js",
    "revision": "bd67f78e41902c9b8d1db333cf1b67d0"
  }
]);

workboxSW.router.registerRoute('/api/getAll',
  function() {
    console.log('done');
    fetch('/api/getAll');
  }
);

let bgQueue = new workbox.backgroundSync.QueuePlugin({
  callbacks: {
    replayDidSucceed: async(hash, res) => {
      self.registration.showNotification('Background sync demo', {
        body: 'HEEYYYY'
      });
    }
  }
});

workboxSW.router.registerRoute('/api/add',
  workboxSW.strategies.networkOnly({plugins: [bgQueue]}),
  'POST'
);

self.addEventListener('message', event => {
  console.log(event);
  bgQueue.replayRequests();
});
