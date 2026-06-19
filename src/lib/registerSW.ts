/*
  Regista o service worker para a app funcionar como PWA (instalável e offline).
  Só ativamos em produção, para não interferir com o hot-reload do `npm run dev`.
*/
export function registerSW() {
  if (!("serviceWorker" in navigator)) return;
  if (!import.meta.env.PROD) return;

  // BASE_URL é "/" em dev e "/Lumetest2/" em produção.
  const base = import.meta.env.BASE_URL;

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(`${base}sw.js`, { scope: base })
      .catch(() => {
        // Falha silenciosa: a app continua a funcionar sem offline.
      });
  });
}
