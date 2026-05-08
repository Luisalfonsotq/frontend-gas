<template>
  <div class="space-y-6 animate-fade-in">

    <!-- ══ Encabezado ══ -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6
                flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-3">
          <span class="w-9 h-9 rounded-xl flex items-center justify-center" :class="rolColor.bg">
            <svg class="w-5 h-5" :class="rolColor.icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </span>
          {{ pageTitle }}
        </h1>
        <p class="text-slate-500 dark:text-slate-400 mt-1 text-sm">{{ pageSubtitle }}</p>
      </div>

      <!-- Acciones del encabezado -->
      <div class="flex items-center gap-2">
        <!-- Botón exportar -->
        <button @click="abrirModalExport"
          class="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600
                 text-slate-700 dark:text-slate-200 font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all duration-200 text-sm whitespace-nowrap">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Exportar
        </button>

        <!-- Botón registrar (solo ADMIN e IMPULSADOR) -->
        <NuxtLink v-if="canCreate" to="/clientes/crear" class="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold
               px-5 py-2.5 rounded-xl shadow-sm transition-all duration-200 text-sm whitespace-nowrap">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Nuevo Prospecto
        </NuxtLink>
      </div><!-- /flex acciones -->
    </div>

    <!-- ══ Filtros y búsqueda ══ -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-4
                flex flex-col sm:flex-row gap-3">
      <!-- Buscador -->
      <div class="relative flex-1">
        <svg class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input v-model="searchQuery" @input="onSearch" type="text" placeholder="Buscar por nombre, cédula o código..."
          class="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 dark:border-slate-600 rounded-xl
                 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200
                 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all" />
      </div>

      <!-- Filtro por estado -->
      <select v-model="filtroEstado" @change="applyFilters" class="sm:w-44 px-3 py-2.5 text-sm border border-slate-200 dark:border-slate-600 rounded-xl
               bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300
               focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all">
        <option value="">Todos los estados</option>
        <option value="PROSPECTO">Prospecto</option>
        <option value="CLIENTE">Cliente</option>
        <option value="INACTIVO">Inactivo</option>
      </select>

      <!-- Contador -->
      <div class="flex items-center gap-2 px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200
                  dark:border-slate-600 rounded-xl text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
        <span class="font-semibold text-slate-700 dark:text-slate-200">{{ clientesFiltrados.length }}</span>
        {{ clientesFiltrados.length === 1 ? 'resultado' : 'resultados' }}
      </div>
    </div>

    <!-- ══ Tabla ══ -->
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">

      <!-- Cargando -->
      <div v-if="cargando" class="py-20 flex flex-col items-center gap-3 text-slate-400">
        <div class="w-10 h-10 border-4 border-slate-200 border-t-orange-500 rounded-full animate-spin"></div>
        <p class="text-sm">Cargando prospectos...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="py-14 flex flex-col items-center gap-3 text-center px-6">
        <div class="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-red-400">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856C18.448 19 19 18.105 19 17L12 5 5 17c0 1.105.552 2 1.082 2z" />
          </svg>
        </div>
        <p class="font-semibold text-slate-700 dark:text-slate-300">{{ error }}</p>
        <button @click="loadClientes"
          class="text-sm text-orange-600 hover:text-orange-700 font-medium underline underline-offset-2">
          Reintentar
        </button>
      </div>

      <!-- Vacío -->
      <div v-else-if="clientesFiltrados.length === 0" class="py-20 flex flex-col items-center gap-3 text-center px-6">
        <div
          class="w-16 h-16 bg-slate-50 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-300">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <p class="font-semibold text-slate-700 dark:text-slate-300 text-lg">Sin resultados</p>
        <p class="text-slate-400 text-sm max-w-xs">
          {{ searchQuery || filtroEstado
            ? 'Prueba ajustando los filtros de búsqueda.'
            : 'Aún no hay prospectos registrados.'
          }}
        </p>
        <NuxtLink v-if="canCreate && !searchQuery && !filtroEstado" to="/clientes/crear"
          class="mt-2 text-sm text-orange-600 font-semibold hover:text-orange-700">
          Registrar el primero →
        </NuxtLink>
      </div>

      <!-- Tabla de datos -->
      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700">
              <th class="px-5 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Cliente</th>
              <th class="px-5 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Documento</th>
              <th
                class="px-5 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden md:table-cell">
                Barrio / Dirección</th>
              <th class="px-5 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Estado</th>
              <th v-if="showImpulsadorCol"
                class="px-5 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden lg:table-cell">
                Impulsador
              </th>
              <th
                class="px-5 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden xl:table-cell">
                Financiación</th>
              <th
                class="px-5 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden xl:table-cell text-center">
                Sync</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50 dark:divide-slate-700/50">
            <tr v-for="c in clientesFiltrados" :key="c.id"
              class="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors duration-150 group">

              <!-- Cliente -->
              <td class="px-5 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm"
                    :class="avatarColor(c.nombres)">
                    {{ initials(c.nombres, c.apellidos) }}
                  </div>
                  <div>
                    <p class="font-semibold text-slate-800 dark:text-slate-100 text-sm leading-tight">
                      {{ c.nombres }} {{ c.apellidos }}
                    </p>
                    <p v-if="c.telefono" class="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {{ c.telefono }}
                    </p>
                    <p v-if="c.codigo" class="text-xs text-orange-500 font-mono mt-0.5">#{{ c.codigo }}</p>
                  </div>
                </div>
              </td>

              <!-- Documento -->
              <td class="px-5 py-4">
                <span class="inline-flex items-center gap-1.5 text-sm text-slate-700 dark:text-slate-300">
                  <span class="text-xs bg-slate-100 dark:bg-slate-600 text-slate-500 dark:text-slate-300
                               px-2 py-0.5 rounded font-semibold">
                    {{ c.tipo_documento }}
                  </span>
                  {{ c.documento_identidad }}
                </span>
              </td>

              <!-- Barrio / Dirección -->
              <td class="px-5 py-4 hidden md:table-cell">
                <div class="text-sm text-slate-600 dark:text-slate-400 max-w-[200px]">
                  <p v-if="c.barrio_vereda?.nombre" class="font-medium text-slate-700 dark:text-slate-300 truncate">
                    {{ c.barrio_vereda.nombre }}
                  </p>
                  <p class="text-xs text-slate-400 truncate" :title="c.direccion">{{ c.direccion }}</p>
                  <p class="text-xs text-slate-400">Estrato {{ c.estrato }}</p>
                </div>
              </td>

              <!-- Estado -->
              <td class="px-5 py-4">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                  :class="estadoClasses(c.estado)">
                  <span class="w-1.5 h-1.5 rounded-full" :class="estadoDot(c.estado)"></span>
                  {{ estadoLabel(c.estado) }}
                </span>
              </td>

              <!-- Impulsador -->
              <td v-if="showImpulsadorCol" class="px-5 py-4 hidden lg:table-cell">
                <span v-if="c.impulsador" class="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  {{ c.impulsador.nombre }}
                </span>
                <span v-else class="text-xs text-slate-300 dark:text-slate-600 italic">—</span>
              </td>

              <!-- Financiación -->
              <td class="px-5 py-4 hidden xl:table-cell">
                <span class="text-xs px-2 py-1 rounded-lg font-medium"
                  :class="financiacionClasses(c.financiacion_tipo)">
                  {{ c.financiacion_tipo || 'CONTADO' }}
                </span>
              </td>

              <!-- Sync -->
              <td class="px-5 py-4 hidden xl:table-cell text-center">
                <span v-if="c.is_synced" title="Sincronizado con el servidor" class="inline-flex items-center justify-center w-7 h-7 bg-emerald-50 dark:bg-emerald-900/30
                             text-emerald-500 rounded-full">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span v-else title="Solo en dispositivo (offline)" class="inline-flex items-center justify-center w-7 h-7 bg-amber-50 dark:bg-amber-900/30
                             text-amber-500 rounded-full">
                  <svg class="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </span>
              </td>

            </tr>
          </tbody>
        </table>

        <!-- Footer de la tabla -->
        <div class="px-5 py-3 bg-slate-50 dark:bg-slate-700/30 border-t border-slate-100 dark:border-slate-700
                    flex items-center justify-between">
          <p class="text-xs text-slate-400">
            Mostrando <span class="font-semibold text-slate-600 dark:text-slate-300">{{ clientesFiltrados.length
            }}</span>
            de <span class="font-semibold text-slate-600 dark:text-slate-300">{{ todosLosClientes.length }}</span>
            registros
          </p>
          <p class="text-xs text-slate-400 hidden sm:block">
            Fuente: <span class="font-medium text-slate-500">{{ fuenteDatos }}</span>
          </p>
        </div>
      </div>
    </div>

  </div>

  <!-- ══ Modal Exportar ══ -->
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modalExportVisible" class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="cerrarModalExport">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>

        <!-- Panel -->
        <div class="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700
                    w-full max-w-md p-6 space-y-5">

          <!-- Header modal -->
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg font-bold text-slate-800 dark:text-slate-100">Exportar Clientes</h2>
              <p class="text-xs text-slate-400 mt-0.5">Elige el período y el formato de descarga</p>
            </div>
            <button @click="cerrarModalExport"
              class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Filtros de período -->
          <div class="space-y-3">
            <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Período de
              registro</p>
            <div class="grid grid-cols-2 gap-3">
              <!-- Mes -->
              <div>
                <label class="text-xs text-slate-500 dark:text-slate-400 mb-1.5 block">Mes</label>
                <select v-model="exportMes"
                  class="w-full px-3 py-2.5 text-sm border border-slate-200 dark:border-slate-600 rounded-xl
                               bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300
                               focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all">
                  <option value="">Todos</option>
                  <option v-for="m in mesesOpciones" :key="m.value" :value="m.value">{{ m.label }}</option>
                </select>
              </div>
              <!-- Año -->
              <div>
                <label class="text-xs text-slate-500 dark:text-slate-400 mb-1.5 block">Año</label>
                <select v-model="exportAnio"
                  class="w-full px-3 py-2.5 text-sm border border-slate-200 dark:border-slate-600 rounded-xl
                               bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300
                               focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all">
                  <option value="">Todos</option>
                  <option v-for="a in aniosOpciones" :key="a" :value="a">{{ a }}</option>
                </select>
              </div>
            </div>

            <!-- Filtro estado export -->
            <div>
              <label class="text-xs text-slate-500 dark:text-slate-400 mb-1.5 block">Estado</label>
              <select v-model="exportEstado"
                class="w-full px-3 py-2.5 text-sm border border-slate-200 dark:border-slate-600 rounded-xl
                             bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300
                             focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all">
                <option value="">Todos los estados</option>
                <option value="PROSPECTO">Prospecto</option>
                <option value="CLIENTE">Cliente</option>
                <option value="INACTIVO">Inactivo</option>
              </select>
            </div>
          </div>

          <!-- Preview contador -->
          <div
            class="flex items-center gap-2 px-4 py-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800/30">
            <svg class="w-4 h-4 text-orange-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p class="text-sm text-slate-600 dark:text-slate-300">
              Se exportarán
              <span class="font-bold text-orange-600 dark:text-orange-400">{{ clientesParaExportar.length }}</span>
              registros
            </p>
          </div>

          <!-- Botones descarga -->
          <div class="grid grid-cols-2 gap-3 pt-1">
            <!-- Excel -->
            <button @click="descargarExcel" :disabled="clientesParaExportar.length === 0 || exportandoExcel"
              class="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50
                     disabled:cursor-not-allowed text-white font-semibold px-4 py-3 rounded-xl transition-all duration-200 text-sm">
              <svg v-if="!exportandoExcel" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div v-else class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Excel
            </button>

            <!-- PDF -->
            <button @click="descargarPDF" :disabled="clientesParaExportar.length === 0 || exportandoPDF"
              class="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50
                     disabled:cursor-not-allowed text-white font-semibold px-4 py-3 rounded-xl transition-all duration-200 text-sm">
              <svg v-if="!exportandoPDF" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <div v-else class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              PDF
            </button>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { useRuntimeConfig } from '#imports';
