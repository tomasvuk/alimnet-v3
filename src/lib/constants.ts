// --- CORAZÓN DE DATOS ALIMNET (SINGLE SOURCE OF TRUTH) ---
// Cualquier cambio aquí impactará en el Mapa, Registro de Comercios y Perfiles de Usuario automáticamente.

export const OFFICIAL_CATEGORIES = [
  'Verduras', 
  'Frutas', 
  'Carne', 
  'Huevos', 
  'Lácteos', 
  'Panificados', 
  'Masa Madre', // Ahora con categoría propia
  'Cereales', 
  'Frutos secos', 
  'Aceites', 
  'Elaborados',
  'Bebidas Naturalezas',
  'Almacén Consciente'
];

export const OFFICIAL_TYPES = [
  { id: 'Productor', label: 'Productor', sub: 'Producción primaria' },
  { id: 'Abastecedor', label: 'Abastecedor', sub: 'Distribución, almacén' },
  { id: 'Restaurante', label: 'Restaurante', sub: 'Gastronomía' },
  { id: 'Chef', label: 'Chef', sub: 'Cocina personal' }
];

export const PRODUCTION_ADN_OPTIONS = [
  'Agroecológico', 
  'Orgánico', 
  'Regenerativo', 
  'Sin agroquímicos', 
  'Sin ultraprocesados', 
  'Sustentable', 
  'Pastura',
  'Sin TACC', // Sumamos opción celíaca/libre de gluten
  'Vegano'
];

export const DELIVERY_PREFERENCES = [
  'Retiro y Entrega', 
  'Solo Entrega', 
  'Solo Retiro'
];
