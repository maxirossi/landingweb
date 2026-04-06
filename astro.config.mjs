import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://matelabs.site',
  integrations: [
    tailwind({ applyBaseStyles: false })
  ]
});
