import {build, defineConfig} from 'vite';
import dts from 'vite-plugin-dts';

await build({
  ...defineConfig({
    build: {
      outDir: './dist',
      lib: {
        entry: ['./src/strangelove-solid.ts'],
        formats: ['es'],
      },
      rollupOptions: {
        external: ['strangelove', 'solid-js'],
      },
    },
    plugins: [
      dts({
        outDir: './dist/types',
        tsconfigPath: './tsconfig.json',
      }),
    ],
  }),
});
