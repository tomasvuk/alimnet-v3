# Panel CRM de Oficialización - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar un listado de comercios no reclamados en el Dashboard de Admin con botones rápidos para contactar por WhatsApp, Instagram o Email mediante URLs pre-armadas y un link personalizado.
**Architecture:** Modificaremos la página de administrador (`src/app/admin/page.tsx`) agregando una nueva pestaña o sección para gestionar la "Oficialización". Se mostrarán los comercios y acciones rápidas para generar las URLs.
**Tech Stack:** Next.js, React, Tailwind / Inline CSS.

---

### Task 1: Interfaz Base y Estado en el Admin

**Files:**
- Modify: `src/app/admin/page.tsx`

- [ ] **Step 1: Agregar "Oficialización" al menú de pestañas del Admin**
Buscar el estado de la pestaña activa (ej: `activeTab === 'usuarios'`) y agregar la opción `'oficializacion'`. Luego, en el renderizado de los botones del menú, agregar el botón correspondiente.

```tsx
            <button
              onClick={() => setActiveTab('oficializacion')}
              style={{
                flex: 1, padding: '1rem', background: activeTab === 'oficializacion' ? 'var(--primary-dark)' : 'white',
                color: activeTab === 'oficializacion' ? 'white' : 'var(--primary-dark)',
                border: 'none', fontWeight: '900', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
              }}
            >
              <Megaphone size={18} /> Oficialización
            </button>
```
*(Nota: Asegurarse de importar `Megaphone` de `lucide-react` si no está importado)*

- [ ] **Step 2: Commit**
```bash
git add src/app/admin/page.tsx
git commit -m "feat: add onboarding tab to admin dashboard"
```

---

### Task 2: Renderizar la Tabla de Oficialización

**Files:**
- Modify: `src/app/admin/page.tsx`

- [ ] **Step 1: Filtrar comercios no reclamados**
En la sección donde se renderiza el contenido según `activeTab === 'oficializacion'`, crear la vista que filtre `merchants.filter(m => !m.claimed)`.

```tsx
        {activeTab === 'oficializacion' && (
          <div style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--primary-dark)', marginBottom: '1.5rem' }}>
              Campaña de Oficialización
            </h2>
            <p style={{ marginBottom: '2rem', color: '#666' }}>
              Listado de comercios cargados en el mapa que aún no han reclamado su perfil.
            </p>
            
            <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E4EBDD', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#F8F9F5', borderBottom: '2px solid #E4EBDD' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '900', color: 'var(--primary-dark)' }}>Comercio</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '900', color: 'var(--primary-dark)' }}>Tipo</th>
                    <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '900', color: 'var(--primary-dark)' }}>Acciones de Contacto</th>
                  </tr>
                </thead>
                <tbody>
                  {merchants.filter(m => !m.claimed).map(merchant => {
                    const linkPersonalizado = `https://alimnet.com/explorar?id=${merchant.id}`;
                    const msgWzp = `¡Hola! 👋 Les escribo desde Alimnet, el mapa de alimentos cuidados (agroecológicos, orgánicos, etc).%0A%0AYa los tenemos sumados en nuestra plataforma porque nos encanta lo que hacen 🌿, pero queremos invitarlos a oficializar su perfil.%0A%0ALa idea es que miles de consumidores afines puedan encontrarlos fácil cuando busquen productos como los suyos. No tiene ningun costo. Pueden cargar sus datos completos y fotos acá: ${linkPersonalizado}%0A%0AMi nombre es Tomás Vukojicic, encantado de que sean parte y quedo a disposición para ayudarlos en el proceso. ¡Un abrazo!`;
                    
                    return (
                      <tr key={merchant.id} style={{ borderBottom: '1px solid #E4EBDD' }}>
                        <td style={{ padding: '1rem', fontWeight: 'bold' }}>{merchant.name}</td>
                        <td style={{ padding: '1rem', color: '#666' }}>{merchant.type}</td>
                        <td style={{ padding: '1rem', display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <button 
                            onClick={() => window.open(`https://wa.me/?text=${msgWzp}`, '_blank')}
                            style={{ padding: '0.5rem', background: '#25D366', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                            title="WhatsApp"
                          >
                            <MessageCircle size={18} />
                          </button>
                          <button 
                            onClick={() => { navigator.clipboard.writeText(decodeURIComponent(msgWzp)); alert("Mensaje copiado al portapapeles para enviar por Instagram"); }}
                            style={{ padding: '0.5rem', background: '#E1306C', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                            title="Copiar para Instagram"
                          >
                            <Instagram size={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
```
*(Asegurarse de importar `MessageCircle` y `Instagram` de `lucide-react`)*

- [ ] **Step 2: Commit**
```bash
git add src/app/admin/page.tsx
git commit -m "feat: add table and quick actions for merchant onboarding"
```
