<template>
  <div class="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div class="mb-8">
      <NuxtLink to="/dashboard" class="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center gap-1 mb-4">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Volver
      </NuxtLink>
      <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Registrar Prospecto</h1>
      <p class="text-slate-500 mt-2">Diligencia la información del cliente potencial. Los datos se guardarán localmente si no hay red.</p>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <form @submit.prevent="guardarProspecto" class="p-6 sm:p-8 space-y-6">
        
        <!-- Datos Personales -->
        <div>
          <h2 class="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="w-2 h-6 bg-emerald-500 rounded-full"></span>
            Datos Personales
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Nombres *</label>
              <input v-model="form.nombres" type="text" required class="w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-4 py-2 border" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Apellidos *</label>
              <input v-model="form.apellidos" type="text" required class="w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-4 py-2 border" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Tipo de Documento *</label>
              <select v-model="form.tipo_documento" required class="w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-4 py-2 border bg-white">
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="PPT">Permiso por Protección Temporal (PPT)</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Número de Documento *</label>
              <input v-model="form.documento_identidad" type="text" required class="w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-4 py-2 border" />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-slate-700 mb-1">Teléfono *</label>
              <input v-model="form.telefono" type="tel" required class="w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-4 py-2 border" />
            </div>
          </div>
        </div>

        <hr class="border-slate-100" />

        <!-- Datos del Servicio -->
        <div>
          <h2 class="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="w-2 h-6 bg-amber-500 rounded-full"></span>
            Datos del Servicio
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Código Único/Contrato</label>
              <input v-model="form.codigo" type="text" class="w-full rounded-xl border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 px-4 py-2 border" placeholder="Ej. 23001006-01050475" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Estrato Socioeconómico *</label>
              <select v-model.number="form.estrato" required class="w-full rounded-xl border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 px-4 py-2 border bg-white">
                <option :value="1">Estrato 1</option>
                <option :value="2">Estrato 2</option>
                <option :value="3">Estrato 3</option>
                <option :value="4">Estrato 4</option>
                <option :value="5">Estrato 5</option>
                <option :value="6">Estrato 6</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Tipo de Servicio *</label>
              <select v-model="form.tipo_servicio" required class="w-full rounded-xl border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 px-4 py-2 border bg-white">
                <option value="RESIDENCIAL">Residencial</option>
                <option value="COMERCIAL">Comercial</option>
                <option value="INDUSTRIAL">Industrial</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">¿Tiene Financiación? *</label>
              <select v-model="form.tiene_financiacion" required class="w-full rounded-xl border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 px-4 py-2 border bg-white">
                <option :value="true">SÍ</option>
                <option :value="false">NO</option>
              </select>
            </div>
          </div>
        </div>

        <hr class="border-slate-100" />

        <!-- Ubicación -->
        <div>
          <h2 class="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="w-2 h-6 bg-blue-500 rounded-full"></span>
            Ubicación en Terreno
          </h2>
          <div class="space-y-5">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Dirección *</label>
              <input v-model="form.direccion" type="text" required class="w-full rounded-xl border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 border" placeholder="Ej. Calle Principal #12-34" />
            </div>
            
            <div class="bg-blue-50/50 rounded-xl p-4 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p class="font-medium text-slate-800">Coordenadas GPS</p>
                <p class="text-sm text-slate-500" v-if="form.latitud && form.longitud">
                  Lat: {{ form.latitud.toFixed(6) }} | Lng: {{ form.longitud.toFixed(6) }}
                </p>
                <p class="text-sm text-amber-600 font-medium" v-else>Coordenadas no capturadas</p>
              </div>
              <button type="button" @click="capturarUbicacion" class="shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-blue-600 text-blue-700 rounded-lg hover:bg-blue-50 font-medium transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {{ ubicacionCargando ? 'Buscando...' : 'Capturar GPS' }}
              </button>
            </div>

            <!-- ─── Selectores de Zona en Cascada ──────────────────────────── -->
            <div class="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4">
              <div class="flex items-center gap-2 mb-1">
                <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p class="text-sm font-semibold text-slate-700">Zona de Servicio *</p>
              </div>

              <!-- Error de geografía -->
              <div v-if="errorGeo" class="flex items-center gap-2 text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-sm">
                <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                {{ errorGeo }} Usando datos guardados si están disponibles.
              </div>

              <!-- Departamento -->
              <div>
                <label class="block text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">1. Departamento</label>
                <div class="relative">
                  <select
                    :value="departamentoId"
                    @change="onDepartamentoChange(($event.target as HTMLSelectElement).value)"
                    required
                    :disabled="cargandoDepartamentos"
                    class="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2.5 border bg-white appearance-none pr-10 disabled:opacity-60 disabled:cursor-wait"
                  >
                    <option value="">
                      {{ cargandoDepartamentos ? 'Cargando departamentos...' : '— Selecciona un departamento —' }}
                    </option>
                    <option v-for="dep in departamentos" :key="dep.id" :value="dep.id">
                      {{ dep.nombre }}
                    </option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                    <svg v-if="cargandoDepartamentos" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <!-- Municipio -->
              <div>
                <label class="block text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">2. Municipio</label>
                <div class="relative">
                  <select
                    :value="municipioId"
                    @change="onMunicipioChange(($event.target as HTMLSelectElement).value)"
                    required
                    :disabled="!departamentoId || cargandoMunicipios"
                    class="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2.5 border bg-white appearance-none pr-10 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      <template v-if="!departamentoId">Primero selecciona un departamento</template>
                      <template v-else-if="cargandoMunicipios">Cargando municipios...</template>
                      <template v-else>— Selecciona un municipio —</template>
                    </option>
                    <option v-for="mun in municipios" :key="mun.id" :value="mun.id">
                      {{ mun.nombre }}
                    </option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                    <svg v-if="cargandoMunicipios" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <!-- Barrio / Vereda -->
              <div>
                <label class="block text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">3. Barrio / Vereda</label>
                <div class="relative">
                  <select
                    :value="barrioVeredaId"
                    @change="seleccionarBarrioVereda(($event.target as HTMLSelectElement).value)"
                    required
                    :disabled="!municipioId || cargandoBarrios"
                    class="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2.5 border bg-white appearance-none pr-10 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      <template v-if="!municipioId">Primero selecciona un municipio</template>
                      <template v-else-if="cargandoBarrios">Cargando barrios/veredas...</template>
                      <template v-else>— Selecciona un barrio o vereda —</template>
                    </option>
                    <option v-for="bv in barriosVeredas" :key="bv.id" :value="bv.id">
                      {{ bv.nombre }}
                    </option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                    <svg v-if="cargandoBarrios" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <!-- Confirmación visual de zona seleccionada -->
              <div v-if="form.barrio_vereda_id" class="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-sm">
                <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                Zona asignada correctamente
              </div>
            </div>
            <!-- ─── Fin Selectores de Zona ──────────────────────────────────── -->

          </div>
        </div>

        <hr class="border-slate-100" />

        <!-- Biometría e Inclusión -->
        <div>
          <h2 class="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="w-2 h-6 bg-purple-500 rounded-full"></span>
            Biometría e Inclusión
          </h2>
          <div class="bg-white border rounded-xl p-5 hover:border-purple-300 transition-colors">
            <label class="flex items-start gap-3 cursor-pointer">
              <div class="flex items-center h-6">
                <input v-model="form.is_analfabeto" type="checkbox" class="w-5 h-5 text-purple-600 border-slate-300 rounded focus:ring-purple-500" />
              </div>
              <div>
                <span class="block font-medium text-slate-800">Cliente No Alfabetizado (Analfabeto)</span>
                <span class="block text-sm text-slate-500 mt-1">Si se marca, será obligatorio capturar foto de rostro y una huella o firma asistida antes de sincronizar conforme a la Ley de Habeas Data.</span>
              </div>
            </label>

            <!-- Inputs for biometrics if is_analfabeto is true -->
            <div v-if="form.is_analfabeto" class="mt-5 space-y-4 animate-fade-in border-t pt-4">
              <p class="text-sm font-semibold text-purple-800 mb-2">Adjuntos Requeridos para Analfabetos:</p>
              
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Foto del Rostro *</label>
                <input type="file" accept="image/*" capture="user" @change="e => handleFileUpload(e, 'rostro')" required class="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100" />
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Firma / Huella Digitalizada *</label>
                <input type="file" accept="image/*" @change="e => handleFileUpload(e, 'huella')" required class="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100" />
              </div>
            </div>
          </div>
        </div>

        <!-- Submit -->
        <div class="pt-4 flex items-center justify-end gap-3">
          <NuxtLink to="/dashboard" class="px-5 py-2.5 text-slate-600 font-medium hover:text-slate-900 transition-colors">Cancelar</NuxtLink>
           <button type="submit" :disabled="guardando" class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center gap-2">
            <svg v-if="guardando" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span v-else>
              <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
            </span>
            {{ guardando ? 'Guardando...' : 'Guardar Localmente' }}
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useGeography } from '@/composables/useGeography';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/utils/db'; // Dexie instance

