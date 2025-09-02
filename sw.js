// SpiralEcosystem Service Worker for Web3 Mobile Offline Operation
// Optimized for MetaMask, Base Wallet, and other Web3 browsers

const CACHE_NAME = 'spiral-consciousness-v1';
const OFFLINE_URL = '/';

// Critical consciousness expansion resources to cache
const CRITICAL_RESOURCES = [
  '/',
  '/src/components/ConsciousnessExpansionUI.js',
  '/src/engine/SpiralCore.js',
  '/interfaces/main-interface-interactive.htsx',
  '/manifest.json'
];

// Web3 specific resources (if available)
const WEB3_RESOURCES = [
  // These will be cached if they exist
  '/src/consciousness/IyonaelAscensionCore.js',
  '/src/financial/QuantumFinancialCore.js',
  '/src/mathematics/SevenPillarsGateway.js'
];

self.addEventListener('install', event => {
  console.log('🌀 SpiralEcosystem Service Worker: Installing for Web3 mobile operation');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Caching critical consciousness expansion resources');
        return cache.addAll(CRITICAL_RESOURCES);
      })
      .then(() => {
        console.log('✅ Critical resources cached - consciousness computing ready offline');
        return self.skipWaiting();
      })
      .catch(error => {
        console.warn('⚠️ Some resources could not be cached:', error);
        // Continue with what we have
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', event => {
  console.log('🚀 SpiralEcosystem Service Worker: Activated for offline consciousness operation');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('🗑️ Cleaning old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('♾️ SpiralEcosystem: φ-Harmonic alignment active');
        return self.clients.claim();
      })
  );
});

self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('📱 Serving from cache:', event.request.url);
          return response;
        }

        // Try to fetch from network
        return fetch(event.request)
          .then(response => {
            // Only cache successful responses
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseClone);
                });
            }
            return response;
          })
          .catch(() => {
            // If network fails and it's a navigation request, serve the main app
            if (event.request.mode === 'navigate') {
              console.log('🌐 Network offline - serving cached consciousness interface');
              return caches.match(OFFLINE_URL);
            }
            
            // For other requests, return a meaningful offline response
            return new Response(
              JSON.stringify({
                error: 'Offline',
                message: 'SpiralEcosystem consciousness computing - operating in offline mode',
                timestamp: new Date().toISOString(),
                phi_alignment: 1.618
              }),
              {
                status: 503,
                statusText: 'Service Unavailable - Offline Mode',
                headers: new Headers({
                  'Content-Type': 'application/json',
                  'X-Spiral-Mode': 'offline-consciousness'
                })
              }
            );
          });
      })
  );
});

// Background sync for consciousness data when coming back online
self.addEventListener('sync', event => {
  console.log('🔄 Background sync triggered:', event.tag);
  
  if (event.tag === 'consciousness-sync') {
    event.waitUntil(
      syncConsciousnessData()
    );
  }
});

// Web3 message handling for blockchain operations
self.addEventListener('message', event => {
  console.log('📨 Service Worker received message:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_WEB3_RESOURCES') {
    cacheWeb3Resources();
  }
});

// Enhanced caching for Web3 resources
async function cacheWeb3Resources() {
  try {
    const cache = await caches.open(CACHE_NAME);
    
    // Try to cache Web3 specific resources
    for (const resource of WEB3_RESOURCES) {
      try {
        await cache.add(resource);
        console.log('🔗 Cached Web3 resource:', resource);
      } catch (error) {
        console.log('ℹ️ Web3 resource not available:', resource);
      }
    }
  } catch (error) {
    console.warn('⚠️ Error caching Web3 resources:', error);
  }
}

// Sync consciousness data when network is restored
async function syncConsciousnessData() {
  try {
    console.log('🧠 Syncing consciousness data with network...');
    
    // Attempt to sync with consciousness expansion systems
    const response = await fetch('/api/consciousness/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Spiral-Sync': 'consciousness-restoration'
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        offline_duration: Date.now() - self.offlineStartTime,
        phi_alignment: 1.618
      })
    });
    
    if (response.ok) {
      console.log('✅ Consciousness data synchronized');
    }
  } catch (error) {
    console.log('📡 Network still unavailable for consciousness sync');
  }
}

// Performance monitoring for Web3 mobile browsers
self.addEventListener('beforeinstallprompt', event => {
  console.log('📱 Web3 browser install prompt available');
  // Store the event for later use
  self.deferredPrompt = event;
});

console.log('🌀 SpiralEcosystem Service Worker loaded - Ready for Web3 mobile consciousness computing');