// utils/roleConfig.js
// Configuración de navegación del sidebar por rol — GasField · Gas Natural Colombia
// Roles: ADMIN, JEFE, IMPULSADOR, LECTOR

export const roleSidebarConfig = {

  // ─── ADMIN ─────────────────────────────────────────────────────────────────
  ADMIN: [
    { name: 'Dashboard',    icon: 'i-heroicons-home',                  path: '/dashboard', key: 'dashboard' },
    {
      name: 'Clientes',     icon: 'i-heroicons-user-group',             path: '/clientes',  key: 'clientes',
      subItems: [
        { name: 'Todos los prospectos',  path: '/clientes',         key: 'clientes-list' },
        { name: 'Registrar prospecto',   path: '/clientes/crear',   key: 'clientes-crear' },
        { name: 'Biometría',             path: '/biometria',        key: 'biometria' },
        { name: 'Evidencias',            path: '/evidencias',       key: 'evidencias' },
      ],
    },
    {
      name: 'Medidores',    icon: 'i-heroicons-cpu-chip',               path: '/medidores', key: 'medidores',
      subItems: [
        { name: 'Listado de medidores',  path: '/medidores',        key: 'medidores-list' },
        { name: 'Registrar medidor',     path: '/medidores/crear',  key: 'medidores-crear' },
      ],
    },
    {
      name: 'Lecturas',     icon: 'i-heroicons-chart-bar-square',       path: '/lecturas',  key: 'lecturas',
      subItems: [
        { name: 'Ver lecturas',          path: '/lecturas',         key: 'lecturas-list' },
        { name: 'Nueva lectura',         path: '/lecturas/crear',   key: 'lecturas-crear' },
      ],
    },
    {
      name: 'Facturación',  icon: 'i-heroicons-document-text',          path: '/facturas',  key: 'facturas',
      subItems: [
        { name: 'Facturas',              path: '/facturas',         key: 'facturas-list' },
        { name: 'Conceptos',             path: '/conceptos',        key: 'conceptos' },
      ],
    },
    {
      name: 'Geografía',    icon: 'i-heroicons-map-pin',                path: '/geografia', key: 'geografia',
      subItems: [
        { name: 'Departamentos',         path: '/geografia/departamentos',  key: 'departamentos' },
        { name: 'Municipios',            path: '/geografia/municipios',     key: 'municipios' },
        { name: 'Barrios / Veredas',     path: '/geografia/barrios',        key: 'barrios' },
      ],
    },
    {
      name: 'Usuarios',     icon: 'i-heroicons-users',                  path: '/usuarios',  key: 'usuarios',
      subItems: [
        { name: 'Gestionar usuarios',    path: '/usuarios',         key: 'usuarios-list' },
        { name: 'Pendientes aprobación', path: '/usuarios/pendientes', key: 'usuarios-pending' },
      ],
    },
    { name: 'Mapa',         icon: 'i-heroicons-map',                    path: '/mapa',      key: 'mapa' },
    { name: 'Sincronización', icon: 'i-heroicons-arrow-path',           path: '/sync',      key: 'sync' },
    { name: 'Reportes',     icon: 'i-heroicons-chart-pie',              path: '/reportes',  key: 'reportes' },
  ],

  // ─── JEFE ──────────────────────────────────────────────────────────────────
  JEFE: [
    { name: 'Dashboard',    icon: 'i-heroicons-home',                  path: '/dashboard', key: 'dashboard' },
    {
      name: 'Clientes',     icon: 'i-heroicons-user-group',             path: '/clientes',  key: 'clientes',
      subItems: [
        { name: 'Prospectos de mi zona',  path: '/clientes',        key: 'clientes-list' },
        { name: 'Estado de clientes',     path: '/clientes/estado', key: 'clientes-estado' },
      ],
    },
    {
      name: 'Lecturas',     icon: 'i-heroicons-chart-bar-square',       path: '/lecturas',  key: 'lecturas',
      subItems: [
        { name: 'Ver lecturas',           path: '/lecturas',        key: 'lecturas-list' },
      ],
    },
    {
      name: 'Facturación',  icon: 'i-heroicons-document-text',          path: '/facturas',  key: 'facturas',
      subItems: [
        { name: 'Facturas',               path: '/facturas',        key: 'facturas-list' },
        { name: 'Pendientes y mora',      path: '/facturas/mora',   key: 'facturas-mora' },
      ],
    },
    { name: 'Mapa',         icon: 'i-heroicons-map',                    path: '/mapa',      key: 'mapa' },
    { name: 'Sincronización', icon: 'i-heroicons-arrow-path',           path: '/sync',      key: 'sync' },
    { name: 'Reportes',     icon: 'i-heroicons-chart-pie',              path: '/reportes',  key: 'reportes' },
  ],

  // ─── IMPULSADOR ────────────────────────────────────────────────────────────
  IMPULSADOR: [
    { name: 'Dashboard',          icon: 'i-heroicons-home',                    path: '/dashboard',     key: 'dashboard' },
    { name: 'Registrar Prospecto',icon: 'i-heroicons-user-plus',               path: '/clientes/crear',key: 'clientes-crear' },
    { name: 'Mis Prospectos',     icon: 'i-heroicons-user-group',              path: '/clientes',      key: 'clientes-list' },
    { name: 'Mapa de Zona',       icon: 'i-heroicons-map',                     path: '/mapa',          key: 'mapa' },
    { name: 'Sincronizar',        icon: 'i-heroicons-arrow-path',              path: '/sync',          key: 'sync' },
  ],

  // ─── LECTOR ────────────────────────────────────────────────────────────────
  LECTOR: [
    { name: 'Dashboard',     icon: 'i-heroicons-home',               path: '/dashboard',      key: 'dashboard' },
    { name: 'Nueva Lectura', icon: 'i-heroicons-plus-circle',        path: '/lecturas/crear', key: 'lecturas-crear' },
    { name: 'Mis Lecturas',  icon: 'i-heroicons-chart-bar-square',   path: '/lecturas',       key: 'lecturas-list' },
    { name: 'Buscar cliente',icon: 'i-heroicons-magnifying-glass',   path: '/clientes',       key: 'clientes-list' },
    { name: 'Mapa de ruta',  icon: 'i-heroicons-map',                path: '/mapa',           key: 'mapa' },
    { name: 'Sincronizar',   icon: 'i-heroicons-arrow-path',         path: '/sync',           key: 'sync' },
  ],
};

