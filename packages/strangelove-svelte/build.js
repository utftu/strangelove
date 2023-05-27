import {build, defineConfig} from 'vite';

await build({
  ...defineConfig({
    build: {
      outDir: './dist',
      lib: {
        entry: ['./src/strangelove-svelte.js'],
        formats: ['es', 'cjs'],
      },
    },
  }),
});
