<template>
  <div class="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <!-- Botón Volver -->
    <div class="mb-6">
      <NuxtLink to="/dashboard" class="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium inline-flex items-center gap-1 mb-4 transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Volver al Panel
      </NuxtLink>
      <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Registro de Campo</h1>
      <p class="text-slate-500 dark:text-slate-400 mt-2">Diligencia la información en campo. Los datos se guardan de forma segura 100% offline.</p>
    </div>

    <!-- ─── INDICADOR DE PASOS PREMIUM ─────────────────────────────────── -->
    <div class="mb-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
      <div class="flex items-center justify-between relative">
        <!-- Línea de Progreso Detrás -->
        <div class="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-100 dark:bg-slate-700 z-0">
          <div 
            class="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500" 
            :style="{ width: step === 1 ? '50%' : '100%' }"
          ></div>
        </div>

        <!-- Paso 1 -->
        <div class="relative z-10 flex flex-col items-center gap-2 flex-1 cursor-pointer" @click="goToStep(1)">
          <div 
            class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-md"
            :class="[
              step === 1 
                ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 dark:ring-emerald-950' 
                : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
            ]"
          >
            1
          </div>
          <span 
            class="text-xs font-bold tracking-wide uppercase transition-colors"
            :class="step === 1 ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400'"
          >
            Paso 1: Censo
          </span>
        </div>

        <!-- Paso 2 -->
        <div 
          class="relative z-10 flex flex-col items-center gap-2 flex-1 transition-all"
          :class="{ 'opacity-60': !form.desea_servicio }"
        >
          <div 
            class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-md"
            :class="[
              step === 2 
                ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 dark:ring-emerald-950' 
                : step > 1
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
            ]"
          >
            2
          </div>
          <span 
            class="text-xs font-bold tracking-wide uppercase transition-colors"
            :class="step === 2 ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400'"
          >
            Paso 2: Formalización
          </span>
        </div>
      </div>
    </div>

    <!-- Error de Validación en Paso -->
    <div v-if="validationError" class="mb-5 p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 rounded-xl flex items-center gap-2 text-sm animate-fade-in">
      <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
      {{ validationError }}
    </div>

    <!-- Contenedor Principal del Formulario -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <form @submit.prevent="guardarRegistro" class="p-6 sm:p-8 space-y-8">
        
        <!-- ================================================================= -->
        <!-- ─── PASO 1: CENSO DE CAMPO ────────────────────────────────────── -->
        <!-- ================================================================= -->
        <div v-if="step === 1" class="space-y-6 animate-fade-in">
          <div>
            <h2 class="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <span class="w-2.5 h-6 bg-emerald-500 rounded-full"></span>
              Datos Personales del Censo
            </h2>
            <p class="text-xs text-slate-400 dark:text-slate-500 mt-1">Registra los datos básicos de identificación del habitante censado.</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nombres *</label>
              <input v-model="form.nombres" type="text" required class="w-full rounded-xl border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-4 py-2 border" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Apellidos *</label>
              <input v-model="form.apellidos" type="text" required class="w-full rounded-xl border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-4 py-2 border" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tipo de Documento *</label>
              <select v-model="form.tipo_documento" required class="w-full rounded-xl border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-4 py-2 border">
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="PPT">Permiso por Protección Temporal (PPT)</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Número de Documento *</label>
              <input v-model="form.documento_identidad" type="text" required class="w-full rounded-xl border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-4 py-2 border" />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Teléfono *</label>
              <input v-model="form.telefono" type="tel" required class="w-full rounded-xl border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-4 py-2 border" />
            </div>
          </div>

          <hr class="border-slate-100 dark:border-slate-700" />

          <!-- Ubicación y Zona -->
          <div>
            <h2 class="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <span class="w-2.5 h-6 bg-blue-500 rounded-full"></span>
              Ubicación Geográfica
            </h2>
            <p class="text-xs text-slate-400 dark:text-slate-500 mt-1">Geolocaliza la vivienda y selecciona la zona político-administrativa DANE.</p>
          </div>

          <div class="space-y-5">
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Dirección *</label>
              <input v-model="form.direccion" type="text" required class="w-full rounded-xl border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 border" placeholder="Ej. Calle Principal #12-34" />
            </div>
            
            <!-- GPS Panel -->
            <div class="bg-blue-50/50 dark:bg-slate-900/40 rounded-2xl p-5 border border-blue-100 dark:border-blue-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p class="font-semibold text-slate-800 dark:text-slate-200">Coordenadas GPS de Campo</p>
                <p class="text-sm text-slate-500 dark:text-slate-400 mt-0.5" v-if="form.latitud && form.longitud">
                  Latitud: <strong class="text-slate-700 dark:text-slate-300">{{ form.latitud.toFixed(6) }}</strong> · Longitud: <strong class="text-slate-700 dark:text-slate-300">{{ form.longitud.toFixed(6) }}</strong>
                </p>
                <p class="text-sm text-slate-400 dark:text-slate-500" v-else>Sin coordenadas GPS capturadas (Se puede registrar sin conexión)</p>
              </div>
              <button type="button" @click="capturarUbicacion" class="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border-2 border-blue-600 dark:border-blue-500 text-blue-700 dark:text-blue-400 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-700/50 font-bold transition-all shadow-sm">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {{ ubicacionCargando ? 'Buscando Señal...' : 'Capturar GPS' }}
              </button>
            </div>

            <!-- Selectores DANE offline cascada -->
            <div class="bg-slate-50 dark:bg-slate-900/20 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 space-y-4">
              <p class="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                Jerarquía DANE de la Zona
              </p>

              <!-- Departamento -->
              <div>
                <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">1. Departamento</label>
                <div class="relative">
                  <select
                    :value="departamentoId"
                    @change="onDepartamentoChange(($event.target as HTMLSelectElement).value)"
                    required
                    :disabled="cargandoDepartamentos"
                    class="w-full rounded-xl border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2.5 border appearance-none disabled:opacity-60"
                  >
                    <option value="">{{ cargandoDepartamentos ? 'Cargando...' : '— Selecciona Departamento —' }}</option>
                    <option v-for="dep in departamentos" :key="dep.id" :value="dep.id">{{ dep.nombre }}</option>
                  </select>
                </div>
              </div>

              <!-- Municipio -->
              <div>
                <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">2. Municipio</label>
                <div class="relative">
                  <select
                    :value="municipioId"
                    @change="onMunicipioChange(($event.target as HTMLSelectElement).value)"
                    required
                    :disabled="!departamentoId || cargandoMunicipios"
                    class="w-full rounded-xl border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2.5 border appearance-none disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      <template v-if="!departamentoId">Primero selecciona Departamento</template>
                      <template v-else-if="cargandoMunicipios">Cargando municipios...</template>
                      <template v-else>— Selecciona Municipio —</template>
                    </option>
                    <option v-for="mun in municipios" :key="mun.id" :value="mun.id">{{ mun.nombre }}</option>
                  </select>
                </div>
              </div>

              <!-- Barrio / Vereda -->
              <div>
                <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">3. Barrio / Vereda</label>
                <div class="relative">
                  <select
                    :value="barrioVeredaId"
                    @change="seleccionarBarrioVereda(($event.target as HTMLSelectElement).value)"
                    required
                    :disabled="!municipioId || cargandoBarrios"
                    class="w-full rounded-xl border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2.5 border appearance-none disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      <template v-if="!municipioId">Primero selecciona Municipio</template>
                      <template v-else-if="cargandoBarrios">Cargando barrios...</template>
                      <template v-else>— Selecciona Barrio o Vereda —</template>
                    </option>
                    <option v-for="bv in barriosVeredas" :key="bv.id" :value="bv.id">{{ bv.nombre }}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <hr class="border-slate-100 dark:border-slate-700" />

          <!-- INTENCIÓN DE SERVICIO -->
          <div>
            <h2 class="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <span class="w-2.5 h-6 bg-amber-500 rounded-full"></span>
              Intención de Adquisición
            </h2>
            <p class="text-xs text-slate-400 dark:text-slate-500 mt-1">Determina si la persona está interesada en adquirir el servicio de gas natural residencial.</p>
          </div>

          <div class="space-y-4">
            <p class="text-sm font-semibold text-slate-700 dark:text-slate-300">¿Desea adquirir el servicio de Gas Natural? *</p>
            <div class="grid grid-cols-2 gap-4">
              <!-- Botón Sí -->
              <button
                type="button"
                @click="form.desea_servicio = true"
                :class="[
                  'flex items-center justify-center gap-3 p-5 rounded-2xl border-2 transition-all duration-200 font-bold text-lg cursor-pointer',
                  form.desea_servicio === true
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 ring-4 ring-emerald-100 dark:ring-emerald-950'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                ]"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4" /></svg>
                Sí, desea el servicio
              </button>

              <!-- Botón No -->
              <button
                type="button"
                @click="form.desea_servicio = false"
                :class="[
                  'flex items-center justify-center gap-3 p-5 rounded-2xl border-2 transition-all duration-200 font-bold text-lg cursor-pointer',
                  form.desea_servicio === false
                    ? 'border-red-500 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 ring-4 ring-red-100 dark:ring-red-950'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                ]"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                No desea el servicio
              </button>
            </div>

            <!-- Razón del rechazo si selecciona No -->
            <div v-if="form.desea_servicio === false" class="animate-fade-in p-5 bg-red-50/50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/50 rounded-2xl space-y-3">
              <label class="block text-sm font-semibold text-red-800 dark:text-red-400">Especifica el motivo de rechazo del servicio: *</label>
              <select v-model="form.razon_rechazo" required class="w-full rounded-xl border-red-300 dark:border-red-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm focus:border-red-500 focus:ring-red-500 px-4 py-2.5 border">
                <option value="">— Selecciona Razón de Rechazo —</option>
                <option value="COSTO">El costo de la instalación es muy elevado</option>
                <option value="OTRO_SERVICIO">Ya cuenta con pipeta de gas propano / electricidad</option>
                <option value="NO_PROPIETARIO">No es dueño de la vivienda (arrendatario)</option>
                <option value="INSEGURIDAD">Temor / Inseguridad sobre el gas por tubería</option>
                <option value="OTRO">Otro motivo (especificar)</option>
              </select>
              <input 
                v-if="form.razon_rechazo === 'OTRO'" 
                v-model="otroDetalleRechazo" 
                type="text" 
                placeholder="Especifica el motivo..." 
                required 
                class="w-full rounded-xl border-red-300 dark:border-red-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm focus:border-red-500 focus:ring-red-500 px-4 py-2 border mt-2" 
              />
              <p class="text-xs text-red-600 dark:text-red-400/80 mt-1">Aviso: Este registro permanecerá guardado como 'Inactivo' para que la empresa pueda realizar campañas de reconversión o contacto en el futuro.</p>
            </div>
          </div>

          <!-- Acciones de Navegación del Paso 1 -->
          <div class="pt-6 border-t border-slate-100 dark:border-slate-700 flex items-center justify-end gap-3">
            <NuxtLink to="/dashboard" class="px-5 py-2.5 text-slate-600 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-white transition-colors">Cancelar</NuxtLink>
            
            <!-- Botón Finalizar Censo (Si no desea servicio) -->
            <button 
              v-if="form.desea_servicio === false"
              type="button" 
              @click="guardarCensoRechazado"
              :disabled="guardando"
              class="px-6 py-2.5 bg-slate-700 hover:bg-slate-800 text-white font-bold rounded-xl shadow-md transition-all disabled:opacity-75 inline-flex items-center gap-2"
            >
              <svg v-if="guardando" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Finalizar Censo (No desea)
            </button>

            <!-- Botón Continuar a Paso 2 (Si desea servicio) -->
            <button 
              v-else
              type="button" 
              @click="avanzarPaso2"
              class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all inline-flex items-center gap-1.5"
            >
              Continuar a Formalización
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>


        <!-- ================================================================= -->
        <!-- ─── PASO 2: FORMALIZACIÓN DEL CONTRATO ────────────────────────── -->
        <!-- ================================================================= -->
        <div v-if="step === 2" class="space-y-6 animate-fade-in">
          
          <!-- Encabezado del paso -->
          <div>
            <h2 class="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <span class="w-2.5 h-6 bg-teal-500 rounded-full"></span>
              Paso 2: Formalización y Contrato
            </h2>
            <p class="text-xs text-slate-400 dark:text-slate-500 mt-1">Genera el código único del contrato, define el tipo de servicio, el estrato y el subsidio de estufa si aplica.</p>
          </div>

          <!-- ── CÓDIGO DE CONTRATO AUTOGENERADO PREMIUM ── -->
          <div class="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 p-6 rounded-2xl border border-emerald-500/20 shadow-xl text-white relative overflow-hidden">
            <div class="absolute -right-6 -bottom-6 w-32 h-32 bg-emerald-500 opacity-5 rounded-full blur-2xl"></div>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-emerald-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Código Único Generado
                </p>
                <p class="text-3xl font-mono font-black mt-2 tracking-wider select-all text-white">
                  {{ generatedContractCode || 'CARGANDO...' }}
                </p>
                <p class="text-[11px] text-slate-400 mt-2 font-medium">Fórmula determinista DANE-FECHA-ESTRATO-DOC. Seguro e idóneo para uso offline.</p>
              </div>
              <div class="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/15 shadow-inner">
                <svg class="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
              </div>
            </div>
          </div>

          <!-- Campos del Servicio -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Estrato Socioeconómico *</label>
              <select v-model.number="form.estrato" required class="w-full rounded-xl border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-4 py-2 border">
                <option :value="1">Estrato 1 (Bajo-Bajo)</option>
                <option :value="2">Estrato 2 (Bajo)</option>
                <option :value="3">Estrato 3 (Medio-Bajo)</option>
                <option :value="4">Estrato 4 (Medio)</option>
                <option :value="5">Estrato 5 (Medio-Alto)</option>
                <option :value="6">Estrato 6 (Alto)</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tipo de Servicio *</label>
              <select v-model="form.tipo_servicio" required class="w-full rounded-xl border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-4 py-2 border">
                <option value="RESIDENCIAL">Residencial</option>
                <option value="COMERCIAL">Comercial</option>
                <option value="INDUSTRIAL">Industrial</option>
              </select>
            </div>
          </div>

          <!-- ── BENEFICIO DE ESTUFA PARA ESTRATOS 1 y 2 ── -->
          <div v-if="esEstratoBajo" class="animate-fade-in p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl space-y-4">
            <div>
              <span class="inline-flex items-center gap-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                🎁 Subsidio Habilitado
              </span>
              <h3 class="text-lg font-bold text-emerald-900 dark:text-emerald-400 mt-2">Beneficio de Estufa de Cocinar</h3>
              <p class="text-sm text-emerald-700 dark:text-emerald-500">Por pertenecer a estrato bajo (1 o 2), el beneficiario califica para incluir una estufa de cocina financiada o subsidiada junto con la instalación del contador.</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <!-- Ninguna -->
              <button
                type="button"
                @click="form.incluye_estufa = 'NINGUNA'"
                :class="[
                  'relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer',
                  form.incluye_estufa === 'NINGUNA'
                    ? 'border-emerald-600 bg-white dark:bg-slate-900 shadow-md ring-2 ring-emerald-200 dark:ring-emerald-950 font-bold'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300 hover:shadow-sm'
                ]"
              >
                <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                <span class="text-sm font-semibold" :class="form.incluye_estufa === 'NINGUNA' ? 'text-emerald-800 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'">Ninguna</span>
                <span class="text-[10px] text-slate-400">Instalación estándar</span>
              </button>

              <!-- 2 Puestos -->
              <button
                type="button"
                @click="form.incluye_estufa = 'DOS_PUESTOS'"
                :class="[
                  'relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer',
                  form.incluye_estufa === 'DOS_PUESTOS'
                    ? 'border-emerald-600 bg-white dark:bg-slate-900 shadow-md ring-2 ring-emerald-200 dark:ring-emerald-950 font-bold'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300 hover:shadow-sm'
                ]"
              >
                <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                <span class="text-sm font-semibold" :class="form.incluye_estufa === 'DOS_PUESTOS' ? 'text-emerald-800 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'">Estufa 2 Puestos</span>
                <span class="text-[10px] text-emerald-600 dark:text-emerald-500 font-bold">Subsidiada</span>
              </button>

              <!-- 4 Puestos -->
              <button
                type="button"
                @click="form.incluye_estufa = 'CUATRO_PUESTOS'"
                :class="[
                  'relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer',
                  form.incluye_estufa === 'CUATRO_PUESTOS'
                    ? 'border-emerald-600 bg-white dark:bg-slate-900 shadow-md ring-2 ring-emerald-200 dark:ring-emerald-950 font-bold'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300 hover:shadow-sm'
                ]"
              >
                <svg class="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" /></svg>
                <span class="text-sm font-semibold" :class="form.incluye_estufa === 'CUATRO_PUESTOS' ? 'text-emerald-800 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'">Estufa 4 Puestos</span>
                <span class="text-[10px] text-teal-600 dark:text-teal-500 font-bold">Subsidio Parcial</span>
              </button>
            </div>
            
            <p class="text-[11px] text-emerald-800 dark:text-emerald-400/80">Nota: La estufa se entregará sellada e instalada junto al medidor homologado.</p>
          </div>

          <hr class="border-slate-100 dark:border-slate-700" />

          <!-- Financiación Sección -->
          <div>
            <h2 class="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <span class="w-2.5 h-6 bg-teal-500 rounded-full"></span>
              Plan de Financiación de la Instalación
            </h2>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Valor de instalación total: <strong class="text-slate-800 dark:text-slate-200">$1.000.000 COP</strong> (Tasa de interés: <strong class="text-slate-800 dark:text-slate-200">1,8% mensual</strong> / {{ TASA_EA }}% E.A.)
            </p>
          </div>

          <!-- Botones de Modalidad de Financiación -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <!-- Contado -->
            <button
              type="button"
              @click="form.financiacion_tipo = 'CONTADO'"
              :class="[
                'relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer',
                form.financiacion_tipo === 'CONTADO'
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 shadow-md ring-2 ring-emerald-200 dark:ring-emerald-950'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300 hover:shadow-sm'
              ]"
            >
              <svg class="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <span class="font-bold text-sm" :class="form.financiacion_tipo === 'CONTADO' ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'">Contado</span>
              <span class="text-xs text-slate-500">Pago único sin intereses</span>
            </button>

            <!-- Credi-Contado -->
            <button
              type="button"
              @click="form.financiacion_tipo = 'CREDI_CONTADO'"
              :class="[
                'relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer',
                form.financiacion_tipo === 'CREDI_CONTADO'
                  ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/20 shadow-md ring-2 ring-amber-200 dark:ring-amber-950'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300 hover:shadow-sm'
              ]"
            >
              <svg class="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              <span class="font-bold text-sm" :class="form.financiacion_tipo === 'CREDI_CONTADO' ? 'text-amber-700 dark:text-amber-400' : 'text-slate-700 dark:text-slate-300'">Credi-Contado</span>
              <span class="text-xs text-slate-500">2 a 4 cuotas mensuales</span>
            </button>

            <!-- Financiado -->
            <button
              type="button"
              @click="form.financiacion_tipo = 'FINANCIADO'"
              :class="[
                'relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer',
                form.financiacion_tipo === 'FINANCIADO'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 shadow-md ring-2 ring-blue-200 dark:ring-blue-950'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300 hover:shadow-sm'
              ]"
            >
              <svg class="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span class="font-bold text-sm" :class="form.financiacion_tipo === 'FINANCIADO' ? 'text-blue-700 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'">Financiado</span>
              <span class="text-xs text-slate-500">Plazo de 1 a 3 años</span>
            </button>
          </div>

          <!-- Detalles: Contado -->
          <div v-if="form.financiacion_tipo === 'CONTADO'" class="animate-fade-in bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 p-5 rounded-2xl">
            <p class="font-bold text-emerald-800 dark:text-emerald-400 text-lg">Pago Único de Contado</p>
            <p class="text-sm text-emerald-700 dark:text-emerald-500/90 mt-1">Instalación libre de intereses. Pago total a realizar en la primera facturación: <strong>$1.000.000 COP</strong>.</p>
          </div>

          <!-- Detalles: Credi-Contado -->
          <div v-if="form.financiacion_tipo === 'CREDI_CONTADO'" class="animate-fade-in space-y-3">
            <p class="text-sm font-semibold text-slate-700 dark:text-slate-300">Selecciona el número de cuotas de Credi-Contado:</p>
            <div class="grid grid-cols-3 gap-3">
              <label
                v-for="opt in opcionesCrediContado"
                :key="opt.cuotas"
                :class="[
                  'relative flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all duration-200',
                  form.financiacion_cuotas === opt.cuotas
                    ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 shadow-md'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300'
                ]"
              >
                <input type="radio" :value="opt.cuotas" v-model="form.financiacion_cuotas" class="sr-only" />
                <span class="text-2xl font-extrabold" :class="form.financiacion_cuotas === opt.cuotas ? 'text-amber-700 dark:text-amber-400' : 'text-slate-700 dark:text-slate-300'">{{ opt.cuotas }} cuotas</span>
                <span class="text-[11px] text-slate-500 mt-1 font-semibold">${{ formatCOP(opt.valorCuota) }}/mes</span>
                <div class="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 space-y-0.5">
                  <p>Interés: ${{ formatCOP(opt.totalInteres) }}</p>
                  <p class="font-bold text-slate-600 dark:text-slate-300">Total: ${{ formatCOP(opt.totalPagar) }}</p>
                </div>
              </label>
            </div>
          </div>

          <!-- Detalles: Financiado -->
          <div v-if="form.financiacion_tipo === 'FINANCIADO'" class="animate-fade-in space-y-3">
            <p class="text-sm font-semibold text-slate-700 dark:text-slate-300">Selecciona el plazo de amortización:</p>
            <div class="grid grid-cols-3 gap-3">
              <label
                v-for="opt in opcionesFinanciado"
                :key="opt.anios"
                :class="[
                  'relative flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all duration-200',
                  form.financiacion_anios === opt.anios
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 shadow-md'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300'
                ]"
              >
                <input type="radio" :value="opt.anios" v-model="form.financiacion_anios" class="sr-only" />
                <span class="text-2xl font-extrabold" :class="form.financiacion_anios === opt.anios ? 'text-blue-700 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'">{{ opt.anios }} {{ opt.anios === 1 ? 'año' : 'años' }}</span>
                <span class="text-[11px] text-slate-500 mt-1 font-semibold">${{ formatCOP(opt.cuotaMensual) }}/mes</span>
                <div class="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 space-y-0.5">
                  <p>Interés: ${{ formatCOP(opt.totalInteres) }}</p>
                  <p class="font-bold text-slate-600 dark:text-slate-300">Total: ${{ formatCOP(opt.totalPagar) }}</p>
                </div>
              </label>
            </div>
          </div>

          <hr class="border-slate-100 dark:border-slate-700" />

          <!-- Biometría e Inclusión -->
          <div>
            <h2 class="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <span class="w-2.5 h-6 bg-purple-500 rounded-full"></span>
              Biometría e Inclusión Digital
            </h2>
            <p class="text-xs text-slate-400 dark:text-slate-500 mt-1">Cumplimiento Habeas Data 🇨🇴. Captura huellas y rostros para personas que no firman.</p>
          </div>

          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 hover:border-purple-300 dark:hover:border-purple-900 transition-colors">
            <label class="flex items-start gap-3 cursor-pointer">
              <div class="flex items-center h-6">
                <input v-model="form.is_analfabeto" type="checkbox" class="w-5 h-5 text-purple-600 border-slate-300 rounded focus:ring-purple-500 cursor-pointer" />
              </div>
              <div>
                <span class="block font-semibold text-slate-800 dark:text-white">Cliente No Alfabetizado (Analfabeto)</span>
                <span class="block text-xs text-slate-500 dark:text-slate-400 mt-1">El firmante no sabe o no puede firmar físicamente. Se requiere obligatoriamente capturar una foto frontal del rostro y huella digitalizada.</span>
              </div>
            </label>

            <!-- Captura de archivos biométricos -->
            <div v-if="form.is_analfabeto" class="mt-5 space-y-4 animate-fade-in border-t border-slate-100 dark:border-slate-800 pt-4">
              <p class="text-sm font-bold text-purple-800 dark:text-purple-400 flex items-center gap-1.5">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                Archivos Biométricos Requeridos:
              </p>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="p-4 bg-purple-50/30 dark:bg-purple-950/10 border border-purple-100 dark:border-purple-900/50 rounded-xl space-y-2">
                  <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">1. Fotografía de Rostro *</label>
                  <input type="file" accept="image/*" capture="user" @change="e => handleFileUpload(e, 'rostro')" required class="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3.5 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-purple-50 dark:file:bg-purple-950 file:text-purple-700 dark:file:text-purple-300 hover:file:bg-purple-100 cursor-pointer" />
                  <p class="text-[10px] text-slate-400">Captura frontal con buena iluminación.</p>
                </div>

                <div class="p-4 bg-purple-50/30 dark:bg-purple-950/10 border border-purple-100 dark:border-purple-900/50 rounded-xl space-y-2">
                  <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">2. Huella / Firma Digitalizada *</label>
                  <input type="file" accept="image/*" @change="e => handleFileUpload(e, 'huella')" required class="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3.5 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-purple-50 dark:file:bg-purple-950 file:text-purple-700 dark:file:text-purple-300 hover:file:bg-purple-100 cursor-pointer" />
                  <p class="text-[10px] text-slate-400">Captura de huella dactilar o firma asistida.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Acciones de Navegación del Paso 2 -->
          <div class="pt-6 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <button 
              type="button" 
              @click="step = 1"
              class="px-5 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 transition-colors inline-flex items-center gap-1.5"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" /></svg>
              Atrás al Censo
            </button>

            <button 
              type="submit" 
              :disabled="guardando" 
              class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-colors disabled:opacity-75 inline-flex items-center gap-2"
            >
              <svg v-if="guardando" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
              {{ guardando ? 'Guardando Contrato...' : 'Formalizar y Guardar' }}
            </button>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useGeography } from '@/composables/useGeography';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/utils/db'; // Dexie database instance

