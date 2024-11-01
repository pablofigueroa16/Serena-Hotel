import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
  },
  rollupOptions: {
    output: {
      manualChunks(id) {
        if (id.includes("node_modules")) {
          return id.split("node_modules/")[1].split("/")[0].toString(); // Crea un chunk por cada módulo en node_modules
        }
      },
    },
  },
});
