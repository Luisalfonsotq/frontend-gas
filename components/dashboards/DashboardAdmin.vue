<!-- components/dashboards/DashboardAdmin.vue -->
<!-- Panel para el rol ADMIN: Vista global del sistema -->
<template>
  <div class="space-y-8 animate-fade-in">

    <!-- Header de bienvenida -->
    <div class="bg-gradient-to-r from-slate-900 via-orange-950 to-slate-900 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
      <div class="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-orange-500 opacity-10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 -ml-12 -mb-12 w-40 h-40 bg-orange-400 opacity-10 rounded-full blur-2xl"></div>
      <div class="relative z-10 flex flex-col md:flex-row items-center gap-6">
        <div class="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
          <svg class="w-11 h-11 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 23C8 23 4 19.5 4 15c0-2.3.8-4.3 2.1-5.9C7 8 8 6.7 8 5c0-1.1.5-2 1.3-2.6C10.1 1.8 11.1 1.5 12 1.5s1.9.3 2.7.9C15.5 3 16 3.9 16 5c0 1.7 1 3 1.9 4.1C19.2 10.7 20 12.7 20 15c0 4.5-4 8-8 8z"/>
          </svg>
        </div>
        <div class="text-center md:text-left">
          <p class="text-orange-300 text-sm font-semibold uppercase tracking-widest mb-1">Panel Administrador</p>
          <h1 class="text-3xl font-bold tracking-tight">Hola, {{ user?.nombre || 'Administrador' }}</h1>
          <p class="text-slate-300 mt-1">Bienvenido al sistema GasField · Gas Natural Colombia</p>
          <div class="flex items-center justify-center md:justify-start gap-3 mt-3">
            <span class="px-3 py-1 bg-orange-500/30 border border-orange-400/40 rounded-full text-sm font-medium">
              🛡️ ADMIN
            </span>
            <span class="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm font-medium">
              📅 {{ today }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <div v-for="kpi in kpis" :key="kpi.label"
        class="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition-all duration-300 group"
        :class="kpi.borderColor">
        <div class="flex items-start justify-between mb-3">
          <div :class="['p-2.5 rounded-xl', kpi.iconBg]">
            <svg class="w-6 h-6" :class="kpi.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="kpi.icon" />
            </svg>
          </div>
          <span :class="['text-xs font-bold px-2 py-0.5 rounded-full', kpi.badgeBg, kpi.badgeText]">
            {{ kpi.badge }}
          </span>
        </div>
        <p class="text-sm font-medium text-slate-500">{{ kpi.label }}</p>
        <p class="text-3xl font-bold text-slate-800 mt-0.5">{{ kpi.value }}</p>
      </div>
    </div>

    <!-- Acciones rápidas + Actividad reciente -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- Acciones rápidas (2/3) -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h2 class="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
          <span class="w-1.5 h-6 bg-orange-500 rounded-full"></span>
          Acciones Rápidas
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <NuxtLink v-for="action in adminActions" :key="action.label" :to="action.path"
            class="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 group">
            <div :class="['p-2.5 rounded-xl', action.iconBg, 'group-hover:scale-110 transition-transform duration-200']">
              <svg class="w-5 h-5" :class="action.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="action.icon" />
              </svg>
            </div>
            <div>
              <p class="font-semibold text-slate-800 text-sm">{{ action.label }}</p>
              <p class="text-xs text-slate-500">{{ action.desc }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Estado del sistema (1/3) -->
      <div class="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h2 class="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
          <span class="w-1.5 h-6 bg-green-500 rounded-full"></span>
          Estado del Sistema
        </h2>
        <div class="space-y-4">
          <div v-for="item in systemStatus" :key="item.label"
            class="flex items-center justify-between p-3 rounded-xl"
            :class="item.bg">
            <div class="flex items-center gap-2">
              <span :class="['w-2.5 h-2.5 rounded-full', item.dot, item.animate ? 'animate-pulse' : '']"></span>
              <span class="text-sm font-medium" :class="item.textColor">{{ item.label }}</span>
            </div>
            <span class="text-sm font-bold" :class="item.valueColor">{{ item.value }}</span>
          </div>
        </div>

        <!-- Integridad offline -->
        <div class="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
          <p class="text-xs text-slate-500 font-medium mb-1">Sincronización Offline</p>
          <div class="w-full bg-slate-200 rounded-full h-2">
            <div class="bg-orange-500 h-2 rounded-full transition-all duration-500" style="width: 100%"></div>
          </div>
          <p class="text-xs text-orange-600 font-semibold mt-1 text-right">Todo sincronizado ✓</p>
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
  {
    label: 'Prospectos Activos',
    value: '—',
    badge: 'Campo',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    iconBg: 'bg-blue-50', iconColor: 'text-blue-600',
    borderColor: 'border-blue-100',
    badgeBg: 'bg-blue-100', badgeText: 'text-blue-700',
  },
  {
    label: 'Clientes Activos',
    value: '—',
    badge: 'Servicio',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    iconBg: 'bg-green-50', iconColor: 'text-green-600',
    borderColor: 'border-green-100',
    badgeBg: 'bg-green-100', badgeText: 'text-green-700',
  },
  {
    label: 'Lecturas Este Mes',
    value: '—',
    badge: 'Ruta',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    iconBg: 'bg-orange-50', iconColor: 'text-orange-600',
    borderColor: 'border-orange-100',
    badgeBg: 'bg-orange-100', badgeText: 'text-orange-700',
  },
  {
    label: 'Usuarios del Sistema',
    value: '—',
    badge: 'Equipo',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197',
    iconBg: 'bg-purple-50', iconColor: 'text-purple-600',
    borderColor: 'border-purple-100',
    badgeBg: 'bg-purple-100', badgeText: 'text-purple-700',
  },
];

const adminActions = [
  {
    label: 'Registrar Cliente',
    desc: 'Nuevo prospecto o cliente',
    path: '/clientes/crear',
    icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
    iconBg: 'bg-blue-50', iconColor: 'text-blue-600',
  },
  {
    label: 'Gestionar Usuarios',
    desc: 'ADMIN · JEFE · IMPULSADOR · LECTOR',
    path: '/usuarios',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197',
    iconBg: 'bg-purple-50', iconColor: 'text-purple-600',
  },
  {
    label: 'Ver Lecturas',
    desc: 'Consumos de medidores',
    path: '/lecturas',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    iconBg: 'bg-orange-50', iconColor: 'text-orange-600',
  },
  {
    label: 'Facturación',
    desc: 'Facturas y cobros pendientes',
    path: '/facturas',
    icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
    iconBg: 'bg-green-50', iconColor: 'text-green-600',
  },
  {
    label: 'Mapa Geográfico',
    desc: 'Clientes geolocalizados',
    path: '/mapa',
    icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
    iconBg: 'bg-teal-50', iconColor: 'text-teal-600',
  },
  {
    label: 'Sincronización',
    desc: 'Estado de datos offline',
    path: '/sync',
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    iconBg: 'bg-slate-50', iconColor: 'text-slate-600',
  },
];

const systemStatus = [
  { label: 'Backend API', value: 'Online', bg: 'bg-green-50', dot: 'bg-green-500', animate: true, textColor: 'text-green-800', valueColor: 'text-green-700' },
  { label: 'Base de datos', value: 'MySQL 8.0', bg: 'bg-blue-50', dot: 'bg-blue-500', animate: false, textColor: 'text-blue-800', valueColor: 'text-blue-700' },
  { label: 'Modo Offline', value: 'Disponible', bg: 'bg-orange-50', dot: 'bg-orange-500', animate: false, textColor: 'text-orange-800', valueColor: 'text-orange-700' },
  { label: 'Pendientes sync', value: '0', bg: 'bg-slate-50', dot: 'bg-slate-400', animate: false, textColor: 'text-slate-600', valueColor: 'text-slate-700' },
];
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
</style>