<!-- pages/atencion/index.vue -->
<template>
  <div class="w-full animation-fade-in">
    <!-- Encabezado de la página -->
    <div class="mb-6 pb-6 border-b border-slate-200">
      <h1 class="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
        <svg class="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        Centro de Atención al Cliente
      </h1>
      <p class="text-sm text-slate-500 mt-1">Búsqueda rápida de clientes, estado de cuenta e impresión de recibos.</p>
    </div>

    <!-- Contenido -->
    <div class="w-full relative">
        
        <!-- Zona de Búsqueda -->
        <div class="max-w-4xl mx-auto mb-8 relative">
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <svg class="w-6 h-6 text-slate-400 group-focus-within:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input 
              type="text" 
              v-model="searchQuery"
              @keyup.enter="searchClient"
              class="w-full pl-14 pr-32 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm text-lg focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium placeholder:text-slate-400 text-slate-800"
              placeholder="Escanear Código de Cliente o ingresar Cédula..."
            >
            <button 
              @click="searchClient"
              :disabled="isLoading"
              class="absolute right-2 top-2 bottom-2 bg-slate-900 text-white px-8 rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50"
            >
              <span v-if="isLoading" class="flex items-center gap-2">
                <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                Buscando...
              </span>
              <span v-else>Buscar</span>
            </button>
          </div>
          <!-- Botón limpiar búsqueda -->
          <button 
            v-if="clientData || notFound"
            @click="clearSearch"
            class="mt-3 text-sm text-slate-400 hover:text-orange-500 transition-colors flex items-center gap-1"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            Limpiar búsqueda y empezar de nuevo
          </button>
        </div>

        <!-- Estado: No encontrado -->
        <div v-if="notFound" class="max-w-4xl mx-auto mb-6 bg-red-50 border border-red-200 rounded-2xl p-6 flex items-center gap-4">
          <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-500 shrink-0">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div>
            <p class="font-bold text-red-700">
              {{ errorMsg ? 'Error de conexión' : 'Cliente no encontrado' }}
            </p>
            <p class="text-sm text-red-500">
              {{ errorMsg || `No existe ningún cliente con el dato "${searchQuery}". Verifica el código, cédula o nombre.` }}
            </p>
          </div>
        </div>

        <!-- Vista de Resultados del Cliente -->
        <div v-if="clientData" class="max-w-4xl mx-auto space-y-6 animate-fade-in relative z-10">
          
          <!-- Tarjeta Header del Cliente -->
          <div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex items-start justify-between relative overflow-hidden">
            <!-- Efecto de fondo sutil -->
            <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-orange-100 to-transparent rounded-full blur-3xl opacity-60 -mr-20 -mt-20 pointer-events-none"></div>
            
            <div class="flex gap-6 relative z-10">
              <div class="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg shadow-orange-200/50 shrink-0">
                <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <div class="flex flex-col justify-center">
                <div class="flex items-center gap-2 mb-1">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                    Servicio Activo
                  </span>
                  <span v-if="clientData.tiene_mora" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200">
                    En Mora
                  </span>
                </div>
                <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight">{{ clientData.nombres }} {{ clientData.apellidos }}</h2>
                <div class="flex items-center gap-4 mt-2 text-slate-500 font-medium text-sm">
                  <span class="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-lg">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path></svg>
                    {{ clientData.tipo_documento }} {{ clientData.documento_identidad }}
                  </span>
                  <span class="flex items-center gap-1.5">
                    <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    {{ clientData.direccion }} (Estrato {{ clientData.estrato }})
                  </span>
                </div>
              </div>
            </div>
            
            <div class="text-right relative z-10 flex flex-col justify-center">
              <p class="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Código Contrato</p>
              <div class="bg-slate-50 px-5 py-3 rounded-2xl border border-slate-200">
                <p class="text-2xl font-black text-slate-800 font-mono tracking-wider">{{ clientData.codigo }}</p>
              </div>
            </div>
          </div>

          <!-- Acciones Rápidas (Botones) -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button @click="printReceipt" class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:border-orange-300 hover:shadow-md transition-all group active:scale-95 text-left relative overflow-hidden">
              <div class="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
              </div>
              <h3 class="font-bold text-slate-800 text-lg mb-1">Copia de Recibo</h3>
              <p class="text-sm text-slate-500 leading-tight">Imprimir duplicado de la última factura para el cliente</p>
            </button>

            <button class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:border-blue-300 hover:shadow-md transition-all group active:scale-95 text-left relative overflow-hidden">
              <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
              </div>
              <h3 class="font-bold text-slate-800 text-lg mb-1">Registrar Pago</h3>
              <p class="text-sm text-slate-500 leading-tight">Recibir pago en taquilla y actualizar estado de cuenta</p>
            </button>

            <button class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:border-emerald-300 hover:shadow-md transition-all group active:scale-95 text-left relative overflow-hidden">
              <div class="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 1m-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 class="font-bold text-slate-800 text-lg mb-1">Estado de Cuenta</h3>
              <p class="text-sm text-slate-500 leading-tight">Ver histórico completo de deudas, consumos y acuerdos</p>
            </button>
          </div>

          <!-- Modulo de Facturación (Última Factura) -->
          <div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex gap-8">
            <div class="flex-1">
              <h3 class="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                Resumen Última Factura
              </h3>
              
              <div class="bg-slate-50 rounded-2xl p-6 border border-slate-100 relative overflow-hidden">
                <!-- Marca de agua -->
                <svg class="absolute -right-6 -bottom-6 w-48 h-48 text-slate-100 opacity-50 transform -rotate-12 pointer-events-none" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4L12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12H20C20 16.41 16.41 20 12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4z"></path></svg>

                <div class="flex justify-between items-end mb-6 relative z-10">
                  <div>
                    <p class="text-sm font-bold tracking-wider text-slate-500 uppercase">Total a Pagar</p>
                    <p class="text-5xl font-black text-slate-800 mt-1">$45.200</p>
                  </div>
                  <div class="px-4 py-2 bg-red-100 text-red-700 rounded-xl font-bold text-sm tracking-widest border border-red-200 uppercase">
                    Vencido
                  </div>
                </div>

                <div class="space-y-4 relative z-10 bg-white/60 p-4 rounded-xl border border-white">
                  <div class="flex justify-between text-base">
                    <span class="text-slate-500 font-medium">Periodo Facturado</span>
                    <span class="font-bold text-slate-800">Febrero 2026</span>
                  </div>
                  <div class="flex justify-between text-base border-t border-slate-200/60 pt-3">
                    <span class="text-slate-500 font-medium">Lectura Anterior</span>
                    <span class="font-bold text-slate-800">1250 m³</span>
                  </div>
                  <div class="flex justify-between text-base">
                    <span class="text-slate-500 font-medium">Lectura Actual</span>
                    <span class="font-bold text-slate-800">1265 m³</span>
                  </div>
                  <div class="flex justify-between text-base border-t border-slate-200/60 pt-3">
                    <span class="text-slate-800 font-bold">Consumo del Mes</span>
                    <span class="font-black text-orange-600 text-lg">15 m³</span>
                  </div>
                </div>

                <div class="mt-6 relative z-10">
                  <button @click="printReceipt" class="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
                    <svg class="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                    <span class="text-lg">Imprimir Recibo Original</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div class="w-80 shrink-0">
              <h3 class="text-lg font-bold text-slate-800 mb-6 px-2">Visualización Previa</h3>
              <div class="bg-gray-100 rounded-2xl h-[460px] flex flex-col items-center justify-center border-2 border-dashed border-gray-300 relative overflow-hidden group">
                 <!-- Simulación de ticket o carta -->
                 <div class="w-56 h-80 bg-white shadow-md border border-gray-200 px-6 py-6 transition-transform transform group-hover:scale-105 duration-500">
                    <div class="w-full border-b-2 border-black pb-2 mb-2">
                       <h3 class="text-[10px] font-black text-center uppercase">Compañía Gas Natural</h3>
                       <p class="text-[8px] text-center text-gray-500">NIT: 890.123.456-7</p>
                    </div>
                    <div class="space-y-2">
                       <div class="h-2 bg-gray-200 rounded w-full"></div>
                       <div class="h-2 bg-gray-200 rounded w-3/4"></div>
                       <div class="h-2 bg-gray-200 rounded w-full"></div>
                       <div class="h-2 bg-gray-200 rounded w-5/6"></div>
                    </div>
                    <div class="mt-4 border-t border-dashed border-gray-400 pt-4 flex justify-between">
                       <span class="text-[10px] font-bold">TOTAL</span>
                       <span class="text-[10px] font-bold">$45.200</span>
                    </div>
                    <!-- Codigo barras fake -->
                    <div class="mt-6 flex gap-1 justify-center h-8 w-full opacity-50">
                       <div class="w-1 bg-black h-full"></div>
                       <div class="w-2 bg-black h-full"></div>
                       <div class="w-1 bg-black h-full"></div>
                       <div class="w-3 bg-black h-full"></div>
                       <div class="w-1 bg-black h-full"></div>
                       <div class="w-2 bg-black h-full"></div>
                       <div class="w-1 bg-black h-full"></div>
                       <div class="w-2 bg-black h-full"></div>
                       <div class="w-1 bg-black h-full"></div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Estado Inicial (No hay búsqueda) -->
        <div v-else class="h-[60vh] flex flex-col items-center justify-center text-center max-w-lg mx-auto">
          <div class="w-28 h-28 bg-white shadow-xl shadow-orange-100 rounded-full flex items-center justify-center text-orange-500 mb-8 border border-orange-50">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"></path>
            </svg>
          </div>
          <h2 class="text-3xl font-extrabold text-slate-800 mb-4 tracking-tight">Buscar un Cliente</h2>
          <p class="text-slate-500 text-lg leading-relaxed">
            Ingresa el código de contrato, número de identificación o cédula del cliente en el buscador superior para acceder a su facturación, generar copias de recibos o ver su historial.
          </p>
        </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRuntimeConfig } from '#app'

