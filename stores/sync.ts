import { defineStore } from 'pinia';
import { db } from '~/utils/db';

export const useSyncStore = defineStore('sync', {
  state: () => ({
    isSyncing: false,
    lastSync: null as Date | null,
    syncErrors: [] as string[],
  }),

  actions: {
    async syncData() {
      if (this.isSyncing) return;
      this.isSyncing = true;
      this.syncErrors = [];

      try {
        // 1. Obtener registros locales pendientes de sincronización (is_synced = 0)
        const pendingClientes = await db.clientes.where('is_synced').equals(0).toArray();
        const pendingBiometrias = await db.biometrias.where('is_synced').equals(0).toArray();
        const pendingMedidores = await db.medidores.where('is_synced').equals(0).toArray();
        const pendingLecturas = await db.lecturas.where('is_synced').equals(0).toArray();

        // 2. Si no hay nada que sincronizar, terminamos
        if (
          pendingClientes.length === 0 &&
          pendingBiometrias.length === 0 &&
          pendingMedidores.length === 0 &&
          pendingLecturas.length === 0
        ) {
          this.isSyncing = false;
          return;
        }

        // Limpiamos los campos locales que el backend no espera en los DTOs.
        // El backend usa class-validator con forbidNonWhitelisted: true,
        // así que cualquier prop extra causa un error 400.
        const cleanClientes = pendingClientes.map((c) => {
          // Extraemos propiedades que el backend no espera y los legacy (como local_id si no es necesario, o lo dejamos)
          // Mantenemos 'estado' en el payload ya que ahora CreateCustomerDto lo soporta y lo valida.
          const { is_synced, tiene_financiacion, ...rest } = c as any;
          return {
            ...rest,
            // Aseguramos de que el tipo sea string (fallback 'CONTADO' si es undefined/null en registros viejos)
            financiacion_tipo: typeof rest.financiacion_tipo === 'string' ? rest.financiacion_tipo : 'CONTADO',
            // Aseguramos que latitud/longitud sean números, o null (y no enviarlos o enviarlos como están para el backend)
            // Se envía null si el GPS no fue capturado
            latitud: rest.latitud ?? null,
            longitud: rest.longitud ?? null,
            // Aseguramos que los nuevos campos del censo tengan fallbacks si vienen de datos viejos
            desea_servicio: rest.desea_servicio !== false, // default true
            razon_rechazo: rest.razon_rechazo ?? null,
            incluye_estufa: rest.incluye_estufa ?? 'NINGUNA',
          };
        });
        const cleanBiometrias = pendingBiometrias.map(({ is_synced, ...rest }) => rest);
        const cleanMedidores = pendingMedidores.map(({ is_synced, ...rest }) => rest);
        const cleanLecturas = pendingLecturas.map(({ is_synced, ...rest }) => rest);

        // Construimos el payload de sincronización masiva
        const syncPayload: Record<string, any> = {};

        // Solo enviar arrays que tengan contenido
        if (cleanClientes.length > 0) syncPayload.clientes = cleanClientes;
        if (cleanBiometrias.length > 0) syncPayload.biometrias = cleanBiometrias;
        if (cleanMedidores.length > 0) syncPayload.medidores = cleanMedidores;
        if (cleanLecturas.length > 0) syncPayload.lecturas = cleanLecturas;

        const config = useRuntimeConfig();
        const apiBaseUrl = config.public.apiBaseUrl || 'http://localhost:3001/api';
        
        // 3. Enviar datos al backend (Sincronización masiva)
        const token = localStorage.getItem('access_token') || '';
        const response: any = await $fetch(`${apiBaseUrl}/sync/push`, {
          method: 'POST',
          body: syncPayload,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        // 4. Verificar respuesta del backend.
        // El backend devuelve: { estado: 'EXITOSO'|'PARCIAL'|'FALLIDO', detalles: {...}, ... }
        if (response && (response.estado === 'EXITOSO' || response.estado === 'PARCIAL')) {
          // Marcar todos los registros enviados como sincronizados.
          // Los "ignorados" (409 = ya existían) también se marcan, ya están en la BD.
          await db.transaction('rw', db.clientes, db.biometrias, db.medidores, db.lecturas, async () => {
             for (const cliente of pendingClientes) {
               await db.clientes.update(cliente.id, { is_synced: 1 });
             }
             for (const biometria of pendingBiometrias) {
               await db.biometrias.update(biometria.id, { is_synced: 1 });
             }
             for (const medidor of pendingMedidores) {
               await db.medidores.update(medidor.id, { is_synced: 1 });
             }
             for (const lectura of pendingLecturas) {
               await db.lecturas.update(lectura.id, { is_synced: 1 });
             }
          });
          this.lastSync = new Date();

          // Si fue parcial, reportar los errores específicos que devolvió el backend
          if (response.estado === 'PARCIAL' && response.detalles) {
            const d = response.detalles;
            const allErrors: string[] = [
              ...(d.clientes?.errores || []),
              ...(d.medidores?.errores || []),
              ...(d.biometrias?.errores || []),
              ...(d.lecturas?.errores || []),
            ];
            if (allErrors.length > 0) {
              this.syncErrors.push(
                `Sincronización parcial (${response.registros_creados} creados, ` +
                `${response.registros_ignorados} ya existían). Errores:`,
              );
              this.syncErrors.push(...allErrors);
            }
          }
        } else {
          this.syncErrors.push(
            `El servidor devolvió estado: ${response?.estado || 'desconocido'}. ` +
            `No se pudieron guardar los datos.`
          );
        }

      } catch (error: any) {
        console.error('Error durante la sincronización:', error);

        // Intentar extraer el mensaje detallado del error del backend
        const backendMessage = error?.data?.message;
        if (Array.isArray(backendMessage)) {
          // class-validator devuelve un array de mensajes de validación
          this.syncErrors.push(
            `[${error?.statusCode || error?.status || 'ERR'}] Errores de validación:`
          );
          this.syncErrors.push(...backendMessage);
        } else {
          this.syncErrors.push(
            `[${error?.statusCode || error?.status || 'ERR'}] ` +
            `${backendMessage || error.message || 'Error de conexión durante la sincronización'}`
          );
        }
      } finally {
        this.isSyncing = false;
      }
    },
  },
});