import { db } from '@/utils/db';

definePageMeta({ layout: 'profile-layout' });

const { user, fetchWithAuth } = useAuth();
const config = useRuntimeConfig();
const baseUrl = computed(() => config.public.apiBaseUrl || 'http://localhost:3001/api');

// ── Estado ───────────────────────────────────────────────
const todosLosClientes = ref<any[]>([]);
const cargando = ref(true);
const error = ref('');
const searchQuery = ref('');
const filtroEstado = ref('');
const fuenteDatos = ref('servidor');
let searchTimer: ReturnType<typeof setTimeout> | null = null;

// ── Computed: adaptados por rol ───────────────────────────
const rol = computed(() => user.value?.rol ?? '');

const pageTitle = computed(() => {
  if (rol.value === 'IMPULSADOR') return 'Mis Prospectos';
  if (rol.value === 'JEFE') return 'Prospectos de la Zona';
  if (rol.value === 'ATENCIÓN') return 'Directorio de Clientes';
  return 'Todos los Prospectos';
});

const pageSubtitle = computed(() => {
  if (rol.value === 'IMPULSADOR') return 'Clientes potenciales que has capturado en campo.';
  if (rol.value === 'JEFE') return 'Prospectos registrados por los impulsadores de tu zona.';
  if (rol.value === 'ATENCIÓN') return 'Consulta el directorio completo de clientes y prospectos.';
  return 'Gestiona todos los prospectos y clientes del sistema.';
});

