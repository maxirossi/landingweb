// Contenido de las secciones nuevas de la home (v2), en ES y EN.
// Ideas tomadas de otros estudios: «¿Qué necesitás?» (DevelopArgentina/Syloper),
// datos de respaldo bajo el hero (EasySoftware/Clover), caso de éxito
// problema → solución (Patagonian/Clover), preguntas frecuentes (DevelopArgentina)
// y franja final «Exploremos tu proyecto» (Syloper).
import { WHATSAPP_URL } from './contact';

type L = { es: string; en: string };
const t = (es: string, en: string): L => ({ es, en });

export const waLink = (text: string) => `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;

export const heroStats: { value: L; label: L }[] = [
  { value: t('5', '5'), label: t('productos propios en producción', 'in-house products live') },
  { value: t('Web · Android · IA', 'Web · Android · AI'), label: t('lo que construimos', 'what we build') },
  { value: t('Rosario', 'Rosario'), label: t('equipo propio, en Argentina', 'our own team, in Argentina') },
];

export interface Need { icon: 'globe' | 'calendar' | 'pin' | 'phone' | 'sparkle' | 'code'; title: L; desc: L; product: string; href: string; external: boolean; cta: L }
export const needs: Need[] = [
  { icon: 'globe', title: t('Tengo un negocio y quiero mi sitio', 'I run a business and need a website'), desc: t('Creá tu sitio con ayuda de IA y publicalo con tu dominio. Si preferís, lo armamos nosotros.', 'Build your site with AI and publish it on your own domain. Or let us build it for you.'), product: 'eyMate', href: 'https://eymate.site/', external: true, cta: t('Probar eyMate', 'Try eyMate') },
  { icon: 'calendar', title: t('Trabajo con turnos', 'I take appointments'), desc: t('Agenda online para que tus clientes reserven solos, en la web y en la app de Android.', 'An online calendar so customers book on their own, on the web and on Android.'), product: 'MateTurnos', href: 'https://mateturnos.site/', external: true, cta: t('Probar MateTurnos', 'Try MateTurnos') },
  { icon: 'pin', title: t('Tengo un bar o restaurante en Rosario', 'I own a bar or restaurant in Rosario'), desc: t('Sumá tu local a la guía gastronómica con mapa, fotos, carta y contacto directo.', 'Add your venue to the dining guide with a map, photos, menu and direct contact.'), product: 'QuericoRosario', href: 'https://quericorosario.com/', external: true, cta: t('Ver QuericoRosario', 'See QuericoRosario') },
  { icon: 'sparkle', title: t('Quiero usar IA en mi empresa', 'I want to use AI in my company'), desc: t('Agentes, automatizaciones y asistentes conectados a tus datos y tus procesos.', 'Agents, automations and assistants connected to your data and processes.'), product: '', href: '/servicios/integracion-de-inteligencia-artificial/', external: false, cta: t('Ver el servicio', 'See the service') },
  { icon: 'code', title: t('Necesito un sistema o app a medida', 'I need custom software or an app'), desc: t('Del problema al producto: lo entendemos, lo diseñamos y lo construimos en etapas que podés probar.', 'From problem to product: we understand it, design it and build it in stages you can try.'), product: '', href: '/servicios/desarrollo-de-software-a-medida/', external: false, cta: t('Ver el servicio', 'See the service') },
  { icon: 'phone', title: t('Todavía no sé bien qué necesito', "I'm not sure what I need yet"), desc: t('Contanos la idea por WhatsApp y te decimos por dónde empezar, sin compromiso.', "Tell us the idea on WhatsApp and we'll suggest where to start, no strings attached."), product: '', href: waLink('Hola MateLabs, tengo una idea y no sé por dónde empezar.'), external: true, cta: t('Escribir por WhatsApp', 'Message on WhatsApp') },
];

export const caseStudy = {
  name: 'Persianas Rosario',
  href: 'https://persianasrosario.com/',
  img: '/images/portfolio/persianasrosario.webp',
  tag: t('Caso de cliente · Servicios', 'Client case · Services'),
  title: t('Un sitio que lleva al cliente directo a WhatsApp', 'A website that takes customers straight to WhatsApp'),
  steps: [
    { k: t('El problema', 'The problem'), v: t('Una empresa de reparación e instalación de persianas necesitaba que la encuentren en Google y que la gente pidiera presupuesto o una urgencia sin vueltas.', 'A blind repair and installation company needed to be found on Google and let people request a quote or emergency service without friction.') },
    { k: t('Lo que hicimos', 'What we did'), v: t('Sitio rápido con una página por servicio, botones de presupuesto y urgencias 24 hs que abren WhatsApp, datos para Google y campañas de Google Ads.', 'A fast site with a page per service, quote and 24/7 emergency buttons that open WhatsApp, structured data for Google and Google Ads campaigns.') },
    { k: t('Cómo sigue', 'Ongoing'), v: t('Lo acompañamos con informes de las campañas y ajustes de palabras y anuncios.', 'We keep supporting it with campaign reports and keyword and ad adjustments.') },
  ],
  cta: t('Ver el sitio', 'Visit the site'),
};

export const faqs: { q: L; a: L }[] = [
  { q: t('¿Cuánto cuesta?', 'How much does it cost?'), a: t('Depende de qué necesites. Si te sirve uno de nuestros productos (eyMate, MateTurnos), empezás con un plan mensual. Si es a medida, te pasamos un presupuesto después de entender el proyecto. Consultar no tiene costo.', 'It depends on what you need. If one of our products fits (eyMate, MateTurnos), you start with a monthly plan. For custom work, we send a quote once we understand the project. Asking is free.') },
  { q: t('¿Cuánto tarda?', 'How long does it take?'), a: t('Un sitio con eyMate se puede publicar el mismo día. Un desarrollo a medida se arma por etapas cortas, para que veas avances reales desde las primeras semanas.', 'A site built with eyMate can go live the same day. Custom work is planned in short stages so you see real progress from the first weeks.') },
  { q: t('¿Trabajan solo en Rosario?', 'Do you only work in Rosario?'), a: t('No. Estamos en Rosario, pero trabajamos de forma remota con clientes de toda Argentina y del exterior, en español o en inglés.', 'No. We are based in Rosario but work remotely with clients across Argentina and abroad, in Spanish or English.') },
  { q: t('¿Puedo empezar con algo chico?', 'Can I start small?'), a: t('Sí. Lo habitual es arrancar con una primera versión que resuelva lo más importante y sumar funciones después, según cómo la use tu negocio.', 'Yes. We usually start with a first version that solves the most important part and add features later, based on how your business uses it.') },
  { q: t('¿Quién mantiene el sistema después?', 'Who maintains it afterwards?'), a: t('Nosotros. Seguimos a cargo del hosting, las actualizaciones y las mejoras, o te dejamos todo documentado si preferís que lo maneje tu equipo.', 'We do. We can keep handling hosting, updates and improvements, or hand everything over documented if your team prefers to run it.') },
  { q: t('¿Cómo empezamos?', 'How do we start?'), a: t('Escribinos por WhatsApp o por el formulario y contanos qué querés resolver. Te respondemos con los próximos pasos.', 'Message us on WhatsApp or through the form and tell us what you want to solve. We reply with next steps.') },
];

// Claves i18n para el sistema data-i18n existente.
export function homeTranslations(lang: 'es' | 'en'): Record<string, string> {
  const o: Record<string, string> = {};
  heroStats.forEach((s, i) => { o[`hsV${i}`] = s.value[lang]; o[`hsL${i}`] = s.label[lang]; });
  needs.forEach((n, i) => { o[`ndT${i}`] = n.title[lang]; o[`ndD${i}`] = n.desc[lang]; o[`ndC${i}`] = n.cta[lang]; });
  o.csTag = caseStudy.tag[lang]; o.csTitle = caseStudy.title[lang]; o.csCta = caseStudy.cta[lang];
  caseStudy.steps.forEach((s, i) => { o[`csK${i}`] = s.k[lang]; o[`csV${i}`] = s.v[lang]; });
  faqs.forEach((f, i) => { o[`fqQ${i}`] = f.q[lang]; o[`fqA${i}`] = f.a[lang]; });
  return o;
}
