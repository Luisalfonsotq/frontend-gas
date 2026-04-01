import Dexie, { type Table } from 'dexie';

// Interfaces locales (Espejo de tus entidades de NestJS)
export interface LocalEntity {
    id: string; // Siempre UUID v4 generado en el cliente
    is_synced: number; // 0: Pendiente, 1: Sincronizado
    created_at_manual: string;
}

export interface ClienteLocal extends LocalEntity {
    nombre: string;
    identificacion: string;
    municipio_id: string;
}

// ... puedes añadir Medidores y Lecturas aquí

export class ProtoGasDB extends Dexie {
    clientes!: Table<ClienteLocal>;
    biometrias!: Table<any>;
    medidores!: Table<any>;
    lecturas!: Table<any>;

    constructor() {
        super('ProtoGasDB');
        this.version(1).stores({
            clientes: 'id, identificacion, is_synced',
            biometrias: 'id, cliente_id, is_synced',
            medidores: 'id, cliente_id, is_synced',
            lecturas: 'id, medidor_id, is_synced'
        });
    }
}

export const db = new ProtoGasDB();