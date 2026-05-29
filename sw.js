const CACHE_NAME = "tower-game-cache-v2";

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "./",
        "./index.html",
        "./manifest.json",
        "./assets/favicon-Cavh6cUP.png"
      ]).catch(err => console.error("Cache addAll error:", err));
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || !event.request.url.startsWith("http")) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === "basic") {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        }
        return networkResponse;
      }).catch(() => {
        if (event.request.mode === "navigate" || (event.request.headers.get("accept") && event.request.headers.get("accept").includes("text/html"))) {
          return caches.match("./index.html").then((html) => {
            return html || new Response("<html><body>Offline</body></html>", { status: 200, headers: { "Content-Type": "text/html" } });
          });
        }
        return new Response("", { status: 200 });
      });
    })
  );
});

// PWA Builder compliance for Push Notifications
self.addEventListener("push", (event) => {});
// PWA Builder compliance for Background Sync
self.addEventListener("sync", (event) => {});
// PWA Builder compliance for Periodic Background Sync
self.addEventListener("periodicsync", (event) => {});
