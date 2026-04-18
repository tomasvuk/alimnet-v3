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
  searchTerm: string;
  setSearchTerm: (s: string) => void;
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
  searchTerm,
  setSearchTerm
}: DataTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  // States para filtros de cabecera
  const [filterProv, setFilterProv] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterVer, setFilterVer] = useState<string>('all');
  const [filterCountry, setFilterCountry] = useState<string>('all');

  // Obtener opciones únicas para los filtros
  const uniqueProvinces = Array.from(new Set(merchants.map(m => m.province).filter(Boolean))).sort() as string[];
  const uniqueTypes = Array.from(new Set(merchants.map(m => m.type).filter(Boolean))).sort() as string[];
  const uniqueCountries = Array.from(new Set(merchants.map(m => m.locations?.[0]?.country || 'Argentina').filter(Boolean))).sort() as string[];

  const filtered = merchants.filter(m => {
    const s = searchTerm.toLowerCase();
    const matchSearch = (m.name || '').toLowerCase().includes(s) || (m.type || '').toLowerCase().includes(s);
    const matchProv = filterProv === 'all' || m.province === filterProv;
    const matchType = filterType === 'all' || m.type === filterType;
    const matchCountry = filterCountry === 'all' || (m.locations?.[0]?.country || 'Argentina') === filterCountry;
    const matchVer = filterVer === 'all' || 
                    (filterVer === 'verified' && (m.verified || m.owner_id)) ||
                    (filterVer === 'community' && !m.verified && !m.owner_id) ||
                    (filterVer === 'validated' && (m.validation_count || 0) > 0);
    return matchSearch && matchProv && matchType && matchCountry && matchVer;
  });

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
                  value={filterProv} 
                  onChange={(e)=>setFilterProv(e.target.value)} 
                  style={HeaderSelectStyle}
                >
                  <option value="all">TODAS</option>
                  {uniqueProvinces.map(p => <option key={p} value={p}>{p.toUpperCase()}</option>)}
                </select>
              </th>
              <th style={THStyle}>
                ESTADO
                <select 
                  value={filterVer} 
                  onChange={(e)=>setFilterVer(e.target.value)} 
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
                expanded={expandedId === m.id} 
                toggle={() => setExpandedId(expandedId === m.id ? null : m.id)}
                onUpdateStatus={onUpdateStatus}
                onUpdateContactStatus={onUpdateContactStatus}
                onToggleVerified={onToggleVerified}
                onOpenEdit={onOpenEdit}
              />
            ))}
            {filtered.length === 0 && (
               <tr><td colSpan={6} style={{padding:80, textAlign:'center', color:'#B2AC88'}}>No se encontraron comercios con esos filtros.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function MerchantRow({ merchant, expanded, toggle, onUpdateStatus, onUpdateContactStatus, onToggleVerified, onOpenEdit }: any) {
  const missing = [];
  if (!merchant.instagram_url) missing.push('Insta');
  if (!merchant.type) missing.push('Tipo');

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
            <div style={{color: '#B2AC88'}}>{expanded ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}</div>
          </div>
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={6} style={{ padding: '2rem', background: '#F8F9F5', borderBottom: '1.5px solid #E4EBDD' }}>
            <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>
               
               {/* --- GESTIÓN RÁPIDA (Izquierda) --- */}
               <div style={{ minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ flex: 1, background: 'white', padding: '1rem', borderRadius: '16px', border: '1px solid #E4EBDD' }}>
                        <div style={StatLabel}>Aval</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 1000, color: '#A67C00' }}>{merchant.validation_count || 0}</div>
                    </div>
                    <div style={{ flex: 2, background: 'white', padding: '1rem', borderRadius: '16px', border: '1px solid #E4EBDD' }}>
                        <div style={StatLabel}>Contacto</div>
                        <select 
                          value={merchant.contact_status || 'sin_contacto'} 
                          onChange={(e)=>onUpdateContactStatus(merchant.id, e.target.value)} 
                          style={{ width: '100%', marginTop: '6px', padding: '4px', borderRadius: '8px', border: '1px solid #F0F4ED', fontSize: '11px', fontWeight: 1000, background: '#F8F9F5', outline: 'none' }}
                        >
                          <option value="sin_contacto">🔴 SIN CONTACTO</option>
                          <option value="contactado">🟡 CONTACTADO</option>
                          <option value="verificado">🟢 LISTO</option>
                        </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                     <div style={StatLabel}>Acciones de Control</div>
                     <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          onClick={()=>onUpdateStatus(merchant.id, 'active')} 
                          title="Aprobar"
                          style={{ flex: 1, padding: '10px', background: '#5F7D4A', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 1000, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.7rem' }}
                        >
                           <Check size={14} /> APROBAR
                        </button>
                        <button 
                          onClick={()=>onUpdateStatus(merchant.id, 'rejected')} 
                          title="Rechazar"
                          style={{ flex: 1, padding: '10px', background: 'white', color: '#EF4444', border: '1px solid #EF4444', borderRadius: '10px', fontWeight: 1000, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.7rem' }}
                        >
                           <X size={14} /> RECHAZAR
                        </button>
                     </div>
                     <button 
                       onClick={()=>onToggleVerified(merchant.id, merchant.verified)} 
                       style={{ width: '100%', padding: '10px', background: merchant.verified ? '#F0F4ED' : '#A67C00', color: merchant.verified ? '#A67C00' : 'white', border: 'none', borderRadius: '10px', fontWeight: 1000, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.75rem' }}
                     >
                        <Shield size={14} /> {merchant.verified ? 'QUITAR SELLO' : 'DAR SELLO OFICIAL'}
                     </button>
                  </div>

                  <div style={{ padding: '12px', background: 'rgba(95, 125, 74, 0.05)', borderRadius: '12px', border: '1px dashed #E4EBDD' }}>
                     <div style={{ ...StatLabel, marginBottom: '8px' }}>Links Rápidos</div>
                     <div style={{ display: 'flex', gap: '12px' }}>
                        {merchant.instagram_url && <a href={merchant.instagram_url} target="_blank" style={{ color: '#5F7D4A' }}><MessageSquare size={16} /></a>}
                        {merchant.website_url && <a href={merchant.website_url} target="_blank" style={{ color: '#5F7D4A' }}><ExternalLink size={16} /></a>}
                        <button onClick={()=>onOpenEdit(merchant)} style={{ background: 'none', border: 'none', color: '#5F7D4A', padding: 0, cursor: 'pointer' }}><Edit size={16} /></button>
                     </div>
                  </div>
               </div>

               {/* --- PREVISUALIZACIÓN VISUAL (Derecha) --- */}
               <div style={{ flex: 1 }}>
                  <div style={{ ...StatLabel, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    👀 Previsualización del Perfil <span style={{ fontSize: '0.6rem', background: '#E4EBDD', padding: '2px 6px', borderRadius: '4px' }}>LIVE PREVIEW</span>
                  </div>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    <MerchantCard merchant={merchant} />
                    
                    <div style={{ flex: 1, background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #E4EBDD', minHeight: '150px' }}>
                       <div style={StatLabel}>Bio / Información</div>
                       <p style={{ fontSize: '0.85rem', color: '#2D3A20', marginTop: '10px', lineHeight: '1.5', opacity: 0.8 }}>
                         {merchant.bio_long || merchant.bio_short || 'No hay biografía detallada cargada.'}
                       </p>
                       <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div style={StatLabel}>Logística / Entrega</div>
                          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#5F7D4A', background: '#F0F4ED', padding: '10px', borderRadius: '12px' }}>
                             {merchant.delivery_info || 'Información de reparto no especificada.'}
                          </div>
                       </div>

                       {merchant.gallery_images && merchant.gallery_images.length > 0 && (
                         <div style={{ marginTop: '1.5rem' }}>
                            <div style={StatLabel}>Galería de Fotos</div>
                            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                               {merchant.gallery_images.slice(0, 3).map((img: string, i: number) => (
                                 <div key={i} style={{ width: '60px', height: '60px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #E4EBDD' }}>
                                    <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                 </div>
                               ))}
                            </div>
                         </div>
                       )}
                    </div>
                  </div>
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
