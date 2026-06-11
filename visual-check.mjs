// visual-check.mjs — bucle de verificación visual con Playwright
// Uso:    node visual-check.mjs [baseURL]
// Setup (una vez):  npm i -D playwright  &&  npx playwright install chromium
//
// Lo único que se cambia por proyecto es el bloque CONFIG.
import { chromium } from 'playwright';
import { mkdirSync, rmSync } from 'fs';

// ════════════════════════════════════════════════
//  CONFIG — lo único que cambias por proyecto
// ════════════════════════════════════════════════
const CONFIG = {
  baseURL: process.argv[2] || 'http://localhost:8000',

  // Rutas a capturar. Sin barra inicial. Acepta query: 'personajes?anime=Naruto'
  routes: [
    { name: 'home', path: '' },
    { name: '404',  path: '404.html' },
  ],

  // El móvil es donde más se rompe todo: no lo quites nunca.
  viewports: [
    { name: 'mobile',  width: 390,  height: 844 },
    { name: 'tablet',  width: 768,  height: 1024 },
    { name: 'desktop', width: 1440, height: 900 },
  ],

  // Coords para simular ubicación (apps con mapa/geo). null = el navegador la deniega.
  geolocation: null, // p.ej. { latitude: 28.34, longitude: -16.65 }

  waitUntil: 'networkidle', // 'domcontentloaded' si hay polling/sockets que nunca paran
  extraWaitMs: 300,         // espera extra: mapas, imágenes lazy, animaciones de entrada
  autoScroll: true,         // baja hasta el final y vuelve: dispara los reveal-on-scroll
  fullPage: true,
};
// ════════════════════════════════════════════════

async function autoScroll(page) {
  await page.evaluate(() => new Promise((resolve) => {
    // scroll-behavior: smooth haría que scrollBy anime y nunca llegue abajo:
    // lo anulamos durante el barrido y medimos la posición real, no un contador.
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    const id = setInterval(() => {
      window.scrollBy(0, 500);
      const bottom = window.scrollY + window.innerHeight;
      if (bottom >= document.documentElement.scrollHeight - 1) {
        clearInterval(id);
        window.scrollTo(0, 0);
        document.documentElement.style.scrollBehavior = prev;
        resolve();
      }
    }, 80);
  }));
  await page.waitForTimeout(800); // las transiciones de reveal duran ~0.7s
}

const base = CONFIG.baseURL.endsWith('/') ? CONFIG.baseURL : CONFIG.baseURL + '/';

rmSync('shots', { recursive: true, force: true });
mkdirSync('shots', { recursive: true });

const browser = await chromium.launch();
const ctxOpts = {};
if (CONFIG.geolocation) {
  ctxOpts.geolocation = CONFIG.geolocation;
  ctxOpts.permissions = ['geolocation'];
}
const context = await browser.newContext(ctxOpts);

for (const vp of CONFIG.viewports) {
  const page = await context.newPage();
  await page.setViewportSize({ width: vp.width, height: vp.height });
  for (const route of CONFIG.routes) {
    const url = new URL(route.path.replace(/^\//, ''), base).href;
    try {
      await page.goto(url, { waitUntil: CONFIG.waitUntil, timeout: 30000 });
    } catch { /* seguimos aunque networkidle no llegue a estabilizarse */ }
    if (CONFIG.autoScroll) await autoScroll(page);
    if (CONFIG.extraWaitMs) await page.waitForTimeout(CONFIG.extraWaitMs);
    await page.screenshot({
      path: `shots/${route.name}-${vp.name}.png`,
      fullPage: CONFIG.fullPage,
    });
    console.log(`  ✓ ${route.name}-${vp.name}`);
  }
  await page.close();
}

await browser.close();
console.log('\n✓ Listo. Capturas en ./shots');
