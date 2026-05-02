let mesActual = new Date().getMonth();
let anioActual = new Date().getFullYear();
let cuentaEditandoId = null;

function clavesMes(mes, anio) {
  return `${anio}-${String(mes).padStart(2, '0')}`;
}

function getDatosMes(mes, anio) {
  const data = cargarDatos();
  const k = clavesMes(mes, anio);
  if (!data[k]) {
    data[k] = { sueldo: 0, cuentas: [], pagadas: [] };
  }
  return data[k];
}

function setDatosMes(mes, anio, obj) {
  const data = cargarDatos();
  const k = clavesMes(mes, anio);
  data[k] = obj;
  guardarDatos(data);
}

function getDatosMesActual() {
  return getDatosMes(mesActual, anioActual);
}

function setDatosMesActual(obj) {
  setDatosMes(mesActual, anioActual, obj);
}

function getCuenta(id) {
  const d = getDatosMesActual();
  return d.cuentas.find(c => c.id === id);
}

function agregarCuenta(cuenta) {
  const d = getDatosMesActual();
  d.cuentas.push(cuenta);
  setDatosMesActual(d);
}

function actualizarCuenta(id, campos) {
  const d = getDatosMesActual();
  const c = d.cuentas.find(c => c.id === id);
  if (c) {
    Object.assign(c, campos);
    setDatosMesActual(d);
  }
}

function eliminarCuenta(id) {
  const d = getDatosMesActual();
  d.cuentas = d.cuentas.filter(c => c.id !== id);
  d.pagadas = d.pagadas.filter(p => p !== id);
  setDatosMesActual(d);
}

function togglePagada(id) {
  const d = getDatosMesActual();
  if (d.pagadas.includes(id)) {
    d.pagadas = d.pagadas.filter(p => p !== id);
  } else {
    d.pagadas.push(id);
  }
  setDatosMesActual(d);
}

function isPagada(id) {
  const d = getDatosMesActual();
  return d.pagadas.includes(id);
}

function getTotalCuentas() {
  const d = getDatosMesActual();
  return d.cuentas.reduce((sum, c) => sum + Number(c.monto), 0);
}

function getTotalPagado() {
  const d = getDatosMesActual();
  return d.cuentas
    .filter(c => d.pagadas.includes(c.id))
    .reduce((sum, c) => sum + Number(c.monto), 0);
}

function getPendiente() {
  return getTotalCuentas() - getTotalPagado();
}

function initCuentasIniciales() {
  const k = clavesMes(mesActual, anioActual);
  const data = cargarDatos();
  if (!data[k] || data[k].cuentas.length === 0) {
    const d = getDatosMesActual();
    if (d.cuentas.length === 0) {
      d.cuentas = JSON.parse(JSON.stringify(CUENTAS_INICIALES));
      setDatosMesActual(d);
    }
  }
}