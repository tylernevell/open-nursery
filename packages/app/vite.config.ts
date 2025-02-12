import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), tsconfigPaths(), TanStackRouterVite({}), react()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
});
