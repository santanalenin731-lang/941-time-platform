import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.png', '941am.PNG'],
      manifest: {
        name: '9:41 AM — Time, beautifully simple',
        short_name: '9:41 AM',
        description: 'La hora exacta con el diseño más puro y minimalista.',
        theme_color: '#071A33',
        background_color: '#F8FAFC',
        display: 'standalone',
        icons: [
          {
            src: 'logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    })
  ],
  // base: '/941-time-platform/',
  server: {
    port: 3000,
    host: true
  }
})
