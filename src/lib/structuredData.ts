const SITE = 'https://matelabs.site';

export const organization = {
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: 'MateLabs',
  url: `${SITE}/`,
  logo: `${SITE}/images/robot.png`,
  sameAs: ['https://www.linkedin.com/company/matelabsar/'],
  address: { '@type': 'PostalAddress', addressLocality: 'Rosario', addressRegion: 'Santa Fe', addressCountry: 'AR' },
};

export const homeJsonLd = () => ({ '@context': 'https://schema.org', ...organization });

export const breadcrumbs = (items: [string, string][]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `${SITE}${path}` })),
});

export const faqPage = (faqs: [string, string][]) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

export const serviceNode = (name: string, description: string, path: string) => ({
  '@type': 'Service',
  name,
  description,
  url: `${SITE}${path}`,
  serviceType: name,
  areaServed: { '@type': 'Country', name: 'Argentina' },
  provider: { '@id': `${SITE}/#organization` },
});

export const graph = (...nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes });
