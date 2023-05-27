import {build, defineConfig} from 'vite';

await build({
  ...defineConfig({
    build: {
      outDir: './dist',
      lib: {
        entry: ['./src/strangelove-solid.js'],
        formats: ['es', 'cjs'],
      },
    },
  }),
});
