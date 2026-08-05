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
      includeAssets: ['favicon.svg', 'icons.svg'],
      manifest: {
        name: 'El Jurado Invisible',
        short_name: 'Jurado Invisible',
        description: 'Simulador social educativo: dinámicas grupales y acoso escolar',
        theme_color: '#1e293b',
        background_color: '#0f172a',
        display: 'standalone',
        lang: 'es',
      },
    }),
  ],
})