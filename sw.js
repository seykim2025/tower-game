const CACHE_NAME = "tower-game-cache-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "./",
        "./index.html",
        "./manifest.json"
      ]).catch(err => console.error("Cache addAll error:", err));
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (!event.request.url.startsWith('http')) return;
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).then((fetchResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      }).catch(() => {
        if (event.request.mode === 'navigate' || (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html'))) {
          return caches.match('./index.html').then((cachedHtml) => {
            return cachedHtml || new Response("<html><body>Offline</body></html>", { status: 200, headers: { "Content-Type": "text/html" } });
          });
        }
        return new Response("", { status: 200, statusText: "OK" });
      });
    })
  );
});

// PWA Builder compliance for Push Notifications
self.addEventListener("push", (event) => {
  console.log("Push received", event);
});

// PWA Builder compliance for Background Sync
self.addEventListener("sync", (event) => {
  console.log("Sync event fired", event);
});

// PWA Builder compliance for Periodic Background Sync
self.addEventListener("periodicsync", (event) => {
  console.log("Periodic sync event fired", event);
});
