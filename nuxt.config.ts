import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2026-03-31',

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/fuego.png' }
      ],
      style: [
        // Transici\u00f3n suave al cambiar de modo sin parpadeo
        { innerHTML: 'html { transition: background-color 0.3s ease, color 0.3s ease; }' }
      ],
      script: [
        // Anti-FOUC: aplica clase dark antes de que Vue arranque
        {
          innerHTML: `(function(){
            var saved = localStorage.getItem('darkMode');
            var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (saved === 'true' || (saved === null && prefersDark)) {
              document.documentElement.classList.add('dark');
            }
          })();`,
          type: 'text/javascript'
        }
      ]
    }
  },

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