// ─── BOTÓN CREAR por rol ────────────────────────────────────────────────────
export const btnCrear = {
  ADMIN: [
    { name: 'Registrar Prospecto',  icon: 'i-heroicons-user-plus',        path: '/clientes/crear' },
    { name: 'Crear Usuario',         icon: 'i-heroicons-user-circle',      path: '/usuarios/crear' },
    { name: 'Registrar Medidor',     icon: 'i-heroicons-cpu-chip',         path: '/medidores/crear' },
    { name: 'Nueva Lectura',         icon: 'i-heroicons-chart-bar-square', path: '/lecturas/crear' },
    { name: 'Crear Concepto',        icon: 'i-heroicons-document-text',    path: '/conceptos/crear' },
  ],
  JEFE: [
    { name: 'Registrar Prospecto',  icon: 'i-heroicons-user-plus',        path: '/clientes/crear' },
    { name: 'Nueva Lectura',         icon: 'i-heroicons-chart-bar-square', path: '/lecturas/crear' },
  ],
  IMPULSADOR: [
    { name: 'Registrar Prospecto',  icon: 'i-heroicons-user-plus',        path: '/clientes/crear' },
  ],
  LECTOR: [
    { name: 'Nueva Lectura',         icon: 'i-heroicons-chart-bar-square', path: '/lecturas/crear' },
  ],
};