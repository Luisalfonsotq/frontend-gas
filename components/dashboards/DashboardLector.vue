<!-- components/dashboards/DashboardLector.vue -->
<!-- Panel para el rol LECTOR: toma de lecturas de medidores en ruta -->
<template>
  <div class="space-y-8 animate-fade-in">

    <!-- Header -->
    <div class="bg-gradient-to-r from-violet-900 via-violet-800 to-slate-900 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
      <div class="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-violet-400 opacity-10 rounded-full blur-3xl"></div>
      <div class="relative z-10 flex flex-col md:flex-row items-center gap-6">
        <div class="w-20 h-20 bg-gradient-to-br from-violet-500 to-violet-700 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
          <svg class="w-11 h-11 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div class="text-center md:text-left">
          <p class="text-violet-300 text-sm font-semibold uppercase tracking-widest mb-1">Panel Lector de Medidores</p>
          <h1 class="text-3xl font-bold tracking-tight">Hola, {{ user?.nombre || 'Lector' }}</h1>
          <p class="text-slate-300 mt-1">Toma de lecturas en ruta · GasField Colombia</p>
          <div class="flex items-center justify-center md:justify-start gap-3 mt-3">
            <span class="px-3 py-1 bg-violet-500/30 border border-violet-400/40 rounded-full text-sm font-medium">📊 LECTOR</span>
            <span class="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm font-medium flex items-center gap-1">
              <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Offline Ready
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Acción principal -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <NuxtLink to="/lecturas/crear"
        class="group flex flex-col items-center justify-center gap-3 p-8 bg-gradient-to-br from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:bg-white/30 transition">
          <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <div class="text-center">
          <p class="text-xl font-bold">Nueva Lectura</p>
          <p class="text-violet-100 text-sm mt-0.5">Registrar consumo de medidor</p>
        </div>
      </NuxtLink>

      <NuxtLink to="/lecturas"
        class="group flex flex-col items-center justify-center gap-3 p-8 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div class="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition">
          <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <div class="text-center">
          <p class="text-xl font-bold">Mis Lecturas</p>
          <p class="text-slate-300 text-sm mt-0.5">Historial de este mes</p>
        </div>
      </NuxtLink>
    </div>

    <!-- Stats + Ruta del día -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- Stats del día -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h2 class="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
          <span class="w-1.5 h-6 bg-violet-500 rounded-full"></span>
          Resumen de Ruta
        </h2>

        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5">
          <div v-for="stat in routeStats" :key="stat.label"
            class="text-center p-4 rounded-xl border"
            :class="stat.cardBg">
            <svg class="w-6 h-6 mx-auto mb-2" :class="stat.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="stat.icon" />
            </svg>
            <p class="text-2xl font-bold" :class="stat.valueColor">{{ stat.value }}</p>
            <p class="text-xs text-slate-500 mt-0.5">{{ stat.label }}</p>
          </div>
        </div>

        <!-- Validación de lectura -->
        <div class="p-4 bg-amber-50 border border-amber-100 rounded-xl">
          <p class="text-sm font-semibold text-amber-800 mb-1 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Regla de negocio
          </p>
          <p class="text-xs text-amber-700">
            La lectura actual <strong>nunca puede ser inferior a la anterior</strong>.
            El consumo se calcula automáticamente: <code class="bg-amber-100 px-1 rounded">lectura_actual − lectura_anterior</code>.
          </p>
        </div>
      </div>

      <!-- Offline y acciones rápidas -->
      <div class="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col gap-4">
        <h2 class="text-lg font-bold text-slate-800 flex items-center gap-2">
          <span class="w-1.5 h-6 bg-orange-500 rounded-full"></span>
          Acciones
        </h2>

        <div class="space-y-2">
          <NuxtLink v-for="action in lectorActions" :key="action.label" :to="action.path"
            class="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all duration-200 group">
            <div :class="['p-2 rounded-lg', action.iconBg, 'group-hover:scale-110 transition-transform']">
              <svg class="w-4 h-4" :class="action.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="action.icon" />
              </svg>
            </div>
            <p class="text-sm font-medium text-slate-700">{{ action.label }}</p>
            <svg class="w-4 h-4 text-slate-300 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Estado offline -->
        <div class="p-3 bg-green-50 border border-green-100 rounded-xl mt-auto">
          <p class="text-xs text-green-700 font-semibold flex items-center gap-1">
            <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block"></span>
            Modo offline activo
          </p>
          <p class="text-xs text-green-600 mt-1">Lecturas se guardan localmente y se sincronizan con foto de evidencia al recuperar señal.</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/useAuth';

const { user } = useAuth();

const routeStats = [
  { label: 'Lecturas hoy', value: '0', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10', cardBg: 'bg-violet-50 border-violet-100', iconColor: 'text-violet-500', valueColor: 'text-violet-700' },
  { label: 'Medidores visitados', value: '0', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', cardBg: 'bg-green-50 border-green-100', iconColor: 'text-green-500', valueColor: 'text-green-700' },
  { label: 'Sin sincronizar', value: '0', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', cardBg: 'bg-orange-50 border-orange-100', iconColor: 'text-orange-500', valueColor: 'text-orange-700' },
];

const lectorActions = [
  { label: 'Buscar medidor', path: '/clientes', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', iconBg: 'bg-blue-50', iconColor: 'text-blue-600' },
  { label: 'Ver mapa de ruta', path: '/mapa', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4', iconBg: 'bg-teal-50', iconColor: 'text-teal-600' },
  { label: 'Sincronizar datos', path: '/sync', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', iconBg: 'bg-orange-50', iconColor: 'text-orange-600' },
];
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
</style>
