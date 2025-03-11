import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    target: "esnext",
    outDir: `./dist`,
    lib: {
      entry: ["./src/strangelove.ts"],
      formats: ["es"],
    },
  },
  plugins: [
    dts({
      outDir: "./dist/types",
      tsconfigPath: "./tsconfig.types.json",
    }),
  ],
});
