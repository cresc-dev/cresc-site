(function () {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  var host = window.location.hostname;
  var isLocal =
    host === 'localhost' || host === '127.0.0.1' || host === '[::1]';

  // Never run the service worker against dev/preview servers: its
  // cache-first asset strategy serves stale HMR chunks, which makes the
  // dev client fall into an endless full-page reload loop. Also clean up
  // any worker/caches registered by earlier visits.
  if (isLocal) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      registrations.forEach(function (registration) {
        registration.unregister();
      });
    });
    if (window.caches && window.caches.keys) {
      window.caches.keys().then(function (keys) {
        keys.forEach(function (key) {
          window.caches.delete(key);
        });
      });
    }
    return;
  }

  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').catch(function (error) {
      console.warn('PWA registration failed:', error);
    });
  });
})();
