# CRM Oficialización Kanban Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformar la pestaña de Oficialización en un CRM completo con vistas Kanban/Lista, filtros dedicados, editor de plantilla de mensaje y menú desplegable para copiar/enviar mensajes rápidamente.

**Architecture:** 
- Agregaremos estados locales en `admin/page.tsx` para manejar la vista (`list` vs `board`), la plantilla del mensaje (guardada en `localStorage`) y los filtros específicos.
- Crearemos componentes dedicados dentro del archivo o carpeta para la vista Kanban y las tarjetas.
- El estado de la base de datos `contact_status` acepta texto, por lo que agregaremos `negado` directamente.

**Tech Stack:** React, Next.js, Inline CSS.

---

### Task 1: Estados Base y Editor de Plantilla

**Files:**
- Modify: `src/app/admin/page.tsx`

- [ ] **Step 1: Agregar estados al componente principal**
```tsx
  // Dentro de AdminDashboard
  const [crmView, setCrmView] = useState<'list' | 'board'>('list');
  const [crmTemplate, setCrmTemplate] = useState('');
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
```

- [ ] **Step 2: Cargar y guardar plantilla en localStorage**
```tsx
  // En el useEffect de initAdmin o fetchData:
  useEffect(() => {
    const savedTemplate = localStorage.getItem('crm_wzp_template');
    if (savedTemplate) {
      setCrmTemplate(savedTemplate);
    } else {
      setCrmTemplate(`¡Hola! 👋 Les escribo desde Alimnet, el mapa de alimentos cuidados.%0A%0AYa los tenemos sumados en nuestra plataforma porque nos encanta lo que hacen 🌿, pero queremos invitarlos a oficializar su perfil.%0A%0ALa idea es que más consumidores afines puedan encontrarlos fácil en esta red. No tiene ningún costo. Pueden cargar su información oficial y fotos acá: {{LINK}}%0A%0AMi nombre es Tomás Vukojicic, fundador de Alimnet, y me encantaría que se sumen. ¡Un abrazo!`);
    }
  }, []);

  const handleSaveTemplate = (text: string) => {
    setCrmTemplate(text);
    localStorage.setItem('crm_wzp_template', text);
    setShowTemplateEditor(false);
  };
```

- [ ] **Step 3: Commit**
```bash
git add src/app/admin/page.tsx
git commit -m "feat(crm): add state for view mode and template editor"
```

---

### Task 2: Barra de Filtros y Header del CRM

**Files:**
- Modify: `src/app/admin/page.tsx`

- [ ] **Step 1: Reemplazar el header de la pestaña "oficializacion"**
Reemplazar el título simple con una barra de herramientas que incluya el toggle de vistas, el botón de editar plantilla y filtros.

