importScripts('workbox-sw.prod.v1.1.0.js');
importScripts('workbox-background-sync.prod.v1.2.0.js');

const workboxSW = new WorkboxSW();
workboxSW.precache([]);

let bgQueue = new workbox.backgroundSync.QueuePlugin({
  callbacks: {
    replayDidSucceed: async(hash, res) => {
      self.registration.showNotification('Background sync demo', {
        body: 'Events have been updated!'
      });
    }
  }
});

workboxSW.router.registerRoute('/api/add',
  workboxSW.strategies.networkOnly({plugins: [bgQueue]}),
  'POST'
);

workboxSW.router.registerRoute('/api/getAll',
  function() {
    console.log('done');
    return bgQueue.replayRequests().then(() => {
      return fetch('/api/getAll');
    }).catch((err) => {
      throw Error('replayRequests failed');
    });
  }
);
