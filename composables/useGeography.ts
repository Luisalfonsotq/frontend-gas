// composables/useGeography.ts
//
// Responsabilidades:
//  1. Cargar departamentos/municipios/barrios-veredas desde el backend al iniciar.
//  2. Cachear esos datos en IndexedDB (Dexie) para disponibilidad offline.
//  3. Exponer listas reactivas que alimentan los <select> del formulario.
//  4. Funcionar sin conexión: si no hay red, sirve desde el caché local.

import { ref, computed } from 'vue';
import { useRuntimeConfig } from '#imports';
import { db } from '@/utils/db';
import type { DepartamentoLocal, MunicipioLocal, BarrioVeredaLocal } from '@/utils/db';

export const useGeography = () => {
  const runtimeConfig = useRuntimeConfig();
  const apiBase = computed(
    () => runtimeConfig.public.apiBaseUrl || 'http://localhost:3001/api'
  );

  // ─── Estado reactivo ────────────────────────────────────────────────────────
  const departamentos = ref<DepartamentoLocal[]>([]);
  const municipios    = ref<MunicipioLocal[]>([]);
  const barriosVeredas = ref<BarrioVeredaLocal[]>([]);

  const cargandoDepartamentos  = ref(false);
  const cargandoMunicipios     = ref(false);
  const cargandoBarrios        = ref(false);
  const errorGeo               = ref<string | null>(null);

  // IDs seleccionados (el componente los usa para la cascada)
  const departamentoId = ref<string>('');
  const municipioId    = ref<string>('');
  const barrioVeredaId = ref<string>('');   // ← este es el que va al formulario

  // ─── Helpers internos ───────────────────────────────────────────────────────

  /**
   * Intenta un fetch al API. Si falla (sin red), retorna null
   * para que el llamador use el caché local.
   */
  const tryFetch = async <T>(url: string): Promise<T | null> => {
    try {
      const token = import.meta.client
        ? localStorage.getItem('access_token') || ''
        : '';
      return await $fetch<T>(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
    } catch {
      return null;
    }
  };

  // ─── DEPARTAMENTOS ──────────────────────────────────────────────────────────

  /**
   * Carga todos los departamentos.
   * Estrategia: Network-first, fallback a IndexedDB.
   */
  const cargarDepartamentos = async () => {
    cargandoDepartamentos.value = true;
    errorGeo.value = null;
    try {
      const data = await tryFetch<DepartamentoLocal[]>(
        `${apiBase.value}/geography/departamentos`
      );

      if (data && data.length > 0) {
        // Actualiza el caché offline
        await db.departamentos.bulkPut(data);
        departamentos.value = data;
      } else {
        // Sin red → sirve desde IndexedDB
        departamentos.value = await db.departamentos.orderBy('nombre').toArray();
      }
    } catch (e: any) {
      errorGeo.value = 'No se pudo cargar la lista de departamentos.';
      departamentos.value = await db.departamentos.orderBy('nombre').toArray();
    } finally {
      cargandoDepartamentos.value = false;
    }
  };

  // ─── MUNICIPIOS ─────────────────────────────────────────────────────────────

  /**
   * Carga municipios filtrados por el departamento seleccionado.
   * Resetea municipio y barrio seleccionados al cambiar departamento.
   */
  const onDepartamentoChange = async (id: string) => {
    departamentoId.value = id;
    municipioId.value    = '';
    barrioVeredaId.value = '';
    municipios.value     = [];
    barriosVeredas.value = [];

    if (!id) return;

    cargandoMunicipios.value = true;
    try {
      const data = await tryFetch<MunicipioLocal[]>(
        `${apiBase.value}/geography/municipios?departamento_id=${id}`
      );

      if (data && data.length > 0) {
        await db.municipios.bulkPut(data);
        municipios.value = data;
      } else {
        municipios.value = await db.municipios
          .where('departamento_id').equals(id)
          .sortBy('nombre');
      }
    } catch {
      municipios.value = await db.municipios
        .where('departamento_id').equals(id)
        .sortBy('nombre');
    } finally {
      cargandoMunicipios.value = false;
    }
  };

  // ─── BARRIOS / VEREDAS ──────────────────────────────────────────────────────

  /**
   * Carga barrios/veredas filtrados por el municipio seleccionado.
   * Resetea barrio seleccionado al cambiar municipio.
   */
  const onMunicipioChange = async (id: string) => {
    municipioId.value    = id;
    barrioVeredaId.value = '';
    barriosVeredas.value = [];

    if (!id) return;

    cargandoBarrios.value = true;
    try {
      const data = await tryFetch<BarrioVeredaLocal[]>(
        `${apiBase.value}/geography/barrios-veredas?municipio_id=${id}`
      );

      if (data && data.length > 0) {
        await db.barrios_veredas.bulkPut(data);
        barriosVeredas.value = data;
      } else {
        barriosVeredas.value = await db.barrios_veredas
          .where('municipio_id').equals(id)
          .sortBy('nombre');
      }
    } catch {
      barriosVeredas.value = await db.barrios_veredas
        .where('municipio_id').equals(id)
        .sortBy('nombre');
    } finally {
      cargandoBarrios.value = false;
    }
  };

  /** El impulsador seleccionó un barrio/vereda: guardamos el UUID interno. */
  const onBarrioVeredaChange = (id: string) => {
    barrioVeredaId.value = id;
  };

  // ─── Utilidad: precargar todo el árbol al hacer login (para máximo offline) ─
  /**
   * Descarga y cachea TODA la geografía de una vez.
   * Llamar desde el login o desde un layout de primer acceso.
   */
  const precargarGeografiaCompleta = async () => {
    const deptos = await tryFetch<DepartamentoLocal[]>(
      `${apiBase.value}/geography/departamentos`
    );
    if (!deptos) return;
    await db.departamentos.bulkPut(deptos);

    for (const d of deptos) {
      const munics = await tryFetch<MunicipioLocal[]>(
        `${apiBase.value}/geography/municipios?departamento_id=${d.id}`
      );
      if (!munics) continue;
      await db.municipios.bulkPut(munics);

      for (const m of munics) {
        const barrios = await tryFetch<BarrioVeredaLocal[]>(
          `${apiBase.value}/geography/barrios-veredas?municipio_id=${m.id}`
        );
        if (barrios) await db.barrios_veredas.bulkPut(barrios);
      }
    }
    console.log('[GeoCache] Geografía precargada correctamente en IndexedDB.');
  };

  return {
    // Listas para los <select>
    departamentos,
    municipios,
    barriosVeredas,

    // IDs seleccionados
    departamentoId,
    municipioId,
    barrioVeredaId,   // ← bind directo a form.barrio_vereda_id

    // Estados de carga
    cargandoDepartamentos,
    cargandoMunicipios,
    cargandoBarrios,
    errorGeo,

    // Handlers para la cascada
    cargarDepartamentos,
    onDepartamentoChange,
    onMunicipioChange,
    onBarrioVeredaChange,

    // Precarga completa (llamar al login)
    precargarGeografiaCompleta,
  };
};
