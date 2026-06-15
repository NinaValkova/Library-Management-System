import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/auth": {
        target: "http://localhost:4000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/auth/, "/auth"),
      },
      "/api/catalog": {
        target: "http://localhost:4001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/catalog/, ""),
      },
      "/api/borrow": {
        target: "http://localhost:4002",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/borrow/, ""),
      },
      "/api/rating": {
        target: "http://localhost:4003",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/rating/, ""),
      },
    },
  },
});