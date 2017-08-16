importScripts('workbox-sw.prod.v1.1.0.js');

const workboxSW = new self.WorkboxSW();
workboxSW.precache([]);

workboxSW.router.registerRoute(/cdn\.ampproject\.org/,
  workboxSW.strategies.staleWhileRevalidate()
);

workboxSW.router.registerNavigationRoute('/shell.html');
