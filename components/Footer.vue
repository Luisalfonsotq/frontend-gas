<template>
  <footer class="bg-gradient-to-br from-gray-900 via-gray-800 to-orange-950 text-white">
    <div class="max-w-7xl mx-auto px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">

        <!-- Marca GasField -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl flex items-center justify-center shadow-md">
              <span class="text-xl">🔥</span>
            </div>
            <div class="flex flex-col leading-tight">
              <span class="font-extrabold text-xl text-orange-400 tracking-tight">GasField</span>
              <span class="text-xs text-gray-400">Gas Natural · Colombia</span>
            </div>
          </div>
          <p class="text-gray-400 text-sm mb-5 leading-relaxed">
            Sistema de gestión de campo para empresas de gas natural. Operación offline-first
            diseñada para zonas rurales de baja conectividad en Colombia.
          </p>
          <!-- Badge Habeas Data -->
          <div class="inline-flex items-center gap-2 bg-orange-900/40 border border-orange-700/40 text-orange-300 text-xs font-medium px-3 py-1.5 rounded-full">
            🛡️ Cumple Ley 1581 - Habeas Data
          </div>
        </div>

        <!-- Navegación -->
        <div>
          <h4 class="text-sm font-bold mb-4 text-orange-400 uppercase tracking-wider">Módulos</h4>
          <ul class="space-y-2.5 text-sm">
            <li>
              <NuxtLink to="/" class="text-gray-400 hover:text-orange-300 transition-colors duration-200 flex items-center gap-2">
                <span class="text-orange-600">›</span> Inicio
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/dashboard" class="text-gray-400 hover:text-orange-300 transition-colors duration-200 flex items-center gap-2">
                <span class="text-orange-600">›</span> Dashboard
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/login" class="text-gray-400 hover:text-orange-300 transition-colors duration-200 flex items-center gap-2">
                <span class="text-orange-600">›</span> Iniciar Sesión
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Tecnología -->
        <div>
          <h4 class="text-sm font-bold mb-4 text-orange-400 uppercase tracking-wider">Tecnología</h4>
          <ul class="space-y-2.5 text-sm text-gray-400">
            <li class="flex items-center gap-2">
              <span class="text-green-400">✓</span> Offline-First (PWA)
            </li>
            <li class="flex items-center gap-2">
              <span class="text-green-400">✓</span> Sincronización automática
            </li>
            <li class="flex items-center gap-2">
              <span class="text-green-400">✓</span> Mapas sin internet (Leaflet)
            </li>
            <li class="flex items-center gap-2">
              <span class="text-green-400">✓</span> Captura biométrica
            </li>
            <li class="flex items-center gap-2">
              <span class="text-green-400">✓</span> UUID offline (sin colisiones)
            </li>
            <li class="flex items-center gap-2">
              <span class="text-green-400">✓</span> Jerarquía DANE
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h4 class="text-sm font-bold mb-4 text-orange-400 uppercase tracking-wider">Legal</h4>
          <ul class="space-y-2.5 text-sm">
            <li>
              <NuxtLink to="/privacidad" class="text-gray-400 hover:text-orange-300 transition-colors duration-200 flex items-center gap-2">
                <span class="text-orange-600">›</span> Política de Privacidad
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/terminos" class="text-gray-400 hover:text-orange-300 transition-colors duration-200 flex items-center gap-2">
                <span class="text-orange-600">›</span> Términos y Condiciones
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/habeas-data" class="text-gray-400 hover:text-orange-300 transition-colors duration-200 flex items-center gap-2">
                <span class="text-orange-600">›</span> Habeas Data (Ley 1581)
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/seguridad" class="text-gray-400 hover:text-orange-300 transition-colors duration-200 flex items-center gap-2">
                <span class="text-orange-600">›</span> Política de Seguridad
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Separador -->
      <div class="border-t border-gray-700/50 my-8"></div>

      <!-- Footer Bottom -->
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>© {{ currentYear }} GasField — Sistema de Gestión de Campo para Gas Natural. Colombia.</p>
        <div class="flex items-center gap-2">
          <span>Hecho con</span>
          <svg class="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
          </svg>
          <span>para el campo colombiano</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>