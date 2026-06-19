import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// Configuração do Vite com React, Tailwind v4 e alias "@" para a pasta src.
// `base`: em produção a app é publicada em github.io/Lumetest2/, por isso
// precisa do prefixo "/Lumetest2/". Em desenvolvimento usamos "/".
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/Lumetest2/" : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
