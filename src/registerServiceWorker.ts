const SERVICE_WORKER_URL = `${import.meta.env.BASE_URL}sw.js`;

export function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register(SERVICE_WORKER_URL).catch((error: unknown) => {
      console.warn('PersonaMirror369 service worker registration failed:', error);
    });
  });
}
