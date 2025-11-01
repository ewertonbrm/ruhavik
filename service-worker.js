const CACHE_NAME = 'android-authority-pwa-cache-v1';
const urlsToCache = [
    '/androidauthority/',
    '/androidauthority/index.html',
    '/androidauthority/manifest.json',
    '/androidauthority/icons/icon-192x192.png',
    '/androidauthority/icons/icon-512x512.png',
    '/androidauthority/icons/loading.gif' // <-- GIF de carregamento adicionado aqui
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Arquivos críticos cacheados.');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