const canCreate = computed(() =>
  ['ADMIN', 'IMPULSADOR'].includes(rol.value)
);

const showImpulsadorCol = computed(() =>
  ['ADMIN', 'JEFE'].includes(rol.value)
);

const rolColor = computed(() => {
  const map: Record<string, { bg: string; icon: string }> = {
    ADMIN: { bg: 'bg-purple-100', icon: 'text-purple-600' },
    JEFE: { bg: 'bg-blue-100', icon: 'text-blue-600' },
    IMPULSADOR: { bg: 'bg-orange-100', icon: 'text-orange-600' },
    ATENCIÓN: { bg: 'bg-teal-100', icon: 'text-teal-600' },
  };
  return map[rol.value] ?? { bg: 'bg-slate-100', icon: 'text-slate-500' };
});

// ── Filtrado local ────────────────────────────────────────
const clientesFiltrados = computed(() => {
  let lista = todosLosClientes.value;

  if (filtroEstado.value) {
    lista = lista.filter(c => c.estado === filtroEstado.value);
  }

  // Búsqueda offline/local (cuando ya tenemos datos en memoria)
  if (searchQuery.value.trim() && fuenteDatos.value === 'local (offline)') {
    const q = searchQuery.value.trim().toLowerCase();
    lista = lista.filter(c =>
      `${c.nombres} ${c.apellidos}`.toLowerCase().includes(q) ||
      c.documento_identidad?.toLowerCase().includes(q) ||
      c.codigo?.toLowerCase().includes(q)
    );
  }

  return lista;
});

