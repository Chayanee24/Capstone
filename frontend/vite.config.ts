// frontend/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [
      'barcelona-galaxy-liberty-per.trycloudflare.com',
    ],
    port: 5173, // ✅ เปลี่ยนกลับมาใช้ 5173
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
