// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  vite: {
      resolve: {
          alias: {
              $styles: '/src/styles',
              $components: '/src/components',
              $layouts: '/src/layouts',
          },
      },
  },

  integrations: [icon(),],
});
