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

        // Construimos el payload de sincronización masiva
        const syncPayload = {
          clientes: pendingClientes,
          biometrias: pendingBiometrias,
          medidores: pendingMedidores,
          lecturas: pendingLecturas,
        };

        // 3. Enviar datos al backend (Sincronización masiva)
        // Nota: En un entorno de cliente/Pinia, usamos $fetch en lugar de useFetch
        const response: any = await $fetch('http://localhost:3001/api/sync', {
          method: 'POST',
          body: syncPayload,
        });

        // 4. Si el backend responde con éxito, actualizamos el estado local
        // Se asume que el backend devuelve un objeto confirmando las IDs sincronizadas
        if (response && response.success) {
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
        } else {
          this.syncErrors.push('El servidor no devolvió una respuesta exitosa.');
        }

      } catch (error: any) {
        console.error('Error durante la sincronización:', error);
        this.syncErrors.push(error.message || 'Error de conexión durante la sincronización');
      } finally {
        this.isSyncing = false;
      }
    },
  },
});
