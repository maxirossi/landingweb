// Fuente única del portfolio: la usan la sección #portfolio, el footer y el header.
// MateTurnos web: el pedido original menciona https://mateturnos.com/, pero el destino verificado
// (enlazado desde MateLabs y Google Play) es .site. Cuando se valide .com, cambiar `href`.
export const MATETURNOS_WEB_REQUESTED = 'https://mateturnos.com/';

export interface PortfolioItem {
  id: string;
  name: string;
  href: string;
  img: string;
  imgW: number;
  imgH: number;
  phone?: boolean;
  accent: string;
  es: { tag: string; desc: string; features: [string, string, string]; cta: string; alt: string; note?: string };
  en: { tag: string; desc: string; features: [string, string, string]; cta: string; alt: string; note?: string };
}

export const portfolio: PortfolioItem[] = [
  {
    id: 'eymate', name: 'eyMate', href: 'https://eymate.site/', img: '/images/portfolio/eymate.webp', imgW: 960, imgH: 650, accent: '#f04e23',
    es: { tag: 'Creador de sitios web', desc: 'Creá y publicá el sitio de tu negocio con ayuda de IA. Personalizá textos, imágenes y secciones desde un editor visual.', features: ['Creación con IA', 'Editor visual', 'Dominio propio'], cta: 'Conocer eyMate', alt: 'Ejemplos de sitios creados con eyMate, en computadora y celular' },
    en: { tag: 'Website builder', desc: 'Create and publish your business website with AI assistance. Customize text, images and sections in a visual editor.', features: ['AI-assisted creation', 'Visual editor', 'Custom domain'], cta: 'Explore eyMate', alt: 'Example websites created with eyMate, on desktop and mobile' },
  },
  {
    id: 'mateturnos-web', name: 'MateTurnos', href: 'https://mateturnos.site/', img: '/images/portfolio/mateturnos-web.webp', imgW: 900, imgH: 1111, accent: '#2563eb',
    es: { tag: 'Turnos online · Web', desc: 'Una agenda online para profesionales y negocios. Organizá servicios y disponibilidad, y compartí un enlace para que tus clientes reserven.', features: ['Agenda online', 'Página de reservas', 'Gestión de disponibilidad'], cta: 'Conocer MateTurnos', alt: 'Panel web de MateTurnos con la agenda del día de un negocio de demostración' },
    en: { tag: 'Online bookings · Web', desc: 'An online scheduling platform for professionals and businesses. Manage services and availability, and share a link so customers can book.', features: ['Online calendar', 'Booking page', 'Availability management'], cta: 'Explore MateTurnos', alt: 'MateTurnos web dashboard showing the daily calendar of a demo business' },
  },
  {
    id: 'mateturnos-app', name: 'MateTurnos App', href: 'https://play.google.com/store/apps/details?id=site.mateturnos.app', img: '/images/portfolio/mateturnos-app.webp', imgW: 432, imgH: 960, phone: true, accent: '#2563eb',
    es: { tag: 'App móvil · Android', desc: 'La experiencia móvil de MateTurnos para consultar y gestionar reservas, servicios y disponibilidad desde el celular.', features: ['Gestión desde el celular', 'Agenda y reservas', 'Disponible en Google Play'], cta: 'Ver en Google Play', alt: 'Pantalla de servicios de la app MateTurnos para Android, con datos de demostración', note: 'Parte de la plataforma MateTurnos.' },
    en: { tag: 'Mobile app · Android', desc: 'The mobile experience of MateTurnos for viewing and managing bookings, services and availability on your phone.', features: ['Manage from your phone', 'Calendar and bookings', 'Available on Google Play'], cta: 'View on Google Play', alt: 'Services screen of the MateTurnos Android app, with demo data', note: 'Part of the MateTurnos platform.' },
  },
  {
    id: 'quericorosario', name: 'QuericoRosario', href: 'https://quericorosario.com/', img: '/images/portfolio/quericorosario.webp', imgW: 960, imgH: 590, accent: '#10a37f',
    es: { tag: 'Guía gastronómica · Mapa interactivo', desc: 'Explorá dónde comer en Rosario mediante un mapa interactivo, fotos, cartas y contacto de bares, restaurantes y cafés.', features: ['Exploración por mapa', 'Búsqueda por zona', 'Fichas de locales'], cta: 'Explorar QuericoRosario', alt: 'Mapa interactivo de Rosario de QuericoRosario con marcadores de locales' },
    en: { tag: 'Dining guide · Interactive map', desc: 'Discover places to eat in Rosario through an interactive map, photos, menus and contact information for restaurants, bars and cafés.', features: ['Map exploration', 'Search by area', 'Venue profiles'], cta: 'Explore QuericoRosario', alt: 'QuericoRosario interactive map of Rosario with venue markers' },
  },
  {
    id: 'octomatelabs', name: 'OctoMateLabs', href: 'https://octomatelabs.site/', img: '/images/portfolio/octomatelabs.webp', imgW: 960, imgH: 783, accent: '#8b5cf6',
    es: { tag: 'Inteligencia artificial · Multimodelo', desc: 'Probá distintos modelos de IA desde una misma cuenta y pagá en pesos argentinos. Conversá, conservá el historial y usá agentes especializados.', features: ['Distintos modelos', 'Historial y exportación', 'Pago en pesos argentinos'], cta: 'Conocer OctoMateLabs', alt: 'Comparación de respuestas de distintos modelos de IA en OctoMateLabs' },
    en: { tag: 'Artificial intelligence · Multiple models', desc: 'Try different AI models from one account and pay in Argentine pesos. Chat, keep your history and use specialized agents.', features: ['Multiple models', 'History and exports', 'Pay in Argentine pesos'], cta: 'Explore OctoMateLabs', alt: 'Comparison of answers from different AI models in OctoMateLabs' },
  },
];

// Claves de traducción generadas para el sistema i18n existente (data-i18n).
export function portfolioTranslations(lang: 'es' | 'en'): Record<string, string> {
  const out: Record<string, string> = {};
  portfolio.forEach((p, i) => {
    const n = i + 1, t = p[lang];
    out[`pf${n}Tag`] = t.tag; out[`pf${n}Desc`] = t.desc; out[`pf${n}Cta`] = t.cta;
    t.features.forEach((f, j) => { out[`pf${n}F${j + 1}`] = f; });
    if (t.note) out[`pf${n}Note`] = t.note;
  });
  return out;
}