```tsx
          // Reemplazar la seccion {activeTab === 'oficializacion' && (...)} superior con:
          <div style={{ padding: '2rem' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
               <div>
                 <h2 style={{ fontSize: '1.8rem', fontWeight: '1000', color: '#2D3A20', marginBottom: '0.5rem' }}>Campaña de Oficialización</h2>
                 <p style={{ color: '#B2AC88', fontWeight: 800 }}>Gestioná el contacto con los comercios pendientes de reclamo.</p>
               </div>
               <div style={{ display: 'flex', gap: '10px' }}>
                 <button onClick={() => setShowTemplateEditor(true)} style={{ padding: '10px 16px', background: '#F0F4ED', color: '#5F7D4A', border: 'none', borderRadius: '12px', fontWeight: 900, cursor: 'pointer', display: 'flex', gap: 6, alignItems: 'center' }}>
                   <Edit size={16} /> Editar Mensaje
                 </button>
                 <div style={{ display: 'flex', background: '#F0F4ED', borderRadius: '12px', overflow: 'hidden' }}>
                   <button onClick={() => setCrmView('list')} style={{ padding: '10px 16px', background: crmView === 'list' ? '#5F7D4A' : 'transparent', color: crmView === 'list' ? 'white' : '#5F7D4A', border: 'none', fontWeight: 900, cursor: 'pointer' }}>Lista</button>
                   <button onClick={() => setCrmView('board')} style={{ padding: '10px 16px', background: crmView === 'board' ? '#5F7D4A' : 'transparent', color: crmView === 'board' ? 'white' : '#5F7D4A', border: 'none', fontWeight: 900, cursor: 'pointer' }}>Kanban</button>
                 </div>
               </div>
             </div>

             {/* CRM Filters Bar */}
             <div style={{ display: 'flex', gap: '15px', marginBottom: '2rem', flexWrap: 'wrap' }}>
               <input type="text" placeholder="Buscar comercio..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ padding: '12px', borderRadius: '12px', border: '1px solid #E4EBDD', minWidth: '250px' }} />
               <select value={filterProvince} onChange={e => setFilterProvince(e.target.value)} style={{ padding: '12px', borderRadius: '12px', border: '1px solid #E4EBDD' }}>
                 <option value="all">Todas las provincias</option>
                 {provinces.map(p => <option key={p} value={p}>{p}</option>)}
               </select>
               <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ padding: '12px', borderRadius: '12px', border: '1px solid #E4EBDD' }}>
                 <option value="all">Todos los rubros</option>
                 {types.map(t => <option key={t} value={t}>{t}</option>)}
               </select>
             </div>
```

- [ ] **Step 2: Modal de Editor de Plantilla**
Agregar el modal al final de la vista (o donde se rendericen modales).

```tsx
             {showTemplateEditor && (
               <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', width: '90%', maxWidth: '600px' }}>
                   <h3 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '1rem' }}>Editar Plantilla de Mensaje</h3>
                   <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>Usa <strong>{'{LINK}'}</strong> para insertar automáticamente el enlace personalizado del comercio. Usa <strong>%0A</strong> para saltos de línea en WhatsApp.</p>
                   <textarea 
                     value={crmTemplate} 
                     onChange={(e) => setCrmTemplate(e.target.value)}
                     style={{ width: '100%', height: '200px', padding: '1rem', borderRadius: '12px', border: '1px solid #E4EBDD', marginBottom: '1rem', fontFamily: 'inherit' }}
                   />
                   <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                     <button onClick={() => setShowTemplateEditor(false)} style={{ padding: '10px 20px', border: 'none', background: '#eee', borderRadius: '12px', cursor: 'pointer', fontWeight: 900 }}>Cancelar</button>
                     <button onClick={() => handleSaveTemplate(crmTemplate)} style={{ padding: '10px 20px', border: 'none', background: '#5F7D4A', color: 'white', borderRadius: '12px', cursor: 'pointer', fontWeight: 900 }}>Guardar Cambios</button>
                   </div>
                 </div>
               </div>
             )}
```

- [ ] **Step 3: Commit**
```bash
git add src/app/admin/page.tsx
git commit -m "feat(crm): add header with view toggle, filters and template editor modal"
```

---

### Task 3: Implementar Menú "Copiar" (UX Opción A)

**Files:**
- Create: `src/app/admin/components/ContactDropdown.tsx`
- Modify: `src/app/admin/page.tsx`

