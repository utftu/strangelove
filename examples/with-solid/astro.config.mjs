import {defineConfig} from 'astro/config'; // https://astro.build/config

import solid from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  integrations: [solid()],
});
