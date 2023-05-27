import {build, defineConfig} from 'vite';

await build({
  ...defineConfig({
    build: {
      outDir: './dist',
      lib: {
        entry: ['./src/strangelove.js'],
        formats: ['es', 'cjs'],
      },
    },
  }),
});
