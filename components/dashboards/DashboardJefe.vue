<!-- components/dashboards/DashboardJefe.vue -->
<!-- Panel para el rol JEFE: Supervisión de impulsadores y lectores en su zona -->
<template>
  <div class="space-y-8 animate-fade-in">

    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
      <div class="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-blue-400 opacity-10 rounded-full blur-3xl"></div>
      <div class="relative z-10 flex flex-col md:flex-row items-center gap-6">
        <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
          <svg class="w-11 h-11 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div class="text-center md:text-left">
          <p class="text-blue-300 text-sm font-semibold uppercase tracking-widest mb-1">Panel Jefe de Zona</p>
          <h1 class="text-3xl font-bold tracking-tight">Hola, {{ user?.nombre || 'Jefe' }}</h1>
          <p class="text-slate-300 mt-1">Supervisa tu equipo de campo · GasField Colombia</p>
          <div class="flex items-center justify-center md:justify-start gap-3 mt-3">
            <span class="px-3 py-1 bg-blue-500/30 border border-blue-400/40 rounded-full text-sm font-medium">👔 JEFE</span>
            <span class="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm font-medium">📅 {{ today }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- KPIs -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <div v-for="kpi in kpis" :key="kpi.label"
        class="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition-all duration-300"
        :class="kpi.border">
        <div :class="['w-10 h-10 rounded-xl flex items-center justify-center mb-3', kpi.iconBg]">
          <svg class="w-5 h-5" :class="kpi.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="kpi.icon" />
          </svg>
        </div>
        <p class="text-sm text-slate-500 font-medium">{{ kpi.label }}</p>
        <p class="text-3xl font-bold text-slate-800 mt-0.5">{{ kpi.value }}</p>
        <p class="text-xs mt-1" :class="kpi.subColor">{{ kpi.sub }}</p>
      </div>
    </div>

    <!-- Acciones + Estado equipo -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <!-- Acciones del Jefe -->
      <div class="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h2 class="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
          <span class="w-1.5 h-6 bg-blue-500 rounded-full"></span>
          Gestión de Zona
        </h2>
        <div class="grid grid-cols-1 gap-3">
          <NuxtLink v-for="action in jefeActions" :key="action.label" :to="action.path"
            class="flex items-center gap-4 p-3.5 rounded-xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group">
            <div :class="['p-2.5 rounded-xl', action.iconBg, 'group-hover:scale-110 transition-transform duration-200']">
              <svg class="w-5 h-5" :class="action.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="action.icon" />
              </svg>
            </div>
            <div>
              <p class="font-semibold text-slate-800 text-sm">{{ action.label }}</p>
              <p class="text-xs text-slate-500">{{ action.desc }}</p>
            </div>
            <svg class="w-4 h-4 text-slate-300 ml-auto group-hover:text-blue-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- Estado del equipo -->
      <div class="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h2 class="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
          <span class="w-1.5 h-6 bg-green-500 rounded-full"></span>
          Resumen de Zona
        </h2>
        <div class="space-y-3">
          <div v-for="item in zoneSummary" :key="item.label"
            class="flex items-center gap-3 p-3 rounded-xl"
            :class="item.bg">
            <div :class="['p-2 rounded-lg', item.iconBg]">
              <svg class="w-4 h-4" :class="item.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-semibold" :class="item.textColor">{{ item.label }}</p>
              <p class="text-xs text-slate-400">{{ item.sub }}</p>
            </div>
            <span class="text-xl font-bold" :class="item.valueColor">{{ item.value }}</span>
          </div>
        </div>

        <!-- Nota offline -->
        <div class="mt-4 p-3 bg-orange-50 border border-orange-100 rounded-xl flex items-center gap-2">
          <svg class="w-4 h-4 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
          <p class="text-xs text-orange-700 font-medium">Modo Offline-First activo. Los datos se sincronizan al recuperar señal.</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuth } from '@/composables/useAuth';

const { user } = useAuth();

const today = computed(() => new Date().toLocaleDateString('es-CO', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
}));

const kpis = [
  { label: 'Impulsadores activos', value: '—', sub: 'En tu zona', subColor: 'text-blue-500', iconBg: 'bg-blue-50', iconColor: 'text-blue-600', border: 'border-blue-100', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { label: 'Prospectos del mes', value: '—', sub: 'Nuevos registros', subColor: 'text-green-500', iconBg: 'bg-green-50', iconColor: 'text-green-600', border: 'border-green-100', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' },
  { label: 'Lecturas tomadas', value: '—', sub: 'Este período', subColor: 'text-orange-500', iconBg: 'bg-orange-50', iconColor: 'text-orange-600', border: 'border-orange-100', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10' },
  { label: 'Sin sincronizar', value: '0', sub: 'Pendientes offline', subColor: 'text-slate-400', iconBg: 'bg-slate-50', iconColor: 'text-slate-500', border: 'border-slate-100', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
];

const jefeActions = [
  { label: 'Ver Prospectos', desc: 'Clientes registrados en zona', path: '/clientes', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', iconBg: 'bg-blue-50', iconColor: 'text-blue-600' },
  { label: 'Lecturas de Medidores', desc: 'Revisión de consumos', path: '/lecturas', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10', iconBg: 'bg-orange-50', iconColor: 'text-orange-600' },
  { label: 'Facturas Pendientes', desc: 'PENDIENTE / VENCIDO', path: '/facturas', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z', iconBg: 'bg-red-50', iconColor: 'text-red-600' },
  { label: 'Gestionar Equipo', desc: 'IMPULSADOR · LECTOR', path: '/usuarios', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197', iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600' },
  { label: 'Mapa de Zona', desc: 'Clientes geolocalizados', path: '/mapa', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7', iconBg: 'bg-teal-50', iconColor: 'text-teal-600' },
];

const zoneSummary = [
  { label: 'Clientes con medidor', sub: 'Instalados y activos', value: '—', bg: 'bg-green-50', iconBg: 'bg-green-100', iconColor: 'text-green-700', textColor: 'text-green-800', valueColor: 'text-green-700', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Con mora', sub: 'Facturas vencidas', value: '—', bg: 'bg-red-50', iconBg: 'bg-red-100', iconColor: 'text-red-700', textColor: 'text-red-800', valueColor: 'text-red-700', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
  { label: 'Prospectos pendientes', sub: 'Sin convertir aún', value: '—', bg: 'bg-yellow-50', iconBg: 'bg-yellow-100', iconColor: 'text-yellow-700', textColor: 'text-yellow-800', valueColor: 'text-yellow-700', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
];
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
</style>