definePageMeta({ layout: 'profile-layout' });

const router = useRouter();
const { user } = useAuth();
const guardando = ref(false);
const ubicacionCargando = ref(false);

// ─── Geografía en cascada ──────────────────────────────────────────────────
const {
  departamentos,
  municipios,
  barriosVeredas,
  departamentoId,
  municipioId,
  barrioVeredaId,
  cargandoDepartamentos,
  cargandoMunicipios,
  cargandoBarrios,
  errorGeo,
  cargarDepartamentos,
  onDepartamentoChange,
  onMunicipioChange,
  onBarrioVeredaChange,
} = useGeography();

// ─── Formulario ────────────────────────────────────────────────────────────
const form = reactive({
  nombres: '',
  apellidos: '',
  tipo_documento: 'CC',
  documento_identidad: '',
  telefono: '',
  direccion: '',
  latitud: null as number | null,
  longitud: null as number | null,
  is_analfabeto: false,
  barrio_vereda_id: '' as string,
  codigo: '',
  estrato: 1,
  tipo_servicio: 'RESIDENCIAL',
  tiene_financiacion: false,
});

// Cuando el usuario elige un barrio/vereda, actualizamos el form directamente
const seleccionarBarrioVereda = (id: string) => {
  onBarrioVeredaChange(id);
  form.barrio_vereda_id = id;
};

