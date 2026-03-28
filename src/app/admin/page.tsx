'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Leaf,
  Plus, 
  Search, 
  Filter, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  MapPin, 
  Instagram, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Users,
  Store,
  ShieldCheck,
  TrendingUp,
  Mail,
  MoreVertical,
  X
} from 'lucide-react';
import Header from '@/components/Header';

// --- Tipos ---
interface Location {
  id: string;
  location_type: string;
  locality: string;
  lat: number;
  lng: number;
  is_primary: boolean;
}

interface Merchant {
  id: string;
  name: string;
  type: string;
  status: string;
  instagram_url: string;
  website_url: string;
  validation_count: number;
  created_at: string;
  locations?: Location[];
}

export default function AdminDashboard() {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'comercios' | 'actividad' | 'pendientes'>('comercios');
  const [showImportModal, setShowImportModal] = useState(false);
  const [importText, setImportText] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  // Stats Reales
  const [stats, setStats] = useState({
    totalMerchants: 0,
    totalLocations: 0,
    pendingValidations: 0,
    activeUsers: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: mData } = await supabase.from('merchants').select('*, locations(*)');
      setMerchants(mData || []);

      const { count: mCount } = await supabase.from('merchants').select('*', { count: 'exact', head: true });
      const { count: lCount } = await supabase.from('locations').select('*', { count: 'exact', head: true });
      const { count: pCount } = await supabase.from('merchants').select('*', { count: 'exact', head: true }).eq('status', 'pending');
      const { count: uCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });

      setStats({
        totalMerchants: mCount || 0,
        totalLocations: lCount || 0,
        pendingValidations: pCount || 0,
        activeUsers: uCount || 0
      });
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleImport = async () => {
    if (!importText) return;
    setIsImporting(true);
    
    // 1. Separar filas y encabezados (Asumimos Tabulación como separador de Excel)
    const rows = importText.split('\n').filter(r => r.trim());
    if (rows.length < 2) {
      alert('Se necesitan encabezados y al menos una fila.');
      setIsImporting(false);
      return;
    }

    const headers = rows[0].split('\t').map(h => h.trim().toLowerCase());
    const dataRows = rows.slice(1);
    let successCount = 0;

    for (const rowText of dataRows) {
      const values = rowText.split('\t');
      const row: any = {};
      headers.forEach((h, i) => row[h] = values[i]?.trim());

      // Mapeo Inteligente (Basado en tus columnas)
      const name = row['nombre del emprendimiento'] || row['nombre'];
      if (!name) continue;

      try {
        // A. Insert Merchant
        const { data: merchant, error: mError } = await supabase.from('merchants').insert({
          name: name,
          instagram_url: row['instagram'],
          website_url: row['sitio web'] || row['linktr'],
          whatsapp: row['telefono'],
          bio_long: row['notas extra'],
          status: 'active'
        }).select().single();

        if (mError) throw mError;

        // B. Insert Location (Si hay datos de zona/localidad)
        if (merchant && (row['país'] || row['localidad/barrio'])) {
           await supabase.from('locations').insert({
             merchant_id: merchant.id,
             locality: row['localidad/barrio'],
             district: row['región/zona'],
             province: row['provincia'],
             location_type: 'fixed',
             lat: -34.6037, // Default BA por ahora, se puede mejorar con geocoding
             lng: -58.3816
           });
        }
        successCount++;
      } catch (e) {
        console.error('Error importando fila:', e);
      }
    }

    alert(`¡Éxito! Se cargaron ${successCount} nuevos emprendimientos a la red.`);
    setIsImporting(false);
    setShowImportModal(false);
    setImportText('');
    fetchData();
  };

  const filteredMerchants = merchants.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (m.type && m.type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9F5', paddingTop: '70px' }}>
      <Header />
      
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        
        {/* HEADER SECTION */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#5F7D4A', fontWeight: '900', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              <ShieldCheck size={18} /> Central de Operaciones
            </div>
            <h1 style={{ fontSize: '2.85rem', fontWeight: '1000', color: '#2D3A20', letterSpacing: '-0.04em', margin: 0 }}>Alimnet Control Center</h1>
            <p style={{ color: '#888', fontSize: '1.1rem', marginTop: '0.4rem', fontWeight: '550' }}>Gestionando la red soberana v3.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
             <button style={{ padding: '0.9rem 1.8rem', background: 'white', border: '1px solid #E4EBDD', borderRadius: '16px', fontWeight: '900', color: '#2D3A20', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
               <BarChart3 size={18} /> Reporte
             </button>
             <button onClick={() => setShowImportModal(true)} style={{ padding: '0.9rem 1.8rem', background: '#5F7D4A', border: 'none', borderRadius: '16px', fontWeight: '900', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 24px rgba(95, 125, 74, 0.2)' }}>
               <Plus size={18} strokeWidth={3} /> Importar Excel
             </button>
          </div>
        </div>

        {/* KPIs REALES */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
           <KPICard label="Comercios" value={stats.totalMerchants} trend="+0%" icon={<Store size={22} />} color="#5F7D4A" />
           <KPICard label="Puntos de Red" value={stats.totalLocations} trend="Zonas" icon={<MapPin size={22} />} color="#2D3A20" />
           <KPICard label="Validaciones" value={stats.pendingValidations} trend="Pendientes" icon={<Clock size={22} />} color="#B2AC88" />
           <KPICard label="Personas" value={stats.activeUsers} trend="Activos" icon={<Users size={22} />} color="#5F7D4A" />
        </div>

        {/* CONTENEDOR TABS */}
        <div style={{ background: 'white', borderRadius: '40px', padding: '2.5rem', boxShadow: '0 30px 60px rgba(0,0,0,0.04)', border: '1px solid #E4EBDD' }}>
           
           <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid #F0F4ED', marginBottom: '2.5rem' }}>
              <TabItem active={activeTab === 'comercios'} label="Comercios" onClick={() => setActiveTab('comercios')} count={stats.totalMerchants} />
              <TabItem active={activeTab === 'actividad'} label="Actividad" onClick={() => setActiveTab('actividad')} />
              <TabItem active={activeTab === 'pendientes'} label="Validaciones" onClick={() => setActiveTab('pendientes')} count={stats.pendingValidations} />
           </div>

           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ position: 'relative', width: '400px' }}>
                 <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#B2AC88' }} size={18} />
                 <input 
                   type="text" 
                   placeholder="Filtrar comerciantes..." 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   style={{ width: '100%', padding: '1rem 1.2rem 1rem 3.2rem', borderRadius: '20px', border: '1.5px solid #F0F4ED', background: '#F8F9F5', outline: 'none', fontWeight: '600' }}
                 />
              </div>
           </div>

           <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                 <thead style={{ borderBottom: '2px solid #F8F9F5' }}>
                    <tr>
                       <th style={THStyle}>COMERCIO</th>
                       <th style={THStyle}>TIPO</th>
                       <th style={THStyle}>PRESENCIA</th>
                       <th style={THStyle}>ESTADO</th>
                       <th style={THStyle}>REDES</th>
                       <th style={{ ...THStyle, width: '40px' }}></th>
                    </tr>
                 </thead>
                 <tbody>
                    {loading ? (
                      <tr><td colSpan={6} style={{ padding: '4rem', textAlign: 'center', color: '#888' }}>Cargando...</td></tr>
                    ) : filteredMerchants.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ padding: '8rem 4rem', textAlign: 'center' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                            <Leaf size={48} color="#E4EBDD" />
                            <p style={{ color: '#2D3A20', fontWeight: '1000', fontSize: '1.4rem', margin: 0 }}>La red está lista para florecer.</p>
                            <p style={{ color: '#888', fontWeight: '550' }}>No hay comercios. Empezá cargando tu Excel.</p>
                            <button onClick={() => setShowImportModal(true)} className="button-primary" style={{ marginTop: '1rem', padding: '1rem 2rem', borderRadius: '18px' }}>Importar Ahora</button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredMerchants.map(m => (
                        <MerchantRow key={m.id} merchant={m} expanded={expandedId === m.id} toggle={() => setExpandedId(expandedId === m.id ? null : m.id)} />
                      ))
                    )}
                 </tbody>
              </table>
           </div>
        </div>
      </main>

      {/* MODAL IMPORTACIÓN */}
      {showImportModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(45, 58, 32, 0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '2rem' }}>
          <div style={{ background: 'white', width: '100%', maxWidth: '800px', borderRadius: '40px', padding: '3rem', position: 'relative' }}>
             <button onClick={() => setShowImportModal(false)} style={{ position: 'absolute', top: '2rem', right: '2rem', background: '#F8F9F5', border: 'none', borderRadius: '50%', padding: '0.8rem', cursor: 'pointer' }}>
               <X size={24} color="#B2AC88" />
             </button>
             <div style={{ marginBottom: '2rem' }}>
               <h2 style={{ fontSize: '2.2rem', fontWeight: '1000', color: '#2D3A20', letterSpacing: '-0.04em', margin: 0 }}>Importar Excel</h2>
               <p style={{ color: '#888', marginTop: '0.5rem' }}>Pegá las filas de tu planilla acá. Mapearemos los campos automáticamente.</p>
             </div>
             <textarea 
               value={importText}
               onChange={(e) => setImportText(e.target.value)}
               placeholder="Nombre	Instagram	Zona	Bio..."
               style={{ width: '100%', height: '250px', borderRadius: '25px', border: '2px solid #F0F4ED', background: '#F8F9F5', padding: '1.5rem', outline: 'none', marginBottom: '2rem' }}
             />
             <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
               <button onClick={() => setShowImportModal(false)} style={{ padding: '1rem 2rem', background: 'white', border: '1.5px solid #F0F4ED', borderRadius: '18px', fontWeight: '1000' }}>Cancelar</button>
               <button onClick={handleImport} disabled={!importText || isImporting} style={{ padding: '1rem 3rem', background: '#5F7D4A', border: 'none', borderRadius: '18px', fontWeight: '1000', color: 'white', cursor: 'pointer', opacity: (!importText || isImporting) ? 0.5 : 1 }}>
                 {isImporting ? 'Procesando...' : 'Iniciar Carga'}
               </button>
             </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');
        body { font-family: 'Manrope', sans-serif; }
        .button-primary { transition: all 0.2s; }
        .button-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(95, 125, 74, 0.2); }
      `}</style>
    </div>
  );
}

// --- Subcomponentes ---
function KPICard({ label, value, trend, icon, color }: any) {
  return (
    <div style={{ background: 'white', padding: '2rem', borderRadius: '32px', border: '1px solid #E4EBDD', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#B2AC88' }}>
          {icon}
          <div style={{ fontSize: '0.75rem', fontWeight: '950', background: '#F8F9F5', padding: '4px 10px', borderRadius: '10px', color: '#5F7D4A' }}>{trend}</div>
       </div>
       <div>
         <div style={{ fontSize: '2.2rem', fontWeight: '1000', color: '#2D3A20', letterSpacing: '-0.04em' }}>{value}</div>
         <div style={{ fontSize: '0.75rem', fontWeight: '900', color: '#B2AC88', textTransform: 'uppercase' }}>{label}</div>
       </div>
    </div>
  );
}

function TabItem({ active, label, onClick, count }: any) {
  return (
    <div onClick={onClick} style={{ padding: '1rem 0', cursor: 'pointer', borderBottom: '3px solid', borderColor: active ? '#5F7D4A' : 'transparent', color: active ? '#2D3A20' : '#B2AC88', fontWeight: '950', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
      {label}
      {count !== undefined && <span style={{ background: active ? '#5F7D4A' : '#F0F4ED', color: active ? 'white' : '#B2AC88', padding: '2px 8px', borderRadius: '8px', fontSize: '0.7rem' }}>{count}</span>}
    </div>
  );
}

function MerchantRow({ merchant, expanded, toggle }: any) {
  return (
    <>
      <tr onClick={toggle} style={{ borderBottom: '1px solid #F0F4ED', cursor: 'pointer' }}>
        <td style={{ padding: '1.5rem 1rem' }}>
          <div style={{ fontWeight: '1000', color: '#2D3A20' }}>{merchant.name}</div>
          <div style={{ fontSize: '0.75rem', color: '#AAA' }}>ID: {merchant.id.slice(0, 8)}</div>
        </td>
        <td style={{ padding: '1.5rem 1rem' }}>
          <span style={BadgeStyle}>{merchant.type}</span>
        </td>
        <td style={{ padding: '1.5rem 1rem' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '800', color: '#5F7D4A', fontSize: '0.85rem' }}>
             <MapPin size={14} /> {merchant.locations?.length || 0} zonas
           </div>
        </td>
        <td style={{ padding: '1.5rem 1rem' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '900', fontSize: '0.8rem', color: '#5F7D4A' }}>
              <CheckCircle size={16} /> {merchant.status.toUpperCase()}
           </div>
        </td>
        <td style={{ padding: '1.5rem 1rem' }}>
           <div style={{ display: 'flex', gap: '12px', color: '#B2AC88' }}>
              {merchant.instagram_url && <Instagram size={18} />}
              {merchant.website_url && <ExternalLink size={18} />}
           </div>
        </td>
        <td style={{ padding: '1.5rem 1rem' }}>
           {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={6} style={{ padding: '2rem 3rem', background: '#F8F9F5' }}>
             <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>
                <div>
                   <h4 style={{ fontSize: '0.85rem', fontWeight: '950', color: '#B2AC88', textTransform: 'uppercase', marginBottom: '1.2rem' }}>Ubicaciones</h4>
                   {merchant.locations?.map((loc: any) => (
                     <div key={loc.id} style={{ background: 'white', padding: '1rem', borderRadius: '15px', border: '1px solid #E4EBDD', marginBottom: '0.5rem' }}>
                        <div style={{ fontWeight: '1000' }}>{loc.locality}</div>
                        <div style={{ fontSize: '0.75rem', color: '#888' }}>{loc.location_type} • {loc.lat.toFixed(3)}, {loc.lng.toFixed(3)}</div>
                     </div>
                   ))}
                </div>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '25px', border: '1px solid #E4EBDD' }}>
                   <div style={{ textAlign: 'center' }}>
                     <div style={{ fontSize: '2rem', fontWeight: '1000' }}>{merchant.validation_count}</div>
                     <div style={{ fontSize: '0.8rem', fontWeight: '900', color: '#B2AC88' }}>Validaciones</div>
                   </div>
                </div>
             </div>
          </td>
        </tr>
      )}
    </>
  );
}

const THStyle = { padding: '1.2rem 1rem', fontSize: '0.75rem', fontWeight: '950', color: '#B2AC88', textTransform: 'uppercase' as const };
const BadgeStyle = { padding: '4px 10px', background: '#F0F4ED', borderRadius: '10px', fontSize: '0.7rem', fontWeight: '850', color: '#5F7D4A' };
