<!-- pages/login.vue -->
<template>
  <div class="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950">

    <!-- Panel Izquierdo - Hero Section -->
    <div class="hidden lg:flex flex-col justify-center items-center w-1/2 p-8 relative overflow-hidden">
      <!-- Fondo con overlay de gas -->
      <div class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070');">
      </div>
      <div class="absolute inset-0 bg-gradient-to-br from-orange-900/95 via-slate-900/90 to-slate-900/95"></div>

      <!-- Patrón de tuberías decorativo -->
      <div
        class="absolute inset-0 opacity-10"
        style="background-image: repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(251,146,60,0.3) 40px, rgba(251,146,60,0.3) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(251,146,60,0.3) 40px, rgba(251,146,60,0.3) 41px);">
      </div>

      <!-- Contenido Hero -->
      <div class="z-10 text-center flex flex-col items-center animate-fade-in">
        <!-- Logo -->
        <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-8 mb-8 transform hover:scale-105 transition-all duration-300 animate-slide-up">
          <div class="flex items-center gap-4 justify-center">
            <!-- Ícono de llama de gas -->
            <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center shadow-lg">
              <svg class="w-9 h-9 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 23C8 23 4 19.5 4 15c0-2.3.8-4.3 2.1-5.9C7 8 8 6.7 8 5c0-1.1.5-2 1.3-2.6C10.1 1.8 11.1 1.5 12 1.5s1.9.3 2.7.9C15.5 3 16 3.9 16 5c0 1.7 1 3 1.9 4.1C19.2 10.7 20 12.7 20 15c0 4.5-4 8-8 8zm0-2c3.3 0 6-2.7 6-6 0-1.9-.7-3.5-1.7-4.8C15.3 9 14 7.4 14 5.5c0-.3-.2-.5-.5-.5s-.5.2-.5.5c0 2-1.3 3.5-2.3 4.7C9.7 11.5 9 13.1 9 15c0 3.3 1.5 5.5 3 6z"/>
              </svg>
            </div>
            <div class="text-left">
              <span class="font-extrabold text-3xl text-white tracking-tight">GasField</span>
              <p class="text-orange-300 text-sm font-medium">Gas Natural · Colombia</p>
            </div>
          </div>
        </div>

        <!-- Texto Hero -->
        <div class="space-y-4 animate-slide-up" style="animation-delay: 0.2s">
          <h1 class="text-4xl font-bold text-white tracking-wide drop-shadow-lg leading-tight">
            Sistema de Gestión<br>
            <span class="text-orange-400">de Campo</span>
          </h1>
          <p class="text-lg text-slate-300 max-w-sm leading-relaxed">
            Registra prospectos, lecturas y consumos incluso en zonas sin conectividad.
          </p>
        </div>

        <!-- Características del sistema -->
        <div class="mt-12 grid grid-cols-3 gap-4 w-full max-w-lg animate-fade-in" style="animation-delay: 0.4s">
          <div class="text-center transform hover:scale-110 transition-all duration-300">
            <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <svg class="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
            </div>
            <p class="text-white text-xs font-semibold">Offline-First</p>
          </div>
          <div class="text-center transform hover:scale-110 transition-all duration-300">
            <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <svg class="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p class="text-white text-xs font-semibold">Geolocali&shy;zación</p>
          </div>
          <div class="text-center transform hover:scale-110 transition-all duration-300">
            <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <svg class="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <p class="text-white text-xs font-semibold">Seguro JWT</p>
          </div>
        </div>

        <!-- Badge Colombia -->
        <div class="mt-10 animate-fade-in" style="animation-delay: 0.6s">
          <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full">
            <span class="text-base">🇨🇴</span>
            Diseñado para Colombia · Ley 1581 (Habeas Data)
          </div>
        </div>
      </div>
    </div>

    <!-- Panel Derecho - Formulario -->
    <div class="flex flex-col justify-center items-center w-full lg:w-1/2 p-6 sm:p-8 lg:p-12">
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
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-500/20 to-orange-700/20 border border-orange-500/30 rounded-2xl mb-4">
              <svg class="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-white mb-1">Bienvenido de vuelta</h2>
            <p class="text-slate-400 text-sm">Accede a tu cuenta de GasField</p>
          </div>

          <form @submit.prevent="login" class="space-y-5">
            <!-- Email -->
            <div class="relative group">
              <label for="email" class="block text-sm font-semibold text-slate-300 mb-2">
                Correo Electrónico
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-slate-500 group-focus-within:text-orange-400 transition-colors duration-300"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="usuario@gasfield.co"
                  required
                  autocomplete="email"
                  class="w-full pl-12 pr-4 py-3 bg-white/5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-white placeholder-slate-500"
                  :class="errors.email
                    ? 'border-red-400/60 focus:border-red-400 focus:ring-red-400/20'
                    : 'border-white/10 focus:border-orange-500/70 focus:ring-orange-500/20 hover:border-white/20'"
                />
                <p v-if="errors.email" class="mt-1.5 text-xs text-red-400 font-medium flex items-center gap-1">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
                  {{ errors.email }}
                </p>
              </div>
            </div>

            <!-- Password -->
            <div class="relative group">
              <label for="password" class="block text-sm font-semibold text-slate-300 mb-2">
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
                  placeholder="••••••••"
                  required
                  autocomplete="current-password"
                  class="w-full pl-12 pr-12 py-3 bg-white/5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-white placeholder-slate-500"
                  :class="errors.password
                    ? 'border-red-400/60 focus:border-red-400 focus:ring-red-400/20'
                    : 'border-white/10 focus:border-orange-500/70 focus:ring-orange-500/20 hover:border-white/20'"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-orange-400 transition-colors duration-300"
                >
                  <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
                <p v-if="errors.password" class="mt-1.5 text-xs text-red-400 font-medium flex items-center gap-1">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
                  {{ errors.password }}
                </p>
              </div>
            </div>

            <!-- Opciones -->
            <div class="flex items-center justify-between text-sm">
              <label class="flex items-center text-slate-400 cursor-pointer group">
                <input
                  id="remember-me"
                  type="checkbox"
                  v-model="rememberMe"
                  class="w-4 h-4 accent-orange-500 border-slate-500 rounded cursor-pointer"
                />
                <span class="ml-2 group-hover:text-slate-300 transition-colors duration-300">
                  Recordarme
                </span>
              </label>
              <NuxtLink
                to="/register"
                class="text-orange-400 hover:text-orange-300 font-semibold hover:underline transition-all duration-300 text-sm"
              >
                ¿Necesitas una cuenta?
              </NuxtLink>
            </div>

            <!-- Botón Submit -->
            <button
              id="btn-login"
              type="submit"
              :disabled="isLoading"
              class="w-full relative overflow-hidden bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-orange-500/25 hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <span class="relative z-10 flex items-center justify-center gap-2">
                <!-- Spinner de carga -->
                <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                <span v-if="!isLoading">INICIAR SESIÓN</span>
                <span v-else>ACCEDIENDO...</span>
                <svg
                  v-if="!isLoading"
                  class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>

            <!-- Error General -->
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 -translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-2"
            >
              <div v-if="error" class="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clip-rule="evenodd" />
                  </svg>
                  <p class="text-red-400 text-sm font-medium">{{ error }}</p>
                </div>
              </div>
            </Transition>
          </form>

          <!-- Divider -->
          <div class="mt-8 pt-6 border-t border-white/10 text-center">
            <p class="text-slate-500 text-xs">
              ¿Problemas para ingresar?
              <a href="mailto:soporte@gasfield.co" class="text-orange-400 hover:text-orange-300 font-medium transition-colors duration-300">
                Contactar soporte
              </a>
            </p>
          </div>
        </div>

        <!-- Info adicional -->
        <div class="mt-5 text-center text-xs text-slate-600">
          <p>© {{ new Date().getFullYear() }} GasField · Sistema de Gestión de Gas Natural · Colombia</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({ layout: 'public' });

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const showPassword = ref(false);
const error = ref('');
const isLoading = ref(false);
const router = useRouter();