// ── Helpers visuales ─────────────────────────────────────
function initials(nombres: string, apellidos: string) {
  const n = nombres?.charAt(0) ?? '';
  const a = apellidos?.charAt(0) ?? '';
  return `${n}${a}`.toUpperCase();
}

const avatarPalette = [
  'bg-orange-100 text-orange-700',
  'bg-blue-100 text-blue-700',
  'bg-purple-100 text-purple-700',
  'bg-teal-100 text-teal-700',
  'bg-rose-100 text-rose-700',
  'bg-amber-100 text-amber-700',
];

function avatarColor(nombre: string) {
  const idx = (nombre?.charCodeAt(0) ?? 0) % avatarPalette.length;
  return avatarPalette[idx];
}

function estadoClasses(estado: string) {
  const map: Record<string, string> = {
    PROSPECTO: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    CLIENTE: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    INACTIVO: 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400',
  };
  return map[estado] ?? map.PROSPECTO;
}

function estadoDot(estado: string) {
  const map: Record<string, string> = {
    PROSPECTO: 'bg-blue-500',
    CLIENTE: 'bg-emerald-500',
    INACTIVO: 'bg-slate-400',
  };
  return map[estado] ?? 'bg-slate-400';
}

function estadoLabel(estado: string) {
  const map: Record<string, string> = {
    PROSPECTO: 'Prospecto',
    CLIENTE: 'Cliente',
    INACTIVO: 'Inactivo',
  };
  return map[estado] ?? estado;
}

function financiacionClasses(tipo: string) {
  const map: Record<string, string> = {
    CONTADO: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    CREDI_CONTADO: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    FINANCIADO: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  };
  return map[tipo] ?? map.CONTADO;
}

