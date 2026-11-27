import { test, expect, type Page } from '@playwright/test';

const ROUTES = ['/', '/servicios/', '/servicios/desarrollo-de-software-a-medida/', '/servicios/plataformas-web-y-saas/', '/servicios/integracion-de-inteligencia-artificial/', '/nosotros/'];
const ANCHORS = ['portfolio', 'eymate', 'mateturnos', 'mateturnos-web', 'mateturnos-app', 'quericorosario', 'octomatelabs', 'servicios', 'necesitas', 'caso', 'proceso', 'preguntas', 'contacto'];
const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1440) < 1024;

test.describe('rutas', () => {
  for (const path of ROUTES) {
    test(`${path} carga sin errores, con un solo h1, canonical y JSON-LD válido`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new RegExp(`https://matelabs.site${path}$`));
      for (const raw of await page.locator('script[type="application/ld+json"]').allTextContents()) expect(() => JSON.parse(raw)).not.toThrow();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      expect(errors).toEqual([]);
    });
  }
});

test('la home conserva los anchors existentes', async ({ page }) => {
  await page.goto('/');
  for (const id of ANCHORS) await expect(page.locator(`[id="${id}"]`), `#${id}`).toHaveCount(1);
});

test('enlaces externos abren en pestaña nueva con rel noopener y apuntan a los productos', async ({ page }) => {
  await page.goto('/');
  const hrefs = await page.locator('#portfolio a[href^="http"]').evaluateAll((as) => as.map((a) => [a.getAttribute('href'), a.getAttribute('target'), a.getAttribute('rel')]));
  for (const [, target, rel] of hrefs) { expect(target).toBe('_blank'); expect(rel).toContain('noopener'); }
  const set = new Set(hrefs.map(([h]) => h));
  for (const h of ['https://eymate.site/', 'https://mateturnos.site/', 'https://play.google.com/store/apps/details?id=site.mateturnos.app', 'https://quericorosario.com/', 'https://octomatelabs.site/']) expect(set.has(h), h).toBe(true);
  await expect(page.locator('a[href="https://desarrolloappsrosario.com/"]').first()).toBeAttached();
  await expect(page.locator('a[href^="mailto:contactomatelabs@gmail.com"]').first()).toBeAttached();
  await expect(page.locator('a[href^="https://wa.me/5493417443288"]').first()).toBeAttached();
  await expect(page.locator('a[href*="matelabs.com.ar"]')).toHaveCount(0);
});

test('selector de idioma ES/EN', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Ideas que se convierten en');
  if (isMobile(page)) await page.locator('#menu-toggle').click();
  await page.locator('[data-lang-switch="en"]:visible').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('h1')).toContainText('Ideas that become');
  await expect(page.locator('#contact-topic option').first()).toHaveText('Custom software');
  await page.reload();
  await expect(page.locator('h1')).toContainText('Ideas that become');
  if (isMobile(page)) await page.locator('#menu-toggle').click();
  await page.locator('[data-lang-switch="es"]:visible').click();
  await expect(page.locator('h1')).toContainText('Ideas que se convierten en');
});

test('menú móvil: abre, cierra con Escape y devuelve el foco', async ({ page }) => {
  test.skip(!isMobile(page), 'solo en móvil');
  await page.goto('/');
  const toggle = page.locator('#menu-toggle');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#mobile-menu')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#mobile-menu')).toBeHidden();
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page.locator('#mobile-menu a[href="/#portfolio"]').click();
  await expect(page.locator('#mobile-menu')).toBeHidden();
});

