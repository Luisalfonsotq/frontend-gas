import Dexie, { type Table } from 'dexie';

// ─── Interfaces: Entidades locales (espejo de NestJS) ───────────────────────

export interface LocalEntity {
  id: string;            // Siempre UUID v4 generado en el cliente
  is_synced: number;     // 0 = Pendiente, 1 = Sincronizado
  created_at_manual: string;
}

export interface ClienteLocal extends LocalEntity {
  local_id: string;
  nombres: string;
  apellidos: string;
  documento_identidad: string;
  tipo_documento: string;
  telefono: string;
  direccion: string;
  latitud: number | null;
  longitud: number | null;
  is_analfabeto: boolean;
  estado: string; // "PROSPECTO" | "CLIENTE" | "INACTIVO"
  barrio_vereda_id: string | null;
  impulsador_id: string | null;
  codigo: string | null;
  estrato: number;
  tipo_servicio: string;
  financiacion_tipo: string;   // 'CONTADO' | 'CREDI_CONTADO' | 'FINANCIADO'
  financiacion_detalle: string; // JSON stringified details
}


// ─── Interfaces: Caché de Geografía (solo lectura, viene del servidor) ───────

export interface DepartamentoLocal {
  id: string;   // UUID del servidor
  nombre: string;
  codigo_dane: string;
}

export interface MunicipioLocal {
  id: string;             // UUID del servidor
  nombre: string;
  codigo_dane: string;
  departamento_id: string;
}

export interface BarrioVeredaLocal {
  id: string;             // UUID del servidor → se usa como barrio_vereda_id del cliente
  nombre: string;
  municipio_id: string;
}

// ─── Dexie Database ──────────────────────────────────────────────────────────

export class ProtoGasDB extends Dexie {
  clientes!: Table<ClienteLocal>;
  biometrias!: Table<any>;
  medidores!: Table<any>;
  lecturas!: Table<any>;

  // Caché de geografía para uso offline
  departamentos!: Table<DepartamentoLocal>;
  municipios!: Table<MunicipioLocal>;
  barrios_veredas!: Table<BarrioVeredaLocal>;

  constructor() {
    super('ProtoGasDB');

    // v2: esquema original
    this.version(2).stores({
      clientes: 'id, documento_identidad, is_synced',
      biometrias: 'id, cliente_id, is_synced',
      medidores: 'id, cliente_id, is_synced',
      lecturas: 'id, medidor_id, is_synced',
    });

    // v3: agrega tablas de caché geográfico para selectores offline
    this.version(3).stores({
      clientes: 'id, documento_identidad, is_synced',
      biometrias: 'id, cliente_id, is_synced',
      medidores: 'id, cliente_id, is_synced',
      lecturas: 'id, medidor_id, is_synced',
      departamentos: 'id, nombre',
      municipios: 'id, nombre, departamento_id',
      barrios_veredas: 'id, nombre, municipio_id',
    });
  }
}

export const db = new ProtoGasDB();