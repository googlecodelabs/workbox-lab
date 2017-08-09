importScripts('workbox-sw.prod.v1.1.0.js');
importScripts('workbox-background-sync.prod.v1.2.0.js');

const workboxSW = new WorkboxSW();
workboxSW.precache([
  {
    "url": "index.html",
    "revision": "abc2b2513ef886f6e27a64ac10c38399"
  },
  {
    "url": "style/main.css",
    "revision": "9ed521f9376d971a0ee67430d282d3dd"
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
