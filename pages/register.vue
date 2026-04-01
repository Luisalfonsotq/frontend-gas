<!-- pages/register.vue -->
<template>
  <div class="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950">

    <!-- Panel Izquierdo - Formulario -->
    <div class="flex flex-col justify-center items-center w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 order-2 lg:order-1">
      <div class="w-full max-w-md">

        <!-- Logo Mobile -->
        <div class="lg:hidden mb-8 text-center animate-fade-in">
          <div class="inline-flex items-center gap-3 bg-gradient-to-br from-orange-600 to-orange-800 text-white px-6 py-3 rounded-2xl shadow-lg">
            <svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 23C8 23 4 19.5 4 15c0-2.3.8-4.3 2.1-5.9C7 8 8 6.7 8 5c0-1.1.5-2 1.3-2.6C10.1 1.8 11.1 1.5 12 1.5s1.9.3 2.7.9C15.5 3 16 3.9 16 5c0 1.7 1 3 1.9 4.1C19.2 10.7 20 12.7 20 15c0 4.5-4 8-8 8z"/>
            </svg>
            <span class="font-bold text-xl">GasField</span>
          </div>
        </div>

        <!-- Card del Formulario -->
        <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 sm:p-10 animate-slide-up">
          <div class="text-center mb-7">
            <div class="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-500/20 to-orange-700/20 border border-orange-500/30 rounded-2xl mb-4">
              <svg class="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-white mb-1">Crear Cuenta</h2>
            <p class="text-slate-400 text-sm">Tu cuenta será revisada por un administrador</p>
          </div>

          <form @submit.prevent="handleRegister" class="space-y-4">

            <!-- Nombre Completo -->
            <div class="relative group">
              <label for="nombre" class="block text-sm font-semibold text-slate-300 mb-1.5">
                Nombre Completo
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-slate-500 group-focus-within:text-orange-400 transition-colors duration-300"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  id="nombre"
                  v-model="nombre"
                  type="text"
                  placeholder="Juan Pérez Rodríguez"
                  autocomplete="name"
                  class="w-full pl-12 pr-4 py-3 bg-white/5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-white placeholder-slate-500"
                  :class="errors.nombre
                    ? 'border-red-400/60 focus:border-red-400 focus:ring-red-400/20'
                    : 'border-white/10 focus:border-orange-500/70 focus:ring-orange-500/20 hover:border-white/20'"
                />
              </div>
              <p v-if="errors.nombre" class="mt-1.5 text-xs text-red-400 font-medium flex items-center gap-1">
                <svg class="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
                {{ errors.nombre }}
              </p>
            </div>

            <!-- Email -->
            <div class="relative group">
              <label for="email" class="block text-sm font-semibold text-slate-300 mb-1.5">
                Correo Electrónico
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-slate-500 group-focus-within:text-orange-400 transition-colors duration-300"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="usuario@empresa.co"
                  autocomplete="email"
                  class="w-full pl-12 pr-4 py-3 bg-white/5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-white placeholder-slate-500"
                  :class="errors.email
                    ? 'border-red-400/60 focus:border-red-400 focus:ring-red-400/20'
                    : 'border-white/10 focus:border-orange-500/70 focus:ring-orange-500/20 hover:border-white/20'"
                />
              </div>
              <p v-if="errors.email" class="mt-1.5 text-xs text-red-400 font-medium flex items-center gap-1">
                <svg class="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
                {{ errors.email }}
              </p>
            </div>

            <!-- Rol del usuario -->
            <div class="relative group">
              <label for="rol" class="block text-sm font-semibold text-slate-300 mb-1.5">
                Rol en el Sistema
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-slate-500 group-focus-within:text-orange-400 transition-colors duration-300"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <select
                  id="rol"
                  v-model="rol"
                  class="w-full pl-12 pr-4 py-3 bg-white/5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-white appearance-none cursor-pointer"
                  :class="errors.rol
                    ? 'border-red-400/60 focus:border-red-400 focus:ring-red-400/20'
                    : 'border-white/10 focus:border-orange-500/70 focus:ring-orange-500/20 hover:border-white/20'"
                >
                  <option value="" disabled class="bg-slate-800 text-slate-400">Selecciona tu rol</option>
                  <option value="IMPULSADOR" class="bg-slate-800 text-white">🚶 Impulsador de Campo</option>
                  <option value="LECTOR" class="bg-slate-800 text-white">📊 Lector de Medidores</option>
                  <option value="JEFE" class="bg-slate-800 text-white">👔 Jefe de Zona</option>
                  <option value="ADMIN" class="bg-slate-800 text-white">🛡️ Administrador</option>
                </select>
                <!-- Chevron personalizado -->
                <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <p v-if="errors.rol" class="mt-1.5 text-xs text-red-400 font-medium flex items-center gap-1">
                <svg class="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
                {{ errors.rol }}
              </p>
              <p v-if="rol" class="mt-1.5 text-xs text-slate-400 flex items-center gap-1">
                <svg class="w-3 h-3 text-orange-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>
                {{ rolDescriptions[rol] }}
              </p>
            </div>

            <!-- Password -->
            <div class="relative group">
              <label for="password" class="block text-sm font-semibold text-slate-300 mb-1.5">
                Contraseña
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-slate-500 group-focus-within:text-orange-400 transition-colors duration-300"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Mín. 8 caracteres, 1 mayúscula, 1 número"
                  autocomplete="new-password"
                  class="w-full pl-12 pr-12 py-3 bg-white/5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-white placeholder-slate-500"
                  :class="errors.password
                    ? 'border-red-400/60 focus:border-red-400 focus:ring-red-400/20'
                    : 'border-white/10 focus:border-orange-500/70 focus:ring-orange-500/20 hover:border-white/20'"
                />
                <button type="button" @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-orange-400 transition-colors duration-300">
                  <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
              <p v-if="errors.password" class="mt-1.5 text-xs text-red-400 font-medium flex items-center gap-1">
                <svg class="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
                {{ errors.password }}
              </p>
              <p v-else class="mt-1.5 text-xs text-slate-500">Mínimo 8 caracteres, incluye mayúscula y número.</p>
            </div>

            <!-- Confirmar Password -->
            <div class="relative group">
              <label for="confirmPassword" class="block text-sm font-semibold text-slate-300 mb-1.5">
                Confirmar Contraseña
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-slate-500 group-focus-within:text-orange-400 transition-colors duration-300"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <input
                  id="confirmPassword"
                  v-model="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="Repite tu contraseña"
                  autocomplete="new-password"
                  class="w-full pl-12 pr-12 py-3 bg-white/5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-white placeholder-slate-500"
                  :class="errors.confirmPassword
                    ? 'border-red-400/60 focus:border-red-400 focus:ring-red-400/20'
                    : 'border-white/10 focus:border-orange-500/70 focus:ring-orange-500/20 hover:border-white/20'"
                />
                <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-orange-400 transition-colors duration-300">
                  <svg v-if="!showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
              <p v-if="errors.confirmPassword" class="mt-1.5 text-xs text-red-400 font-medium flex items-center gap-1">
                <svg class="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
                {{ errors.confirmPassword }}
              </p>
            </div>

            <!-- Botón Submit -->
            <button
              id="btn-register"
              type="submit"
              :disabled="isLoading"
              class="w-full relative overflow-hidden bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-orange-500/25 hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group mt-2"
            >
              <span class="relative z-10 flex items-center justify-center gap-2">
                <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                <span v-if="!isLoading">SOLICITAR ACCESO</span>
                <span v-else>REGISTRANDO...</span>
                <svg
                  v-if="!isLoading"
                  class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>

            <!-- Success Message -->
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 -translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-2"
            >
              <div v-if="success" class="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd" />
                  </svg>
                  <p class="text-green-400 text-sm font-medium">{{ success }}</p>
                </div>
              </div>
            </Transition>

            <!-- Error General -->
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 -translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-2"
            >
              <div v-if="generalError" class="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clip-rule="evenodd" />
                  </svg>
                  <p class="text-red-400 text-sm font-medium">{{ generalError }}</p>
                </div>
              </div>
            </Transition>
          </form>

          <!-- Divider -->
          <div class="mt-6 pt-5 border-t border-white/10 text-center">
            <p class="text-slate-400 text-sm">
              ¿Ya tienes cuenta?
              <NuxtLink
                to="/login"
                class="text-orange-400 hover:text-orange-300 font-semibold hover:underline transition-colors duration-300 ml-1"
              >
                Iniciar sesión
              </NuxtLink>
            </p>
          </div>
        </div>

        <!-- Info adicional -->
        <div class="mt-5 text-center text-xs text-slate-600">
          <p>© {{ new Date().getFullYear() }} GasField · Los datos son protegidos bajo Ley 1581 (Habeas Data)</p>
        </div>
      </div>
    </div>

    <!-- Panel Derecho - Hero Section -->
    <div class="hidden lg:flex flex-col justify-center items-center w-1/2 p-8 relative overflow-hidden order-1 lg:order-2">
      <div class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?q=80&w=2074');">
      </div>
      <div class="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-orange-950/90 to-slate-900/95"></div>

      <!-- Patrón de red decorativo -->
      <div
        class="absolute inset-0 opacity-10"
        style="background-image: radial-gradient(circle at 1px 1px, rgba(251,146,60,0.6) 1px, transparent 0); background-size: 32px 32px;">
      </div>

      <div class="z-10 text-center flex flex-col items-center animate-fade-in">
        <!-- Logo hero -->
        <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-8 mb-8 transform hover:scale-105 transition-all duration-300 animate-slide-up">
          <div class="flex items-center gap-4 justify-center">
            <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center shadow-lg">
              <svg class="w-9 h-9 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 23C8 23 4 19.5 4 15c0-2.3.8-4.3 2.1-5.9C7 8 8 6.7 8 5c0-1.1.5-2 1.3-2.6C10.1 1.8 11.1 1.5 12 1.5s1.9.3 2.7.9C15.5 3 16 3.9 16 5c0 1.7 1 3 1.9 4.1C19.2 10.7 20 12.7 20 15c0 4.5-4 8-8 8z"/>
              </svg>
            </div>
            <div class="text-left">
              <span class="font-extrabold text-3xl text-white tracking-tight">GasField</span>
              <p class="text-orange-300 text-sm font-medium">Gas Natural · Colombia</p>
            </div>
          </div>
        </div>

        <!-- Título -->
        <div class="space-y-3 animate-slide-up" style="animation-delay: 0.2s">
          <h1 class="text-4xl font-bold text-white tracking-wide drop-shadow-lg leading-tight">
            Únete al Equipo<br>
            <span class="text-orange-400">de Campo</span>
          </h1>
          <p class="text-lg text-slate-300 max-w-sm leading-relaxed">
            Regístrate y comienza a gestionar prospectos, lecturas y facturación en tiempo real, incluso sin internet.
          </p>
        </div>

        <!-- Roles disponibles -->
        <div class="mt-10 space-y-3 w-full max-w-sm animate-fade-in" style="animation-delay: 0.4s">
          <div v-for="item in rolInfo" :key="item.rol"
            class="flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 transform hover:scale-[1.02] hover:border-orange-500/30 transition-all duration-300">
            <div class="bg-orange-500/20 border border-orange-500/30 rounded-xl w-12 h-12 flex items-center justify-center flex-shrink-0 text-2xl">
              {{ item.icon }}
            </div>
            <div class="text-left">
              <h3 class="text-white font-bold text-sm">{{ item.label }}</h3>
              <p class="text-slate-400 text-xs">{{ item.desc }}</p>
            </div>
          </div>
        </div>

        <!-- Badge de seguridad -->
        <div class="mt-8 animate-fade-in" style="animation-delay: 0.6s">
          <div class="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm text-slate-300 text-xs font-medium px-4 py-2 rounded-full">
            <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Aprobación por administrador · JWT · bcrypt
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useAuth } from '~/composables/useAuth';
import { useRouter } from 'vue-router';

