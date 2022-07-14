const FILES_TO_CACHE = [
  './index.html',
  './css/styles.css',
  './js/idb.js',
  './js/index.js',
];

const APP_PREFIX = 'budgetTracker-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

// listens for the install phase of the service worker
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Storing files to cache: ' + CACHE_NAME);
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// listens for the activation phase of the service worker
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      let cacheKeepList = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX);
      });
      cacheKeepList.push(CACHE_NAME);

      return Promise.all(
        keyList.map(function (key, index) {
          if (cacheKeepList.indexOf(key) === -1) {
            console.log('Deleting cache: ' + keyList[index]);
            return caches.delete(keyList[index]);
          }
        })
      );
    })
  );
});

// listen for the fetch event.
self.addEventListener('fetch', function (e) {
  console.log('Fetch request: ' + e.request.url);
  //intercept the http request and respond with the cached file if it exist. Else, fetch the http file
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) {
        console.log('Responding with cached file: ' + e.request.url);
        return request;
      } else {
        console.log('File not cached. Fetching ' + e.request.url);
        return fetch(e.request);
      }
    })
  );
});
