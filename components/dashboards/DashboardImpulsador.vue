<!-- components/dashboards/DashboardImpulsador.vue -->
<!-- Panel para el rol IMPULSADOR: registro de prospectos y clientes en campo -->
<template>
  <div class="space-y-8 animate-fade-in">

    <!-- Header -->
    <div class="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
      <div class="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-emerald-400 opacity-10 rounded-full blur-3xl"></div>
      <div class="relative z-10 flex flex-col md:flex-row items-center gap-6">
        <div class="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
          <svg class="w-11 h-11 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div class="text-center md:text-left">
          <p class="text-emerald-300 text-sm font-semibold uppercase tracking-widest mb-1">Panel Impulsador</p>
          <h1 class="text-3xl font-bold tracking-tight">Hola, {{ user?.nombre || 'Impulsador' }}</h1>
          <p class="text-slate-300 mt-1">Registro de prospectos en campo · GasField Colombia</p>
          <div class="flex items-center justify-center md:justify-start gap-3 mt-3">
            <span class="px-3 py-1 bg-emerald-500/30 border border-emerald-400/40 rounded-full text-sm font-medium">🚶 IMPULSADOR</span>
            <span class="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm font-medium flex items-center gap-1">
              <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Offline Ready
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Acciones principales (botones grandes para uso en campo) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <NuxtLink to="/clientes/crear"
        class="group flex flex-col items-center justify-center gap-3 p-8 bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:bg-white/30 transition">
          <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <div class="text-center">
          <p class="text-xl font-bold">Registrar Prospecto</p>
          <p class="text-emerald-100 text-sm mt-0.5">Nuevo cliente potencial</p>
        </div>
      </NuxtLink>

      <NuxtLink to="/clientes"
        class="group flex flex-col items-center justify-center gap-3 p-8 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:bg-white/30 transition">
          <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div class="text-center">
          <p class="text-xl font-bold">Ver Mis Prospectos</p>
          <p class="text-blue-100 text-sm mt-0.5">Clientes registrados hoy</p>
        </div>
      </NuxtLink>
    </div>

    <!-- KPIs del día + info offline -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- Estadísticas del día -->
      <div class="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
        <h2 class="text-lg font-bold text-slate-800 dark:text-white mb-5 flex items-center gap-2">
          <span class="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
          Mi Actividad de Hoy
        </h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div v-for="stat in dayStat" :key="stat.label"
            class="text-center p-4 rounded-xl border"
            :class="stat.cardBg">
            <svg class="w-6 h-6 mx-auto mb-2" :class="stat.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="stat.icon" />
            </svg>
            <p class="text-2xl font-bold" :class="stat.valueColor">{{ stat.value }}</p>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ stat.label }}</p>
          </div>
        </div>

        <!-- Acciones secundarias -->
        <div class="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
          <NuxtLink to="/mapa"
            class="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all duration-200 group">
            <div class="p-2 bg-teal-50 dark:bg-teal-900/30 rounded-lg group-hover:scale-110 transition-transform">
              <svg class="w-4 h-4 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p class="font-semibold text-slate-800 dark:text-white text-sm">Mapa de Zona</p>
              <p class="text-xs text-slate-400 dark:text-slate-500">Ver clientes en mapa</p>
            </div>
          </NuxtLink>
          <NuxtLink to="/sync"
            class="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-700 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-all duration-200 group">
            <div class="p-2 bg-orange-50 dark:bg-orange-900/30 rounded-lg group-hover:scale-110 transition-transform">
              <svg class="w-4 h-4 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div>
              <p class="font-semibold text-slate-800 dark:text-white text-sm">Sincronizar</p>
              <p class="text-xs text-slate-400 dark:text-slate-500">Subir datos offline</p>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Panel offline -->
      <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 flex flex-col gap-4">
        <h2 class="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <span class="w-1.5 h-6 bg-orange-500 rounded-full"></span>
          Estado Offline
        </h2>

        <div class="flex-1 space-y-3">
          <div class="p-3 bg-orange-50 dark:bg-orange-950/40 border border-orange-100 dark:border-orange-900 rounded-xl">
            <div class="flex justify-between items-center mb-2">
              <p class="text-sm font-semibold text-orange-800 dark:text-orange-300">Datos pendientes</p>
              <span class="text-xl font-bold text-orange-600 dark:text-orange-400">{{ pendingCount }}</span>
            </div>
            <p class="text-xs text-orange-600 dark:text-orange-400">Registros listos para sincronizar</p>
          </div>

          <div class="p-3 bg-green-50 dark:bg-green-950/40 border border-green-100 dark:border-green-900 rounded-xl">
            <p class="text-sm font-semibold text-green-800 dark:text-green-300 mb-1">Modo offline activo</p>
            <p class="text-xs text-green-600 dark:text-green-400">Puedes registrar prospectos sin internet. Los datos se enviarán al recuperar señal.</p>
          </div>

          <!-- Botón para limpiar TODOS los datos locales -->
          <button
            @click="limpiarDatosPendientes"
            :disabled="limpiando"
            class="w-full flex items-center justify-center gap-2 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/60 transition-colors text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            {{ limpiando ? 'Limpiando...' : 'Limpiar todos los datos locales' }}
          </button>
        </div>

        <p class="text-xs text-center text-slate-400 dark:text-slate-500">
          Cumplimiento · Ley 1581 (Habeas Data) 🇨🇴
        </p>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { db } from '@/utils/db';

