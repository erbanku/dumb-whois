const CACHE_NAME = "DUMBWHOIS_PWA_CACHE_V1";
const CORE_ASSETS = ["/index.html", "/index.js", "/assets/styles.css", "/assets/logo.svg"];

const preload = async () => {
    console.log("Installing web app");
    const cache = await caches.open(CACHE_NAME);

    try {
        const response = await fetch("/asset-manifest.json");
        const assets = await response.json();
        // Filter out the service worker itself from the cache list
        const assetsToCache = assets.filter((url) => url !== "/service-worker.js");
        console.log("Caching assets:", assetsToCache);
        await cache.addAll(assetsToCache);
    } catch (error) {
        console.error("Failed to fetch asset manifest, caching core assets only:", error);
        await cache.addAll(CORE_ASSETS);
    }
};

// Fetch asset manifest dynamically
globalThis.addEventListener("install", (event) => {
    event.waitUntil(preload());
});

globalThis.addEventListener("activate", (event) => {
    event.waitUntil(clients.claim());
});

globalThis.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});