- [ ] **Step 1: Crear componente ContactDropdown**
```tsx
import React, { useState } from 'react';
import { MessageCircle, Instagram, Mail, ChevronDown, Copy, ExternalLink } from 'lucide-react';

export default function ContactDropdown({ merchant, platform, messageTemplate, onUpdateStatus }: { merchant: any, platform: 'wzp' | 'ig' | 'email', messageTemplate: string, onUpdateStatus: () => void }) {
  const [open, setOpen] = useState(false);

  const getPlatformIcon = () => {
    if (platform === 'wzp') return <MessageCircle size={14} />;
    if (platform === 'ig') return <Instagram size={14} />;
    return <Mail size={14} />;
  };

  const getPlatformColor = () => {
    if (platform === 'wzp') return '#25D366';
    if (platform === 'ig') return '#E1306C';
    return '#2D3A20';
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label} copiado al portapapeles.`);
    onUpdateStatus();
    setOpen(false);
  };

  const contactValue = platform === 'wzp' ? (merchant.whatsapp || merchant.phone) : platform === 'ig' ? merchant.instagram_url : merchant.email;

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button 
        onClick={() => setOpen(!open)}
        style={{ padding: '8px 12px', background: getPlatformColor(), color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', fontWeight: 900 }}
      >
        {getPlatformIcon()} {platform.toUpperCase()} <ChevronDown size={12} />
      </button>

      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 99 }} />
          <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '5px', background: 'white', border: '1px solid #E4EBDD', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', zIndex: 100, minWidth: '160px', overflow: 'hidden' }}>
            <button 
              onClick={() => handleCopyText(contactValue || '', 'Contacto')}
              style={{ width: '100%', padding: '10px 15px', textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid #F0F4ED', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <Copy size={14} color="#666" /> Copiar Contacto
            </button>
            <button 
              onClick={() => handleCopyText(decodeURIComponent(messageTemplate), 'Mensaje')}
              style={{ width: '100%', padding: '10px 15px', textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid #F0F4ED', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <Copy size={14} color="#666" /> Copiar Mensaje
            </button>
            {platform === 'wzp' && contactValue && (
              <button 
                onClick={() => { window.open(`https://wa.me/${contactValue}?text=${messageTemplate}`, '_blank'); onUpdateStatus(); setOpen(false); }}
                style={{ width: '100%', padding: '10px 15px', textAlign: 'left', background: '#F8F9F5', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 900, color: '#25D366', display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <ExternalLink size={14} /> Abrir WhatsApp
              </button>
            )}
            {platform === 'email' && contactValue && (
              <button 
                onClick={() => { window.open(`mailto:${contactValue}?subject=Invitación a Alimnet&body=${decodeURIComponent(messageTemplate)}`, '_blank'); onUpdateStatus(); setOpen(false); }}
                style={{ width: '100%', padding: '10px 15px', textAlign: 'left', background: '#F8F9F5', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 900, color: '#2D3A20', display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <ExternalLink size={14} /> Abrir Email
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Integrar en la vista de Lista (y usar el filteredMerchants actual)**
En `src/app/admin/page.tsx`, reemplazar los botones de contacto duro de la tabla actual por este nuevo componente, y usar `filteredMerchants.filter(m => !m.claimed)` en vez de `merchants.filter(...)`.

```tsx
// Reemplazar la celda de acciones de la tabla:
                           <td style={{ padding: '1.2rem', textAlign: 'center' }}>
                             <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                               <ContactDropdown merchant={m} platform="wzp" messageTemplate={message} onUpdateStatus={() => updateContactStatus(m.id, 'contactado')} />
                               <ContactDropdown merchant={m} platform="ig" messageTemplate={message} onUpdateStatus={() => updateContactStatus(m.id, 'contactado')} />
                               <ContactDropdown merchant={m} platform="email" messageTemplate={message} onUpdateStatus={() => updateContactStatus(m.id, 'contactado')} />
                             </div>
                           </td>
// Tambien agregar "negado" a las opciones del select de estado:
                                <option value="negado">NEGADO</option>
```
*(No olvidar inyectar `{LINK}` en el template real: `const message = crmTemplate.replace('{{LINK}}', claimLink);`)*

- [ ] **Step 3: Commit**
```bash
git add src/app/admin/components/ContactDropdown.tsx src/app/admin/page.tsx
git commit -m "feat(crm): add contact dropdown with copy capabilities"
```

---

### Task 4: Vista Kanban (Board)

**Files:**
- Create: `src/app/admin/components/CrmBoard.tsx`
- Modify: `src/app/admin/page.tsx`

- [ ] **Step 1: Crear el Board Kanban**
Crear las 5 columnas: "Sin Contacto", "Contactado", "En Proceso", "Oficializado", "Negado".
Mostrar conteos. Cada tarjeta tiene el `ContactDropdown` y un `select` para cambiar su estado (lo cual moverá la tarjeta).

```tsx
import React from 'react';
import ContactDropdown from './ContactDropdown';

const COLUMNS = [
  { id: 'sin_contacto', label: 'Sin Contacto', color: '#9CA3AF' },
  { id: 'contactado', label: 'Contactado', color: '#3B82F6' },
  { id: 'en_proceso', label: 'En Proceso', color: '#F59E0B' },
  { id: 'oficializado', label: 'Oficializado', color: '#10B981' },
  { id: 'negado', label: 'Negado', color: '#EF4444' }
];

export default function CrmBoard({ merchants, crmTemplate, updateContactStatus }: { merchants: any[], crmTemplate: string, updateContactStatus: (id: string, status: string) => void }) {
  
  return (
    <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', minHeight: '60vh' }}>
      {COLUMNS.map(col => {
        const columnMerchants = merchants.filter(m => (m.contact_status || 'sin_contacto') === col.id);
        
        return (
          <div key={col.id} style={{ flex: '0 0 320px', background: '#F8F9F5', borderRadius: '16px', border: '1px solid #E4EBDD', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1rem', borderBottom: '2px solid #E4EBDD', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 900, color: '#2D3A20', margin: 0 }}>{col.label}</h3>
              <span style={{ background: col.color, color: 'white', fontSize: '0.75rem', fontWeight: 900, padding: '2px 8px', borderRadius: '12px' }}>{columnMerchants.length}</span>
            </div>
            
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, overflowY: 'auto' }}>
              {columnMerchants.map(m => {
                const claimLink = `https://alimnet.com/explorar?id=${m.id}`;
                const message = crmTemplate.replace('{{LINK}}', claimLink);

                return (
                  <div key={m.id} style={{ background: 'white', padding: '1rem', borderRadius: '12px', border: '1px solid #E4EBDD', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                    <div style={{ fontWeight: 900, color: '#2D3A20', marginBottom: '4px' }}>{m.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: '12px' }}>{m.type} • {m.locations?.[0]?.locality || 'Sin localidad'}</div>
                    
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '12px', flexWrap: 'wrap' }}>
                      <ContactDropdown merchant={m} platform="wzp" messageTemplate={message} onUpdateStatus={() => updateContactStatus(m.id, 'contactado')} />
                      <ContactDropdown merchant={m} platform="ig" messageTemplate={message} onUpdateStatus={() => updateContactStatus(m.id, 'contactado')} />
                      <ContactDropdown merchant={m} platform="email" messageTemplate={message} onUpdateStatus={() => updateContactStatus(m.id, 'contactado')} />
                    </div>

                    <select 
                      value={m.contact_status || 'sin_contacto'} 
                      onChange={(e) => updateContactStatus(m.id, e.target.value)}
                      style={{ width: '100%', padding: '6px', borderRadius: '8px', border: '1px solid #E4EBDD', fontSize: '0.75rem', fontWeight: 800, color: '#666', background: '#F8F9F5' }}
                    >
                      {COLUMNS.map(c => <option key={c.id} value={c.id}>{c.label.toUpperCase()}</option>)}
                    </select>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Integrar el Board en `page.tsx`**
Dependiendo de `crmView`, renderizar la tabla de Task 2 o el `CrmBoard`. Ambos deben recibir `filteredMerchants.filter(m => !m.claimed)`.

```tsx
// Debajo de la barra de filtros en activeTab === 'oficializacion':
             {crmView === 'list' ? (
                // AQUI LA TABLA ANTERIOR PERO ACTUALIZADA CON ContactDropdown y filteredMerchants
             ) : (
                <CrmBoard 
                  merchants={filteredMerchants.filter(m => !m.claimed)} 
                  crmTemplate={crmTemplate} 
                  updateContactStatus={updateContactStatus} 
                />
             )}
```

- [ ] **Step 3: Commit**
```bash
git add src/app/admin/components/CrmBoard.tsx src/app/admin/page.tsx
git commit -m "feat(crm): implement kanban board view"
```