definePageMeta({ layout: 'public' });

// --- Estado del formulario ---
const nombre = ref('');
const email = ref('');
const rol = ref('');
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const generalError = ref('');
const success = ref('');
const isLoading = ref(false);

const errors = ref<{
  nombre: string;
  email: string;
  rol: string;
  password: string;
  confirmPassword: string;
}>({
  nombre: '',
  email: '',
  rol: '',
  password: '',
  confirmPassword: '',
});

// --- Composables ---
const router = useRouter();
const { register } = useAuth();
const { validateEmail, validatePassword, validateRequired, validateMatch } = useFormValidation();

// --- Descripciones de rol informativas ---
const rolDescriptions: Record<string, string> = {
  IMPULSADOR: 'Registra nuevos prospectos y clientes en campo.',
  LECTOR: 'Toma lecturas de medidores de gas en ruta.',
  JEFE: 'Supervisa impulsadores y lectores de su zona.',
  ADMIN: 'Acceso total al sistema. Requiere aprobación especial.',
};

const rolInfo = [
  { rol: 'IMPULSADOR', icon: '🚶', label: 'Impulsador de Campo', desc: 'Registra prospectos en zonas rurales' },
  { rol: 'LECTOR',     icon: '📊', label: 'Lector de Medidores', desc: 'Captura consumos de gas en ruta' },
  { rol: 'JEFE',       icon: '👔', label: 'Jefe de Zona',        desc: 'Supervisa equipos y zonas asignadas' },
];

