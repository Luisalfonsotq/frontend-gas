// composables/useAuth.ts
import { navigateTo } from '#app';
import { useState, useRuntimeConfig } from '#imports';

interface UserCredentials {
  nombre?: string;
  email: string;
  password?: string;
  rol?: string;
}

interface AuthUser {
  id: number;      // ✅ Ahora consistente con backend
  nombre: string;
  email: string;
  rol: string;
}

interface AuthResponse {
  access_token: string;
  usuario: AuthUser;
}

interface LoginResponse {
  user: AuthUser;
}

export const useAuth = () => {
  const runtimeConfig = useRuntimeConfig();
  const user = useState<AuthUser | null>('user', () => null); // ✅ Inicializado en null

  const fetchWithAuth = async <T>(url: string, options: any = {}): Promise<T> => {
    // Solo accedemos a localStorage en el lado del cliente
    let token = '';
    if (import.meta.client) {
      token = localStorage.getItem('access_token') || '';
    }

    const headers = options.headers || {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return $fetch<T>(url, {
      ...options,
      headers,
    });
  };

  const login = async (credentials: UserCredentials): Promise<AuthUser> => {
    const response = await fetchWithAuth<AuthResponse>(`${runtimeConfig.public.apiBaseUrl || 'http://localhost:3001/api'}/auth/login`, {
      method: 'POST',
      body: credentials,
    });

    if (!response || !response.access_token) {
      throw new Error('Error en el servidor o token no retornado');
    }

    // Guardamos el token
    if (import.meta.client) {
      localStorage.setItem('access_token', response.access_token);
    }

    // ✅ Obtener perfil completo después del login

    await profile();
    return response.usuario;
  };

  const logout = async () => {
    try {
      user.value = null;
      if (import.meta.client) {
        localStorage.removeItem('access_token');
      }
      await navigateTo('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      user.value = null;
      if (import.meta.client) {
        localStorage.removeItem('access_token');
      }
      await navigateTo('/login');
    }
  };

  const profile = async () => {
    try {
      const profileData = await fetchWithAuth<AuthUser>(`${runtimeConfig.public.apiBaseUrl || 'http://localhost:3001'}/auth/me`);

      // ✅ Validar que el objeto tenga la estructura correcta
      if (profileData && profileData.id && profileData.rol) {
        user.value = profileData;
        console.log('✅ Profile loaded:', profileData);
      } else {
        console.error('❌ Invalid profile structure:', profileData);
        user.value = null;
      }

      return profileData;
    } catch (error) {
      console.error('❌ Error al buscar el perfil:', error);
      user.value = null;
      throw error;
    }
  };

  return {
    user,
    login,
    logout,
    profile
  };
};