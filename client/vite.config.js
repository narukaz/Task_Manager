import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '192.168.29.10', // or '0.0.0.0' to listen on all addresses
    port: 5173,
  },
  plugins: [react(),tailwindcss(),],
})
