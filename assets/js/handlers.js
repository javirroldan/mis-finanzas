function guardarSueldo() {
  const val = parseFloat(document.getElementById('sueldo-input').value) || 0;
  const d = getDatosMesActual();
  d.sueldo = val;
  setDatosMesActual(d);
  render();
}

function cambiarMes(delta) {
  mesActual += delta;
  if (mesActual > 11) {
    mesActual = 0;
    anioActual++;
  }
  if (mesActual < 0) {
    mesActual = 11;
    anioActual--;
  }
  render();
}

function abrirModalNuevaCuenta() {
  document.getElementById('modal-nueva-cuenta').classList.add('open');
  document.body.style.overflow = 'hidden';
  actualizarIconoNuevaCuenta();
  setTimeout(() => document.getElementById('modal-nueva-nombre').focus(), 100);
}

function cerrarModalNuevaCuenta(e) {
  if (e && e.target !== e.currentTarget) return;
  document.getElementById('modal-nueva-cuenta').classList.remove('open');
  document.body.style.overflow = '';
  limpiarFormularioNuevaCuenta();
}

function limpiarFormularioNuevaCuenta() {
  document.getElementById('modal-nueva-nombre').value = '';
  document.getElementById('modal-nueva-monto').value = '';
  document.getElementById('modal-nueva-tipo').value = 'tarjeta';
  document.getElementById('modal-nueva-nota').value = '';
}

function actualizarIconoNuevaCuenta() {
  const tipo = document.getElementById('modal-nueva-tipo').value;
  const iconEl = document.getElementById('modal-nueva-icon');
  iconEl.textContent = iconEmoji(tipo);
  iconEl.className = 'icon ' + iconClass(tipo);
}

function guardarNuevaCuenta() {
  const nombre = document.getElementById('modal-nueva-nombre').value.trim();
  const monto = parseFloat(document.getElementById('modal-nueva-monto').value) || 0;
  const tipo = document.getElementById('modal-nueva-tipo').value;
  const nota = document.getElementById('modal-nueva-nota').value.trim();

  if (!nombre || !monto) {
    alert('Completá nombre y monto');
    return;
  }

  const cuenta = {
    id: Date.now().toString(),
    nombre,
    monto,
    tipo,
    nota
  };

  agregarCuenta(cuenta);
  cerrarModalNuevaCuenta();
  render();
}

function abrirModalCuenta(id) {
  cuentaEditandoId = id;
  renderModalCuenta(id);
  document.getElementById('modal-cuenta').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function cerrarModalCuenta(e) {
  if (e && e.target !== e.currentTarget) return;
  document.getElementById('modal-cuenta').classList.remove('open');
  document.body.style.overflow = '';
  cuentaEditandoId = null;
}

function guardarCambiosModal() {
  if (!cuentaEditandoId) return;

  const campos = {
    nombre: document.getElementById('modal-input-nombre').value.trim(),
    monto: parseFloat(document.getElementById('modal-input-monto').value) || 0,
    tipo: document.getElementById('modal-input-tipo').value,
    nota: document.getElementById('modal-input-nota').value.trim()
  };

  campos.nombre = campos.nombre || undefined;

  actualizarCuenta(cuentaEditandoId, campos);
  cerrarModalCuenta();
  render();
}

function togglePagoDesdeModal() {
  if (!cuentaEditandoId) return;
  togglePagada(cuentaEditandoId);

  const pagada = isPagada(cuentaEditandoId);
  const btnPago = document.getElementById('modal-btn-pago');
  btnPago.textContent = pagada ? '✓ Marcar como pendiente' : '✓ Marcar como pagada';
  btnPago.className = 'btn-modal btn-modal-success' + (pagada ? '' : ' inactive');
  document.getElementById('modal-monto-display').classList.toggle('pagada', pagada);
}

function eliminarCuentaDesdeModal() {
  if (!cuentaEditandoId) return;
  if (!confirm('¿Eliminar esta cuenta permanentemente?')) return;
  eliminarCuenta(cuentaEditandoId);
  cerrarModalCuenta();
  render();
}

function toggleDetalle(elId) {
  const el = document.getElementById(elId);
  el.classList.toggle('open');
}

function guardarNota(id, valor) {
  const c = getCuenta(id);
  if (c) {
    actualizarCuenta(id, { nota: valor });
  }
}

function toggleTema() {
  const isLight = document.body.classList.toggle('light');
  document.getElementById('theme-toggle').textContent = isLight ? '🌙' : '☀️';
  guardarTema(isLight ? 'light' : 'dark');
}

function initTema() {
  const tema = obtenerTema();
  if (tema === 'light') {
    document.body.classList.add('light');
    document.getElementById('theme-toggle').textContent = '🌙';
  }
}

function exportarDatos() {
  const data = cargarDatos();
  const tema = obtenerTema();
  const datosCompletos = {
    version: '2.0',
    exportado: new Date().toISOString(),
    datos: data,
    tema: tema
  };

  const blob = new Blob([JSON.stringify(datosCompletos, null, 2)], {
    type: 'application/json'
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `finanzas-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  mostrarStatusBackup('✅ Datos exportados correctamente', 'success');
}

function importarDatos(input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const backup = JSON.parse(e.target.result);
      if (!backup.datos || typeof backup.datos !== 'object') {
        throw new Error('El archivo no tiene el formato correcto');
      }
      if (!confirm('⚠️ Esto reemplazará todos los datos actuales. ¿Continuar?')) {
        input.value = '';
        return;
      }

      guardarDatos(backup.datos);
      if (backup.tema) {
        guardarTema(backup.tema);
      }
      mostrarStatusBackup('✅ Datos importados correctamente. Recargando...', 'success');
      setTimeout(() => location.reload(), 1500);
    } catch (err) {
      mostrarStatusBackup('❌ Error: ' + err.message, 'error');
    }
    input.value = '';
  };
  reader.readAsText(file);
}

function borrarTodosLosDatos() {
  if (!confirm('⚠️ ¿Estás seguro? Esto eliminará TODOS los datos permanentemente.')) return;
  if (!confirm('🚨 Última advertencia: ¿Seguro que querés borrar todo?')) return;

  localStorage.removeItem('finanzas_v2');
  localStorage.removeItem('finanzas_tema');
  mostrarStatusBackup('✅ Todos los datos han sido eliminados. Recargando...', 'success');
  setTimeout(() => location.reload(), 1500);
}

function mostrarStatusBackup(mensaje, tipo) {
  const statusEl = document.getElementById('backup-status');
  statusEl.textContent = mensaje;
  statusEl.style.color = tipo === 'success' ? 'var(--accent-green)' : 'var(--accent-red)';
  setTimeout(() => {
    statusEl.textContent = '';
  }, 5000);
}

function handleKeydown(e) {
  if (e.key === 'Escape') {
    if (document.getElementById('modal-cuenta').classList.contains('open')) {
      cerrarModalCuenta();
    } else if (document.getElementById('modal-nueva-cuenta').classList.contains('open')) {
      cerrarModalNuevaCuenta();
    }
  }
}

function initEventListeners() {
  document.addEventListener('keydown', handleKeydown);
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js')
        .then(r => console.log('SW registrado:', r.scope))
        .catch(e => console.log('SW error:', e));
    });
  }
}