# 📝 PROYECTO ALIMNET: RECTA FINAL
## (Auditoría Global de Agentes v3.2)

Este checklist marca la ruta crítica para el paso de "Diseño y Prototipado" a "Producto Vivo en Producción".

---

### 🎨 MISIÓN 1: AUDITORÍA & STITCH (Visión Global)
- [ ] **[AUDITORÍA]** Chequeo general en TODAS las landing (Home, Explorar, Sostener, Registro).
- [ ] **[STITCH]** Sincronizar y generar las pantallas en Stitch para visualización unificada.
- [ ] **[UI/UX]** Asegurar que el cambio visual entre páginas sea fluido y sin "saltos" (Transiciones Framer Motion).

### ⚙️ MISIÓN 2: BACKEND & FLUJOS (Inteligencia de Producto)
- [x] **[FLUJOS]** Mapear cada CLICK (Auth, Explorar, Sostener). *(Implementado en código)*
- [x] **[SUPABASE]** Finalizar integración de Auth (Login/Registro real). *(Funcional)*
- [x] **[DATOS REALES]** Migración: Borrado de datos ficticios y carga de los primeros comerciantes reales curados. *(Herramienta de importación en Admin Hub lista)*
- [x] **[MAPA]** Conectar el mapa de "Explorar" a la data real de Supabase (Puntos vivos). *(Conectado)*
- [x] **[SOSTENER]** Implementar el flujo de checkout/soporte para la red. *(Stripe y Mercado Pago integrados)*

### 🚀 MISIÓN 3: DESPLIEGUE A PRODUCCIÓN ([www.alimnet.com](http://www.alimnet.com))
- [x] **[DOMINIO]** Configuración de DNS en Hostinger -> Vercel. *(Activo y funcionando)*
- [x] **[SSL/SEGURIDAD]** Verificación de certificados y seguridad del dominio final. *(Verificado)*
- [ ] **[SEO]** Optimización de Meta-tags para el lanzamiento Friends & Family.

### 🛠️ MISIÓN 4: ALIMNET CONTROL CENTER (Admin Dashboard)
- [x] **[SEGURIDAD]** Setear Roles y RLS en Supabase (Admin vs User vs Merchant). *(Esquema de profiles con roles implementado)*
- [ ] **[GESTIÓN]** Módulo de Aprobación de Comercios (Aprobar/Desaprobar sugerencias de usuarios).
- [ ] **[VERIFICACIÓN]** Sistema de validación de "Proyectos Cuidados" (Gestión de pedidos de verificación).
- [ ] **[CENTRAL DE MENSAJES]** Log de consultas, mensajes del chatbot y contacto directo.
- [ ] **[ANALÍTICA]** Vista rápida de salud de la red (Usuarios registrados, Comercios activos). *(KPIs básicos implementados en `AdminDashboard`)*

### 🛡️ CHEQUEO DE AGENTES (Auditoría de Calidad)
- [ ] **[BACKEND]** Verificar RLS Policies para evitar fugas de datos.
- [ ] **[FRONTEND]** Asegurar densidades de información correctas en el Dashboard (Tablas Elite).
- [ ] **[DISEÑO]** El Admin Dashboard debe ser tan bello como la Home (Consistencia Visual).
- [ ] **[AUDITOR]** Implementar notificaciones automáticas para el Administrador (Nuevas tareas).

---

### 📊 Estado Actual: 55% Completado
Hemos avanzado significativamente en la Misión 2, Misión 3 (Dominio real) y en la infraestructura de pagos/auth. El foco ahora debe ser la **Misión 4 (Operaciones)**.

**Última actualización:** 30 de marzo de 2026.
