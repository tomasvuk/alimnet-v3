'use client';

import React from 'react';
import { Search, ArrowUpRight, Store, UtensilsCrossed, ChefHat, MapPin, Clock, Users, Layout } from 'lucide-react';

interface IntelligenceTabProps {
  stats: any;
  topSearches: [string, number][];
  topMerchants: { id: string, name: string, clicks: number }[];
  analyticsTimeRange: string;
  setAnalyticsTimeRange: (range: any) => void;
  topCities: { locality: string, count: number }[];
  topCitiesReal?: { city: string, count: number }[];
  topPages?: { path: string, count: number }[];
  topReferrers?: { referrer: string, count: number }[];
  trafficByCountry?: { country: string, count: number }[];
  trafficByProvince?: { province: string, count: number }[];
  sessionStats?: { avgDuration: number, bounceRate: number, conversionRate: number };
  peakData?: { peakDay: string, peakHour: string };
}

const ProductorIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM15.89 8.11C15.5 7.72 14.83 7 13.53 7h-3.06c-1.3 0-1.97.72-2.36 1.11L4 12.25V15h2v-2h1v9h2v-5h2v5h2v-9h1v2h2v-2.75l-4.11-4.14z" fill="currentColor" />
  </svg>
);

export default function IntelligenceTab({ 
  stats, 
  topSearches, 
  topMerchants, 
  analyticsTimeRange, 
  setAnalyticsTimeRange,
  topCities,
  topCitiesReal,
  topPages,
  topReferrers,
  trafficByCountry,
  trafficByProvince,
  sessionStats,
  peakData
}: IntelligenceTabProps) {
  return (
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Header Selector */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F0F4ED', padding: '1.2rem 2rem', borderRadius: '24px', border: '1px solid #E4EBDD' }}>
        <div>
          <h3 style={{ margin: 0, fontWeight: 1000, color: '#2D3A20', fontSize: '1.4rem' }}>Análisis de Demanda y Tracción</h3>
          <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#5F7D4A', fontWeight: 800 }}>Métricas estratégicas para el crecimiento de la red</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', background: 'white', padding: '6px', borderRadius: '15px', border: '1px solid #E4EBDD' }}>
          {[
            { id: 'day', label: 'Hoy' },
            { id: 'week', label: 'Semana' },
            { id: 'month', label: 'Mes' },
            { id: 'quarter', label: 'Trimestre' },
            { id: 'year', label: 'Año' }
          ].map(range => (
            <button 
              key={range.id}
              onClick={() => setAnalyticsTimeRange(range.id as any)}
              style={{
                padding: '8px 16px', borderRadius: '10px', border: 'none',
                background: analyticsTimeRange === range.id ? '#5F7D4A' : 'transparent',
                color: analyticsTimeRange === range.id ? 'white' : '#5F7D4A',
                fontWeight: '1000', fontSize: '0.75rem', cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              {range.label.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
        
        {/* Col 1: Geografía */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Top Ciudades Declaradas */}
          <div style={{ background: 'white', padding: '2rem', borderRadius: '32px', border: '1px solid #E4EBDD' }}>
             <h3 style={{ fontSize: '1.2rem', fontWeight: 1000, color: '#2D3A20', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
                <Store size={20} color="#5F7D4A" /> Ubicación Declarada (Perfil)
             </h3>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {topCities.slice(0, 5).map((city, index) => (
                  <div key={city.locality} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: index < 4 ? '1px solid #F0F4ED' : 'none' }}>
                    <span style={{ fontWeight: 1000, color: '#5F7D4A' }}>{index + 1}. {city.locality || 'Sin definir'}</span>
                    <span style={{ fontWeight: 1000 }}>{city.count}</span>
                  </div>
                ))}
             </div>
          </div>

          {/* Top Ciudades Detectadas (Real) */}
          <div style={{ background: 'white', padding: '2rem', borderRadius: '32px', border: '1px solid #E4EBDD' }}>
             <h3 style={{ fontSize: '1.2rem', fontWeight: 1000, color: '#2D3A20', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
                <MapPin size={20} color="#3B82F6" /> Ubicación Detectada (Ciudad Real)
             </h3>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {(topCitiesReal || []).slice(0, 5).map((ct, index) => (
                  <div key={ct.city} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: index < 4 ? '1px solid #F0F4ED' : 'none' }}>
                    <span style={{ fontWeight: 1000, color: '#3B82F6' }}>{index + 1}. {ct.city || 'Desconocida'}</span>
                    <span style={{ fontWeight: 1000 }}>{ct.count}</span>
                  </div>
                ))}
                {(topCitiesReal || []).length === 0 && <div style={{ color: '#B2AC88', fontStyle: 'italic' }}>Sin datos de conexión aún.</div>}
             </div>
          </div>
        </div>

        {/* Col 2: Contenido & Tráfico */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Top Páginas */}
          <div style={{ background: 'white', padding: '2rem', borderRadius: '32px', border: '1px solid #E4EBDD' }}>
             <h3 style={{ fontSize: '1.2rem', fontWeight: 1000, color: '#2D3A20', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
                <Layout size={20} color="#5F7D4A" /> Top Páginas (Contenido)
             </h3>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {(topPages || []).map((p, index) => (
                  <div key={p.path} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: index < (topPages || []).length - 1 ? '1px solid #F0F4ED' : 'none' }}>
                    <span style={{ fontWeight: 1000, color: '#5F7D4A', fontSize: '0.85rem', fontFamily: 'monospace' }}>{p.path}</span>
                    <span style={{ fontWeight: 1000, fontSize: '0.85rem' }}>{p.count} <span style={{ color: '#B2AC88', fontWeight: 700, fontSize: '0.7rem' }}>vistas</span></span>
                  </div>
                ))}
                {(topPages || []).length === 0 && <div style={{ color: '#B2AC88', fontStyle: 'italic' }}>No hay registros de páginas aún.</div>}
             </div>
          </div>

          {/* Top Referidos */}
          <div style={{ background: 'white', padding: '2rem', borderRadius: '32px', border: '1px solid #E4EBDD' }}>
             <h3 style={{ fontSize: '1.2rem', fontWeight: 1000, color: '#2D3A20', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
                <ArrowUpRight size={20} color="#3B82F6" /> Origen del Tráfico (Referidos)
             </h3>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {(topReferrers || []).map((ref, index) => (
                  <div key={ref.referrer} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: index < (topReferrers || []).length - 1 ? '1px solid #F0F4ED' : 'none' }}>
                    <span style={{ fontWeight: 1000, color: '#3B82F6', fontSize: '0.85rem' }}>{ref.referrer}</span>
                    <span style={{ fontWeight: 1000, fontSize: '0.85rem' }}>{ref.count}</span>
                  </div>
                ))}
                {(topReferrers || []).length === 0 && <div style={{ color: '#B2AC88', fontStyle: 'italic' }}>No hay referidos registrados.</div>}
             </div>
          </div>
        </div>

        {/* Col 3: Buscador */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '32px', border: '1px solid #E4EBDD' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 1000, color: '#2D3A20', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Search size={20} color="#5F7D4A" /> Palabras más buscadas
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {(topSearches || []).slice(0, 10).map(([query, count], index) => (
                <div key={query} style={{ display: 'flex', alignItems: 'center', gap: '15px', background: '#F8F9F5', padding: '10px 15px', borderRadius: '16px', border: '1px solid #F0F4ED' }}>
                    <span style={{ fontWeight: 1000, color: '#B2AC88', fontSize: '0.75rem', width: '15px' }}>{index + 1}</span>
                    <span style={{ fontWeight: 900, color: '#2D3A20', flex: 1, textTransform: 'capitalize', fontSize: '0.9rem' }}>{query}</span>
                    <span style={{ fontWeight: 1000, color: '#5F7D4A', background: '#E4EBDD', padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem' }}>{count}</span>
                </div>
              ))}
              {topSearches.length === 0 && <div style={{ color: '#B2AC88', fontStyle: 'italic' }}>No hay datos suficientes aún.</div>}
          </div>
        </div>
      </div>

      {/* Row Secundario: Retención y Tracción */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2.5rem' }}>
        {/* Retención y Sesiones */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '32px', border: '1px solid #E4EBDD' }}>
           <h3 style={{ fontSize: '1.2rem', fontWeight: 1000, color: '#2D3A20', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Clock size={20} color="#5F7D4A" /> Sesiones y Retención
           </h3>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                <div style={{ background: '#F8F9F5', padding: '15px', borderRadius: '20px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 900, color: '#B2AC88', textTransform: 'uppercase', marginBottom: '5px' }}>Duración</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 1000, color: '#5F7D4A' }}>{sessionStats?.avgDuration || '0'} <span style={{ fontSize: '0.7rem' }}>min</span></div>
                </div>
                <div style={{ background: '#F8F9F5', padding: '15px', borderRadius: '20px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 900, color: '#B2AC88', textTransform: 'uppercase', marginBottom: '5px' }}>Rebote</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 1000, color: '#A67C00' }}>{sessionStats?.bounceRate || '0'}%</div>
                </div>
                <div style={{ background: '#F8F9F5', padding: '15px', borderRadius: '20px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 900, color: '#B2AC88', textTransform: 'uppercase', marginBottom: '5px' }}>Conv.</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 1000, color: '#10B981' }}>{sessionStats?.conversionRate || '0'}%</div>
                </div>
              </div>
              <div style={{ background: '#F0F4ED', padding: '15px', borderRadius: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                   <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.65rem', color: '#5F7D4A', fontWeight: 800 }}>Mejor Día</div>
                      <div style={{ fontWeight: 1000, color: '#2D3A20' }}>{peakData?.peakDay || '-'}</div>
                   </div>
                   <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.65rem', color: '#5F7D4A', fontWeight: 800 }}>Hora Pico</div>
                      <div style={{ fontWeight: 1000, color: '#2D3A20' }}>{peakData?.peakHour || '-'}</div>
                   </div>
                </div>
              </div>
           </div>
        </div>

        {/* Comercios con más Tracción */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '32px', border: '1px solid #E4EBDD' }}>
           <h3 style={{ fontSize: '1.2rem', fontWeight: 1000, color: '#2D3A20', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
              <ArrowUpRight size={20} color="#A67C00" /> Comercios con más Tracción
           </h3>
           <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
              {(topMerchants || []).slice(0, 5).map((m, index) => (
                 <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', background: '#F8F9F5', padding: '10px 20px', borderRadius: '16px', border: '1px solid #F0F4ED' }}>
                    <span style={{ fontWeight: 1000, color: '#B2AC88', fontSize: '0.8rem', width: '20px' }}>{index + 1}</span>
                    <span style={{ fontWeight: 1000, color: '#2D3A20', flex: 1, fontSize: '0.9rem' }}>{m.name}</span>
                    <span style={{ fontWeight: 1000, color: '#A67C00', fontSize: '0.8rem' }}>{m.clicks} clicks</span>
                 </div>
              ))}
              {topMerchants.length === 0 && <div style={{ color: '#B2AC88', fontStyle: 'italic', textAlign: 'center', padding: '1rem' }}>Aún no hay interacciones.</div>}
           </div>
        </div>
      </div>
    </div>
  );
}
