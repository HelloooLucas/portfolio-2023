import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: "./index.html",
        "sopra-banking": "./sopra-banking.html",
        "last-quest": "./last-quest.html",
        "solers-io": "./solers-io.html",
        "atelier-tote-bag": "./atelier-tote-bag.html",
        about: "./about.html",
      },
    },
  },
});
