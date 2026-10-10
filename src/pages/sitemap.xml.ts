import { services } from '../config/services';
const SITE = 'https://matelabs.site';
export function GET() {
  const paths = ['/', '/servicios/', ...services.map((s) => `/servicios/${s.slug}/`), '/nosotros/'];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((p) => `  <url><loc>${SITE}${p}</loc></url>`).join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
