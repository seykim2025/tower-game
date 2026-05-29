const CACHE_NAME = "tower-game-cache-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "./",
        "./index.html",
        "./manifest.json"
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((fetchResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      }).catch(() => {
        // Offline fallback logic here if needed
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
