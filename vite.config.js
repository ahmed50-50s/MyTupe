import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => ({
  plugins: [tailwindcss(), react()],
  server: {
    proxy:
      mode === "development"
        ? {
            "/api": {
              target: "https://serpapi.com",
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, ""),
            },
          }
        : undefined,
  },
}));
