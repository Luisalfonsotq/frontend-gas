<!-- pages/index.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-b from-orange-50 to-white">

    <!-- Hero Section -->
    <div class="relative w-full overflow-hidden" style="min-height: 85vh;">
      <!-- Imagen de fondo via URL -->
      <img
        src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=80"
        alt="Operario de gas natural en campo"
        class="absolute inset-0 w-full h-full object-cover object-center"
      />
      <!-- Overlay oscuro con gradiente naranja -->
      <div class="absolute inset-0 bg-gradient-to-br from-orange-900/80 via-orange-800/70 to-yellow-700/60"></div>

      <!-- Contenido del Hero -->
      <div class="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <div class="flex flex-col items-center max-w-3xl mx-auto text-center">

          <!-- Badge de tecnología offline -->
          <div class="bg-white/20 backdrop-blur-sm border border-white/40 text-white text-sm font-semibold px-4 py-2 rounded-full mb-6 animate-pulse">
            🔌 Sistema 100% Offline-First · Funciona sin internet
          </div>

          <!-- Título principal -->
          <h1 class="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-xl">
            Gestión de Campo para<br/>
            <span class="text-yellow-300">Gas Natural</span> en Colombia
          </h1>

          <p class="text-lg md:text-2xl text-orange-100 mb-10 max-w-2xl leading-relaxed">
            Registra prospectos, clientes y consumos en zonas rurales con baja conectividad.
            Biometría, geolocalización y sincronización automática cuando regreses a la red.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/login"
              class="bg-yellow-400 text-orange-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              Iniciar Sesión
            </NuxtLink>
            <a
              href="#funcionalidades"
              class="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-orange-800 transform hover:scale-105 transition-all duration-300"
            >
              Ver Funcionalidades
            </a>
          </div>
        </div>
      </div>

      <!-- Degradado inferior -->
      <div class="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-orange-50 to-transparent"></div>
    </div>

    <!-- Banner de Métricas -->
    <section class="py-12 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600">
      <div class="max-w-6xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-white">
          <div class="transform hover:scale-105 transition-all duration-300">
            <div class="text-5xl font-bold mb-2">📶</div>
            <div class="text-2xl font-bold mb-1">Offline-First</div>
            <div class="text-orange-100">Opera sin internet en zonas rurales</div>
          </div>
          <div class="transform hover:scale-105 transition-all duration-300">
            <div class="text-5xl font-bold mb-2">🗺️</div>
            <div class="text-2xl font-bold mb-1">Mapa Geolocalizado</div>
            <div class="text-orange-100">Tiles en caché para uso sin conexión</div>
          </div>
          <div class="transform hover:scale-105 transition-all duration-300">
            <div class="text-5xl font-bold mb-2">🤚</div>
            <div class="text-2xl font-bold mb-1">Captura Biométrica</div>
            <div class="text-orange-100">Soporte para clientes analfabetos</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de Roles -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Un Sistema para Cada Rol en Campo
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Desde el administrador central hasta el impulsador en zona rural, cada perfil tiene
            exactamente las herramientas que necesita.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <!-- Admin -->
          <div class="group bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-blue-200">
            <div class="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <span class="text-3xl">🏢</span>
            </div>
            <h3 class="font-bold text-2xl mb-3 text-blue-900">Administrador</h3>
            <p class="text-gray-700 mb-4">
              Visión global del negocio. Gestión de usuarios, reportes de cobertura y análisis de consumos en toda la red.
            </p>
            <ul class="text-sm text-gray-600 space-y-2">
              <li>✓ Dashboard de cobertura</li>
              <li>✓ Reportes de consumo</li>
              <li>✓ Gestión de usuarios</li>
            </ul>
          </div>

          <!-- Jefe de zona -->
          <div class="group bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-orange-200">
            <div class="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <span class="text-3xl">👷</span>
            </div>
            <h3 class="font-bold text-2xl mb-3 text-orange-900">Jefe de Zona</h3>
            <p class="text-gray-700 mb-4">
              Supervisa el trabajo de campo. Controla el avance de prospectos, asigna rutas y valida registros del equipo.
            </p>
            <ul class="text-sm text-gray-600 space-y-2">
              <li>✓ Mapa de asignaciones</li>
              <li>✓ Validación de registros</li>
              <li>✓ Control de impulsadores</li>
            </ul>
          </div>

          <!-- Impulsador -->
          <div class="group bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-yellow-200">
            <div class="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <span class="text-3xl">🚶</span>
            </div>
            <h3 class="font-bold text-2xl mb-3 text-yellow-900">Impulsador</h3>
            <p class="text-gray-700 mb-4">
              Registra prospectos y clientes directamente en campo, con o sin internet. Captura biometría y fotos para clientes analfabetos.
            </p>
            <ul class="text-sm text-gray-600 space-y-2">
              <li>✓ Registro offline</li>
              <li>✓ Captura biométrica</li>
              <li>✓ Sincronización automática</li>
            </ul>
          </div>

          <!-- Lector -->
          <div class="group bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-green-200">
            <div class="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <span class="text-3xl">📟</span>
            </div>
            <h3 class="font-bold text-2xl mb-3 text-green-900">Lector</h3>
            <p class="text-gray-700 mb-4">
              Toma lecturas de medidores en ruta. Registra el consumo, adjunta foto del medidor y sincroniza al regresar.
            </p>
            <ul class="text-sm text-gray-600 space-y-2">
              <li>✓ Ruta de lecturas</li>
              <li>✓ Foto del medidor</li>
              <li>✓ Validación de consumo</li>
            </ul>
          </div>

        </div>
      </div>
    </section>

    <!-- Funcionalidades con Imágenes -->
    <section id="funcionalidades" class="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Herramientas Diseñadas para el Campo
          </h2>
          <p class="text-xl text-gray-600">Todo lo que necesitas, incluso sin señal</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

          <!-- Registro de Clientes -->
          <div class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="h-52 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                alt="Registro de clientes en campo"
                class="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-500"
              />
            </div>
            <div class="p-6">
              <h3 class="font-bold text-2xl mb-3 text-orange-800">🏠 Registro de Prospectos y Clientes</h3>
              <p class="text-gray-700">
                Captura datos completos en campo: identificación, ubicación GPS, fotografía y firma digital. Compatible con clientes analfabetos mediante huella biométrica.
              </p>
            </div>
          </div>

          <!-- Mapa Interactivo -->
          <div class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="h-52 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                alt="Mapa interactivo de cobertura"
                class="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-500"
              />
            </div>
            <div class="p-6">
              <h3 class="font-bold text-2xl mb-3 text-orange-800">🗺️ Mapa Interactivo Geolocalizado</h3>
              <p class="text-gray-700">
                Visualiza clientes, prospectos y medidores sobre un mapa con tiles en caché. Funciona sin conexión a internet en zonas rurales de Colombia.
              </p>
            </div>
          </div>

          <!-- Lecturas de Medidores -->
          <div class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="h-52 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                alt="Lectura de medidores de gas"
                class="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-500"
              />
            </div>
            <div class="p-6">
              <h3 class="font-bold text-2xl mb-3 text-orange-800">📊 Lectura y Control de Medidores</h3>
              <p class="text-gray-700">
                Registra lecturas con fotografía del medidor. El sistema calcula el consumo automáticamente y valida que la lectura actual sea mayor a la anterior.
              </p>
            </div>
          </div>

          <!-- Sincronización Offline -->
          <div class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="h-52 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80"
                alt="Sincronizacion offline de datos"
                class="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-500"
              />
            </div>
            <div class="p-6">
              <h3 class="font-bold text-2xl mb-3 text-orange-800">🔄 Sincronización Offline-First</h3>
              <p class="text-gray-700">
                Trabaja sin internet todo el día. Al recuperar la conexión, los datos se sincronizan automáticamente con el servidor usando la estrategia "Last Write Wins".
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Cobertura DANE -->
    <section class="py-16 bg-orange-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center gap-12">
          <div class="flex-1">
            <h2 class="text-4xl font-bold text-gray-800 mb-6">
              Jerarquía Geográfica DANE
            </h2>
            <p class="text-lg text-gray-600 mb-6">
              Toda la información geográfica sigue la estructura oficial colombiana: Departamento → Municipio → Barrio/Vereda.
              Esto garantiza datos limpios y compatibles con los sistemas gubernamentales de Colombia.
            </p>
            <ul class="space-y-3 text-gray-700">
              <li class="flex items-center gap-3">
                <span class="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">🏛️</span>
                <span>Departamentos de Colombia integrados</span>
              </li>
              <li class="flex items-center gap-3">
                <span class="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">🏙️</span>
                <span>Municipios y cabeceras municipales</span>
              </li>
              <li class="flex items-center gap-3">
                <span class="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">🏘️</span>
                <span>Barrios y veredas para zonas rurales</span>
              </li>
              <li class="flex items-center gap-3">
                <span class="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">📍</span>
                <span>Coordenadas GPS de alta precisión (DECIMAL 10,8)</span>
              </li>
            </ul>
          </div>
          <div class="flex-1">
            <img
              src="https://images.unsplash.com/photo-1569974507005-6dc61f97fb5f?w=700&q=80"
              alt="Mapa de Colombia - cobertura de gas natural"
              class="rounded-2xl shadow-2xl w-full object-cover max-h-96"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Final -->
    <section class="bg-gray-900 text-white py-20 relative overflow-hidden">
      <!-- Patrón decorativo -->
      <div class="absolute inset-0 opacity-10"
        style="background-image: radial-gradient(circle, #f97316 1px, transparent 1px); background-size: 30px 30px;">
      </div>

      <div class="max-w-4xl mx-auto text-center px-4 relative z-10">
        <div class="text-6xl mb-6">🔥</div>
        <h2 class="text-4xl md:text-5xl font-bold mb-6">
          ¡Lleva el Gas Natural a Cada Rincón de Colombia!
        </h2>
        <p class="text-xl md:text-2xl mb-10 text-orange-200 max-w-2xl mx-auto">
          Una solución diseñada para los retos reales del campo colombiano: baja conectividad, poblaciones analfabetas y zonas de difícil acceso.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/login"
            class="bg-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-400 transform hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Comenzar Ahora
          </NuxtLink>
          <a
            href="#funcionalidades"
            class="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transform hover:scale-105 transition-all duration-300"
          >
            Ver Funcionalidades
          </a>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
definePageMeta({
  layout: 'public'
})
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>