// Biometric base64 variables
const rostroBase64 = ref<string | null>(null);
const huellaBase64 = ref<string | null>(null);

const handleFileUpload = (event: Event, tipo: 'rostro' | 'huella') => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      if (tipo === 'rostro') rostroBase64.value = base64;
      if (tipo === 'huella') huellaBase64.value = base64;
    };
    reader.readAsDataURL(file);
  }
};

const capturarUbicacion = () => {
  if (!navigator.geolocation) {
    alert("Tu navegador no soporta geolocalización o permisos denegados.");
    return;
  }
  ubicacionCargando.value = true;
  navigator.geolocation.getCurrentPosition(
    (position) => {
      form.latitud = position.coords.latitude;
      form.longitud = position.coords.longitude;
      ubicacionCargando.value = false;
    },
    (error) => {
      console.error(error);
      alert("No se pudo obtener la ubicación. Por favor, revisa tus permisos de GPS.");
      ubicacionCargando.value = false;
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
};

const guardarProspecto = async () => {
  if (!form.latitud || !form.longitud) {
    alert("Es obligatorio capturar la ubicación GPS para registrar un prospecto en campo.");
    return;
  }

  if (form.is_analfabeto && (!rostroBase64.value || !huellaBase64.value)) {
    alert("Para usuarios analfabetos se debe adjuntar obligatoriamente la fotografía y huella/firma.");
    return;
  }

  if (!form.barrio_vereda_id) {
    alert("Debe seleccionar el Barrio o Vereda donde se ubica el prospecto.");
    return;
  }

  try {
    guardando.value = true;
    
    const newClienteId = uuidv4();
    
    const prospecto = {
      id: newClienteId,
      local_id: newClienteId,
      nombres: form.nombres,
      apellidos: form.apellidos,
      tipo_documento: form.tipo_documento,
      documento_identidad: form.documento_identidad,
      telefono: form.telefono,
      direccion: form.direccion,
      latitud: form.latitud,
      longitud: form.longitud,
      is_analfabeto: form.is_analfabeto,
      estado: 'PROSPECTO',
      barrio_vereda_id: form.barrio_vereda_id,
      codigo: form.codigo || null,
      estrato: form.estrato,
      tipo_servicio: form.tipo_servicio,
      tiene_financiacion: form.tiene_financiacion,
      impulsador_id: user.value?.id || null,
      is_synced: 0,
      created_at_manual: new Date().toISOString()
    };

    await db.transaction('rw', db.clientes, db.biometrias, async () => {
      await db.clientes.add(prospecto);

      if (form.is_analfabeto) {
        if (rostroBase64.value) {
          await db.biometrias.add({
            id: uuidv4(),
            local_id: uuidv4(),
            cliente_id: newClienteId,
            tipo: 'ROSTRO',
            file_base64: rostroBase64.value,
            is_synced: 0,
            created_at_manual: new Date().toISOString()
          });
        }
        if (huellaBase64.value) {
          await db.biometrias.add({
            id: uuidv4(),
            local_id: uuidv4(),
            cliente_id: newClienteId,
            tipo: 'HUELLA',
            file_base64: huellaBase64.value,
            is_synced: 0,
            created_at_manual: new Date().toISOString()
          });
        }
      }
    });

    alert("¡Prospecto guardado exitosamente en el dispositivo!");
    router.push('/dashboard');

  } catch (error) {
    console.error("Error al guardar prospecto Localmente:", error);
    alert("Ocurrió un error guardando el prospecto.");
  } finally {
    guardando.value = false;
  }
};

// ─── Inicialización ────────────────────────────────────────────────────────
// Al montar la página, cargamos los departamentos automáticamente.
// Si no hay red, usa el caché de IndexedDB.
onMounted(() => {
  cargarDepartamentos();
});
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
</style>
