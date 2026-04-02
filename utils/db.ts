import Dexie, { type Table } from 'dexie';

// Interfaces locales (Espejo de tus entidades de NestJS)
export interface LocalEntity {
    id: string; // Siempre UUID v4 generado en el cliente
    is_synced: number; // 0: Pendiente, 1: Sincronizado
    created_at_manual: string;
}

export interface ClienteLocal extends LocalEntity {
    nombres: string;
    apellidos: string;
    documento_identidad: string;
    tipo_documento: string;
    telefono: string;
    direccion: string;
    latitud: number | null;
    longitud: number | null;
    is_analfabeto: boolean;
    estado: string; // "PROSPECTO", "CLIENTE", "INACTIVO"
    barrio_vereda_id: string | null;
    impulsador_id: string | null;
}

// ... puedes añadir Medidores y Lecturas aquí

export class ProtoGasDB extends Dexie {
    clientes!: Table<ClienteLocal>;
    biometrias!: Table<any>;
    medidores!: Table<any>;
    lecturas!: Table<any>;

    constructor() {
        super('ProtoGasDB');
        this.version(2).stores({
            clientes: 'id, documento_identidad, is_synced',
            biometrias: 'id, cliente_id, is_synced',
            medidores: 'id, cliente_id, is_synced',
            lecturas: 'id, medidor_id, is_synced'
        });
    }
}

export const db = new ProtoGasDB();