<script setup>
import { ref, watch, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useGeography } from '@/composables/useGeography'
import { useAuth } from '@/composables/useAuth'

definePageMeta({
  layout: 'profile-layout'
})

const { user } = useAuth()

// Composable setup
const config = useRuntimeConfig()
const { 
  departamentos, 
  municipios, 
  barriosVeredas,
  departamentoId,
  municipioId,
  cargarDepartamentos, 
  onDepartamentoChange, 
  onMunicipioChange,
  cargandoDepartamentos,
  cargandoMunicipios,
  cargandoBarrios
} = useGeography()

// Computed loading state
const geoLoading = computed(() => cargandoDepartamentos.value || cargandoMunicipios.value || cargandoBarrios.value)

const isAdding = ref(false)
const newBarrioName = ref('')
const saving = ref(false)
const deletingId = ref(null)

const authCookie = useCookie('auth_token')

onMounted(async () => {
  await cargarDepartamentos()
})

// Acciones
const guardarBarrio = async () => {
  if (!newBarrioName.value.trim() || !municipioId.value) return
  
  saving.value = true
  try {
    const apiUrl = process.client ? (config.public.apiBaseUrl || 'http://localhost:3001/api') : ''
    
    const id = uuidv4()
    const payload = {
      id,
      local_id: id,
      nombre: newBarrioName.value.toUpperCase().trim(),
      municipio_id: municipioId.value
    }
    
    // Save to Backend
    const res = await fetch(`${apiUrl}/geography/barrios-veredas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authCookie.value}`
      },
      body: JSON.stringify(payload)
    })
    
    if (!res.ok) throw new Error('Fallo al guardar')
    
    // Refresh & reset
    await onMunicipioChange(municipioId.value)
    newBarrioName.value = ''
    isAdding.value = false
    
  } catch (error) {
    console.error('Error al guardar barrio:', error)
    alert('Error al guardar el barrio. Por favor, intenta de nuevo.')
  } finally {
    saving.value = false
  }
}

const eliminarBarrio = async (id) => {
  if (!confirm('¿Estás seguro de que deseas eliminar esta zona?')) return
  
  deletingId.value = id
  try {
    const apiUrl = process.client ? (config.public.apiBaseUrl || 'http://localhost:3001/api') : ''
    
    const res = await fetch(`${apiUrl}/geography/barrios-veredas/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authCookie.value}`
      }
    })
    
    if (!res.ok) throw new Error('Fallo al eliminar')
    
    await onMunicipioChange(municipioId.value)
  } catch (error) {
    console.error('Error al eliminar barrio:', error)
    alert('No se pudo eliminar, es posible que haya registros asociados a esta zona.')
  } finally {
    deletingId.value = null
  }
}

</script>

