const CACHE_NAME = 'daily-schedule-cache-v2'; // Changed cache name to force update
const urlsToCache = [
  'https://vo3pal.github.io/wdasc3asd.github.io/',
  'https://vo3pal.github.io/wdasc3asd.github.io/index.html',
  'https://vo3pal.github.io/wdasc3asd.github.io/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
  'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK43ryN03.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        // Add a try/catch block to gracefully handle failed requests
        return Promise.all(
          urlsToCache.map(url => {
            return cache.add(url).catch(error => {
              console.error(`Failed to cache ${url}: ${error}`);
              return Promise.resolve();
            });
          })
        );
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
