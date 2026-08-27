import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "next-themes", "react-hot-toast"],
          "vendor-dnd": ["@dnd-kit/core", "@dnd-kit/sortable", "@dnd-kit/utilities"],
          "vendor-motion": ["framer-motion", "motion"],
          "vendor-ui": ["lucide-react", "react-dropzone"]
        }
      }
    }
  },
  server: {
    port: 10001,
    strictPort: true,
    proxy: {
      "/process": "http://localhost:10002"
    }
  }
});
