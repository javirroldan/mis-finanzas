function fmt(n) {
  return '$' + (parseFloat(n) || 0).toLocaleString('es-AR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}

function render() {
  const d = getDatosMesActual();

  renderHeader();
  renderSueldo(d);
  renderResumen(d);
  renderCuentas();
  renderHistorial();
}

function renderHeader() {
  document.getElementById('mes-titulo').textContent = `${MESES[mesActual]} ${anioActual}`;
  document.getElementById('header-sub').textContent = `${MESES[mesActual]} ${anioActual}`;
}

function renderSueldo(d) {
  document.getElementById('sueldo-display').textContent = fmt(d.sueldo);
  document.getElementById('sueldo-input').value = d.sueldo || '';
}

function renderResumen(d) {
  const totalDeudas = getTotalCuentas();
  const totalPagado = getTotalPagado();
  const pendiente = totalDeudas - totalPagado;

  document.getElementById('res-sueldo').textContent = fmt(d.sueldo);
  document.getElementById('res-deudas').textContent = fmt(pendiente);
  document.getElementById('res-balance').textContent = fmt(d.sueldo - pendiente);
}

function renderCuentas() {
  const lista = document.getElementById('lista-cuentas');
  const d = getDatosMesActual();

  if (d.cuentas.length === 0) {
    lista.innerHTML = '<div class="empty">No hay cuentas este mes. Agregá una abajo ↓</div>';
    return;
  }

  lista.innerHTML = d.cuentas.map(c => {
    const pagada = isPagada(c.id);
    return `
      <div class="cuenta-item ${pagada ? 'pagada' : ''}" onclick="abrirModalCuenta('${c.id}')">
        <div class="main-row">
          <div class="icon ${iconClass(c.tipo)}">${iconEmoji(c.tipo)}</div>
          <div class="info">
            <div class="nombre">${c.nombre}</div>
            <span class="tipo-tag">${tipoLabel(c.tipo)}</span>
          </div>
          <div class="monto ${pagada ? 'pagada' : ''}">${fmt(c.monto)}</div>
        </div>
      </div>
    `;
  }).join('');
}

function renderHistorial() {
  const data = cargarDatos();
  const historial = [];

  Object.entries(data).forEach(([k, d]) => {
    if (!d.pagadas || !d.cuentas) return;
    d.cuentas.forEach(c => {
      if (d.pagadas.includes(c.id)) {
        const [anio, mes] = k.split('-');
        historial.push({ ...c, mesLabel: `${MESES[parseInt(mes) - 1]} ${anio}` });
      }
    });
  });

  historial.sort((a, b) => b.mesLabel > a.mesLabel ? 1 : -1);

  const el = document.getElementById('historial-lista');
  if (historial.length === 0) {
    el.innerHTML = '<div class="empty">Aún no marcaste ningún pago como pagado.</div>';
    return;
  }

  el.innerHTML = historial.slice(0, 30).map(h => `
    <div class="historial-item">
      <div>
        <div class="hi-nombre">✅ ${h.nombre}</div>
        <div class="hi-mes">${h.mesLabel}</div>
      </div>
      <div class="hi-monto">${fmt(h.monto)}</div>
    </div>
  `).join('');
}

function renderModalCuenta(id) {
  const c = getCuenta(id);
  if (!c) return;

  const pagada = isPagada(id);

  document.getElementById('modal-icon').textContent = iconEmoji(c.tipo);
  document.getElementById('modal-icon').className = 'icon ' + iconClass(c.tipo);
  document.getElementById('modal-nombre-display').textContent = c.nombre;
  document.getElementById('modal-tipo-display').textContent = tipoLabel(c.tipo);
  document.getElementById('modal-monto-display').textContent = fmt(c.monto);

  document.getElementById('modal-input-nombre').value = c.nombre;
  document.getElementById('modal-input-monto').value = c.monto;
  document.getElementById('modal-input-tipo').value = c.tipo;
  document.getElementById('modal-input-nota').value = c.nota || '';

  const btnPago = document.getElementById('modal-btn-pago');
  btnPago.textContent = pagada ? '✓ Marcar como pendiente' : '✓ Marcar como pagada';
  btnPago.className = 'btn-modal btn-modal-success' + (pagada ? '' : ' inactive');
  document.getElementById('modal-monto-display').classList.toggle('pagada', pagada);
}