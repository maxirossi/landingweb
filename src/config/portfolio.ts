// Fuente única del portfolio: la usan la sección #portfolio, el footer y el header.
// Rediseño 2026: 4 productos propios en grilla 2×2; la app Android de MateTurnos
// va como CTA separado dentro de la tarjeta de MateTurnos (misma plataforma).
// Capturas reales de las home públicas (sin datos privados).

type L = { es: string; en: string };
const t = (es: string, en: string): L => ({ es, en });

export interface PortfolioItem {
  id: string;
  name: string;
  href: string;
  host: string;
  img: string;
  imgW: number;
  imgH: number;
  tone: 'sage' | 'mint' | 'sand' | 'night';
  cat: L;
  desc: L;
  cta: L;
  alt: L;
  app?: { href: string; cta: L };
}

export const portfolio: PortfolioItem[] = [
  {
    id: 'eymate', name: 'eyMate', href: 'https://eymate.site/', host: 'eymate.site', img: '/images/portfolio/eymate.webp', imgW: 1600, imgH: 1000, tone: 'sage',
    cat: t('Creación web', 'Website builder'),
    desc: t('Creá el sitio de tu negocio con un editor visual y herramientas de inteligencia artificial, y publicalo con tu dominio.', 'Build your business website with a visual editor and AI tools, and publish it on your own domain.'),
    cta: t('Conocer eyMate', 'Explore eyMate'),
    alt: t('Página de inicio de eyMate con ejemplos de sitios creados', 'eyMate home page with example websites'),
  },
  {
    id: 'mateturnos', name: 'MateTurnos', href: 'https://mateturnos.site/', host: 'mateturnos.site', img: '/images/portfolio/mateturnos-web.webp', imgW: 1600, imgH: 1000, tone: 'mint',
    cat: t('Reservas · Web y Android', 'Bookings · Web and Android'),
    desc: t('Organizá agenda, servicios y disponibilidad, y compartí un enlace para que tus clientes reserven solos.', 'Manage your calendar, services and availability, and share a link so customers book on their own.'),
    cta: t('Conocer MateTurnos', 'Explore MateTurnos'),
    alt: t('Página de inicio de MateTurnos: «Tu agenda online, para que tus clientes reserven solos»', 'MateTurnos home page: «Tu agenda online, para que tus clientes reserven solos»'),
    app: { href: 'https://play.google.com/store/apps/details?id=site.mateturnos.app', cta: t('App para Android en Google Play', 'Android app on Google Play') },
  },
  {
    id: 'quericorosario', name: 'QuericoRosario', href: 'https://quericorosario.com/', host: 'quericorosario.com', img: '/images/portfolio/quericorosario.webp', imgW: 1600, imgH: 1000, tone: 'sand',
    cat: t('Guía gastronómica · Mapa', 'Dining guide · Map'),
    desc: t('Descubrí bares, cafés y restaurantes de Rosario en un mapa interactivo, con fotos, cartas y contacto directo.', 'Discover bars, cafés and restaurants in Rosario on an interactive map, with photos, menus and direct contact.'),
    cta: t('Explorar QuericoRosario', 'Explore QuericoRosario'),
    alt: t('Página de inicio de QuericoRosario: «¿Dónde comemos hoy?», con buscador y mapa de Rosario', 'QuericoRosario home page: «¿Dónde comemos hoy?», with search and a map of Rosario'),
  },
  {
    id: 'octomatelabs', name: 'OctoMateLabs', href: 'https://octomatelabs.site/', host: 'octomatelabs.site', img: '/images/portfolio/octomatelabs.webp', imgW: 1600, imgH: 1000, tone: 'night',
    cat: t('Plataforma de inteligencia artificial', 'AI platform'),
    desc: t('Distintos modelos de IA, conversaciones y agentes especializados desde una misma cuenta, con pago en pesos.', 'Multiple AI models, conversations and specialized agents from one account, payable in Argentine pesos.'),
    cta: t('Conocer OctoMateLabs', 'Explore OctoMateLabs'),
    alt: t('Página de inicio de OctoMateLabs con una conversación de ejemplo y selector de modelos', 'OctoMateLabs home page with a sample conversation and model selector'),
  },
];

// Claves de traducción para el sistema i18n existente (data-i18n).
export function portfolioTranslations(lang: 'es' | 'en'): Record<string, string> {
  const out: Record<string, string> = {};
  portfolio.forEach((p, i) => {
    const n = i + 1;
    out[`pf${n}Cat`] = p.cat[lang]; out[`pf${n}Desc`] = p.desc[lang]; out[`pf${n}Cta`] = p.cta[lang];
    if (p.app) out[`pf${n}App`] = p.app.cta[lang];
  });
  return out;
}
