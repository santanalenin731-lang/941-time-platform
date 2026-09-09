import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/941-time-platform/',
  server: {
    port: 3000,
    host: true
  }
})
