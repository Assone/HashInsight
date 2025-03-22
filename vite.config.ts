import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";
import wasm from "vite-plugin-wasm";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    compression(),
    compression({ algorithm: "brotliCompress" }),
  ],
  worker: {
    plugins: () => [wasm(), tsconfigPaths()],
  },
});
