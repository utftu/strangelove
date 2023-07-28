import {build, defineConfig} from 'vite';
import dts from 'vite-plugin-dts';

await build({
  ...defineConfig({
    build: {
      outDir: './dist',
      lib: {
        entry: ['./src/strangelove-svelte.ts'],
        formats: ['es'],
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
