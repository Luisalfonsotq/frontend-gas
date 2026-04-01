import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2026-03-31',

  // Módulos
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@pinia/nuxt',
  ],

  // Importante para Offline-first con indexedDB
  ssr: false,

  // Devtools
  devtools: { enabled: false },

  // Vite optimization to prevent page reloads when dynamically loading dependencies
  vite: {
    optimizeDeps: {
      include: ['vue3-apexcharts']
    }
  },

  // RuntimeConfig para exponer variables de entorno
  runtimeConfig: {
    public: {
      // Esta variable leerá NUXT_PUBLIC_API_BASE_URL del .env
      apiBaseUrl: ''
    }
  }

})