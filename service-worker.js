const CACHE_NAME = 'ruhavik-pwa-cache-v1'; // Nome do cache atualizado
const urlsToCache = [
    '/ruhavik/',
    '/ruhavik/index.html',
    '/ruhavik/manifest.json',
    '/ruhavik/icons/icon-192x192.png',
    '/ruhavik/icons/icon-512x512.png',
    '/ruhavik/icons/loading.gif'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Arquivos críticos do Ruhavik cacheados.');
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
