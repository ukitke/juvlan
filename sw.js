// Service Worker per JUVLAN
const CACHE_NAME = 'juvlan-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/js/main.js',
  '/js/modules/gameEngine.js',
  '/js/modules/chatAnalyzer.js',
  '/js/modules/uiManager.js',
  '/manifest.json'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});