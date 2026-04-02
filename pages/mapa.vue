<template>
  <div class="h-[calc(100vh-80px)] w-full flex flex-col pt-4 px-4 pb-4 max-w-7xl mx-auto">
    
    <div class="mb-4 flex items-center justify-between">
      <div>
        <NuxtLink to="/dashboard" class="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center gap-1 mb-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Volver
        </NuxtLink>
        <h1 class="text-2xl font-bold text-slate-800">Mapa de Prospectos</h1>
        <p class="text-sm text-slate-500">Visualización en campo de los clientes registrados guardados localmente.</p>
      </div>
      <div class="flex gap-2">
        <span class="px-3 py-1 bg-white border border-slate-200 shadow-sm rounded-lg text-sm text-slate-600 font-medium flex items-center gap-2">
          <span class="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
          {{ clientesLocales.length }} Marcadores
        </span>
      </div>
    </div>

    <!-- Contenedor del Mapa -->
    <div class="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden relative z-0">
      <ClientOnly>
        <div id="map" class="w-full h-full z-10"></div>
        <template #fallback>
          <div class="w-full h-full flex items-center justify-center bg-slate-50">
            <div class="animate-spin rounded-full h-10 w-10 border-4 border-slate-200 border-t-emerald-600"></div>
          </div>
        </template>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { db } from '@/utils/db'; // Dexie
import type { ClienteLocal } from '@/utils/db';

definePageMeta({ layout: 'profile-layout' });

const mapInstance = ref<any>(null);
const clientesLocales = ref<ClienteLocal[]>([]);

onMounted(async () => {
  // Cargar datos offline desde Dexie
  try {
    clientesLocales.value = await db.clientes.toArray();
  } catch (error) {
    console.error('Error cargando clientes locales:', error);
  }

  // Importar Leaflet dinámicamente para que no rompa en SSR
  const L = (await import('leaflet')).default;
  await import('leaflet/dist/leaflet.css');

  // Arreglar íconos de Leaflet (bug conocido en Vite/Nuxt)
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });

  // Inicializar mapa centrado en Colombia por defecto
  let initLat = 4.5709;
  let initLng = -74.2973;
  let initZoom = 6;

  // Si hay clientes, centrar en el último agregado
  if (clientesLocales.value.length > 0) {
    const validLocation = clientesLocales.value.find(c => c.latitud && c.longitud);
    if (validLocation) {
      initLat = validLocation.latitud!;
      initLng = validLocation.longitud!;
      initZoom = 13;
    }
  }

  mapInstance.value = L.map('map', {
    zoomControl: false // Agregamos personalizado después
  }).setView([initLat, initLng], initZoom);

  L.control.zoom({ position: 'bottomright' }).addTo(mapInstance.value);

  // Tiles de OpenStreetMap (Para uso offline futuro, estos tiles deberían ser en cachados vía Service Worker)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: ' GasField Colombia',
    maxZoom: 19
  }).addTo(mapInstance.value);

  // Añadir marcadores
  clientesLocales.value.forEach(cliente => {
    if (cliente.latitud && cliente.longitud) {
      const popupHtml = `
        <div class="p-2 min-w-[200px]">
          <div class="mb-2 pb-2 border-b border-gray-100 flex items-center justify-between">
            <span class="text-xs font-bold px-2 py-0.5 rounded-md ${cliente.is_synced ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
              ${cliente.is_synced ? 'Sincronizado' : 'Pendiente Sync'}
            </span>
            <span class="text-[10px] text-gray-400">Offline DB</span>
          </div>
          <h3 class="font-bold text-sm text-slate-800">${cliente.nombres} ${cliente.apellidos}</h3>
          <p class="text-xs text-slate-500 mb-1">Doc: ${cliente.documento_identidad}</p>
          <p class="text-xs text-slate-500 mb-1">Tel: ${cliente.telefono}</p>
          <p class="text-xs text-slate-600 mt-2 font-medium bg-slate-50 p-1.5 rounded border border-slate-100">
            <svg class="w-3 h-3 inline-block mr-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            ${cliente.direccion}
          </p>
        </div>
      `;

      L.marker([cliente.latitud, cliente.longitud])
        .addTo(mapInstance.value)
        .bindPopup(popupHtml, {
           closeButton: false,
           className: 'map-popup-custom'
        });
    }
  });

  // Intentar ubicar al usuario dinámicamente si no hay clientes o simplemente para mostrar su posición
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // Opcional: Centrar en la ubicación del impulsador
      // mapInstance.value.setView([position.coords.latitude, position.coords.longitude], 14);
      
      const ubicador = L.circleMarker([position.coords.latitude, position.coords.longitude], {
        radius: 8,
        fillColor: "#3b82f6",
        color: "#fff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(mapInstance.value).bindTooltip("Tú estás aquí");
    }, () => {}, { timeout: 5000 });
  }

});

onBeforeUnmount(() => {
  if (mapInstance.value) {
    mapInstance.value.remove();
  }
});
</script>

<style>
/* CSS global para sobreescribir estilos del popup de leaflet */
.map-popup-custom .leaflet-popup-content-wrapper {
  padding: 0;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}
.map-popup-custom .leaflet-popup-content {
  margin: 0;
  line-height: normal;
}
.map-popup-custom .leaflet-popup-tip-container {
  margin-top: -1px;
}
</style>
