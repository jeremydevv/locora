import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/", // important for Cloudflare Pages
  build: {
    outDir: "dist",       // Cloudflare expects this
    emptyOutDir: true,    // clears old builds before output
  },
})
