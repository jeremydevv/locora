import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // important for Cloudflare Pages
  build: {
    outDir: "dist",       // Cloudflare expects this
    emptyOutDir: true,    // clears old builds before output
  },
})
