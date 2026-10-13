const V = 'poultrycare-v9';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== V).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  // Page loads: network first (always fresh), fall back to cached copy when offline
  if (r.mode === 'navigate') {
    e.respondWith(
      fetch(r).then(res => { const cp = res.clone(); caches.open(V).then(c => c.put('./index.html', cp)); return res; })
              .catch(() => caches.match('./index.html'))
    );
    return;
  }
  // Own files and Google Fonts: cache first
  if (u.origin === location.origin || u.hostname.endsWith('fonts.googleapis.com') || u.hostname.endsWith('fonts.gstatic.com')) {
    e.respondWith(
      caches.match(r).then(hit => hit || fetch(r).then(res => { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); return res; }))
    );
  }
});
