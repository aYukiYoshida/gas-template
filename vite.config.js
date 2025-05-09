import path from "path";
import { defineConfig } from "vite";
import typescript from "@rollup/plugin-typescript";
import rollupPluginGas from "rollup-plugin-google-apps-script";

export default defineConfig({
  plugins: [
    rollupPluginGas(),
    typescript(),
  ],
  build: {
    rollupOptions: {
      input: "src/index.ts",
      output: {
        dir: "dist",
        entryFileNames: "main.js",
        emptyOutDir: false,
      }
    },
    emptyOutDir: false,
    minify: false, // trueにすると関数名が消えるのでfalse必須
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