// ── Carga de datos ────────────────────────────────────────
const loadClientes = async () => {
  cargando.value = true;
  error.value = '';

  try {
    // Elegir el endpoint según el rol
    let endpoint = '';
    if (rol.value === 'IMPULSADOR') {
      endpoint = `${baseUrl.value}/customers/mis-prospectos`;
    } else {
      // ADMIN, JEFE, ATENCIÓN
      endpoint = `${baseUrl.value}/customers`;
    }

    const data = await fetchWithAuth<any[]>(endpoint);
    todosLosClientes.value = data ?? [];
    fuenteDatos.value = 'servidor';
  } catch (e: any) {
    console.warn('API no disponible, cargando desde IndexedDB...', e);
    // Fallback offline: IndexedDB (solo para IMPULSADOR que puede tener datos locales)
    try {
      const local = await db.clientes.toArray();
      const usuario = user.value;
      // Filtrar solo los propios si es IMPULSADOR
      const filtrados = rol.value === 'IMPULSADOR'
        ? local.filter((c: any) => c.impulsador_id === usuario?.id || !c.impulsador_id)
        : local;
      todosLosClientes.value = filtrados.sort(
        (a: any, b: any) => new Date(b.created_at_manual).getTime() - new Date(a.created_at_manual).getTime()
      );
      fuenteDatos.value = 'local (offline)';
    } catch (dbErr) {
      error.value = 'No se pudieron cargar los prospectos. Verifica tu conexión.';
    }
  } finally {
    cargando.value = false;
  }
};

// ── Búsqueda dinámica contra el servidor ─────────────────
const onSearch = () => {
  if (searchTimer) clearTimeout(searchTimer);
  if (fuenteDatos.value === 'local (offline)') return; // filtrado local en computed

  searchTimer = setTimeout(async () => {
    const q = searchQuery.value.trim();
    if (!q) {
      await loadClientes();
      return;
    }
    cargando.value = true;
    try {
      let endpoint = '';
      if (rol.value === 'IMPULSADOR') {
        endpoint = `${baseUrl.value}/customers/mis-prospectos?q=${encodeURIComponent(q)}`;
      } else {
        endpoint = `${baseUrl.value}/customers/search-auth?q=${encodeURIComponent(q)}`;
      }
      const data = await fetchWithAuth<any[]>(endpoint);
      todosLosClientes.value = data ?? [];
    } catch {
      // silencioso, mantenemos los datos anteriores
    } finally {
      cargando.value = false;
    }
  }, 400);
};

const applyFilters = () => {
  // El filtro de estado se aplica en computed sobre los datos ya cargados
};

// ── Exportación ──────────────────────────────────────────
const modalExportVisible = ref(false);
const exportMes = ref('');
const exportAnio = ref('');
const exportEstado = ref('');
const exportandoExcel = ref(false);
const exportandoPDF = ref(false);

const mesesOpciones = [
  { value: '1', label: 'Enero' }, { value: '2', label: 'Febrero' },
  { value: '3', label: 'Marzo' }, { value: '4', label: 'Abril' },
  { value: '5', label: 'Mayo' }, { value: '6', label: 'Junio' },
  { value: '7', label: 'Julio' }, { value: '8', label: 'Agosto' },
  { value: '9', label: 'Septiembre' }, { value: '10', label: 'Octubre' },
  { value: '11', label: 'Noviembre' }, { value: '12', label: 'Diciembre' },
];

const aniosOpciones = computed(() => {
  const anioActual = new Date().getFullYear();
  return Array.from({ length: 5 }, (_, i) => anioActual - i);
});

const clientesParaExportar = computed(() => {
  let lista = todosLosClientes.value;

  if (exportEstado.value) {
    lista = lista.filter(c => c.estado === exportEstado.value);
  }

  if (exportMes.value || exportAnio.value) {
    lista = lista.filter(c => {
      const fecha = new Date(c.created_at_manual || c.created_at || '');
      if (isNaN(fecha.getTime())) return false;
      const mesOk = exportMes.value ? (fecha.getMonth() + 1) === Number(exportMes.value) : true;
      const anioOk = exportAnio.value ? fecha.getFullYear() === Number(exportAnio.value) : true;
      return mesOk && anioOk;
    });
  }

  return lista;
});

function abrirModalExport() {
  const hoy = new Date();
  exportMes.value = String(hoy.getMonth() + 1);
  exportAnio.value = String(hoy.getFullYear());
  exportEstado.value = filtroEstado.value;
  modalExportVisible.value = true;
}

function cerrarModalExport() {
  modalExportVisible.value = false;
}

