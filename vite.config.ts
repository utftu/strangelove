import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "esnext",
    outDir: "./dist",
    lib: {
      entry: ["./src/strangelove.ts"],
      formats: ["es"],
    },
  },
});
