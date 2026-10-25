import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        pricing: resolve(import.meta.dirname, 'pricing/index.html'),
        superbikes: resolve(import.meta.dirname, 'superbikes/index.html'),
        tandemKarts: resolve(import.meta.dirname, 'tandem-karts/index.html'),
        location: resolve(import.meta.dirname, 'location/index.html'),
        apexCafe: resolve(import.meta.dirname, 'apex-cafe/index.html'),
      },
    },
  },
})
