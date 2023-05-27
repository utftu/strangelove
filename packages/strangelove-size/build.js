import {build, defineConfig} from 'vite';

await build({
  ...defineConfig({
    build: {
      outDir: './dist',
      name: 'strangelove-size',
      lib: {
        fileName: 'strangelove-size',
        entry: ['./src/strangelove-size.js'],
        formats: ['es', 'cjs'],
      },
      rollupOptions: {},
    },
  }),
});
