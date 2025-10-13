const CACHE_NAME = 'eclat-de-coco-pos-v2';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './pos.html',
  './manifest.json',
  './script.js',
  './chart.min.js',
  './jspdf.umd.min.js',
  './JsBarcode.all.min.js',
  './Logo.PNG',
  './icon-192.PNG',
  './icon-512.png',
  './service-worker.js'
];

// Install Service Worker and Cache Files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('✅ Files cached successfully!');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Service Worker and Clean Old Cache
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('🧹 Removing old cache:', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch Cached Files
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
