'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  MapPin, 
  Instagram, 
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

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
  validation_count: number;
  created_at: string;
  locations?: Location[];
}

export default function AdminDashboard() {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // KPIs Simulados para la Fase 2 (Pronto conectaremos con analytics real)
  const kpis = [
    { label: 'Intención Real', value: '42%', trend: '+5%', color: 'var(--primary)' },
    { label: 'Zonas más buscadas', value: 'Zona Norte', trend: 'Hurlingham ↑', color: 'var(--pending)' },
    { label: 'Validación Red', value: '18%', trend: '-2%', color: 'var(--primary-dark)' },
    { label: 'Perfiles Reclamados', value: '12/91', trend: '+3 este mes', color: 'var(--text-primary)' },
    { label: 'Usuarios Activos', value: '156', trend: '+12 hoy', color: 'var(--secondary)' },
  ];

  useEffect(() => {
    fetchMerchants();
  }, []);

  const fetchMerchants = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('merchants')
      .select('*, locations(*)');
    
    if (error) {
      console.error('Error fetching merchants:', error);
    } else {
      setMerchants(data || []);
    }
    setLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle size={16} color="var(--primary)" />;
      case 'pending': return <Clock size={16} color="var(--pending)" />;
      case 'error': return <AlertCircle size={16} color="var(--error)" />;
      default: return null;
    }
  };

  const filteredMerchants = merchants.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem', background: 'var(--background)', minHeight: '100vh' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: 'var(--primary-dark)' }}>Gestión de Comerciantes</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Fase 2: Administración y Limpieza de Datos</p>
        </div>
        <button className="button button-primary" style={{ display: 'flex', gap: '8px', padding: '0.8rem 1.5rem' }}>
          <Plus size={20} /> Nuevo Proyecto
        </button>
      </header>

      {/* Toolbar */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '1.5rem', 
        background: 'white', 
        padding: '1rem', 
        borderRadius: '16px',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--border)'
      }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nombre o tipo..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.8rem 1rem 0.8rem 2.5rem', 
              borderRadius: '12px', 
              border: '1px solid var(--border)',
              outline: 'none',
              fontSize: '0.9rem'
            }} 
          />
        </div>
        <button className="button-secondary" style={{ display: 'flex', gap: '8px', padding: '0 1.2rem', borderRadius: '12px' }}>
          <Filter size={18} /> Filtros
        </button>
      </div>

      {/* Master KPIs Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.2rem', marginBottom: '2.5rem' }}>
        {kpis.map((kpi, idx) => (
          <div key={idx} className="glass-card" style={{ padding: '1.5rem', borderLeft: `4px solid ${kpi.color}` }}>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: '800' }}>{kpi.label}</div>
            <div style={{ fontSize: '1.6rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '0.2rem' }}>{kpi.value}</div>
            <div style={{ fontSize: '0.7rem', color: kpi.trend.includes('+') ? 'var(--primary)' : 'var(--error)', fontWeight: '700' }}>{kpi.trend}</div>
          </div>
        ))}
      </div>

      {/* Grid / Table */}
      <div style={{ 
        background: 'white', 
        borderRadius: '24px', 
        overflow: 'hidden', 
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--border)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'var(--card-bg)', borderBottom: '1px solid var(--border)' }}>
            <tr>
              <th style={{ padding: '1.2rem', fontSize: '0.85rem', color: 'var(--primary-dark)' }}>PROYECTO</th>
              <th style={{ padding: '1.2rem', fontSize: '0.85rem', color: 'var(--primary-dark)' }}>TIPO</th>
              <th style={{ padding: '1.2rem', fontSize: '0.85rem', color: 'var(--primary-dark)' }}>UBICACIONES</th>
              <th style={{ padding: '1.2rem', fontSize: '0.85rem', color: 'var(--primary-dark)' }}>ESTADO</th>
              <th style={{ padding: '1.2rem', fontSize: '0.85rem', color: 'var(--primary-dark)' }}>REDES</th>
              <th style={{ padding: '1.2rem', width: '50px' }}></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Cargando red de comerciantes...</td></tr>
            ) : filteredMerchants.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No se encontraron comerciantes.</td></tr>
            ) : (
              filteredMerchants.map(merchant => (
                <React.Fragment key={merchant.id}>
                  <tr 
                    onClick={() => setExpandedId(expandedId === merchant.id ? null : merchant.id)}
                    style={{ 
                      borderBottom: '1px solid var(--border)', 
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#F9F8F3'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                  >
                    <td style={{ padding: '1.2rem' }}>
                      <div style={{ fontWeight: '800', color: 'var(--primary-dark)' }}>{merchant.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Creado el {new Date(merchant.created_at).toLocaleDateString()}</div>
                    </td>
                    <td style={{ padding: '1.2rem' }}>
                      <span style={{ 
                        padding: '0.3rem 0.8rem', 
                        background: 'var(--background)', 
                        borderRadius: '20px', 
                        fontSize: '0.75rem', 
                        fontWeight: '700',
                        color: 'var(--primary-dark)'
                      }}>
                        {merchant.type}
                      </span>
                    </td>
                    <td style={{ padding: '1.2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '550' }}>
                        <MapPin size={14} /> {merchant.locations?.length || 0} zonas
                      </div>
                    </td>
                    <td style={{ padding: '1.2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', textTransform: 'capitalize', fontWeight: '600' }}>
                        {getStatusIcon(merchant.status)} {merchant.status === 'active' ? 'Aprobado' : merchant.status}
                      </div>
                    </td>
                    <td style={{ padding: '1.2rem' }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        {merchant.instagram_url && (
                          <a href={merchant.instagram_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>
                            <Instagram size={18} />
                          </a>
                        )}
                        <ExternalLink size={18} color="var(--border)" />
                      </div>
                    </td>
                    <td style={{ padding: '1.2rem' }}>
                      {expandedId === merchant.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </td>
                  </tr>
                  
                  {/* Expanded Details Section */}
                  {expandedId === merchant.id && (
                    <tr style={{ background: '#F9F8F3', borderBottom: '1px solid var(--border)' }}>
                      <td colSpan={6} style={{ padding: '1.5rem 2.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                          <div>
                            <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Puntos y Zonas</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                              {merchant.locations?.map((loc, idx) => (
                                <div key={loc.id} style={{ 
                                  background: 'white', 
                                  padding: '1rem', 
                                  borderRadius: '12px', 
                                  border: '1px solid var(--border)',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center'
                                }}>
                                  <div>
                                    <div style={{ fontWeight: '750', fontSize: '0.9rem' }}>{loc.locality}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                      {loc.location_type === 'fixed' ? 'Local Fijo' : 'Zona de Distribución'} 
                                      {loc.is_primary && ' • Principal'}
                                    </div>
                                  </div>
                                  <div style={{ fontSize: '0.75rem', background: 'var(--background)', padding: '4px 8px', borderRadius: '6px' }}>
                                    {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Métricas y validaciones</h4>
                            <div style={{ 
                              background: 'var(--primary-dark)', 
                              color: 'white', 
                              padding: '1.5rem', 
                              borderRadius: '16px',
                              textAlign: 'center'
                            }}>
                              <div style={{ fontSize: '2.5rem', fontWeight: '900' }}>{merchant.validation_count}</div>
                              <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Validaciones de la comunidad</div>
                            </div>
                            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '10px' }}>
                              <button className="button button-primary" style={{ flex: 1, padding: '0.6rem' }}>Editar</button>
                              <button className="button button-secondary" style={{ flex: 1, padding: '0.6rem', border: '1px solid var(--error)', color: 'var(--error)' }}>Ocultar</button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .button {
          transition: all 0.2s;
        }
        .button:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
      `}</style>
    </div>
  );
}
