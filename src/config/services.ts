export interface Section { h2: string; p: string[]; bullets?: string[] }
export interface Service {
  slug: string; name: string; icon: 'code' | 'stack' | 'sparkle';
  metaTitle: string; metaDescription: string; h1: string; lead: string;
  sections: Section[]; faqs: [string, string][]; related: string[];
}

export const services: Service[] = [
  {
    slug: 'desarrollo-de-software-a-medida',
    name: 'Desarrollo de software a medida',
    icon: 'code',
    metaTitle: 'Desarrollo de software a medida en Rosario | MateLabs',
    metaDescription: 'Diseñamos y construimos sistemas, APIs y plataformas a medida para empresas y emprendedores. Estudio de software en Rosario, Argentina.',
    h1: 'Desarrollo de software a medida en Rosario',
    lead: 'Cuando una planilla, un sistema genérico o una suma de herramientas ya no alcanza, construimos el software que tu operación necesita: sistemas internos, APIs y plataformas pensadas para crecer.',
    sections: [
      {
        h2: 'Cuándo conviene un desarrollo a medida',
        p: [
          'Un software a medida tiene sentido cuando el proceso de tu negocio es particular y las herramientas del mercado obligan a adaptarlo con parches, o cuando necesitás conectar sistemas que no se hablan entre sí.',
          'No siempre es la mejor opción. Antes de proponer un desarrollo evaluamos si una herramienta existente resuelve el problema, y te lo decimos si es así.',
        ],
        bullets: [
          'Procesos que hoy dependen de planillas, mensajes y tareas manuales.',
          'Sistemas que necesitan intercambiar información con otros que ya usás.',
          'Un producto propio que querés llevar a producción con una base técnica sólida.',
          'Una herramienta interna que tiene que adaptarse a cómo trabaja tu equipo.',
        ],
      },
      {
        h2: 'Qué construimos',
        p: ['Trabajamos de punta a punta: relevamiento, diseño de la solución, desarrollo y puesta en producción.'],
        bullets: [
          'Sistemas backend y APIs que centralizan la lógica de negocio.',
          'Paneles de gestión y herramientas internas.',
          'Integraciones con servicios de terceros, pagos, mensajería y sistemas de gestión.',
          'Procesos automáticos: tareas programadas, notificaciones y sincronización de datos.',
        ],
      },
      {
        h2: 'Cómo lo hacemos',
        p: [
          'Empezamos por entender el problema y los usuarios antes de escribir código. Definimos qué incluye una primera versión, la desarrollamos con entregas cortas que se pueden probar, y la ajustamos con lo que se aprende en el uso.',
          'Elegimos la tecnología según el proyecto, buscando que el resultado se pueda mantener y evolucionar. Podés ver el detalle en nuestro proceso de trabajo.',
        ],
      },
    ],
    faqs: [
      ['¿Cuánto cuesta un software a medida?', 'Depende del alcance, las integraciones y la complejidad del proceso a resolver. No damos precios cerrados sin conocer el proyecto: después de una primera conversación definimos el alcance y armamos una propuesta.'],
      ['¿Cuánto tiempo lleva?', 'Varía según el tamaño del sistema. Por eso trabajamos con una primera versión acotada y entregas incrementales, para empezar a usar la solución sin esperar a que esté todo terminado.'],
      ['¿Puedo empezar con una versión chica y crecer después?', 'Sí. Definir una primera versión con lo esencial y una base técnica que permita ampliarla es la forma en que recomendamos empezar.'],
      ['¿Qué necesito para pedir una propuesta?', 'Contanos qué problema querés resolver, quiénes usarían el sistema y con qué herramientas trabajás hoy. Con eso podemos orientarte aunque todavía no tengas el proyecto definido.'],
    ],
    related: ['plataformas-web-y-saas', 'integracion-de-inteligencia-artificial'],
  },
  {
    slug: 'plataformas-web-y-saas',
    name: 'Plataformas web y SaaS',
    icon: 'stack',
    metaTitle: 'Desarrollo de plataformas web y SaaS | MateLabs',
    metaDescription: 'Construimos plataformas web y productos SaaS completos: frontend, backend y arquitectura, de la idea a producción. Estudio de software en Rosario.',
    h1: 'Plataformas web y productos SaaS',
    lead: 'Llevamos una idea de producto digital a una plataforma que funciona en producción: experiencia de usuario, backend, infraestructura y la arquitectura necesaria para que pueda crecer.',
    sections: [
      {
        h2: 'Qué es una plataforma web o un SaaS',
        p: [
          'Una plataforma web es una aplicación a la que tus usuarios acceden desde el navegador, con cuentas, datos y funciones propias. Un SaaS (software como servicio) es ese mismo modelo ofrecido a varios clientes o negocios, normalmente con una suscripción.',
          'Construir un producto de este tipo implica decisiones que van más allá de las pantallas: cómo se organizan las cuentas, cómo se guardan y protegen los datos y cómo se cobra o se habilita el acceso.',
        ],
      },
      {
        h2: 'Qué incluye el desarrollo',
        p: ['Cubrimos las partes que hacen falta para que el producto funcione de verdad:'],
        bullets: [
          'Diseño de la experiencia y de las pantallas principales.',
          'Frontend web adaptado a computadora y celular.',
          'Backend, base de datos y APIs.',
          'Cuentas de usuario, roles y permisos.',
          'Integración con medios de pago, correo y otros servicios cuando el producto los necesita.',
          'Publicación en un entorno de producción y base para el mantenimiento posterior.',
        ],
      },
      {
        h2: 'Un ejemplo propio: Mateturnos',
        p: [
          'Mateturnos es un producto propio de MateLabs para organizar la agenda y recibir reservas online. La plataforma web está disponible y la app para Android se encuentra en beta, con acceso por invitación y sin publicación en tiendas.',
          'Trabajar en un producto propio nos permite conocer de primera mano los desafíos de sostener una plataforma en producción.',
        ],
      },
    ],
    faqs: [
      ['¿Cuál es la diferencia entre una web y una plataforma?', 'Una web informa; una plataforma permite que los usuarios hagan cosas: registrarse, cargar datos, reservar, pagar o gestionar su cuenta. Esa lógica requiere un backend y una base de datos.'],
      ['¿Pueden desarrollar un SaaS desde cero?', 'Sí. Podemos acompañar desde la definición del producto y de la primera versión hasta la puesta en producción.'],
      ['¿Y si ya tengo algo hecho?', 'Podemos revisar lo que existe, evaluar su estado y definir si conviene continuarlo, ordenarlo o reconstruir partes.'],
      ['¿La plataforma puede tener también una app móvil?', 'Puede. Si el proyecto necesita una app para celulares, la planteamos sobre la misma base. Para ese tipo de proyectos también trabajamos desde Apps Rosario.'],
    ],
    related: ['desarrollo-de-software-a-medida', 'integracion-de-inteligencia-artificial'],
  },
  {
    slug: 'integracion-de-inteligencia-artificial',
    name: 'Integración de inteligencia artificial',
    icon: 'sparkle',
    metaTitle: 'Integración de inteligencia artificial en negocios | MateLabs',
    metaDescription: 'Integramos IA, agentes y automatización en procesos reales de tu negocio, donde aportan valor. Estudio de software en Rosario, Argentina.',
    h1: 'Integración de inteligencia artificial en tu negocio',
    lead: 'Incorporamos inteligencia artificial y automatización en procesos concretos: atención de consultas, clasificación de información, tareas repetitivas. Solo donde aporta valor, no como moda.',
    sections: [
      {
        h2: 'Dónde puede ayudar la IA',
        p: [
          'La IA aporta cuando hay tareas con mucho texto, información dispersa o decisiones repetitivas que hoy consumen tiempo. No reemplaza el criterio de tu equipo: lo libera de lo mecánico.',
        ],
        bullets: [
          'Asistentes y agentes que responden consultas frecuentes con información de tu negocio.',
          'Clasificación y resumen de mensajes, documentos o formularios.',
          'Automatización de tareas entre sistemas: cargar, validar y derivar datos.',
          'Búsqueda y consulta sobre documentación interna.',
        ],
      },
      {
        h2: 'Cómo trabajamos un proyecto con IA',
        p: [
          'Empezamos por el proceso, no por la herramienta: qué tarea queremos mejorar, qué datos hay y cómo se mide si funciona. Después probamos con un caso acotado y recién entonces lo integramos a tus sistemas.',
          'Los modelos de lenguaje pueden equivocarse, por eso diseñamos las soluciones con controles, límites claros y revisión humana donde corresponde.',
        ],
      },
      {
        h2: 'Integración con lo que ya usás',
        p: [
          'Una automatización sirve cuando se conecta con tus herramientas actuales. Evaluamos qué interfaces ofrecen tus sistemas y diseñamos la integración antes de definir el alcance.',
        ],
      },
    ],
    faqs: [
      ['¿Mi negocio necesita inteligencia artificial?', 'No necesariamente. Si el proceso se resuelve bien con reglas simples o con una herramienta existente, te lo vamos a decir. Evaluamos cada caso antes de proponer una solución.'],
      ['¿Qué datos necesito tener?', 'Depende del caso. Algunas soluciones usan documentos o mensajes que ya tenés; otras necesitan ordenar la información primero. Lo revisamos al inicio.'],
      ['¿Qué pasa con la privacidad de la información?', 'La definimos en el diseño: qué datos se envían a qué servicio, cuáles no deben salir de tu entorno y cómo se resguardan. Es un punto central que se acuerda antes de desarrollar.'],
      ['¿Puedo empezar con una prueba chica?', 'Sí, es la forma que recomendamos: un caso acotado, con un objetivo claro, para validar el valor antes de ampliar.'],
    ],
    related: ['desarrollo-de-software-a-medida', 'plataformas-web-y-saas'],
  },
];

export const bySlug = (slug: string) => services.find((s) => s.slug === slug)!;