// --- Limpiar errores al escribir ---
watch([nombre, email, rol, password, confirmPassword], () => {
  errors.value = { nombre: '', email: '', rol: '', password: '', confirmPassword: '' };
  generalError.value = '';
  success.value = '';
});

// --- Lógica de registro ---
async function handleRegister() {
  generalError.value = '';
  success.value = '';

  // Validaciones locales
  errors.value.nombre         = validateRequired(nombre.value, 'Nombre')        ?? '';
  errors.value.email          = validateEmail(email.value)                       ?? '';
  errors.value.rol            = validateRequired(rol.value, 'Rol')               ?? '';
  errors.value.password       = validatePassword(password.value)                 ?? '';
  errors.value.confirmPassword = validateMatch(password.value, confirmPassword.value, 'contraseña') ?? '';

  if (Object.values(errors.value).some((e) => e)) return;

  isLoading.value = true;

  try {
    await register({
      nombre: nombre.value,
      email: email.value,
      password: password.value,
      rol: rol.value,
    });

    success.value = '¡Solicitud enviada! Tu cuenta está pendiente de aprobación por un administrador.';

    // Redirige al login después de 2.5 s
    setTimeout(() => {
      router.push('/login');
    }, 2500);
  } catch (err: any) {
    console.error('Error durante el registro:', err);

    const status = err?.status ?? err?.statusCode ?? err?.response?.status;
    const errorData = err?.data ?? err?.response?._data;

    if (status === 409) {
      errors.value.email = 'Este correo electrónico ya está registrado en el sistema.';
    } else if (errorData?.message) {
      generalError.value = Array.isArray(errorData.message)
        ? errorData.message.join(', ')
        : errorData.message;
    } else {
      generalError.value = 'No se pudo completar el registro. Verifica tu conexión e intenta de nuevo.';
    }
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-fade-in  { animation: fade-in  0.7s ease-out both; }
.animate-slide-up { animation: slide-up 0.7s ease-out both; }

/* Quitar flecha nativa del select */
select { -webkit-appearance: none; -moz-appearance: none; appearance: none; }
</style>