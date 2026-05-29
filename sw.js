const cacheName = 'js13kPWA-v1';
const appShellFiles = [
  './',
  './index.html',
  './manifest.json',
  './mobile-layout.css',
  './toss-bridge.js',
  './assets/index-CRgUAfRE.js',
  './assets/favicon-Cavh6cUP.png',
  './assets/main-bg-4moCKXOc.png',
  './assets/main-loading-CPKvSDCZ.gif',
  './assets/main-modal-bg-Vj09WdUN.png',
  './assets/BlackHanSans-Regular-XAxCrE-R.ttf',
  './assets/wenxue-BRU_-e2p.woff',
  './assets/wenxue-CHof2flc.ttf'
];

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log('[Service Worker] Caching all: app shell and content');
    try {
      await cache.addAll(appShellFiles);
    } catch (err) {
      console.error('[Service Worker] Cache addAll error', err);
    }
  })());
});

self.addEventListener('fetch', (e) => {
  if (!e.request.url.startsWith('http')) return;

  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) { return r; }
    
    try {
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    } catch (error) {
      if (e.request.mode === 'navigate' || (e.request.headers.get('accept') && e.request.headers.get('accept').includes('text/html'))) {
        const cachedHtml = await caches.match('./index.html');
        return cachedHtml || new Response('<html><body>Offline</body></html>', { status: 200, headers: { 'Content-Type': 'text/html' }});
      }
      return new Response('', { status: 200, statusText: 'OK' });
    }
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keyList) => {
    return Promise.all(keyList.map((key) => {
      if (key !== cacheName) {
        return caches.delete(key);
      }
    }));
  }));
});

// PWA Builder compliance for Push Notifications
self.addEventListener("push", (event) => {});
// PWA Builder compliance for Background Sync
self.addEventListener("sync", (event) => {});
// PWA Builder compliance for Periodic Background Sync
self.addEventListener("periodicsync", (event) => {});
