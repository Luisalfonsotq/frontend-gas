<template>
  <div class="space-y-6">
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Gestión de Usuarios</h1>
        <p class="text-slate-500">Administra los roles y accesos del equipo.</p>
      </div>
      <button @click="openCreateModal" class="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors duration-200 flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        Nuevo Usuario
      </button>
    </div>

    <!-- Filtros o Buscador -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <div v-if="loading" class="text-center py-10">
        <div class="animate-spin rounded-full h-10 w-10 border-4 border-slate-200 border-t-orange-600 mx-auto mb-3"></div>
        <p class="text-slate-500">Cargando usuarios...</p>
      </div>
      
      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-100">
              <th class="py-3 px-4 font-semibold text-sm text-slate-600">Nombre</th>
              <th class="py-3 px-4 font-semibold text-sm text-slate-600">Email</th>
              <th class="py-3 px-4 font-semibold text-sm text-slate-600">Rol</th>
              <th class="py-3 px-4 font-semibold text-sm text-slate-600">Estado</th>
              <th class="py-3 px-4 font-semibold text-sm text-slate-600 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in usuarios" :key="u.id" class="border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <td class="py-3 px-4 text-slate-800 font-medium">{{ u.nombre }}</td>
              <td class="py-3 px-4 text-slate-600">{{ u.email }}</td>
              <td class="py-3 px-4">
                <span class="px-2.5 py-1 rounded-full text-xs font-semibold"
                      :class="{
                        'bg-purple-100 text-purple-700': u.rol === 'ADMIN',
                        'bg-blue-100 text-blue-700': u.rol === 'JEFE',
                        'bg-orange-100 text-orange-700': u.rol === 'IMPULSADOR',
                        'bg-green-100 text-green-700': u.rol === 'LECTOR'
                      }">
                  {{ u.rol }}
                </span>
              </td>
              <td class="py-3 px-4">
                <span v-if="u.activo" class="flex items-center gap-1.5 text-green-600 text-sm font-medium">
                  <span class="w-2 h-2 rounded-full bg-green-500"></span> Activo
                </span>
                <span v-else class="flex items-center gap-1.5 text-red-600 text-sm font-medium">
                  <span class="w-2 h-2 rounded-full bg-red-500"></span> Inactivo
                </span>
              </td>
              <td class="py-3 px-4 text-right">
                <button v-if="u.activo && (currentUser?.rol === 'ADMIN' || !['ADMIN', 'JEFE'].includes(u.rol))" 
                        @click="deactivateUser(u.id)" 
                        class="text-red-500 hover:text-red-700 text-sm font-medium transition-colors">
                  Inhabilitar
                </button>
              </td>
            </tr>
            <tr v-if="usuarios.length === 0">
              <td colspan="5" class="text-center py-6 text-slate-500">
                No hay usuarios para mostrar.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Nuevo Usuario -->
    <div v-if="showModal" class="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50 animate-fade-in text-left">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 class="text-lg font-bold text-slate-800">Crear Usuario</h3>
          <button @click="showModal = false" class="text-slate-400 hover:text-slate-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <form @submit.prevent="submitForm" class="p-6 space-y-4">
          <div v-if="error" class="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
            {{ error }}
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Nombre Completo</label>
            <input v-model="form.nombre" type="text" required class="w-full border-slate-200 rounded-xl focus:ring-orange-500 focus:border-orange-500 px-4 py-2 border outline-none">
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Correo Electrónico</label>
            <input v-model="form.email" type="email" required class="w-full border-slate-200 rounded-xl focus:ring-orange-500 focus:border-orange-500 px-4 py-2 border outline-none">
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
            <input v-model="form.password" type="password" required minlength="8" class="w-full border-slate-200 rounded-xl focus:ring-orange-500 focus:border-orange-500 px-4 py-2 border outline-none">
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Rol en el Sistema</label>
            <select v-model="form.rol" required class="w-full border-slate-200 rounded-xl focus:ring-orange-500 focus:border-orange-500 px-4 py-2 border outline-none bg-white">
              <template v-if="currentUser?.rol === 'ADMIN'">
                <option value="ADMIN">ADMIN (Administrador)</option>
                <option value="JEFE">JEFE (Jefe de Zona)</option>
              </template>
              <option value="IMPULSADOR">IMPULSADOR (Preventa)</option>
              <option value="LECTOR">LECTOR (Operario Medidores)</option>
            </select>
          </div>
          <div class="pt-4 flex gap-3">
            <button type="button" @click="showModal = false" class="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors">
              Cancelar
            </button>
            <button type="submit" :disabled="saving" class="flex-1 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-medium transition-colors disabled:opacity-50">
              {{ saving ? 'Guardando...' : 'Crear Usuario' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { useRuntimeConfig } from '#imports';

definePageMeta({ layout: 'profile-layout' });

const { user: currentUser, fetchWithAuth } = useAuth();
const config = useRuntimeConfig();
const baseUrl = config.public.apiBaseUrl || 'http://localhost:3001/api';

const usuarios = ref<any[]>([]);
const loading = ref(true);
const error = ref('');

const showModal = ref(false);
const saving = ref(false);
const form = ref({
  nombre: '',
  email: '',
  password: '',
  rol: ''
});

const loadUsers = async () => {
  loading.value = true;
  try {
    const data = await fetchWithAuth<any[]>(`${baseUrl}/auth/usuarios`);
    usuarios.value = data || [];
  } catch (err: any) {
    console.error('Error al cargar usuarios:', err);
  } finally {
    loading.value = false;
  }
};

const openCreateModal = () => {
  form.value = {
    nombre: '',
    email: '',
    password: '',
    rol: currentUser.value?.rol === 'ADMIN' ? 'JEFE' : 'IMPULSADOR'
  };
  error.value = '';
  showModal.value = true;
};

const submitForm = async () => {
  saving.value = true;
  error.value = '';
  try {
    const payload = {
      ...form.value,
      id: crypto.randomUUID()
    };
    
    await fetchWithAuth(`${baseUrl}/auth/usuarios`, {
      method: 'POST',
      body: payload
    });
    
    showModal.value = false;
    await loadUsers();
  } catch (err: any) {
    console.error(err);
    error.value = err.data?.message || err.message || 'Ocurrió un error al crear el usuario.';
  } finally {
    saving.value = false;
  }
};

const deactivateUser = async (id: string) => {
  if (!confirm('¿Estás seguro de que deseas inhabilitar este usuario?')) return;
  
  try {
    await fetchWithAuth(`${baseUrl}/auth/usuarios/${id}/deactivate`, {
      method: 'PATCH',
    });
    await loadUsers();
  } catch (err) {
    console.error('Error al desactivar usuario', err);
    alert('No se pudo inhabilitar este usuario.');
  }
};

onMounted(() => {
  loadUsers();
});
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
</style>