definePageMeta({ layout: 'profile-layout' });

const router = useRouter();
const { user } = useAuth();

// Flujo Wizard
const step = ref(1);
const guardando = ref(false);
const ubicacionCargando = ref(false);
const validationError = ref('');

// Campos auxiliares censo rechazo
const otroDetalleRechazo = ref('');

// ─── CONSTANTES DE FINANCIACIÓN ────────────────────────────────────────────
const VALOR_INSTALACION = 1_000_000; // COP
const TASA_MENSUAL = 0.018;          // 1.8% mensual
const TASA_EA = ((Math.pow(1 + TASA_MENSUAL, 12) - 1) * 100).toFixed(1); // ≈23.9% E.A.

// ─── GEOGRAFÍA CASCADA ──────────────────────────────────────────────────────
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

// ─── FORMULARIO CENTRAL ──────────────────────────────────────────────────────
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
  // Campos Nuevos Censo & Beneficios
  desea_servicio: true,
  razon_rechazo: '',
  incluye_estufa: 'NINGUNA' as 'NINGUNA' | 'DOS_PUESTOS' | 'CUATRO_PUESTOS',
  // Financiación
  financiacion_tipo: 'CONTADO' as 'CONTADO' | 'CREDI_CONTADO' | 'FINANCIADO',
  financiacion_cuotas: 2 as 2 | 3 | 4,     // credi-contado
  financiacion_anios: 1 as 1 | 2 | 3,      // financiado
});

