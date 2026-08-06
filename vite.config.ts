import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/JuradoInvisible/',
  plugins: [
    vue(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'favicon-16x16.png', 'favicon-32x32.png', 'apple-touch-icon.png'],
      manifest: {
        name: 'El Jurado Invisible',
        short_name: 'Jurado Invisible',
        description: 'Simulador social educativo: dinámicas grupales y acoso escolar',
        theme_color: '#201a15',
        background_color: '#201a15',
        display: 'standalone',
        lang: 'es',
        icons: [
          {
            src: '/JuradoInvisible/assets/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/JuradoInvisible/assets/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/JuradoInvisible/assets/icons/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
})