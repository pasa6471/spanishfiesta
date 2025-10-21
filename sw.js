const CACHE_NAME = "spanishfiesta-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/manifest.json",
  "/components/navbar.js",
  "/components/footer.js",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

// 🔹 Installation – Cache initialisieren
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("📦 Dateien werden gecached...");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 🔹 Aktivierung – alte Caches löschen
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => {
            console.log("🗑️ Alter Cache gelöscht:", key);
            return caches.delete(key);
          })
      )
    )
  );
  self.clients.claim();
});

// 🔹 Fetch – zuerst aus Cache, dann Netzwerk
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).then((res) => {
          // Optional: Neue Version in Cache speichern
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, res.clone());
            return res;
          });
        }).catch(() => {
          // Optional: Offline-Seite oder Fallback hier
          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }
        })
      );
    })
  );
});