// Resetea campos específicos si el estrato no es bajo
const esEstratoBajo = computed(() => form.estrato === 1 || form.estrato === 2);
watch(() => form.estrato, (newEstrato) => {
  if (newEstrato > 2) {
    form.incluye_estufa = 'NINGUNA';
  }
});

// ─── CÓDIGO DE CONTRATO AUTOGENERADO OFFLINE-FIRST ─────────────────────────
const generatedContractCode = computed(() => {
  if (!form.documento_identidad) return '';
  const municObj = municipios.value.find(m => m.id === municipioId.value);
  const codigoDane = municObj?.codigo_dane || '23001';
  
  // YYMMDD
  const today = new Date();
  const yy = String(today.getFullYear()).slice(-2);
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const dateStr = `${yy}${mm}${dd}`;
  
  const last4 = form.documento_identidad.replace(/\D/g, '').slice(-4).padStart(4, '0');
  const estratoStr = String(form.estrato);
  
  return `${codigoDane}-${dateStr}-${estratoStr}-${last4}`;
});

// Vigilamos el código autogenerado y lo asignamos al form
watch(generatedContractCode, (newVal) => {
  form.codigo = newVal;
});

// ─── CÁLCULOS FINANCIACIÓN ──────────────────────────────────────────────────
const opcionesCrediContado = computed(() => {
  return ([2, 3, 4] as const).map(cuotas => {
    const totalInteres = Math.round(VALOR_INSTALACION * TASA_MENSUAL * cuotas);
    const totalPagar = VALOR_INSTALACION + totalInteres;
    const valorCuota = Math.round(totalPagar / cuotas);
    return { cuotas, totalInteres, totalPagar, valorCuota };
  });
});

