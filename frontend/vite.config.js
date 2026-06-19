import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/registration": "http://localhost:3500",
      "/authorization": "http://localhost:3500",
      "/refresh-token": "http://localhost:3500",
      "/profile": "http://localhost:3500",
      // ... другие API маршруты
    },
  },
});
