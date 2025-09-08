// frontend/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [
      'web-app-rice.vercel.app',
    ],
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://capstone-production-7bf8.up.railway.app',
        changeOrigin: true,
      },
    },
  },
})
