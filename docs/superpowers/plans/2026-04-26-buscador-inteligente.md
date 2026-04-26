# Buscador Inteligente - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Desacoplar la barra de búsqueda principal de Google Places e implementar un autocompletado inteligente basado en nombres, categorías y `search_keywords` de los comercios.
**Architecture:** Modificaremos la interfaz `Merchant` para soportar `search_keywords`. En `src/app/explorar/page.tsx` eliminaremos el listener de Google Autocomplete del input principal y crearemos una lista desplegable (dropdown) que filtre y muestre sugerencias locales basadas en la base de datos de comercios ya cargados en memoria.
**Tech Stack:** Next.js, React (useState, useEffect), TypeScript.

---

### Task 1: Actualizar Tipos y Base de Datos (Lógica Frontend)

**Files:**
- Modify: `src/app/explorar/page.tsx:73-97`

- [ ] **Step 1: Agregar el campo `search_keywords` a la interfaz Merchant**
Modificar la interfaz `Merchant` en `src/app/explorar/page.tsx` para incluir el nuevo campo que usaremos para el filtrado inteligente.

```tsx
interface Merchant {
  id: string;
  name: string;
  type: string;
  bio_short?: string;
  bio_long?: string;
  instagram_url?: string;
  validation_count: number;
  status: string;
  tags?: string[];
  search_keywords?: string[]; // <-- NUEVO CAMPO AÑADIDO
  phone?: string;
// ... (mantener el resto igual)
```

- [ ] **Step 2: Commit**
```bash
git add src/app/explorar/page.tsx
git commit -m "feat: add search_keywords to Merchant interface"
```

---

### Task 2: Modificar lógica de filtrado reactivo

**Files:**
- Modify: `src/app/explorar/page.tsx` (alrededor de la línea 853)

- [ ] **Step 1: Ampliar el filtro de búsqueda libre**
Modificar el `useEffect` que contiene la lógica de `// Filtrado por Búsqueda Libre (Nombre, Alimento, Lugar)`.

```tsx
    // Filtrado por Búsqueda Libre (Nombre, Alimento, Lugar)
    const isRegionalQuery = ['zona norte', 'zona oeste', 'zona sur', 'gba', 'buenos aires'].some(r => normalizeString(searchQuery).includes(r));
    if (searchQuery.trim().length > 0 && !isRegionalQuery) {
      const q = normalizeString(searchQuery);
      result = result.filter(m => {
        const matchName = normalizeString(m.name).includes(q);
        const matchTags = (m.tags || []).some(t => normalizeString(t).includes(q));
        const matchKeywords = (m.search_keywords || []).some(k => normalizeString(k).includes(q));
        
        return matchName || matchTags || matchKeywords;
      });
    }
```

- [ ] **Step 2: Commit**
```bash
git add src/app/explorar/page.tsx
git commit -m "feat: include search_keywords in free text search filtering"
```

---

### Task 3: Desacoplar Google Maps del Input Principal y Crear Custom Autocomplete

**Files:**
- Modify: `src/app/explorar/page.tsx` (alrededor de la línea 511 y el renderizado del input)

- [ ] **Step 1: Eliminar Google Autocomplete del `search-input`**
Buscar la inicialización `const mainAutocomplete = new window.google.maps.places.Autocomplete(mainSearchInput...` y eliminar o comentar ese bloque completo. Solo debe quedar el Autocomplete para `locationInput` (`search-location-input`).

```tsx
      // 1. Autocomplete para UBICACIÓN
      if (locationInput) {
        const locationAutocomplete = new window.google.maps.places.Autocomplete(locationInput, {
          types: ['(regions)'],
          componentRestrictions: { country: 'ar' },
          fields: ['formatted_address', 'geometry', 'name']
        });

        locationAutocomplete.addListener('place_changed', () => {
          const place = locationAutocomplete.getPlace();
          if (!place.geometry) return;
          const name = place.formatted_address || place.name;
          setSearchLocation(name);
          setSearchCoords({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
        });
      }

      // 2. ELIMINADO EL AUTOCOMPLETE DE GOOGLE PARA EL SEARCH INPUT PRINCIPAL
```

- [ ] **Step 2: Renderizar sugerencias nativas para el `search-input`**
Buscar el input con `id="search-input"` y asegurarse de que el evento `onChange` actualice las sugerencias nativas usando la función que ya existe `updateSuggestions(e.target.value)`. (Actualmente `updateSuggestions` se usa para `searchLocation`, hay que crear o modificar una para `searchQuery`).

Para evitar romper mucho, agreguemos un estado nuevo para las sugerencias de búsqueda.

(Añadir junto a los otros useState):
```tsx
  const [querySuggestions, setQuerySuggestions] = useState<string[]>([]);
  const [showQuerySuggestions, setShowQuerySuggestions] = useState(false);
```

Crear la función manejadora de sugerencias (colocar antes del return):
```tsx
  const handleQueryChange = (value: string) => {
    setSearchQuery(value);
    if (value === '') {
      setSearchCoords(null);
      setExternalPlaceSelected(null);
      setShowQuerySuggestions(false);
      return;
    }
    
    if (value.length > 1) {
      const q = normalizeString(value);
      const names = merchants.map(m => m.name);
      const keywords = Array.from(new Set(
        merchants.flatMap(m => [...(m.tags || []), ...(m.search_keywords || []), m.type])
      )).filter(Boolean);
      
      const filtered = [...names, ...keywords]
        .filter(s => normalizeString(s).includes(q))
        .filter((value, index, self) => self.indexOf(value) === index) // Unique
        .slice(0, 5);
        
      setQuerySuggestions(filtered);
      setShowQuerySuggestions(true);
    } else {
      setShowQuerySuggestions(false);
    }
  };
```

- [ ] **Step 3: Actualizar el JSX del input**
Modificar el input de `id="search-input"` para usar `handleQueryChange`:

```tsx
                  <input 
                    id="search-input"
                    type="text" autoFocus={isMobile}
                    placeholder="Alimentos, lugares..." 
                    value={searchQuery}
                    onChange={(e) => handleQueryChange(e.target.value)}
                    onFocus={() => { setIsSearchFocused(true); if(searchQuery.length > 1) setShowQuerySuggestions(true); }}
                    onBlur={() => !isMobile && setTimeout(() => { setIsSearchFocused(false); setShowQuerySuggestions(false); }, 200)}
                    style={{ width: '100%', border: 'none', outline: 'none', fontSize: isMobile ? '0.95rem' : '0.8rem', fontWeight: '400', background: 'transparent', boxShadow: 'none' }}
                  />
                  {/* Dropdown de Sugerencias */}
                  {showQuerySuggestions && querySuggestions.length > 0 && (
                    <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', zIndex: 2000, marginTop: '8px', overflow: 'hidden' }}>
                      {querySuggestions.map((sug, i) => (
                        <div 
                          key={i} 
                          onClick={() => { setSearchQuery(sug); setShowQuerySuggestions(false); trackClick('SEARCH_QUERY_SELECTED', { query: sug }); }}
                          style={{ padding: '12px 20px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600', color: '#2D3A20', borderBottom: i < querySuggestions.length - 1 ? '1px solid #f0f0f0' : 'none' }}
                          onMouseEnter={(e) => e.currentTarget.style.background = '#F8F9F5'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                        >
                          <SearchIcon size={12} style={{ marginRight: '8px', opacity: 0.5 }} />
                          {sug}
                        </div>
                      ))}
                    </div>
                  )}
```

- [ ] **Step 4: Commit**
```bash
git add src/app/explorar/page.tsx
git commit -m "feat: decouple main search input from google places and implement native autocomplete"
```
