import { supabase } from './supabase';

export interface TagCategory {
  id: string;
  name: string;
  slug: string;
  tags: string[];
  sort_order: number;
}

let cache: TagCategory[] | null = null;
let cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000;

export async function getTagCategories(): Promise<TagCategory[]> {
  if (cache && Date.now() - cacheTime < CACHE_TTL) return cache;
  const { data, error } = await supabase
    .from('tag_categories')
    .select('*')
    .order('sort_order');
  if (error || !data) return getFallbackCategories();
  cache = data;
  cacheTime = Date.now();
  return data;
}

export function invalidateTagCategoriesCache() {
  cache = null;
}

// Fallback desde constants.ts si Supabase no responde
function getFallbackCategories(): TagCategory[] {
  return [
    { id: 'fallback-1', name: 'Productos', slug: 'productos', sort_order: 1, tags: ['Verduras','Frutas','Carne','Huevos','Lácteos','Panificados','Masa Madre','Cereales','Frutos secos','Aceites','Elaborados'] },
    { id: 'fallback-2', name: 'Calidad y Producción', slug: 'calidad', sort_order: 2, tags: ['Agroecológico','Orgánico','Regenerativo','Sin agroquímicos','Sin ultraprocesados','Sustentable'] },
    { id: 'fallback-3', name: 'Alimentación', slug: 'alimentacion', sort_order: 3, tags: ['Gluten Free','Sugar Free','Plant Based','Sin Lactosa','Keto','Vegetariano'] },
    { id: 'fallback-4', name: 'Certificaciones', slug: 'certificaciones', sort_order: 4, tags: ['Demeter','AABDA','Orgánico Certificado'] },
    { id: 'fallback-5', name: 'Modalidad de venta', slug: 'modalidad', sort_order: 5, tags: ['Retiro en local','Entrega a domicilio','Venta directa'] },
    { id: 'fallback-6', name: 'Producción Animal', slug: 'animal', sort_order: 6, tags: ['Pastura','Grass-fed','Bienestar animal'] },
  ];
}