const opcionesFinanciado = computed(() => {
  return ([1, 2, 3] as const).map(anios => {
    const totalMeses = anios * 12;
    const r = TASA_MENSUAL;
    const factor = Math.pow(1 + r, totalMeses);
    const cuotaMensual = Math.round(VALOR_INSTALACION * (r * factor) / (factor - 1));
    const totalPagar = cuotaMensual * totalMeses;
    const totalInteres = totalPagar - VALOR_INSTALACION;
    return { anios, totalMeses, cuotaMensual, totalPagar, totalInteres };
  });
});

const formatCOP = (valor: number): string => {
  return valor.toLocaleString('es-CO');
};

// ─── SELECCIÓN BARRIO/VEREDA ───────────────────────────────────────────────
const seleccionarBarrioVereda = (id: string) => {
  onBarrioVeredaChange(id);
  form.barrio_vereda_id = id;
};

// ─── ARCHIVOS BIOMÉTRICOS BASE64 ───────────────────────────────────────────
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

// ─── GEOLOCALIZACIÓN GPS ────────────────────────────────────────────────────
const capturarUbicacion = () => {
  if (!navigator.geolocation) {
    alert("Tu dispositivo no soporta geolocalización o permisos denegados.");
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
      console.error("GPS Error:", error);
      alert(`No se pudo obtener la ubicación GPS (Error: ${error.message || error.code}). Revisa tu configuración de permisos.`);
      ubicacionCargando.value = false;
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
};

// ─── VALIDACIONES POR PASOS ───────────────────────────────────────────────
const validarPaso1 = (): boolean => {
  validationError.value = '';
  if (!form.nombres.trim()) { validationError.value = 'El nombre es obligatorio.'; return false; }
  if (!form.apellidos.trim()) { validationError.value = 'El apellido es obligatorio.'; return false; }
  if (!form.documento_identidad.trim()) { validationError.value = 'El documento de identidad es obligatorio.'; return false; }
  if (!form.telefono.trim()) { validationError.value = 'El teléfono es obligatorio.'; return false; }
  if (!form.direccion.trim()) { validationError.value = 'La dirección es obligatoria.'; return false; }
  if (!form.barrio_vereda_id) { validationError.value = 'Debe seleccionar el departamento, municipio y barrio/vereda.'; return false; }
  return true;
};

const avanzarPaso2 = () => {
  if (validarPaso1()) {
    step.value = 2;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const goToStep = (targetStep: number) => {
  if (targetStep === 1) {
    step.value = 1;
  } else if (targetStep === 2 && form.desea_servicio) {
    avanzarPaso2();
  }
};

// ─── GUARDADO DEL CENSO RECHAZADO (NO DESEA SERVICIO) ──────────────────────
const guardarCensoRechazado = async () => {
  if (!validarPaso1()) return;
  if (!form.razon_rechazo) {
    validationError.value = 'Debe seleccionar el motivo por el cual no desea el servicio.';
    return;
  }

  try {
    guardando.value = true;
    validationError.value = '';
    const newClienteId = uuidv4();

    // Razón del rechazo detallada
    const rechazoMotivo = form.razon_rechazo === 'OTRO' ? `OTRO: ${otroDetalleRechazo.value}` : form.razon_rechazo;

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
      is_analfabeto: false,
      desea_servicio: false,
      razon_rechazo: rechazoMotivo,
      incluye_estufa: 'NINGUNA',
      estado: 'INACTIVO', // Se guarda como inactivo
      barrio_vereda_id: form.barrio_vereda_id,
      codigo: null,
      estrato: 1,
      tipo_servicio: 'RESIDENCIAL',
      financiacion_tipo: 'CONTADO',
      financiacion_detalle: JSON.stringify({ total: 0, interes: 0 }),
      impulsador_id: user.value?.id || null,
      is_synced: 0,
      created_at_manual: new Date().toISOString()
    };

    await db.clientes.add(prospecto);

    alert("¡Censo registrado exitosamente! El registro inactivo ha sido guardado.");
    router.push('/dashboard');
  } catch (error: any) {
    console.error("Error guardando censo rechazado:", error);
    alert(`Ocurrió un error guardando el censo: ${error?.message || JSON.stringify(error)}`);
  } finally {
    guardando.value = false;
  }
};

// ─── GUARDADO Y FORMALIZACIÓN COMPLETA (PASO 2) ─────────────────────────────
const guardarRegistro = async () => {
  // Asegurar que Paso 1 está validado
  if (!validarPaso1()) {
    step.value = 1;
    return;
  }

  // Validaciones biométricas para analfabetos
  if (form.is_analfabeto && (!rostroBase64.value || !huellaBase64.value)) {
    alert("Para usuarios analfabetos se requiere obligatoriamente adjuntar la fotografía del rostro y huella/firma digitalizada.");
    return;
  }

  try {
    guardando.value = true;
    validationError.value = '';
    const newClienteId = uuidv4();

    // Construcción del detalle de financiación
    let financiacionDetalle: Record<string, any> = {};
    if (form.financiacion_tipo === 'CONTADO') {
      financiacionDetalle = { total: VALOR_INSTALACION, interes: 0 };
    } else if (form.financiacion_tipo === 'CREDI_CONTADO') {
      const opt = opcionesCrediContado.value.find(o => o.cuotas === form.financiacion_cuotas)!;
      financiacionDetalle = {
        cuotas: opt.cuotas,
        valor_cuota: opt.valorCuota,
        total_interes: opt.totalInteres,
        total: opt.totalPagar,
        tasa_mensual: TASA_MENSUAL,
      };
    } else {
      const opt = opcionesFinanciado.value.find(o => o.anios === form.financiacion_anios)!;
      financiacionDetalle = {
        anios: opt.anios,
        meses: opt.totalMeses,
        cuota_mensual: opt.cuotaMensual,
        total_interes: opt.totalInteres,
        total: opt.totalPagar,
        tasa_mensual: TASA_MENSUAL,
      };
    }

    const clienteFormalizado = {
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
      desea_servicio: true,
      razon_rechazo: null,
      incluye_estufa: form.incluye_estufa,
      estado: 'CLIENTE', // Formalizado como Cliente
      barrio_vereda_id: form.barrio_vereda_id,
      codigo: form.codigo || generatedContractCode.value,
      estrato: form.estrato,
      tipo_servicio: form.tipo_servicio,
      financiacion_tipo: form.financiacion_tipo,
      financiacion_detalle: JSON.stringify(financiacionDetalle),
      impulsador_id: user.value?.id || null,
      is_synced: 0,
      created_at_manual: new Date().toISOString()
    };

    // Transacción atómica en Dexie para el cliente y sus adjuntos biométricos
    await db.transaction('rw', db.clientes, db.biometrias, async () => {
      await db.clientes.add(clienteFormalizado);

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

    alert("¡Contrato formalizado y guardado exitosamente en el dispositivo!");
    router.push('/dashboard');
  } catch (error: any) {
    console.error("Error formalizando prospecto localmente:", error);
    alert(`Ocurrió un error guardando el contrato: ${error?.message || JSON.stringify(error)}`);
  } finally {
    guardando.value = false;
  }
};

onMounted(() => {
  cargarDepartamentos();
});
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
</style>
