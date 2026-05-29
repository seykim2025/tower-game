importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

self.addEventListener('install', (event) => {
  self.skipWaiting();
  // Pre-cache index.html
  event.waitUntil(
    caches.open('html-cache').then((cache) => cache.add('./index.html'))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Cache HTML pages using NetworkFirst (returns cache when offline)
workbox.routing.registerRoute(
  ({request}) => request.destination === 'document' || request.mode === 'navigate',
  new workbox.strategies.NetworkFirst({
    cacheName: 'html-cache',
    matchOptions: {
      ignoreSearch: true
    }
  })
);

// Cache assets using StaleWhileRevalidate
workbox.routing.registerRoute(
  ({request}) => request.destination === 'script' || 
                 request.destination === 'style' || 
                 request.destination === 'font' || 
                 request.destination === 'image' ||
                 request.destination === 'audio' ||
                 request.destination === 'video',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'assets-cache',
  })
);

// PWA Builder compliance
self.addEventListener("push", () => {});
self.addEventListener("sync", () => {});
self.addEventListener("periodicsync", () => {});
