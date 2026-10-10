export interface NavItem { label: string; href: string; desc?: string; icon?: 'code' | 'stack' | 'sparkle'; external?: boolean; key?: string; descKey?: string }

export const servicios: NavItem[] = [
  { label: 'Desarrollo de software a medida', href: '/servicios/desarrollo-de-software-a-medida/', desc: 'Sistemas, APIs y plataformas diseñadas para escalar.', icon: 'code', key: 'mmSvc1', descKey: 'mmSvc1d' },
  { label: 'Plataformas web y SaaS', href: '/servicios/plataformas-web-y-saas/', desc: 'Productos digitales completos, de la idea a producción.', icon: 'stack', key: 'mmSvc2', descKey: 'mmSvc2d' },
  { label: 'Integración de inteligencia artificial', href: '/servicios/integracion-de-inteligencia-artificial/', desc: 'Automatización y agentes de IA aplicados a tu operación.', icon: 'sparkle', key: 'mmSvc3', descKey: 'mmSvc3d' },
];

export const proyectos: NavItem[] = [
  { label: 'Mateturnos', href: 'https://mateturnos.site/', desc: 'Producto propio: agenda de turnos y reservas online.', external: true, key: 'mmProj1', descKey: 'mmProj1d' },
  { label: 'Apps Rosario', href: 'https://desarrolloappsrosario.com/', desc: 'Desarrollo de aplicaciones e integración de sistemas.', external: true, key: 'mmProj2', descKey: 'mmProj2d' },
];

export const recursos: NavItem[] = [
  { label: 'Cómo trabajamos', href: '/#proceso', desc: 'Entender, diseñar, construir e iterar.', key: 'mmRes1', descKey: 'mmRes1d' },
  { label: 'Guías sobre desarrollo de apps', href: 'https://desarrolloappsrosario.com/guias/', desc: 'Costos, plataformas y alcance, en Apps Rosario.', external: true, key: 'mmRes2', descKey: 'mmRes2d' },
  { label: 'Todos los servicios', href: '/servicios/', desc: 'Qué hacemos y cómo se combinan.', key: 'mmRes3', descKey: 'mmRes3d' },
];

export const nosotros: NavItem = { label: 'Nosotros', href: '/nosotros/', key: 'navAbout' };
