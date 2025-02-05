import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

/** @type {import("vite").UserConfig} */
const config = {
  plugins: [wasm(), topLevelAwait()],
  // optimizeDeps: {
  //   exclude: process.env.NODE_ENV === "production" ? [] : ["@rerun-io/web-viewer"],
  // },
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
    copyPublicDir: true
  }
};

if ("REPOSITORY" in process.env) {
  config.base = `/${process.env.REPOSITORY}/`;
}

export default config;

// import { defineConfig } from 'vite'

// export default defineConfig({
//   base: './', // This is important for GitHub Pages
//   publicDir: 'static',
//   build: {
//     outDir: 'dist',
//     assetsDir: 'assets',
//   }
// })