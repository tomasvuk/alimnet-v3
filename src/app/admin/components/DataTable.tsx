'use client';

import React, { useState } from 'react';
import { Search, Filter, Edit, ChevronDown, ChevronUp, ShieldCheck, Check, X, Shield, MessageSquare, ExternalLink } from 'lucide-react';
import MerchantCard from '@/components/MerchantCard';

interface DataTableProps {
  merchants: any[];
  onUpdateStatus: (id: string, status: any) => void;
  onUpdateContactStatus: (id: string, contactStatus: string) => void;
  onToggleVerified: (id: string, current: boolean) => void;
  onOpenEdit: (m: any) => void;
  onDelete: (id: string) => void;
  users: any[];
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  // Filtros centralizados
  filterProvince: string;
  setFilterProvince: (s: string) => void;
  filterType: string;
  setFilterType: (s: string) => void;
  filterVerification: string;
  setFilterVerification: (s: string) => void;
  filterCountry: string;
  setFilterCountry: (s: string) => void;
  filterOrigin: string;
  setFilterOrigin: (s: string) => void;
}

const THStyle = { padding: '1.2rem 1rem', fontSize: '0.75rem', fontWeight: '950', color: '#B2AC88', textTransform: 'uppercase' as const, textAlign: 'left' as const };
const BadgeStyle = { padding: '6px 12px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: '1000' };
const StatLabel = { fontSize: '0.7rem', fontWeight: 1000, color: '#B2AC88', textTransform: 'uppercase' as const };
export default function DataTable({ 
  merchants, 
  onUpdateStatus, 
  onUpdateContactStatus, 
  onToggleVerified, 
  onOpenEdit,
  onDelete,
  users,
  searchTerm,
  setSearchTerm,
  filterProvince,
  setFilterProvince,
  filterType,
  setFilterType,
  filterVerification,
  setFilterVerification,
  filterCountry,
  setFilterCountry,
  filterOrigin,
  setFilterOrigin
}: DataTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const uniqueProvinces = Array.from(new Set(merchants.map(m => m.province).filter(Boolean))).sort() as string[];
  const uniqueTypes = Array.from(new Set(merchants.map(m => m.type).filter(Boolean))).sort() as string[];
  const uniqueCountries = Array.from(new Set(merchants.map(m => m.locations?.[0]?.country || 'Argentina').filter(Boolean))).sort() as string[];

  // El filtrado ahora se hace en el padre, así que 'merchants' ya viene filtrado
  const filtered = merchants;

  return (
    <>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1 1 300px' }}>
          <Search style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#B2AC88' }} size={18} />
          <input 
            type="text" 
            placeholder="Buscar comercio o rubro..." 
            value={searchTerm} 
            onChange={(e)=>setSearchTerm(e.target.value)} 
            style={{ width: '100%', padding: '1rem 3.5rem', borderRadius: 20, border: '1.5px solid #F0F4ED', background: '#F8F9F5', outline: 'none', fontWeight: 800 }} 
          />
        </div>
        
        {/* Filtros rápidos fuera de la tabla si se desea, o integrados arriba */}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F0F4ED' }}>
              <th style={THStyle}>
                COMERCIO
              </th>
              <th style={THStyle}>
                FECHA
              </th>
              <th style={THStyle}>
                ORIGEN
                <select 
                  value={filterOrigin} 
                  onChange={(e)=>setFilterOrigin(e.target.value)} 
                  style={HeaderSelectStyle}
                >
                  <option value="all">TODOS</option>
                  <option value="neighborhood_recommendation">VECINOS</option>
                  <option value="admin">ADMIN</option>
                  <option value="merchant">COMERCIOS</option>
                </select>
              </th>
              <th style={THStyle}>
                RUBRO
                <select 
                  value={filterType} 
                  onChange={(e)=>setFilterType(e.target.value)} 
                  style={HeaderSelectStyle}
                >
                  <option value="all">TODOS</option>
                  {uniqueTypes.map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
                </select>
              </th>
              <th style={THStyle}>
                PAÍS
                <select 
                  value={filterCountry} 
                  onChange={(e)=>setFilterCountry(e.target.value)} 
                  style={HeaderSelectStyle}
                >
                  <option value="all">TODOS</option>
                  {uniqueCountries.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
                </select>
              </th>
              <th style={THStyle}>
                PROVINCIA
                <select 
                  value={filterProvince} 
                  onChange={(e)=>setFilterProvince(e.target.value)} 
                  style={HeaderSelectStyle}
                >
                  <option value="all">TODAS</option>
                  {uniqueProvinces.map(p => <option key={p} value={p}>{p.toUpperCase()}</option>)}
                </select>
              </th>
              <th style={THStyle}>
                ESTADO
                <select 
                  value={filterVerification} 
                  onChange={(e)=>setFilterVerification(e.target.value)} 
                  style={HeaderSelectStyle}
                >
                  <option value="all">TODOS</option>
                  <option value="verified">OFICIAL</option>
                  <option value="validated">VALIDADO</option>
                  <option value="community">COMUNITARIO</option>
                </select>
              </th>
              <th style={THStyle}>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(m => (
              <MerchantRow 
                key={m.id} 
                merchant={m} 
                users={users}
                expanded={expandedId === m.id} 
                toggle={() => setExpandedId(expandedId === m.id ? null : m.id)}
                onUpdateStatus={onUpdateStatus}
                onUpdateContactStatus={onUpdateContactStatus}
                onToggleVerified={onToggleVerified}
                onOpenEdit={onOpenEdit}
                onDelete={onDelete}
              />
            ))}
            {filtered.length === 0 && (
               <tr><td colSpan={8} style={{padding:80, textAlign:'center', color:'#B2AC88'}}>No se encontraron comercios con esos filtros.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function MerchantRow({ merchant, users, expanded, toggle, onUpdateStatus, onUpdateContactStatus, onToggleVerified, onOpenEdit, onDelete }: any) {
  const missing = [];
  if (!merchant.instagram_url) missing.push('Insta');
  if (!merchant.type) missing.push('Tipo');

  const creator = (users || []).find((u: any) => u.id === merchant.created_by);
  const owner = (users || []).find((u: any) => u.id === merchant.owner_id);
  
  const mapLink = `/explorar?merchant=${merchant.id}`;

  return (
    <>
      <tr onClick={toggle} style={{ borderBottom: '1px solid #F0F4ED', cursor: 'pointer', background: merchant.verified ? '#FDFAF0' : 'white' }}>
        <td style={{ padding: '1.2rem 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 1000, color: '#2D3A20' }}>{merchant.name}</span>
            {(merchant.verified || merchant.owner_id) ? (
              <ShieldCheck size={16} color="#A67C00" style={{transform:'rotate(-5deg)'}} />
            ) : (
              <span style={{fontSize:10, color:'#B45309', background:'#FEF3C7', padding:'2px 6px', borderRadius:4, fontWeight: 900}}>COMUNITARIO</span>
            )}
          </div>
          {missing.length > 0 && <div style={{fontSize:10, color:'#EF4444', fontWeight:900, marginTop:4}}>FALTA: {missing.join(', ')}</div>}
        </td>
        <td style={{ padding: '1.2rem 1rem', color:'#888', fontWeight:800, fontSize: '0.8rem' }}>
          {merchant.created_at ? new Date(merchant.created_at).toLocaleDateString() : '-'}
        </td>
        <td style={{ padding: '1.2rem 1rem' }}>
          <span style={{ 
            ...BadgeStyle, 
            background: merchant.created_by_type === 'neighborhood_recommendation' ? '#F0F4ED' : (merchant.created_by_type === 'admin' ? '#E0E7FF' : '#F3F4F6'), 
            color: merchant.created_by_type === 'neighborhood_recommendation' ? '#5F7D4A' : (merchant.created_by_type === 'admin' ? '#4338CA' : '#6B7280'),
            fontSize: '0.6rem'
          }}>
            {merchant.created_by_type === 'neighborhood_recommendation' ? `VECINO: ${creator ? (creator.first_name || creator.full_name || 'Anónimo').split(' ')[0] : 'Anónimo'}` : (merchant.created_by_type === 'admin' ? 'ADMIN' : 'SISTEMA')}
          </span>
        </td>
        <td style={{ padding: '1.2rem 1rem', color:'#5F7D4A', fontWeight:1000, fontSize: '0.75rem' }}>{merchant.type?.toUpperCase() || '-'}</td>
        <td style={{ padding: '1.2rem 1rem', color:'#888', fontWeight:800, fontSize: '0.8rem' }}>{merchant.locations?.[0]?.country || 'Argentina'}</td>
        <td style={{ padding: '1.2rem 1rem', color:'#888', fontWeight:800, fontSize: '0.8rem' }}>{merchant.province || 'No def.'}</td>
        <td style={{ padding: '1.2rem 1rem' }}>
          <span style={{ 
            ...BadgeStyle, 
            background: merchant.status === 'active' ? '#DCFCE7' : (merchant.status === 'pending' ? '#FEF3C7' : '#FEE2E2'), 
            color: merchant.status === 'active' ? '#166534' : (merchant.status === 'pending' ? '#B45309' : '#991B1B') 
          }}>
            {merchant.status.toUpperCase()}
          </span>
        </td>
        <td style={{ padding: '1.2rem 1rem' }}>
          <div style={{display:'flex', gap:10, alignItems: 'center'}}>
            <button onClick={(e)=>{ e.stopPropagation(); onOpenEdit(merchant); }} style={{background:'white', border:'1px solid #E4EBDD', padding: 6, borderRadius: 8, color:'#5F7D4A'}}><Edit size={16}/></button>
            <button onClick={(e)=>{ e.stopPropagation(); onDelete(merchant.id); }} style={{background:'white', border:'1px solid #FEE2E2', padding: 6, borderRadius: 8, color:'#EF4444'}}><X size={16}/></button>
            <div style={{color: '#B2AC88'}}>{expanded ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}</div>
          </div>
        </td>
      <      {expanded && (
        <tr>
          <td colSpan={8} style={{ padding: '2rem', background: '#F8F9F5', borderBottom: '2px solid #E4EBDD' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 320px) 1fr minmax(280px, 320px)', gap: '2.5rem', alignItems: 'start' }}>
               
               {/* --- PANEL IZQUIERDO: ACCIONES --- */}
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ flex: 1, background: 'white', padding: '1.2rem', borderRadius: '20px', border: '1px solid #E4EBDD', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                        <div style={StatLabel}>Aval</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 1000, color: '#A67C00', marginTop: '4px' }}>{merchant.validation_count || 0}</div>
                    </div>
                    <div style={{ flex: 1.5, background: 'white', padding: '1.2rem', borderRadius: '20px', border: '1px solid #E4EBDD', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                        <div style={StatLabel}>Estado Contacto</div>
                        <select 
                          value={merchant.contact_status || 'sin_contacto'} 
                          onChange={(e)=>onUpdateContactStatus(merchant.id, e.target.value)} 
                          style={{ width: '100%', marginTop: '8px', padding: '8px', borderRadius: '10px', border: '1.5px solid #F0F4ED', fontSize: '11px', fontWeight: 1000, background: '#F8F9F5', cursor: 'pointer', outline: 'none' }}
                        >
                          <option value="sin_contacto">🔴 SIN CONTACTO</option>
                          <option value="contactado">🟡 CONTACTADO</option>
                          <option value="verificado">🟢 VERIFICADO</option>
                        </select>
                    </div>
                  </div>

                  <div style={{ background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #E4EBDD', display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                     <div style={StatLabel}>Control Maestro</div>
                     <div style={{ display: 'flex', gap: '10px' }}>
                        <button 
                          onClick={()=>onUpdateStatus(merchant.id, 'active')} 
                          style={{ flex: 1, padding: '12px', background: '#5F7D4A', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 1000, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.75rem' }}
                        >
                           <Check size={16} /> APROBAR
                        </button>
                        <button 
                          onClick={()=>onUpdateStatus(merchant.id, 'rejected')} 
                          style={{ flex: 1, padding: '12px', background: '#FFF2F2', color: '#EF4444', border: 'none', borderRadius: '12px', fontWeight: 1000, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.75rem' }}
                        >
                           <X size={16} /> RECHAZAR
                        </button>
                     </div>
                     <button 
                       onClick={()=>onToggleVerified(merchant.id, merchant.verified)} 
                       style={{ width: '100%', padding: '12px', background: merchant.verified ? '#F0F4ED' : '#A67C00', color: merchant.verified ? '#A67C00' : 'white', border: 'none', borderRadius: '12px', fontWeight: 1000, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.8rem' }}
                     >
                        <Shield size={16} /> {merchant.verified ? 'QUITAR SELLO' : 'DAR SELLO OFICIAL'}
                     </button>
                  </div>

                  <div style={{ background: 'white', padding: '1.2rem', borderRadius: '20px', border: '1px solid #E4EBDD', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                     <div style={{ ...StatLabel, marginBottom: '1rem' }}>Acceso Rápido</div>
                     <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <a href={mapLink} target="_blank" title="Ver en el Mapa" style={{ padding: '10px', background: '#F0F4ED', borderRadius: '12px', color: '#5F7D4A' }}><MapIcon size={20} /></a>
                        {merchant.instagram_url && <a href={merchant.instagram_url} target="_blank" title="Instagram" style={{ padding: '10px', background: '#F0F4ED', borderRadius: '12px', color: '#5F7D4A' }}><Instagram size={20} /></a>}
                        {merchant.website_url && <a href={merchant.website_url} target="_blank" title="Web" style={{ padding: '10px', background: '#F0F4ED', borderRadius: '12px', color: '#5F7D4A' }}><ExternalLink size={20} /></a>}
                        <button onClick={()=>onOpenEdit(merchant)} title="Editar Datos" style={{ padding: '10px', background: '#F0F4ED', borderRadius: '12px', color: '#5F7D4A', border: 'none', cursor: 'pointer' }}><Edit size={20} /></button>
                     </div>
                  </div>
               </div>

               {/* --- PANEL CENTRAL: PREVISUALIZACIÓN --- */}
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div style={{ ...StatLabel, display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.6 }}>
                    👀 Card Preview <span style={{ fontSize: '0.55rem', border: '1px solid #B2AC88', padding: '1px 5px', borderRadius: '4px' }}>MÓDULO VIVO</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem', background: 'rgba(255,255,255,0.4)', borderRadius: '32px', border: '1px dashed #E4EBDD' }}>
                    <MerchantCard merchant={merchant} />
                  </div>
                  
                  <div style={{ background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #E4EBDD', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                     <div style={StatLabel}>Vinculación / Propiedad</div>
                     {owner ? (
                        <div style={{ marginTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                           <div>
                              <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#A67C00', display: 'flex', alignItems: 'center', gap: '4px' }}><ShieldCheck size={14}/> OFICIALIZADO</div>
                              <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#2D3A20', marginTop: '4px' }}>{owner.full_name || `${owner.first_name} ${owner.last_name}`}</div>
                              <div style={{ fontSize: '0.8rem', color: '#888', fontWeight: 600 }}>{owner.email}</div>
                           </div>
                           <div>
                              {merchant.phone && <div style={{ fontSize: '0.75rem', color: '#5F7D4A', fontWeight: 900 }}>📞 Tel: {merchant.phone}</div>}
                              {merchant.whatsapp && <div style={{ fontSize: '0.75rem', color: '#5F7D4A', fontWeight: 900, marginTop: '4px' }}>💬 Wzp: {merchant.whatsapp}</div>}
                           </div>
                        </div>
                     ) : (
                        <div style={{ fontSize: '0.85rem', color: '#B2AC88', marginTop: '12px', fontWeight: 800, fontStyle: 'italic' }}>No hay propietario vinculado aún.</div>
                     )}
                  </div>
               </div>

               {/* --- PANEL DERECHO: INFO DETALLADA --- */}
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #E4EBDD', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                     <div style={StatLabel}>Bio / Información</div>
                     <p style={{ fontSize: '0.9rem', color: '#2D3A20', marginTop: '12px', lineHeight: '1.6', fontWeight: 600, opacity: 0.8 }}>
                       {merchant.bio_long || merchant.bio_short || 'Sin biografía.'}
                     </p>
                  </div>

                  <div style={{ background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #E4EBDD', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                     <div style={StatLabel}>Logística y Entrega</div>
                     <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#5F7D4A', background: '#F0F4ED', padding: '12px', borderRadius: '15px', marginTop: '12px' }}>
                        {merchant.delivery_info || 'Logística no especificada.'}
                     </div>
                  </div>

                  {merchant.gallery_images && merchant.gallery_images.length > 0 && (
                    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #E4EBDD', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                       <div style={StatLabel}>Fotos del Comercio</div>
                       <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                          {merchant.gallery_images.map((img: string, i: number) => (
                            <div key={i} style={{ width: '70px', height: '70px', borderRadius: '12px', overflow: 'hidden', border: '2px solid #F0F4ED' }}>
                               <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                          ))}
                       </div>
                    </div>
                  )}

                  {creator && !owner && (
                    <div style={{ padding: '1rem', background: '#F3F4F6', borderRadius: '16px', border: '1px solid #E5E7EB' }}>
                       <div style={{ ...StatLabel, color: '#6B7280' }}>Sugerido por Vecino</div>
                       <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#374151', marginTop: '6px' }}>{creator.full_name || creator.first_name}</div>
                       <div style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: 600 }}>{creator.email}</div>
                    </div>
                  )}
               </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

const HeaderSelectStyle = { 
  display: 'block', 
  marginTop: '8px', 
  padding: '4px 8px', 
  borderRadius: '8px', 
  border: '1.5px solid #E4EBDD', 
  background: 'white', 
  fontSize: '0.65rem', 
  fontWeight: '900', 
  color: '#5F7D4A',
  width: '100%',
  outline: 'none'
};
