importScripts('workbox-sw.prod.v1.1.0.js');

const workboxSW = new self.WorkboxSW();
workboxSW.precache([
  {
    "url": "img/amp_logo_white.svg",
    "revision": "ff1c832025faf6ebb36c3385ee1434c5"
  }
]);


// tests
workboxSW.router.registerRoute('/*', args => {
 if (args.event.request.mode !== 'navigate') {
   return workboxSW.strategies.cacheFirst({cacheableResponse: {statuses: [0, 200]}}).handle(args);
 }
 return workboxSW.strategies.networkFirst().handle(args).then(response => {
   if (!response) {
     return caches.match('offline.html');
   }
   return response;
 });
});
