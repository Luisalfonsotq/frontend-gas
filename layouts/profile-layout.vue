<!-- layouts/profile-layout.vue -->
<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'
import { roleSidebarConfig, btnCrear } from '@/utils/roleConfig'
// useNotifications está pendiente de reimplementar para GasField

const { user, logout, profile } = useAuth()
const router = useRouter()
const notifications = ref([])
const fetchNotifications = () => {}

// Estados reactivos
const isSidebarOpen = ref(false)
const isCrearOpen = ref(false)
const isUserOpen = ref(false)
const isNotificationsOpen = ref(false)
const searchQuery = ref('')
const openSubMenus = ref([])
const activeNavItem = ref('dashboard')
const isLoadingUser = ref(false)

// Datos computados
const sidebarItems = computed(() => {
  if (!user.value || !user.value.rol) {
    console.warn('⚠️ No user or rol for sidebar:', user.value)
    return []
  }
  return roleSidebarConfig[user.value.rol] || []
})

const btnCrearItems = computed(() => {
  if (!user.value || !user.value.rol) {
    return []
  }
  return btnCrear[user.value.rol] || []
})

const notificationCount = computed(() => {
  return notifications.value.length
})

const userName = computed(() => {
  return user.value?.nombre || user.value?.email || 'Usuario'
})

const userAvatar = computed(() => {
  return user.value?.avatar || 'https://placehold.co/40x40/aabbcc/ffffff?text=U'
})

// Métodos
function closeSidebar() {
  isSidebarOpen.value = false
}

function toggleSubMenu(key) {
  const index = openSubMenus.value.indexOf(key)
  if (index > -1) {
    openSubMenus.value.splice(index, 1)
  } else {
    openSubMenus.value.push(key)
  }
}

function isActiveNavItem(key) {
  return activeNavItem.value === key
}

function isParentActive(parentKey) {
  const currentRoute = router.currentRoute.value.path
  const parentItem = sidebarItems.value.find(item => item.key === parentKey)
  if (parentItem && parentItem.subItems) {
    return parentItem.subItems.some(subItem => currentRoute.startsWith(subItem.path))
  }
  return false
}

function handleAvatarError(event) {
  event.target.src = 'https://placehold.co/40x40/aabbcc/ffffff?text=U'
}

async function handleLogout() {
  try {
    await logout()
    router.push('/login')
  } catch (error) {
    console.error('Error during logout:', error)
  }
}

// Cerrar menús al hacer click afuera
function handleClickOutside(event) {
  const target = event.target
  
  if (!target.closest('.create-dropdown-container')) {
    isCrearOpen.value = false
  }
  if (!target.closest('.notifications-panel-container')) {
    isNotificationsOpen.value = false
  }
  if (!target.closest('.user-dropdown-container')) {
    isUserOpen.value = false
  }
}

// Inicializar submenús abiertos basado en la ruta actual
function initializeOpenSubMenus() {
  const currentRoute = router.currentRoute.value.path
  sidebarItems.value.forEach(item => {
    if (item.subItems) {
      const hasActiveSubItem = item.subItems.some(subItem =>
        currentRoute.startsWith(subItem.path)
      )
      if (hasActiveSubItem && !openSubMenus.value.includes(item.key)) {
        openSubMenus.value.push(item.key)
      }
    }
  })
}

// Actualizar elemento activo basado en la ruta
function updateActiveNavItem() {
  const currentRoute = router.currentRoute.value.path
  
  for (const item of sidebarItems.value) {
    if (currentRoute === item.path || currentRoute.startsWith(item.path + '/')) {
      activeNavItem.value = item.key
      return
    }
    
    if (item.subItems) {
      for (const subItem of item.subItems) {
        if (currentRoute === subItem.path || currentRoute.startsWith(subItem.path + '/')) {
          activeNavItem.value = subItem.key
          return
        }
      }
    }
  }
}

