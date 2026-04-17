'use client';

import React, { useState } from 'react';
import { Search, Filter, Edit, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

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
          <td colSpan={6} style={{ padding: 40, background: '#F8F9F5', borderBottom: '1.5px solid #E4EBDD' }}>
            <div style={{ display: 'flex', gap: 40, justifyContent: 'space-between' }}>
               <div style={{flex: 1}}>
                 <h4 style={{fontWeight:1000, marginBottom:15, color: '#2D3A20'}}>Análisis y Gestión</h4>
                 <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20}}>
                    <div style={{background: 'white', padding: '1.5rem', borderRadius: '20px', border: '1px solid #E4EBDD'}}>
                        <div style={StatLabel}>Aval de la Comunidad</div>
                        <div style={{fontSize:'2rem', fontWeight:1000, color:'#A67C00', marginTop: 8}}>{merchant.validation_count || 0}</div>
                        <p style={{margin: '4px 0 0', fontSize: '0.7rem', color: '#B2AC88', fontWeight: 800}}>Validaciones de perfiles reales</p>
                    </div>
                    <div style={{background: 'white', padding: '1.5rem', borderRadius: '20px', border: '1px solid #E4EBDD'}}>
                        <div style={StatLabel}>Estado de Contacto</div>
                        <select 
                          value={merchant.contact_status || 'sin_contacto'} 
                          onChange={(e)=>{ onUpdateContactStatus(merchant.id, e.target.value); }} 
                          style={{width: '100%', marginTop: 12, padding:10, borderRadius:12, border:'1.5px solid #F0F4ED', fontSize:12, fontWeight:1000, background: '#F8F9F5'}}
                        >
                          <option value="sin_contacto">🔴 SIN CONTACTO</option>
                          <option value="contactado">🟡 CONTACTADO</option>
                          <option value="verificado">🟢 VERIFICADO</option>
                        </select>
                    </div>
                 </div>
               </div>
               <div style={{width:240, display:'flex', flexDirection:'column', gap:12}}>
                  <div style={StatLabel}>Acciones de Control</div>
                  <button onClick={()=>onUpdateStatus(merchant.id, 'active')} style={{padding:14, background:'#5F7D4A', color:'white', border:'none', borderRadius:12, fontWeight:1000, cursor:'pointer', fontSize: '0.8rem'}}>✓ APROBAR COMERCIO</button>
                  <button onClick={()=>onUpdateStatus(merchant.id, 'rejected')} style={{padding:14, background:'white', color:'#EF4444', border:'1px solid #EF4444', borderRadius:12, fontWeight:1000, cursor:'pointer', fontSize: '0.8rem'}}>✕ RECHAZAR</button>
                  <button onClick={()=>onToggleVerified(merchant.id, merchant.verified)} style={{padding:14, background:'#A67C00', color:'white', border:'none', borderRadius:12, fontWeight:1000, cursor:'pointer', fontSize: '0.8rem'}}>🛡️ {merchant.verified ? 'QUITAR SELLO' : 'DAR SELLO OFICIAL'}</button>
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
