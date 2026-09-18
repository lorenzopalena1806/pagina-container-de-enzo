# Pepi's Lomos — Carta Digital

Landing page / carta digital para **Pepi's Lomos**, lomiteria artesanal.

## Archivos

| Archivo | Descripcion |
|---|---|
| `index.html` | Estructura HTML de la carta. Editar aqui productos, precios y datos del local. |
| `styles.css` | Estilos visuales (paleta, tipografia, layout). |
| `script.js` | Comportamiento: scroll suave y nav activo. |
| `logo.png` | Logo del local (reemplazar por version definitiva). |

## Como actualizar el menu

Cada producto en `index.html` sigue esta estructura:

```html
<li class="menu-item">
  <div class="item-header">
    <span class="item-name">Nombre del producto</span>
    <span class="item-dots"></span>
    <span class="item-price">$0.000</span>
  </div>
  <p class="item-desc">Descripcion breve del producto.</p>
  <!-- Opcional: -->
  <span class="badge">Etiqueta destacada</span>
</li>
```

- Para **agregar** un producto: copiar el bloque `<li class="menu-item">` dentro de la seccion correspondiente.
- Para **eliminar** un producto: borrar el bloque `<li class="menu-item">` completo.
- Para **cambiar precios**: editar el texto dentro de `<span class="item-price">`.

## Datos del local (footer)

Editar en `index.html` la seccion `<footer class="site-footer">`:
- Horarios
- Direccion
- URL de Instagram

## Logo

Reemplazar `logo.png` por la imagen definitiva conservando el mismo nombre de archivo.

---

*Carta 100% responsive, disenada para celular (acceso por QR en mesa).*
