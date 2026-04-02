// middleware/auth.global.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user, profile } = useAuth();

  // Rutas públicas que NO requieren autenticación
  const publicRoutes = ['/login', '/', '/funcionalidades'];
  const isPublicRoute = publicRoutes.some(route => to.path === route || to.path.startsWith('/invitaciones/aceptar'));

  // Si es ruta pública, permitir acceso
  if (isPublicRoute) {
    return;
  }

  // Si no hay usuario cargado, intentar obtener el perfil
  if (!user.value) {
    try {
      await profile();
      console.log('🔄 User loaded by middleware:', user.value);
    } catch (error) {
      console.error('❌ No authenticated user, redirecting to login');
      return navigateTo('/login');
    }
  }

  // Validar que el usuario tenga un rol válido (no PENDING)
  if (user.value && user.value.rol === 'Pending') {
    console.warn('⚠️ User has PENDING role, restricted access');

    // Solo permitir acceso a rutas de perfil para usuarios PENDING
    if (!to.path.startsWith('/dashboard') && !to.path.startsWith('/invitaciones/aceptar')) {
      return navigateTo('/dashboard');
    }
  }

  // Si todo está bien, permitir acceso
  console.log('✅ User authenticated:', { id: user.value?.id, rol: user.value?.rol });
});