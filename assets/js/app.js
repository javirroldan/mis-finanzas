function init() {
  initCuentasIniciales();
  initTema();
  initEventListeners();
  render();
  registerServiceWorker();
}

document.addEventListener('DOMContentLoaded', init);