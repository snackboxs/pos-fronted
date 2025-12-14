import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
   server: {
      port: 3000,
      open: true,
      proxy: {
         "/api": {
            target: "http://localhost:8080",
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/api/, ""),
         },
      },
   },
   plugins: [react(), tailwindcss()],
   resolve: {
      alias: {
         "@": path.resolve(__dirname, "./src"),
      },
   },
});
