const STORAGE_KEY = 'finanzas_v2';
const THEME_KEY = 'finanzas_tema';

function cargarDatos() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
}

function guardarDatos(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function obtenerTema() {
  return localStorage.getItem(THEME_KEY);
}

function guardarTema(tema) {
  localStorage.setItem(THEME_KEY, tema);
}

function borrarTodo() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(THEME_KEY);
}