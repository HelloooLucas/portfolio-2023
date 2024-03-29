import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      input: {
        index: "./index.html",
        "sopra-banking-software": "./sopra-banking-software.html",
        "last-quest": "./last-quest.html",
        "solers-io": "./solers-io.html",
        "atelier-tote-bag": "./atelier-tote-bag.html",
        about: "./about.html",
      },
    },
  },
});
