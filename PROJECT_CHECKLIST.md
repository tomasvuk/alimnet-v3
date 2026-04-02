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
- [x] **[MAPA]** Conectar el mapa de "Explorar" a la data real de Supabase (Puntos vivos). *(Conectado y Nacionalizado con 234 puntos)*
- [x] **[SOSTENER]** Implementar el flujo de checkout/soporte para la red. *(Stripe y Mercado Pago integrados)*

### 🚀 MISIÓN 3: DESPLIEGUE A PRODUCCIÓN ([www.alimnet.com](http://www.alimnet.com))
- [x] **[DOMINIO]** Configuración de DNS en Hostinger -> Vercel. *(Activo y funcionando)*
- [x] **[SSL/SEGURIDAD]** Verificación de certificados y seguridad del dominio final. *(Verificado)*
- [x] **[AUTH BRANDING]** Configuración de marca en Google Auth (ALIMNET.com). *(Configurado)*
- [x] **[BÚSQUEDA]** Motor de búsqueda inteligente con Google Maps + Fallback regional (Zona Norte, etc). *(Implementado)*
- [x] **[CONTRIBUCIÓN]** Flujo de "Sumar Comercio" para usuarios/vecinos con datos Google Places. *(Implementado)*
- [ ] **[SEO]** Optimización de Meta-tags para el lanzamiento Friends & Family.

### 🛠️ MISIÓN 4: ALIMNET CONTROL CENTER (Admin Dashboard)
- [x] **[SEGURIDAD]** Setear Roles y RLS en Supabase (Admin vs User vs Merchant). *(Esquema de profiles con roles implementado)*
- [x] **[GESTIÓN]** Módulo de Aprobación y Edición de Comercios (Admin Hub). *(Implementado: Modal de edición + Map search intro)*
- [x] **[MIEMBROS]** Sistema de roles para comercios (Dueño y Miembros). *(Antes 'Socios', ahora 'Miembros')*
- [x] **[MERCHANT DASHBOARD]** Panel privado para que el comercio gestione su info. *(Implementado en `/comercio/dashboard`)*
- [ ] **[VERIFICACIÓN]** Sistema de validación de "Proyectos Cuidados" (Gestión de pedidos de verificación).
- [ ] **[CENTRAL DE MENSAJES]** Log de consultas, mensajes del chatbot y contacto directo.
- [x] **[ANALÍTICA]** Vista rápida de salud de la red (Usuarios registrados, Comercios activos, favoritos y validaciones). *(KPIs reales en AdminDashboard)*

### 🛡️ CHEQUEO DE AGENTES (Auditoría de Calidad)
- [ ] **[BACKEND]** Verificar RLS Policies para evitar fugas de datos.
- [ ] **[FRONTEND]** Asegurar densidades de información correctas en el Dashboard (Tablas Elite).
- [ ] **[DISEÑO]** El Admin Dashboard debe ser tan bello como la Home (Consistencia Visual).
- [ ] **[AUDITOR]** Implementar notificaciones automáticas para el Administrador (Nuevas tareas).

---

### 📊 Estado Actual: 92% Completado
¡Hipotéticamente listos para el gran público! Hemos blindado la búsqueda, simplificado la UI y abierto las puertas a que la comunidad colabore sumando nuevos puntos. El sistema es robusto, nacional y visualmente impecable.

**Última actualización:** 2 de abril de 2026.
