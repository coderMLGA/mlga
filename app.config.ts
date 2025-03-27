import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
//config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    baseURL: "/mlga/",
    preset: "githubPages",
  },
});
