// Service Worker untuk caching dan performance optimization
const CACHE_NAME = 'food-review-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/favicon.svg',
  '/app.css',
  'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=500&fit=crop'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Static assets cached');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external requests (except images)
  if (url.origin !== location.origin && !url.hostname.includes('unsplash.com')) {
    return;
  }
  
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          console.log('Serving from cache:', request.url);
          return cachedResponse;
        }
        
        // Otherwise fetch from network
        return fetch(request)
          .then((networkResponse) => {
            // Don't cache if not successful
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
            
            // Clone the response
            const responseToCache = networkResponse.clone();
            
            // Cache dynamic content
            if (url.pathname.includes('/article/') || url.pathname.includes('/sitemap.xml') || url.pathname.includes('/robots.txt')) {
              caches.open(DYNAMIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseToCache);
                });
            }
            
            return networkResponse;
          })
          .catch(() => {
            // Return fallback for navigation requests
            if (request.mode === 'navigate') {
              return caches.match('/');
            }
            
            // Return fallback for images
            if (request.destination === 'image') {
              return new Response(
                '<svg width="800" height="500" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#666">Image not available</text></svg>',
                { headers: { 'Content-Type': 'image/svg+xml' } }
              );
            }
          });
      })
  );
});

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Background sync triggered');
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Implement background sync logic here
  console.log('Performing background sync...');
}
