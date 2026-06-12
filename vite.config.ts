import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    imagetools({
      // Process all image imports, not just those with query params.
      include: ["**/*.{jpg,jpeg,png,gif,webp,avif,tiff}"],
      // Convert everything to WebP at quality 80 by default — no query params needed in imports.
      defaultDirectives: new URLSearchParams("format=webp&quality=80"),
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom"],
  },
});