function filaParaExport(c: any) {
  return {
    'Código': c.codigo || '',
    'Nombres': c.nombres || '',
    'Apellidos': c.apellidos || '',
    'Tipo Doc.': c.tipo_documento || '',
    'Documento': c.documento_identidad || '',
    'Teléfono': c.telefono || '',
    'Barrio/Vereda': c.barrio_vereda?.nombre || '',
    'Dirección': c.direccion || '',
    'Estrato': c.estrato || '',
    'Estado': c.estado || '',
    'Financiación': c.financiacion_tipo || '',
    'Impulsador': c.impulsador?.nombre || '',
    'Fecha Registro': c.created_at_manual || c.created_at || '',
  };
}

function nombreArchivo(ext: string) {
  const mes = exportMes.value
    ? mesesOpciones.find(m => m.value === exportMes.value)?.label
    : 'TodosMeses';
  const anio = exportAnio.value || 'TodosAnios';
  const estado = exportEstado.value || 'TodosEstados';
  return `clientes_${mes}_${anio}_${estado}.${ext}`;
}

async function descargarExcel() {
  exportandoExcel.value = true;
  try {
    // @ts-ignore
    const XLSX = await import('https://cdn.sheetjs.com/xlsx-0.20.3/package/xlsx.mjs');
    const filas = clientesParaExportar.value.map(filaParaExport);
    const ws = XLSX.utils.json_to_sheet(filas);
    const colWidths = Object.keys(filas[0] || {}).map(k => ({ wch: Math.max(k.length, 14) }));
    ws['!cols'] = colWidths;
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Clientes');
    XLSX.writeFile(wb, nombreArchivo('xlsx'));
  } catch (e) {
    console.error('Error exportando Excel', e);
    alert('Ocurrió un error al generar el Excel.');
  } finally {
    exportandoExcel.value = false;
  }
}

async function descargarPDF() {
  exportandoPDF.value = true;
  try {
    // Cargar jsPDF y autoTable via CDN dinámicamente
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js');

    // @ts-ignore
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

    const mes = exportMes.value
      ? mesesOpciones.find(m => m.value === exportMes.value)?.label
      : 'Todos los meses';
    const anio = exportAnio.value || 'Todos los años';
    const estado = exportEstado.value || 'Todos';

    doc.setFontSize(16);
    doc.setTextColor(234, 88, 12);
    doc.text('GasField — Reporte de Clientes', 14, 16);
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(`Período: ${mes} ${anio}  |  Estado: ${estado}  |  Total: ${clientesParaExportar.value.length} registros`, 14, 22);
    doc.text(`Generado: ${new Date().toLocaleString('es-CO')}`, 14, 27);

    const columnas = ['Código', 'Nombre', 'Documento', 'Teléfono', 'Barrio', 'Dirección', 'Estado', 'Financiación', 'Impulsador'];
    const filas = clientesParaExportar.value.map(c => [
      c.codigo || '',
      `${c.nombres || ''} ${c.apellidos || ''}`.trim(),
      `${c.tipo_documento || ''} ${c.documento_identidad || ''}`.trim(),
      c.telefono || '',
      c.barrio_vereda?.nombre || '',
      c.direccion || '',
      c.estado || '',
      c.financiacion_tipo || '',
      c.impulsador?.nombre || '',
    ]);

    (doc as any).autoTable({
      head: [columnas],
      body: filas,
      startY: 31,
      styles: { fontSize: 7.5, cellPadding: 2 },
      headStyles: { fillColor: [234, 88, 12], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      margin: { left: 14, right: 14 },
    });

    doc.save(nombreArchivo('pdf'));
  } catch (e) {
    console.error('Error exportando PDF', e);
    alert('Ocurrió un error al generar el PDF.');
  } finally {
    exportandoPDF.value = false;
  }
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement('script');
    s.src = src;
    s.onload = () => resolve();
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

// ── Ciclo de vida ─────────────────────────────────────────
onMounted(async () => {
  // Esperar a que el usuario esté disponible
  if (!user.value) {
    await new Promise<void>(resolve => {
      const stop = watch(user, (val) => { if (val) { stop(); resolve(); } });
      setTimeout(resolve, 3000); // timeout de seguridad
    });
  }
  await loadClientes();
});
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Modal transitions */
.modal-enter-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-leave-active {
  transition: all 0.2s ease-in;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95) translateY(8px);
}
</style>