const { user } = useAuth();

// ─── Conteo de TODOS los datos locales en IndexedDB ──────────────────────
const pendingCount = ref(0);
const limpiando = ref(false);

const contarPendientes = async () => {
  try {
    const clientes = await db.clientes.count();
    const biometrias = await db.biometrias.count();
    const medidores = await db.medidores.count();
    const lecturas = await db.lecturas.count();
    pendingCount.value = clientes + biometrias + medidores + lecturas;
    console.log('[DB] pendingCount:', pendingCount.value, '| clientes:', clientes, '| biometrias:', biometrias, '| medidores:', medidores, '| lecturas:', lecturas);
  } catch (e) {
    console.error('[DB] Error contando pendientes:', e);
  }
};

const limpiarDatosPendientes = async () => {
  const totalDatos = pendingCount.value;
  const confirmar = confirm(
    `⚠️ ¿Estás seguro de eliminar TODOS los ${totalDatos} registro(s) locales?\n\n` +
    'Esto incluye prospectos, biometrías, medidores y lecturas almacenados en este dispositivo.\n' +
    'Esta acción NO se puede deshacer.'
  );
  if (!confirmar) return;

  try {
    limpiando.value = true;
    // Limpiar TODAS las tablas completas con .clear()
    await db.clientes.clear();
    await db.biometrias.clear();
    await db.medidores.clear();
    await db.lecturas.clear();
    pendingCount.value = 0;
    alert('✅ Todos los datos locales han sido eliminados correctamente.');
  } catch (e) {
    console.error('Error limpiando datos:', e);
    alert('Error al limpiar los datos. Revisa la consola.');
  } finally {
    limpiando.value = false;
  }
};

onMounted(() => {
  console.log('[DashboardImpulsador] Componente montado');
  contarPendientes();
});

const dayStat = [
  { label: 'Registrados hoy', value: '0', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z', cardBg: 'bg-blue-50 border-blue-100', iconColor: 'text-blue-500', valueColor: 'text-blue-700' },
  { label: 'Convertidos', value: '0', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', cardBg: 'bg-green-50 border-green-100', iconColor: 'text-green-500', valueColor: 'text-green-700' },
  { label: 'Sin sincronizar', value: '0', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', cardBg: 'bg-orange-50 border-orange-100', iconColor: 'text-orange-500', valueColor: 'text-orange-700' },
];
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
</style>
