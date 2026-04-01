<!-- layouts/public.vue -->
<template>
  <div class="flex flex-col min-h-screen bg-gradient-to-b from-orange-50 to-white">

    <!-- Header -->
    <header class="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-50 border-b-2 border-orange-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 md:h-20">

          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center space-x-3 group">
            <div class="w-9 h-9 md:w-11 md:h-11 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-md">
              <span class="text-white text-xl md:text-2xl">🔥</span>
            </div>
            <div class="flex flex-col leading-tight">
              <span class="font-extrabold text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-800 tracking-tight">
                GasField
              </span>
              <span class="text-xs text-gray-500 font-medium -mt-0.5 hidden md:block">Gas Natural · Colombia</span>
            </div>
          </NuxtLink>

          <!-- Indicador offline (badge PWA) -->
          <div class="hidden md:flex items-center gap-2 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-200">
            <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block"></span>
            Modo Offline Disponible
          </div>

          <!-- Nav Desktop -->
          <nav class="hidden md:flex items-center space-x-5">
            <a
              href="#funcionalidades"
              class="font-semibold text-gray-700 hover:text-orange-600 transition-colors duration-300 relative group text-base"
            >
              Funcionalidades
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
            </a>

            <!-- Login -->
            <NuxtLink
              to="/login"
              class="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2.5 px-6 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Iniciar sesión
            </NuxtLink>
          </nav>

          <!-- Hamburguesa Mobile -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 rounded-lg hover:bg-orange-50 transition-colors duration-300"
            :aria-label="mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'"
          >
            <svg v-if="!mobileMenuOpen" class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <svg v-else class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Menu Mobile -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-96"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 max-h-96"
          leave-to-class="opacity-0 max-h-0"
        >
          <div v-show="mobileMenuOpen" class="md:hidden pb-4 space-y-3 overflow-hidden">
            <a
              href="#funcionalidades"
              @click="mobileMenuOpen = false"
              class="block w-full text-center font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 py-3 px-4 rounded-lg transition-all duration-300"
            >
              Funcionalidades
            </a>

            <NuxtLink
              to="/login"
              @click="mobileMenuOpen = false"
              class="block w-full text-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition-all duration-300"
            >
              Iniciar sesión
            </NuxtLink>
          </div>
        </Transition>
      </div>
    </header>

    <!-- Contenido -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Footer from '~/components/Footer.vue'

const mobileMenuOpen = ref(false)

const route = useRoute()
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>

<style scoped>
header {
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.97);
}

.max-h-0 { max-height: 0; }
.max-h-96 { max-height: 24rem; }
</style>