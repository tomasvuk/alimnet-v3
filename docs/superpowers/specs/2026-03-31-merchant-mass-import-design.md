# Spec: Massive Merchant Import & Admin Dashboard Evolution

**Date**: 2026-03-31
**Topic**: Importación de 245 comercios y mejora del Admin Dashboard

---

## 1. Contexto y Objetivos
Alimnet v3 necesita poblar su base de datos con una lista curada de 245 comercios agroecológicos provenientes de un archivo CSV (`base_datos.csv`). 

### Objetivos:
- Adaptar el esquema de Supabase para soportar los nuevos campos del relevamiento (verificación, reclamo, productos, calidad, etc.).
- Importar masivamente los 245 registros evitando duplicados y errores de formato.
- Evolucionar el Admin Dashboard para que sea una herramienta de gestión (outreach) eficiente.

---

## 2. Definición del Esquema (Base de Datos)

### Tabla `merchants` (Actualización)
Agregaremos los siguientes campos para reflejar la realidad del relevamiento:

| Columna | Tipo | Descripción |
| :--- | :--- | :--- |
| `verified` | `boolean` | `true` si Alimnet lo auditó. Default `false`. |
| `claimed` | `boolean` | `true` si el comerciante tomó control del perfil. Default `false`. |
| `contact_status` | `text` | `sin_contacto`, `contactado`, `interesado`, `rechazado`. Default `sin_contacto`. |
| `types_secondary` | `text[]` | Categorías adicionales (ej: Productor, Chef). |
| `modalidad` | `text` | `Retiro y Entrega`, `Solo Entrega`, `Solo Retiro`. |
| `quality` | `text[]` | `Agroecológico`, `Orgánico`, `Sustentable`, etc. |
| `products` | `text[]` | `Verduras`, `Frutas`, `Carne`, `Elaborados`, etc. |
| `certifications` | `text[]` | `Demeter`, `AABDA`, `Circular`, etc. |
| `admin_notes` | `text` | Notas internas de la columna "⚠️ Revisar". |
| `created_by_type` | `text` | `admin`, `community`, `merchant`. Default `admin` en este caso. |

### Tabla `locations` (Mapeo)
- Guardaremos la dirección de texto de la columna Google Maps en el campo `address`.
- Si no hay coordenadas, por ahora asignaremos el centroide de la Provincia/Localidad.

---

## 3. Estrategia de Importación

### Script: `/scripts/import_merchants.ts`
Usaremos Node.js con `csv-parse` y `@supabase/supabase-js`.

**Proceso:**
1. Leer `base_datos.csv`.
2. Para cada fila:
   - Limpiar strings (trimmed, lowercase para tags).
   - Convertir columnas de múltiples valores en arrays (`text[]`).
   - Insertar en `merchants`.
   - Recuperar el `ID` generado e insertar la locación en `locations`.
3. Reportar errores por fila al final del proceso.

---

## 4. Diseño del Admin Dashboard (UI)

### Componentes:
- **`MerchantTable`**: Nueva tabla con columnas estilizadas.
- **`MerchantFilters`**: Barra lateral o superior con:
  - Filtro por Provincia.
  - Filtro por Tipo Principal.
  - Filtro por Estado de Contacto.
  - Switch: "¿Tiene WhatsApp?", "¿Tiene Email?".
- **`StatusBadge`**: Componente visual para `contact_status` y `verified`.

### Acciones por fila:
- **Check Verificado**: Update instantáneo de `verified`.
- **Log Contacto**: Marcar como "Contactado".
- **Botón Outreach**: Iconos verdes/rojos que indican si el comercio tiene datos de contacto completos.

---

## 5. Próximos Pasos (Workflow)
1. **Migrations**: Correr el SQL Editor de Supabase.
2. **Scripts**: Correr `npm run import:merchants`.
3. **Frontend**: Actualizar el `AdminDashboard`.

---

**Autor**: Antigravity AI
**Aprobado por**: User
