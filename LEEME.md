# 📱 Mis Finanzas — PWA

## Archivos incluidos
- `finanzas_pwa.html` — la app principal
- `manifest.json` — configuración de la PWA
- `service-worker.js` — permite uso offline
- `icon-192.png` y `icon-512.png` — íconos de la app

---

## 🚀 Cómo instalarla

### Opción A — Desde tu PC (más fácil)
1. Copiá todos los archivos a una misma carpeta
2. Abrí `finanzas_pwa.html` con **Chrome** o **Edge**
3. En la barra de direcciones aparece un ícono de instalar (⊕)
4. Hacé clic → "Instalar" → ya aparece en tu escritorio como app

> ⚠️ Importante: para que la PWA funcione completa (offline, instalación),
> necesitás servirla desde un servidor local, no abrir el archivo directo.
> La forma más fácil:

```bash
# Si tenés Python instalado (viene en Windows 11 / Mac / Linux):
# Abrí una terminal en la carpeta de los archivos y ejecutá:
python -m http.server 8000

# Luego abrí en Chrome: http://localhost:8000/finanzas_pwa.html
```

---

### Opción B — Desde tu teléfono Android
1. Subí los archivos a un hosting gratuito como:
   - **Netlify Drop** → https://app.netlify.com/drop (arrastrá la carpeta)
   - **GitHub Pages** (si tenés cuenta)
2. Abrí la URL en **Chrome para Android**
3. Aparece un banner "Agregar a pantalla de inicio" → aceptá
4. ¡Ya está instalada como app!

### Opción C — iPhone (iOS)
1. Seguí los mismos pasos de hosting que Android
2. Abrí la URL en **Safari** (obligatorio en iPhone)
3. Tocá el botón compartir (□↑) → "Agregar a pantalla de inicio"
4. Confirmá el nombre → Agregar

---

## 💾 Tus datos
Los datos se guardan en el **localStorage** del navegador donde la instalaste.
Son privados y no se suben a ningún servidor.

---

## 🔄 Para actualizar la app
Reemplazá el archivo `finanzas_pwa.html` con la versión nueva.
El service worker actualiza el caché automáticamente.
