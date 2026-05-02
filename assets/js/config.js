const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const ICONS = {
  tarjeta: { emoji: '💳', class: 'ic-tarjeta', label: 'Tarjeta' },
  prestamo: { emoji: '🏦', class: 'ic-prestamo', label: 'Préstamo' },
  mp: { emoji: '📱', class: 'ic-mp', label: 'MercadoPago' },
  servicio: { emoji: '🔌', class: 'ic-servicio', label: 'Servicio' },
  luz: { emoji: '⚡', class: 'ic-luz', label: 'Luz' },
  alquiler: { emoji: '🏠', class: 'ic-alquiler', label: 'Alquiler' },
  otro: { emoji: '📌', class: 'ic-otro', label: 'Otro' }
};

const TIPO_OPTIONS = [
  { value: 'tarjeta', label: '💳 Tarjeta' },
  { value: 'prestamo', label: '🏦 Préstamo' },
  { value: 'mp', label: '📱 MercadoPago' },
  { value: 'servicio', label: '🔌 Servicio' },
  { value: 'luz', label: '⚡ Luz' },
  { value: 'alquiler', label: '🏠 Alquiler' },
  { value: 'otro', label: '📌 Otro' }
];

const CUENTAS_INICIALES = [
  { id: 'naranja1', nombre: 'Tarjeta Naranja', monto: 0, tipo: 'tarjeta', nota: '' },
  { id: 'naranja2', nombre: 'Préstamo Tarjeta Naranja', monto: 0, tipo: 'prestamo', nota: '' },
  { id: 'mp1', nombre: 'MercadoPago Crédito', monto: 0, tipo: 'mp', nota: '' },
  { id: 'mp2', nombre: 'MercadoPago Dinero Plus', monto: 0, tipo: 'mp', nota: '' },
  { id: 'claro1', nombre: 'Teléfono e Internet Claro', monto: 0, tipo: 'servicio', nota: '' },
  { id: 'colegio1', nombre: 'Colegio', monto: 0, tipo: 'otro', nota: '' },
  { id: 'grupal1', nombre: 'Viaje Empresa Grupal', monto: 0, tipo: 'otro', nota: '' },
  { id: 'alquiler1', nombre: 'Alquiler', monto: 0, tipo: 'alquiler', nota: '' },
  { id: 'servicios1', nombre: 'Servicios', monto: 0, tipo: 'servicio', nota: '' },
  { id: 'luz1', nombre: 'Luz', monto: 0, tipo: 'luz', nota: '' }
];

function iconEmoji(tipo) {
  return ICONS[tipo]?.emoji || ICONS.otro.emoji;
}

function iconClass(tipo) {
  return ICONS[tipo]?.class || ICONS.otro.class;
}

function tipoLabel(tipo) {
  return ICONS[tipo]?.label || tipo;
}