const CACHE_NAME = "eclat-de-coco-pos-v1";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./dashboard.html",
  "./sales_invoices.html",
  "./products.html",
  "./inventory.html",
  "./expenses.html",
  "./reports.html",
  "./icon.png",
  "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
];

// Install and cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Serve files from cache
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Update cache when new version is available
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});
