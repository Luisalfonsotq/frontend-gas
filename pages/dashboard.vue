<!-- pages/dashboard.vue -->
<template>
  <div>
    <!-- Dashboard según rol del usuario (roles del proyecto gas) -->
    <DashboardAdmin       v-if="user?.rol === 'ADMIN'" />
    <DashboardJefe        v-else-if="user?.rol === 'JEFE'" />
    <DashboardImpulsador  v-else-if="user?.rol === 'IMPULSADOR'" />
    <DashboardLector      v-else-if="user?.rol === 'LECTOR'" />

    <!-- Cargando sesión -->
    <div v-else-if="!user" class="flex items-center justify-center min-h-[60vh]">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-600 mx-auto mb-4"></div>
        <p class="text-slate-500 font-medium">Cargando sesión...</p>
      </div>
    </div>

    <!-- Rol no reconocido -->
    <div v-else class="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md border border-slate-100">
      <div class="text-center">
        <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-slate-800 mb-2">Rol no reconocido</h2>
        <p class="text-slate-500 mb-6">
          Tu rol <strong class="text-orange-600">"{{ user?.rol }}"</strong> no tiene un panel configurado.
          Contacta al administrador del sistema.
        </p>
        <NuxtLink to="/login"
          class="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-300">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al inicio de sesión
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/useAuth';
import DashboardAdmin      from '@/components/dashboards/DashboardAdmin.vue';
import DashboardJefe       from '@/components/dashboards/DashboardJefe.vue';
import DashboardImpulsador from '@/components/dashboards/DashboardImpulsador.vue';
import DashboardLector     from '@/components/dashboards/DashboardLector.vue';

definePageMeta({ layout: 'profile-layout' });

const { user } = useAuth();
</script>