const errors = ref<{ email: string; password: string }>({
  email: '',
  password: '',
});

const { validateEmail, validateRequired } = useFormValidation();

// Limpiar errores al escribir
watch([email, password], () => {
  errors.value = { email: '', password: '' };
  error.value = '';
});

async function login() {
  error.value = '';
  errors.value.email = '';
  errors.value.password = '';

  // Validaciones locales
  const emailError = validateEmail(email.value);
  const passwordError = validateRequired(password.value, 'Contraseña');

  if (emailError || passwordError) {
    errors.value.email = emailError ?? '';
    errors.value.password = passwordError ?? '';
    return;
  }

  isLoading.value = true;

  try {
    await $fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value }),
      credentials: 'include',
    });

    router.push('/dashboard');
  } catch (err: any) {
    console.error('Error de autenticación:', err);

    const status = err?.status ?? err?.statusCode ?? err?.response?.status;
    const errorData = err?.data ?? err?.response?._data;

    if (status === 401 || status === 404) {
      error.value = 'Credenciales incorrectas. Verifica tu correo electrónico y contraseña.';
    } else if (status === 403) {
      error.value = 'Tu cuenta está inactiva o pendiente de aprobación por un administrador.';
    } else if (errorData?.message) {
      error.value = Array.isArray(errorData.message)
        ? errorData.message.join(', ')
        : errorData.message;
    } else {
      error.value = 'No se pudo conectar con el servidor de GasField. Verifica tu conexión e intenta de nuevo.';
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
</style>