test('menú de servicios (escritorio): abre, navega y cierra con Escape', async ({ page }) => {
  test.skip(isMobile(page), 'solo en escritorio');
  await page.goto('/');
  const trigger = page.locator('[data-mega="servicios"]');
  await trigger.click();
  await expect(page.locator('#mega-servicios')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#mega-servicios')).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.locator('#mega-servicios a[href="/servicios/plataformas-web-y-saas/"]').click();
  await expect(page).toHaveURL(/\/servicios\/plataformas-web-y-saas\/$/);
});

test('menús del header (escritorio): se despliegan al pasar el mouse en todas las páginas', async ({ page }) => {
  test.skip(isMobile(page), 'hover de escritorio');
  for (const path of ['/', '/servicios/', '/nosotros/']) {
    await page.goto(path);
    const svc = page.locator('#mega-servicios');
    const res = page.locator('#mega-recursos');
    await page.hover('[data-mega="servicios"]');
    await expect(svc).toBeVisible();
    await expect(page.locator('[data-mega="servicios"]')).toHaveAttribute('aria-expanded', 'true');
    // bajar del botón al panel no lo cierra
    await page.locator('#mega-servicios .mega__opt').first().hover();
    await page.waitForTimeout(350);
    await expect(svc).toBeVisible();
    // pasar a Recursos cambia de panel
    await page.hover('[data-mega="recursos"]');
    await expect(res).toBeVisible();
    await expect(svc).toBeHidden();
    // el clic con mouse no cierra el que ya está abierto
    await page.locator('[data-mega="recursos"]').click();
    await expect(res).toBeVisible();
    // salir del header lo cierra
    await page.mouse.move(700, 850);
    await expect(res).toBeHidden();
  }
  // con teclado sigue alternando con Enter
  await page.goto('/');
  await page.mouse.move(700, 850);
  await page.locator('[data-mega="servicios"]').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#mega-servicios')).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page.locator('#mega-servicios')).toBeHidden();
});

test('portfolio y caso: capturas al ras, enteras y sin marco', async ({ page }) => {
  await page.goto('/');
  const res = await page.$$eval('.pf__media, .cs__media', (els) => els.map((m) => {
    const img = m.querySelector('img')!;
    const r = m.getBoundingClientRect(), i = img.getBoundingClientRect();
    return { frame: !!m.querySelector('.pf__frame, .cs__frame, .pf__bar, .cs__bar'), flush: Math.abs(i.width - r.width) <= 2 && Math.abs(i.left - r.left) <= 1,
      whole: Math.abs(i.height - i.width * 1000 / 1600) <= 2 && i.bottom <= r.bottom + 1 && i.top >= r.top - 1 };
  }));
  expect(res).toHaveLength(5);
  for (const x of res) expect(x).toEqual({ frame: false, flush: true, whole: true });
});

test.describe('formulario de contacto (API simulada)', () => {
  test('valida campos y no llama a la API si faltan datos', async ({ page }) => {
    let calls = 0;
    await page.route('**/api/contact', (r) => { calls++; return r.fulfill({ status: 200, body: '{}' }); });
    await page.goto('/#contacto');
    await page.locator('#contact-submit').click();
    await expect(page.locator('#contact-status')).toContainText('Completá tu nombre');
    await expect(page.locator('#contact-name')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#contact-name')).toBeFocused();
    await page.fill('#contact-name', 'Prueba');
    await page.fill('#contact-email', 'no-es-un-mail');
    await page.fill('#contact-message', 'Hola');
    await page.locator('#contact-submit').click();
    await expect(page.locator('#contact-email')).toHaveAttribute('aria-invalid', 'true');
    expect(calls).toBe(0);
  });

  test('envía nombre, email, tipo de proyecto y mensaje, y muestra éxito solo con 200', async ({ page }) => {
    let body: any = null;
    await page.route('**/api/contact', async (r) => { body = r.request().postDataJSON(); await r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }); });
    await page.goto('/#contacto');
    await page.fill('#contact-name', 'Prueba E2E');
    await page.fill('#contact-email', 'prueba@example.com');
    await page.selectOption('#contact-topic', 'IA y automatización');
    await page.fill('#contact-message', 'Mensaje de prueba');
    await page.locator('#contact-submit').click();
    await expect(page.locator('#contact-status')).toContainText('Mensaje enviado');
    expect(body).toMatchObject({ name: 'Prueba E2E', email: 'prueba@example.com', topic: 'IA y automatización', message: 'Mensaje de prueba', source: 'formulario' });
    await expect(page.locator('#contact-name')).toHaveValue('');
  });

  test('si la API falla no muestra un falso éxito', async ({ page }) => {
    await page.route('**/api/contact', (r) => r.fulfill({ status: 500, body: '{}' }));
    await page.goto('/#contacto');
    await page.fill('#contact-name', 'Prueba');
    await page.fill('#contact-email', 'prueba@example.com');
    await page.fill('#contact-message', 'Hola');
    await page.locator('#contact-submit').click();
    await expect(page.locator('#contact-status')).toContainText('Algo salió mal');
    await expect(page.locator('#contact-status')).not.toContainText('enviado');
    await expect(page.locator('#contact-submit')).toBeEnabled();
  });
});

test.describe('hero con contacto a la derecha', () => {
  test('el formulario del hero valida y envía con origen «hero»', async ({ page }) => {
    let body: any = null;
    await page.route('**/api/contact', async (r) => { body = r.request().postDataJSON(); await r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }); });
    await page.goto('/');
    await page.locator('#hero-submit').click();
    await expect(page.locator('#hero-status')).toContainText('Completá tu nombre');
    await expect(page.locator('#hero-name')).toBeFocused();
    expect(body).toBeNull();
    await page.fill('#hero-name', 'Hero E2E');
    await page.fill('#hero-email', 'hero@example.com');
    await page.fill('#hero-message', 'Desde el hero');
    await page.locator('#hero-submit').click();
    await expect(page.locator('#hero-status')).toContainText('Mensaje enviado');
    expect(body).toMatchObject({ name: 'Hero E2E', email: 'hero@example.com', message: 'Desde el hero', source: 'hero' });
    await expect(page.locator('#contact-status')).toBeHidden();
  });

  test('la tarjeta queda a la derecha en escritorio y el WhatsApp es el real', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.hero-ct .btn-wa')).toHaveAttribute('href', /^https:\/\/wa\.me\/5493417443288/);
    if (!isMobile(page)) {
      const h1 = await page.locator('#hero-title').boundingBox();
      const card = await page.locator('.hero-ct').boundingBox();
      expect(card!.x).toBeGreaterThan(h1!.x + h1!.width / 2);
      expect(card!.y + card!.height).toBeLessThanOrEqual((page.viewportSize()?.height ?? 900) + 1);
    }
  });

  test('al apuntar una pastilla aparece la captura del producto de fondo', async ({ page }) => {
    test.skip(isMobile(page), 'hover de escritorio');
    await page.goto('/');
    const shot = page.locator('[data-shot="eymate"]');
    await expect(shot).not.toHaveAttribute('src', /.+/);
    await page.hover('[data-pill="eymate"]');
    await expect(shot).toHaveClass(/is-on/);
    await expect(shot).toHaveAttribute('src', /eymate-800\.webp/);
    await page.mouse.move(5, 500);
    await expect(shot).not.toHaveClass(/is-on/);
  });
});

test('el enlace para saltar al contenido lleva a main', async ({ page }) => {
  test.skip(isMobile(page), 'teclado de escritorio');
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.locator('.skip-link');
  await expect(skip).toBeFocused();
  await expect(skip).toHaveAttribute('href', '#main');
  await expect(page.locator('main#main')).toHaveCount(1);
});
