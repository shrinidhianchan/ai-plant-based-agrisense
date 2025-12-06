// frontend/vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  // 💥 ADDED: Fixes pathing for GitHub Pages deployment to a subfolder
  base: './', 
  
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});