definePageMeta({ layout: 'profile-layout' })

const config = useRuntimeConfig()
const searchQuery = ref('')
const clientData = ref(null)
const isLoading = ref(false)
const notFound = ref(false)
const errorMsg = ref('')

const searchClient = async () => {
  const q = searchQuery.value.trim()
  if (!q) return

  // Resetear estado
  clientData.value = null
  notFound.value = false
  errorMsg.value = ''
  isLoading.value = true

  try {
    const baseUrl = config.public.apiBaseUrl || 'http://localhost:3001'
    const res = await fetch(`${baseUrl}/customers/search?q=${encodeURIComponent(q)}`)

    if (!res.ok) {
      errorMsg.value = `Error del servidor: ${res.status} ${res.statusText}`
      notFound.value = true
      return
    }

    const results = await res.json()
    if (results && results.length > 0) {
      clientData.value = results[0]
    } else {
      notFound.value = true
      errorMsg.value = ''
    }
  } catch (e) {
    notFound.value = true
    errorMsg.value = `Sin conexión al backend (localhost:3001). ¿Está corriendo?`
  } finally {
    isLoading.value = false
  }
}

const clearSearch = () => {
  searchQuery.value = ''
  clientData.value = null
  notFound.value = false
}

const printReceipt = () => {
  window.print()
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.98) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Permitir arrastrar la ventana en Tauri desde el header */
.drag-region {
  -webkit-app-region: drag;
  user-select: none;
}
</style>