<template>
  <div class="max-w-6xl mx-auto space-y-6">
    <!-- Header Especial -->
    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 shadow-2xl border border-white/10">
      <div class="absolute -right-20 -top-20 w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div class="absolute -left-20 -bottom-20 w-64 h-64 bg-slate-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div class="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div class="inline-flex items-center space-x-2 text-orange-400 font-semibold tracking-wider text-sm mb-2 uppercase">
            <Icon name="i-heroicons-map-pin" class="w-5 h-5"/>
            <span>Módulo de Geografía</span>
          </div>
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">Mis Zonas de Cobertura</h1>
          <p class="text-slate-400 font-medium max-w-xl">
            Gestiona los barrios y veredas donde operan tus impulsadores. Añade zonas específicas de tu región y mantén organizada tu estructura operativa.
          </p>
        </div>
      </div>
    </div>

    <!-- Controles Geográficos Principales -->
    <div class="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 border border-slate-100 backdrop-blur-xl">
      <h2 class="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Icon name="i-heroicons-globe-americas" class="w-5 h-5 text-orange-500"/>
        Seleccionar Región Geográfica
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Departamentos -->
        <div class="space-y-2 relative">
          <label class="block text-sm font-semibold text-slate-700">Departamento</label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Icon name="i-heroicons-map" class="h-5 w-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
            </div>
            <select
              :value="departamentoId"
              @change="onDepartamentoChange($event.target.value)"
              class="block w-full pl-11 pr-10 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-slate-700 focus:ring-0 focus:border-orange-500 focus:bg-white transition-all duration-300 appearance-none shadow-inner"
              :disabled="cargandoDepartamentos"
            >
              <option value="">Seleccione Departamento</option>
              <option v-for="dep in departamentos" :key="dep.id" :value="dep.id">
                {{ dep.nombre }}
              </option>
            </select>
            <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <Icon name="i-heroicons-chevron-up-down" class="h-5 w-5 text-slate-400" />
            </div>
          </div>
        </div>

        <!-- Municipios -->
        <div class="space-y-2 relative" :class="{ 'opacity-50 pointer-events-none': !departamentoId }">
          <label class="block text-sm font-semibold text-slate-700">Municipio</label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Icon name="i-heroicons-building-office" class="h-5 w-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
            </div>
            <select
              :value="municipioId"
              @change="onMunicipioChange($event.target.value)"
              class="block w-full pl-11 pr-10 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-slate-700 focus:ring-0 focus:border-orange-500 focus:bg-white transition-all duration-300 appearance-none shadow-inner"
              :disabled="!departamentoId || cargandoMunicipios"
            >
              <option value="">Seleccione Municipio</option>
              <option v-for="mun in municipios" :key="mun.id" :value="mun.id">
                {{ mun.nombre }}
              </option>
            </select>
            <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <Icon name="i-heroicons-chevron-up-down" class="h-5 w-5 text-slate-400" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lista y Gestión de Barrios -->
    <div v-show="municipioId" class="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden transform transition-all duration-500">
      <div class="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h3 class="text-xl font-bold text-slate-800 flex items-center gap-3">
          <div class="p-2 bg-orange-100 rounded-lg">
            <Icon name="i-heroicons-home-modern" class="w-6 h-6 text-orange-600"/>
          </div>
          Barrios y Veredas Registrados
        </h3>
        
        <button 
          v-if="!isAdding"
          @click="isAdding = true"
          class="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 focus:ring-4 focus:ring-slate-900/20 transition-all shadow-md active:scale-95"
        >
          <Icon name="i-heroicons-plus-circle" class="w-5 h-5"/>
          Añadir Zona
        </button>
      </div>

      <!-- Formulario Añadir (Slide Down) -->
      <div v-show="isAdding" class="p-6 bg-orange-50/30 border-b border-orange-100">
        <div class="flex flex-col md:flex-row gap-4 items-end">
          <div class="flex-1 space-y-2 w-full">
            <label class="block text-sm font-bold text-slate-700">Nombre de Barrio o Vereda</label>
            <input 
              v-model="newBarrioName"
              type="text"
              placeholder="Ej: Barrio Los Cambulos, Vereda El Descanso..."
              class="block w-full px-4 py-3 bg-white border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:ring-0 shadow-sm text-slate-800 placeholder-slate-400 transition-colors uppercase"
              @keyup.enter="guardarBarrio"
            />
          </div>
          <div class="flex gap-3 w-full md:w-auto">
            <button 
              @click="isAdding = false; newBarrioName = ''"
              class="flex-1 md:flex-none px-6 py-3 bg-white text-slate-600 font-bold border-2 border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-800 transition-colors"
              :disabled="saving"
            >
              Cancelar
            </button>
            <button 
              @click="guardarBarrio"
              class="flex-1 md:flex-none inline-flex justify-center items-center gap-2 px-8 py-3 bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-500 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0"
              :disabled="!newBarrioName.trim() || saving"
            >
              <Icon v-if="saving" name="i-heroicons-arrow-path" class="w-5 h-5 animate-spin"/>
              <Icon v-else name="i-heroicons-check" class="w-5 h-5"/>
              <span>{{ saving ? 'Guardando' : 'Guardar Zona' }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Listado Activo -->
      <div class="p-0">
        <div v-if="geoLoading" class="p-12 text-center">
          <div class="inline-block p-4 rounded-full bg-slate-50 mb-4">
            <div class="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
          </div>
          <p class="text-slate-500 font-medium">Cargando zonas...</p>
        </div>
        
        <div v-else-if="barriosVeredas.length === 0" class="p-16 text-center bg-slate-50/50">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-sm border border-slate-100 mb-6">
            <Icon name="i-heroicons-map" class="w-10 h-10 text-slate-300"/>
          </div>
          <h4 class="text-xl font-bold text-slate-700 mb-2">Aún no hay zonas registradas</h4>
          <p class="text-slate-500 max-w-sm mx-auto mb-6">Esta región no tiene barrios o veredas asignadas. Añade las zonas de cobertura para tus impulsadores.</p>
          <button v-if="!isAdding" @click="isAdding = true" class="text-orange-600 font-bold hover:text-orange-700 hover:underline">
            Comenzar a añadir zonas &rarr;
          </button>
        </div>

        <ul v-else class="divide-y divide-slate-100">
          <li 
            v-for="barrio in barriosVeredas" 
            :key="barrio.id"
            class="group flex items-center justify-between p-4 px-6 hover:bg-slate-50 transition-colors duration-200"
          >
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg shadow-inner">
                {{ barrio.nombre.charAt(0) }}
              </div>
              <div>
                <p class="font-bold text-slate-800">{{ barrio.nombre }}</p>
                <p class="text-xs text-slate-400 font-mono">ID: {{ barrio.id.split('-')[0] }}...</p>
              </div>
            </div>
            
            <button 
              @click="eliminarBarrio(barrio.id)"
              class="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
              title="Eliminar zona"
              :disabled="deletingId === barrio.id"
            >
              <Icon v-if="deletingId === barrio.id" name="i-heroicons-arrow-path" class="w-5 h-5 animate-spin"/>
              <Icon v-else name="i-heroicons-trash" class="w-5 h-5"/>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}
</style>
