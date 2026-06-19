/*
  Service worker simples da Lumé.
  Estratégia:
   - Navegações (HTML): network-first, com fallback para a cópia em cache
     (permite abrir a app offline depois da primeira visita).
   - Outros pedidos GET do próprio site (JS, CSS, ícones): stale-while-revalidate
     (serve rápido da cache e atualiza em segundo plano).
  Os dados da app continuam no localStorage, por isso funcionam offline.
*/
const CACHE = "lume-v2";
// Caminhos relativos ao scope do service worker (funciona em "/" ou "/Lumetest2/").
const APP_SHELL = ["./", "./index.html", "./manifest.webmanifest"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // ignora pedidos externos (ex.: fontes)

  // Navegações: tenta a rede primeiro, cai para a cache se estiver offline.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put("./index.html", copy));
          return res;
        })
        .catch(() => caches.match("./index.html")),
    );
    return;
  }

  // Restantes recursos: stale-while-revalidate.
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(request, copy));
          return res;
        })
        .catch(() => cached);
      return cached || network;
    }),
  );
});
