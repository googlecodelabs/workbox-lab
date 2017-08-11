// importScripts('workbox-sw.prod.v1.1.0.js');
// importScripts('workbox-background-sync.prod.v1.2.0.js');
//
// const workboxSW = new WorkboxSW();
// workboxSW.precache([]);
//
// workboxSW.precache([
//   'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700'
// ]);
//
// let bgQueue = new workbox.backgroundSync.QueuePlugin({
//   callbacks: {
//     replayDidSucceed: async(hash, res) => {
//       self.registration.showNotification('Background sync demo', {
//         body: 'Events have been updated!'
//       });
//     }
//   }
// });
//
// workboxSW.router.registerRoute('/api/add',
//   workboxSW.strategies.networkOnly({plugins: [bgQueue]}), 'POST'
// );
//
// workboxSW.router.registerRoute('/api/getAll', () => {
//     return bgQueue.replayRequests().then(() => {
//       return fetch('/api/getAll');
//     }).catch(err => {
//       return err; // we will handle this error in main.js
//     });
//   }
// );
