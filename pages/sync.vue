<template>
  <div class="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    
    <div class="mb-6">
      <NuxtLink to="/dashboard" class="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center gap-1 mb-4">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Volver al Dashboard
      </NuxtLink>
      <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
        <svg class="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
        Sincronización Local
      </h1>
      <p class="text-slate-500 mt-2">Envía los datos recolectados en modo offline hacia el servidor central.</p>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
      <div class="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 class="text-xl font-bold text-slate-800">Estado Local</h2>
          <p class="text-sm text-slate-500">
            Última sincronización: 
            <span class="font-medium text-slate-700">{{ syncStore.lastSync ? new Date(syncStore.lastSync).toLocaleString() : 'Nunca' }}</span>
          </p>
        </div>
        
        <button 
          @click="ejecutarSincronizacion" 
          :disabled="syncStore.isSyncing || conteos.total === 0"
          class="shrink-0 flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          
          <svg v-if="syncStore.isSyncing" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
          {{ syncStore.isSyncing ? 'Sincronizando con el Servidor...' : 'Sincronizar Ahora' }}
        </button>
      </div>

      <div class="p-6 bg-slate-50 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white p-4 rounded-xl border border-slate-200 text-center">
          <p class="text-sm font-medium text-slate-500 mb-1">Prospectos</p>
          <p class="text-3xl font-bold text-slate-800">{{ conteos.clientes }}</p>
        </div>
        <div class="bg-white p-4 rounded-xl border border-slate-200 text-center">
          <p class="text-sm font-medium text-slate-500 mb-1">Biometrías</p>
          <p class="text-3xl font-bold text-slate-800">{{ conteos.biometrias }}</p>
        </div>
        <div class="bg-white p-4 rounded-xl border border-slate-200 text-center">
          <p class="text-sm font-medium text-slate-500 mb-1">Medidores</p>
          <p class="text-3xl font-bold text-slate-800">{{ conteos.medidores }}</p>
        </div>
        <div class="bg-white p-4 rounded-xl border border-slate-200 text-center">
          <p class="text-sm font-medium text-slate-500 mb-1">Lecturas</p>
          <p class="text-3xl font-bold text-slate-800">{{ conteos.lecturas }}</p>
        </div>
      </div>
    </div>

    <!-- Errores -->
    <div v-if="syncStore.syncErrors.length > 0" class="bg-red-50 border border-red-200 rounded-xl p-5 mb-6">
      <h3 class="text-red-800 font-bold mb-2 flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        Errores en la Sincronización
      </h3>
      <ul class="list-disc pl-5 space-y-1 text-sm text-red-600">
        <li v-for="(err, idx) in syncStore.syncErrors" :key="idx">{{ err }}</li>
      </ul>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useSyncStore } from '@/stores/sync';
import { db } from '@/utils/db';

definePageMeta({ layout: 'profile-layout' });

const syncStore = useSyncStore();

const conteos = reactive({
  clientes: 0,
  biometrias: 0,
  medidores: 0,
  lecturas: 0,
  total: 0
});

const refrescarConteos = async () => {
  try {
    conteos.clientes = await db.clientes.where('is_synced').equals(0).count();
    conteos.biometrias = await db.biometrias.where('is_synced').equals(0).count();
    conteos.medidores = await db.medidores.where('is_synced').equals(0).count();
    conteos.lecturas = await db.lecturas.where('is_synced').equals(0).count();
    conteos.total = conteos.clientes + conteos.biometrias + conteos.medidores + conteos.lecturas;
  } catch (error) {
    console.error("Error al obtener conteos offline:", error);
  }
};

onMounted(() => {
  refrescarConteos();
});

const ejecutarSincronizacion = async () => {
  if (conteos.total === 0) return;
  
  await syncStore.syncData();
  await refrescarConteos();
  
  if (syncStore.syncErrors.length === 0) {
    alert("¡Sincronización Completada con Éxito!");
  }
};
</script>
