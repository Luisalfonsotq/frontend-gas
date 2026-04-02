<template>
  <div class="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <NuxtLink to="/dashboard" class="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center gap-1 mb-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Volver al Panel
        </NuxtLink>
        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Mis Prospectos</h1>
        <p class="text-slate-500 mt-2">Gestiona los clientes potenciales capturados en terreno.</p>
      </div>

      <NuxtLink to="/clientes/crear" class="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all duration-300">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        Nuevo Prospecto
      </NuxtLink>
    </div>

    <!-- Lista -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <!-- Empty State -->
      <div v-if="cargando" class="p-12 text-center text-slate-400">
        <div class="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-emerald-600 mx-auto mb-4"></div>
        Cargando prospectos...
      </div>
      
      <div v-else-if="clientes.length === 0" class="p-16 text-center">
        <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        </div>
        <h3 class="text-lg font-bold text-slate-800 mb-1">No hay prospectos aún</h3>
        <p class="text-slate-500 mb-4 max-w-sm mx-auto">No has registrado ningún cliente potencial en este dispositivo. Inicia capturando el primero.</p>
        <NuxtLink to="/clientes/crear" class="text-emerald-600 hover:text-emerald-700 font-medium">Registrar ahora &rarr;</NuxtLink>
      </div>

      <!-- Table View (Desktop) & Card View (Mobile) -->
      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200 text-sm font-medium text-slate-500 uppercase tracking-wider">
              <th class="px-6 py-4">Cliente</th>
              <th class="px-6 py-4">Documento</th>
              <th class="px-6 py-4">Ubicación</th>
              <th class="px-6 py-4">Estado Sync</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="cliente in clientes" :key="cliente.id" class="hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4">
                <div class="font-bold text-slate-800">{{ cliente.nombres }} {{ cliente.apellidos }}</div>
                <div class="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  {{ cliente.telefono }}
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded font-medium mr-2">{{ cliente.tipo_documento }}</span>
                <span class="text-slate-700">{{ cliente.documento_identidad }}</span>
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">
                <div class="flex items-start gap-2 max-w-[200px]">
                  <svg class="w-4 h-4 text-slate-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span class="line-clamp-2" :title="cliente.direccion">{{ cliente.direccion }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <span v-if="cliente.is_synced" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Sincronizado
                </span>
                <span v-else class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                  <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  Local (Offline)
                  <svg class="w-3.5 h-3.5 ml-1 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { db } from '@/utils/db';
import type { ClienteLocal } from '@/utils/db';

definePageMeta({ layout: 'profile-layout' });

const clientes = ref<ClienteLocal[]>([]);
const cargando = ref(true);

onMounted(async () => {
  try {
    const todos = await db.clientes.toArray();
    // Sort logic (newest at the top)
    clientes.value = todos.sort((a, b) => new Date(b.created_at_manual).getTime() - new Date(a.created_at_manual).getTime());
  } catch(e) {
    console.error("Error loading local clients:", e);
  } finally {
    cargando.value = false;
  }
});
</script>
