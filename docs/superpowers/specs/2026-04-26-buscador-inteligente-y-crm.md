# Especificación: Buscador Inteligente y CRM de Oficialización

## 1. Objetivo General
Transformar el buscador de Alimnet en una herramienta inteligente (desacoplando ubicación de palabras clave) y aprovechar el proceso de enriquecimiento de datos como una campaña masiva de adquisición (Onboarding) de los comercios existentes mediante un CRM integrado en el panel de administrador.

## 2. Fase 1: El Nuevo Buscador Inteligente (Frontend & DB)

### 2.1 Cambios en Base de Datos
- **Nueva Columna**: Se agregará a la tabla `merchants` una columna `search_keywords` (array de texto o JSON) que almacenará etiquetas invisibles (ej: "masa madre", "biodinamico", "verduras").
- **Compatibilidad**: La búsqueda cruzará la consulta del usuario contra `name`, `tags` explícitos y este nuevo campo `search_keywords`.

### 2.2 Cambios en la Interfaz (Doble Barra)
En `/explorar`:
- **Barra 1 (¿Dónde?)**: Mantendrá la integración con Google Maps Autocomplete para restringir coordenadas de búsqueda.
- **Barra 2 (¿Qué buscás?)**: Input de texto libre que sugerirá inteligentemente nombres de locales, categorías (ej. verdulería) o productos (ej. frutas) basándose en la base de datos de Alimnet, sin interferencia de Google Places.

## 3. Fase 2: Panel CRM de Oficialización (Admin)

### 3.1 Nueva Vista en el Dashboard
En `/admin`:
- **Listado de Comercios**: Se listarán los comercios con su estado de propiedad (`claimed: boolean`).
- **Estados de Gestión**: 
  - `Pendiente` (Aún no contactado)
  - `Contactado` (Mensaje enviado)
  - `Oficializado` (El comercio ya fue reclamado por el dueño).

### 3.2 Botones de Acción Inmediata
Por cada comercio no reclamado:
- **Botón WZP**: Abre WhatsApp Web con el texto pre-armado y el link personalizado.
- **Botón IG / Email**: Funcionalidad similar para otras vías.
- **Botón IA (Enriquecer)**: Para un futuro, botón que lea la bio del comercio y proponga llenar el campo `search_keywords` automáticamente.

## 4. Enlaces Personalizados
El link a enviar **NO** será universal. Se enviará un link personalizado que dirija directamente al mapa centrado y abierto en la tarjeta de ese comercio específico (ej: `alimnet.com/explorar?id=[MERCHANT_ID]`). 
Al ver su propia tarjeta, el dueño verá el botón ya existente en la plataforma **"Reivindicar y Configurar"**, creando una experiencia "Wow" y un llamado a la acción directo.

## 5. Copywriting: Mensajes de Contacto Oficial

**Mensaje para WhatsApp / Instagram:**
> "¡Hola! 👋 Les escribo desde Alimnet, el mapa de alimentos cuidados como agroecológicos u orgánicos, entre otros.
> Ya los tenemos sumados en nuestra plataforma porque nos encanta lo que hacen 🌿, pero queremos invitarlos a oficializar su perfil.
> La idea es que miles de consumidores afines puedan encontrarlos fácil cuando busquen productos como los suyos. Es 100% gratuito. Pueden cargar sus datos completos y fotos acá: [LINK_PERSONALIZADO]
> 
> Mi nombre es Tomás Vukojicic, encantado de que sean parte y quedo a disposición para ayudarlos en el proceso. ¡Un abrazo!"

**Mensaje para Email:**
> **Asunto:** ¡Tu comercio ya está en el mapa de Alimnet! 🌿
> 
> Hola al equipo de [Nombre del Comercio],
> 
> Les escribo desde Alimnet, la red que conecta a consumidores conscientes con alimentos cuidados (agroecológicos, orgánicos, etc).
> 
> Ya los hemos incluido en nuestro mapa porque valoramos enormemente su trabajo, pero hoy los contactamos para invitarlos a oficializar su perfil. Queremos que la comunidad los encuentre rápidamente al buscar productos específicos o por su zona. 
> 
> Oficializar el perfil no tiene ningún costo. Les permitirá agregar fotos, métodos de entrega y todas sus categorías (ej: orgánico, masa madre, etc). Pueden hacerlo en 2 minutos ingresando a su propia tarjeta interactiva aquí: [LINK_PERSONALIZADO]
> 
> Mi nombre es Tomás Vukojicic. Encantado de que sean parte de esta red; estoy a su entera disposición para ayudarlos en el proceso.
> 
> Un saludo grande,
> Tomás - Fundador de Alimnet
