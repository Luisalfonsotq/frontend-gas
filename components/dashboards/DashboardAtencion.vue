<!-- components/dashboards/DashboardAtencion.vue -->
<!-- Panel para el rol ATENCION: Centro de atención al cliente -->
<template>
  <div class="space-y-8 animate-fade-in">

    <!-- Header -->
    <div class="bg-gradient-to-r from-orange-950 via-amber-900 to-orange-950 dark:from-orange-950 dark:via-amber-900 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
      <div class="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-orange-500 opacity-10 rounded-full blur-3xl"></div>
      <div class="relative z-10 flex flex-col md:flex-row items-center gap-6">
        <div class="w-20 h-20 bg-gradient-to-br from-orange-600 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
          <svg class="w-11 h-11 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <div class="text-center md:text-left">
          <p class="text-orange-300 text-sm font-semibold uppercase tracking-widest mb-1">Centro de Atención al Cliente</p>
          <h1 class="text-3xl font-bold tracking-tight">Hola, {{ user?.nombre || 'Operador' }}</h1>
          <p class="text-slate-300 mt-1">Gestión de clientes y facturación · GasField Colombia</p>
          <div class="flex items-center justify-center md:justify-start gap-3 mt-3">
            <span class="px-3 py-1 bg-orange-500/30 border border-orange-400/40 rounded-full text-sm font-medium">🎫 ATENCIÓN</span>
            <span class="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm font-medium">📅 {{ today }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- KPIs -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <div v-for="kpi in kpis" :key="kpi.label"
        class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 hover:shadow-md transition-all duration-300"
        :class="kpi.border">
        <div :class="['w-10 h-10 rounded-xl flex items-center justify-center mb-3', kpi.iconBg]">
          <svg class="w-5 h-5" :class="kpi.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="kpi.icon" />
          </svg>
        </div>
        <p class="text-sm text-slate-500 dark:text-slate-400 font-medium">{{ kpi.label }}</p>
        <p class="text-3xl font-bold text-slate-800 dark:text-white mt-0.5">{{ kpi.value }}</p>
        <p class="text-xs mt-1" :class="kpi.subColor">{{ kpi.sub }}</p>
      </div>
    </div>

    <!-- Acciones + Estado -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <!-- Acciones de Atención -->
      <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <h2 class="text-lg font-bold text-slate-800 dark:text-white mb-5 flex items-center gap-2">
          <span class="w-1.5 h-6 bg-orange-500 rounded-full"></span>
          Operaciones de Taquilla
        </h2>
        <div class="grid grid-cols-1 gap-3">
          <NuxtLink v-for="action in atencionActions" :key="action.label" :to="action.path"
            class="flex items-center gap-4 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/50 transition-all duration-200 group">
            <div :class="['p-2.5 rounded-xl', action.iconBg, 'group-hover:scale-110 transition-transform duration-200']">
              <svg class="w-5 h-5" :class="action.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="action.icon" />
              </svg>
            </div>
            <div>
              <p class="font-semibold text-slate-800 dark:text-white text-sm">{{ action.label }}</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">{{ action.desc }}</p>
            </div>
            <svg class="w-4 h-4 text-slate-300 ml-auto group-hover:text-orange-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- Estado del día -->
      <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <h2 class="text-lg font-bold text-slate-800 dark:text-white mb-5 flex items-center gap-2">
          <span class="w-1.5 h-6 bg-green-500 rounded-full"></span>
          Resumen del Día
        </h2>
        <div class="space-y-3">
          <div v-for="item in daySummary" :key="item.label"
            class="flex items-center gap-3 p-3 rounded-xl"
            :class="item.bg">
            <div :class="['p-2 rounded-lg', item.iconBg]">
              <svg class="w-4 h-4" :class="item.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-semibold" :class="item.textColor">{{ item.label }}</p>
              <p class="text-xs text-slate-400 dark:text-slate-500">{{ item.sub }}</p>
            </div>
            <span class="text-xl font-bold" :class="item.valueColor">{{ item.value }}</span>
          </div>
        </div>

        <!-- Nota offline -->
        <div class="mt-4 p-3 bg-orange-50 dark:bg-orange-950/50 border border-orange-100 dark:border-orange-900 rounded-xl flex items-center gap-2">
          <svg class="w-4 h-4 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
          <p class="text-xs text-orange-700 dark:text-orange-400 font-medium">Modo Offline-First activo. Los datos se sincronizan al recuperar señal.</p>
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
  { label: 'Clientes atendidos', value: '—', sub: 'Hoy', subColor: 'text-orange-500', iconBg: 'bg-orange-50', iconColor: 'text-orange-600', border: 'border-orange-100', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { label: 'Pagos registrados', value: '—', sub: 'Hoy', subColor: 'text-green-500', iconBg: 'bg-green-50', iconColor: 'text-green-600', border: 'border-green-100', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 1m-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Recibos impresos', value: '—', sub: 'Hoy', subColor: 'text-blue-500', iconBg: 'bg-blue-50', iconColor: 'text-blue-600', border: 'border-blue-100', icon: 'M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z' },
  { label: 'Pendientes', value: '0', sub: 'Sin sincronizar', subColor: 'text-slate-400', iconBg: 'bg-slate-50', iconColor: 'text-slate-500', border: 'border-slate-100', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
];

const atencionActions = [
  { label: 'Buscar Cliente', desc: 'Consulta y gestión de clientes', path: '/atencion', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', iconBg: 'bg-orange-50', iconColor: 'text-orange-600' },
  { label: 'Registrar Pago', desc: 'Recibo de pagos en taquilla', path: '/pagos', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 1m-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', iconBg: 'bg-green-50', iconColor: 'text-green-600' },
  { label: 'Copia de Recibo', desc: 'Imprimir duplicados de facturas', path: '/atencion', icon: 'M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z', iconBg: 'bg-blue-50', iconColor: 'text-blue-600' },
  { label: 'Estado de Cuenta', desc: 'Ver historial de deudas', path: '/facturas', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z', iconBg: 'bg-purple-50', iconColor: 'text-purple-600' },
];

const daySummary = [
  { label: 'Clientes atendidos', sub: 'Total hoy', value: '—', bg: 'bg-orange-50', iconBg: 'bg-orange-100', iconColor: 'text-orange-700', textColor: 'text-orange-800', valueColor: 'text-orange-700', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { label: 'Pagos procesados', sub: 'Monto total', value: '—', bg: 'bg-green-50', iconBg: 'bg-green-100', iconColor: 'text-green-700', textColor: 'text-green-800', valueColor: 'text-green-700', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 1m-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Recibos emitidos', sub: 'Impresiones', value: '—', bg: 'bg-blue-50', iconBg: 'bg-blue-100', iconColor: 'text-blue-700', textColor: 'text-blue-800', valueColor: 'text-blue-700', icon: 'M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z' },
];
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
</style>