// ✅ CARGA MEJORADA DEL USUARIO
onMounted(async () => {
  console.log('🔄 Layout mounted, checking user...')
  
  if (!user.value) {
    console.log('⚠️ No user found, fetching profile...')
    isLoadingUser.value = true
    
    try {
      await profile()
      console.log('✅ Profile loaded in layout:', user.value)
    } catch (error) {
      console.error('❌ Error fetching profile in layout:', error)
      // El middleware redirigirá a login si es necesario
    } finally {
      isLoadingUser.value = false
    }
  } else {
    console.log('✅ User already loaded:', user.value)
  }
  
  // Notificaciones: pendiente de implementar para GasField

  // Inicializar navegación
  initializeOpenSubMenus()
  updateActiveNavItem()
  
  // Agregar listeners
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Watchers
watch(user, (newUser, oldUser) => {
  console.log('👤 User changed in layout:', { 
    old: oldUser?.rol, 
    new: newUser?.rol,
    id: newUser?.id 
  })
  
  // Reinicializar navegación cuando cambia el usuario
  if (newUser && newUser !== oldUser) {
    initializeOpenSubMenus()
    updateActiveNavItem()
    fetchNotifications()
  }
}, { deep: true })

watch(() => router.currentRoute.value.path, () => {
  updateActiveNavItem()
  initializeOpenSubMenus()
})
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <!-- Loading Overlay si el usuario está cargando -->
    <div v-if="isLoadingUser" class="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div class="text-center">
        <div class="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-500 mx-auto mb-4"></div>
        <p class="text-slate-300 font-medium">Cargando GasField...</p>
      </div>
    </div>

    <!-- Header / Top Navigation Bar -->
    <header class="bg-slate-900 border-b border-white/10 shadow-md py-3 px-6 flex items-center justify-between sticky top-0 z-10">
      <div class="flex items-center">
        <button
          class="lg:hidden p-2 mr-4 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500"
          @click="isSidebarOpen = !isSidebarOpen">
          <Icon name="i-heroicons-bars-3" class="h-6 w-6 text-white" />
        </button>
        <NuxtLink to="/dashboard" class="flex items-center gap-2 group">
          <div class="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg flex items-center justify-center shadow">
            <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 23C8 23 4 19.5 4 15c0-2.3.8-4.3 2.1-5.9C7 8 8 6.7 8 5c0-1.1.5-2 1.3-2.6C10.1 1.8 11.1 1.5 12 1.5s1.9.3 2.7.9C15.5 3 16 3.9 16 5c0 1.7 1 3 1.9 4.1C19.2 10.7 20 12.7 20 15c0 4.5-4 8-8 8z"/></svg>
          </div>
          <span class="font-bold text-xl text-white group-hover:text-orange-300 transition-colors">GasField</span>
        </NuxtLink>
      </div>

      <div class="flex items-center space-x-4 relative">
        <!-- Search Bar -->
        <div class="hidden md:block relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar..."
            class="pl-10 pr-4 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
          />
          <Icon name="i-heroicons-magnifying-glass" class="h-5 w-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        <!-- Create Button -->
        <div class="relative create-dropdown-container" @keydown.esc="isCrearOpen = false">
          <button
            class="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 flex items-center space-x-2"
            @click="isCrearOpen = !isCrearOpen">
            <Icon name="i-heroicons-plus" class="h-5 w-5" />
            <span>Crear</span>
          </button>
          <div
            v-show="isCrearOpen"
            v-cloak
            class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
            <div v-if="btnCrearItems.length > 0">
              <NuxtLink
                v-for="item in btnCrearItems"
                :key="item.name"
                :to="item.path"
                class="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                @click="isCrearOpen = false">
                <div class="flex items-center">
                  <Icon :name="item.icon" class="w-4 h-4 mr-2 text-gray-500" />
                  <span class="text-sm">{{ item.name }}</span>
                </div>
              </NuxtLink>
            </div>
            <div v-else class="px-4 py-2 text-gray-500 text-sm">No hay opciones disponibles</div>
          </div>
        </div>

        <!-- Notifications -->
        <div class="relative notifications-panel-container" @keydown.esc="isNotificationsOpen = false">
          <button
            class="p-2 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
            @click="isNotificationsOpen = !isNotificationsOpen">
            <Icon name="i-heroicons-bell" class="h-6 w-6 text-slate-300" />
            <span
              v-if="notificationCount > 0"
              class="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {{ notificationCount }}
            </span>
          </button>
          <div
            v-show="isNotificationsOpen"
            v-cloak
            class="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-2 z-20 custom-scrollbar">
            <div class="px-4 py-2 font-semibold text-gray-800 border-b border-gray-200">Notificaciones</div>
            <div v-if="notifications.length > 0" class="max-h-64 overflow-y-auto">
              <div
                v-for="notification in notifications"
                :key="notification.title"
                class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0">
                <p class="font-medium" :class="{
                  'text-red-600': notification.type === 'urgent',
                  'text-orange-600': notification.type === 'warning',
                  'text-blue-600': notification.type === 'info'
                }">{{ notification.title }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ notification.message }}</p>
                <p class="text-xs text-gray-400 mt-1">{{ notification.time }}</p>
              </div>
            </div>
            <div v-else class="px-4 py-2 text-gray-500 text-sm">No hay notificaciones</div>
            <NuxtLink
              to="/notificaciones"
              class="block text-center text-orange-600 hover:text-orange-800 py-2 border-t border-gray-200 text-sm"
              @click="isNotificationsOpen = false">
              Ver todas
            </NuxtLink>
          </div>
        </div>

        <!-- User Profile -->
        <div class="relative user-dropdown-container" @keydown.esc="isUserOpen = false">
          <button
            class="flex items-center space-x-2 p-2 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
            @click="isUserOpen = !isUserOpen">
            <img
              :src="userAvatar"
              :alt="userName"
              class="w-8 h-8 rounded-full border-2 border-orange-500"
              @error="handleAvatarError"
            />
            <span class="hidden md:block text-slate-200 font-medium text-sm">{{ userName }}</span>
            <Icon name="i-heroicons-chevron-down" class="h-4 w-4 text-gray-500" />
          </button>
          <div
            v-show="isUserOpen"
            v-cloak
            class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
            <NuxtLink
              to="/dashboard"
              class="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
              @click="isUserOpen = false">
              Mi Perfil
            </NuxtLink>
            <NuxtLink
              to="/configuracion/cuenta"
              class="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
              @click="isUserOpen = false">
              Configuración de Cuenta
            </NuxtLink>
            <div class="border-t border-gray-200 my-1"></div>
            <button
              @click="handleLogout"
              class="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-md">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <div class="h-full flex flex-1 relative overflow-hidden">
      <!-- Left Sidebar -->
      <aside
        class="bg-slate-900 border-r border-white/10 w-72 flex flex-col fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out"
        :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
        style="top:64px; height: calc(100vh - 64px);">
        
        <!-- Mobile Close Button -->
        <button
          class="absolute top-2 right-2 p-2 rounded-md hover:bg-gray-100 focus:outline-none lg:hidden"
          @click="closeSidebar">
          <Icon name="i-heroicons-x-mark" class="h-5 w-5 text-gray-500" />
        </button>
        
        <!-- User Profile Summary -->
        <div class="px-5 py-5 border-b border-white/10 flex items-center gap-3">
          <div class="relative flex-shrink-0">
            <img 
              :src="userAvatar" 
              class="w-10 h-10 rounded-full object-cover border-2 border-orange-500 shadow" 
              alt="Avatar"
              @error="handleAvatarError" 
            />
            <div class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-slate-900 rounded-full"></div>
          </div>
          <div class="overflow-hidden">
            <h3 class="font-bold text-white text-sm truncate">{{ userName }}</h3>
            <p class="text-xs text-orange-400 font-semibold truncate">{{ user?.rol || 'Usuario' }}</p>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">
          <template v-for="item in sidebarItems" :key="item.key">
            <!-- Item with Submenu -->
            <div v-if="item.subItems" class="space-y-1">
              <button
                @click="toggleSubMenu(item.key)"
                class="w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group border border-transparent"
                :class="[
                  isActiveNavItem(item.key) || isParentActive(item.key)
                    ? 'bg-orange-500/20 text-orange-300 border-orange-500/30 shadow-sm'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 hover:border-white/10'
                ]">
                <div class="flex items-center">
                  <div 
                    class="p-1.5 rounded-lg mr-3 transition-colors duration-200"
                    :class="isActiveNavItem(item.key) || isParentActive(item.key) ? 'bg-orange-500/30 text-orange-300' : 'bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-slate-200'">
                    <Icon :name="item.icon" class="w-5 h-5" />
                  </div>
                  <span>{{ item.name }}</span>
                </div>
                <Icon
                  name="i-heroicons-chevron-right"
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-90': openSubMenus.includes(item.key) }" />
              </button>

              <!-- Submenu -->
              <div 
                v-show="openSubMenus.includes(item.key)" 
                class="pl-12 pr-2 space-y-1 pt-1 pb-2">
                <NuxtLink
                  v-for="subItem in item.subItems"
                  :key="subItem.key"
                  :to="subItem.path"
                  class="block px-3 py-2 text-sm rounded-lg transition-all duration-200 relative"
                  :class="[
                    isActiveNavItem(subItem.key)
                      ? 'text-orange-300 font-medium bg-orange-500/10'
                      : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
                  ]"
                  @click="closeSidebar">
                  <span 
                    v-if="isActiveNavItem(subItem.key)"
                    class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-orange-500 rounded-r-full">
                  </span>
                  {{ subItem.name }}
                </NuxtLink>
              </div>
            </div>

            <!-- Simple Item -->
            <NuxtLink
              v-else
              :to="item.path"
              class="flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group border border-transparent"
              :class="[
                isActiveNavItem(item.key)
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-900/30'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 hover:border-white/10'
              ]"
              @click="closeSidebar">
              <div 
                class="p-1.5 rounded-lg mr-3 transition-colors duration-200"
                :class="isActiveNavItem(item.key) ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-slate-200'">
                <Icon :name="item.icon" class="w-5 h-5" />
              </div>
              <span>{{ item.name }}</span>
            </NuxtLink>
          </template>

          <div v-if="sidebarItems.length === 0" class="text-center py-8">
            <p class="text-gray-400 text-sm">No hay opciones disponibles</p>
          </div>
        </nav>

        <!-- Footer Links -->
        <div class="p-5 border-t border-white/10">
          <p class="text-[11px] text-slate-500 text-center font-medium">GasField &copy; {{ new Date().getFullYear() }}</p>
          <p class="text-[10px] text-slate-600 text-center mt-0.5">Gas Natural · Colombia 🇨🇴</p>
        </div>
      </aside>

      <div class="flex-1 flex flex-col h-full overflow-y-auto lg:ml-72 transition-all duration-300 bg-slate-50">
        <main class="flex-1 p-6 lg:p-8">
          <slot />
        </main>
        <Footer/>
      </div>
    </div>
  </div>
</template>

<style scoped>
[v-cloak] {
  display: none;
}

.transition-colors {
  transition: background-color 0.2s ease, color 0.2s ease;
}

/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e5e7eb;
  border-radius: 20px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #d1d5db;
}
</style>