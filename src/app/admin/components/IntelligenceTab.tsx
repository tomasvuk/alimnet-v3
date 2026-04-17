'use client';

import React from 'react';
import { Search, ArrowUpRight, Store, UtensilsCrossed, ChefHat } from 'lucide-react';

interface IntelligenceTabProps {
  stats: any;
  topSearches: [string, number][];
  topMerchants: { id: string, name: string, clicks: number }[];
  analyticsTimeRange: string;
  setAnalyticsTimeRange: (range: any) => void;
  topCities: { locality: string, count: number }[];
}

const ProductorIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM15.89 8.11C15.5 7.72 14.83 7 13.53 7h-3.06c-1.3 0-1.97.72-2.36 1.11L4 12.25V15h2v-2h1v9h2v-5h2v5h2v-9h1v2h2v-2.75l-4.11-4.14z" fill="currentColor" />
  </svg>
);

function CategoryStat({ label, value, icon, color = '#2D3A20' }: any) {
  return (
    <div style={{ textAlign: 'center', flex: 1, padding: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#B2AC88', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px' }}>
        {icon} {label}
      </div>
      <div style={{ fontSize: '1.5rem', fontWeight: 1000, color: color }}>{value}</div>
    </div>
  );
}

export default function IntelligenceTab({ 
  stats, 
  topSearches, 
  topMerchants, 
  analyticsTimeRange, 
  setAnalyticsTimeRange,
  topCities
}: IntelligenceTabProps) {
  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', background: '#F0F4ED', padding: '1.2rem 2rem', borderRadius: '24px', border: '1px solid #E4EBDD' }}>
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

      {/* Grid de Distribución de Rubros */}
      <div style={{ background: 'white', padding: '1rem', borderRadius: '32px', border: '1px solid #E4EBDD', display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
        <CategoryStat label="Productores" value={stats.merchantsProducers || 0} icon={<ProductorIcon size={14}/>} />
        <CategoryStat label="Abastecedores" value={stats.merchantsAbastecedores || 0} icon={<Store size={14}/>} />
        <CategoryStat label="Restaurantes" value={stats.merchantsRestaurantes || 0} icon={<UtensilsCrossed size={14}/>} />
        <CategoryStat label="Chefs" value={stats.merchantsChefs || 0} icon={<ChefHat size={14}/>} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
        {/* Top Ciudades */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '32px', border: '1px solid #E4EBDD' }}>
           <h3 style={{ fontSize: '1.2rem', fontWeight: 1000, color: '#2D3A20', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Store size={20} color="#5F7D4A" /> Top Localidades (Usuarios)
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

        {/* Demandas Populares */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '32px', border: '1px solid #E4EBDD' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 1000, color: '#2D3A20', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Search size={20} color="#5F7D4A" /> Demandas Populares
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {topSearches.slice(0, 5).map(([query, count], index) => (
                <div key={query} style={{ display: 'flex', alignItems: 'center', gap: '15px', background: '#F8F9F5', padding: '12px 20px', borderRadius: '16px', border: '1px solid #F0F4ED' }}>
                    <span style={{ fontWeight: 1000, color: '#B2AC88', fontSize: '0.8rem', width: '20px' }}>{index + 1}</span>
                    <span style={{ fontWeight: 900, color: '#2D3A20', flex: 1, textTransform: 'capitalize' }}>{query}</span>
                    <span style={{ fontWeight: 1000, color: '#5F7D4A', background: '#E4EBDD', padding: '4px 10px', borderRadius: '8px', fontSize: '0.8rem' }}>{count}</span>
                </div>
              ))}
              {topSearches.length === 0 && <div style={{ color: '#B2AC88', fontStyle: 'italic' }}>No hay datos suficientes aún.</div>}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2.5rem', background: 'white', padding: '2rem', borderRadius: '32px', border: '1px solid #E4EBDD' }}>
         <h3 style={{ fontSize: '1.2rem', fontWeight: 1000, color: '#2D3A20', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
            <ArrowUpRight size={20} color="#A67C00" /> Comercios con más Tracción
         </h3>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {topMerchants.map((m, index) => (
               <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', background: '#F8F9F5', padding: '12px 20px', borderRadius: '16px', border: '1px solid #F0F4ED' }}>
                  <span style={{ fontWeight: 1000, color: '#B2AC88', fontSize: '0.8rem', width: '20px' }}>{index + 1}</span>
                  <span style={{ fontWeight: 1000, color: '#2D3A20', flex: 1 }}>{m.name}</span>
                  <span style={{ fontWeight: 1000, color: '#A67C00', fontSize: '0.85rem' }}>{m.clicks} clicks</span>
               </div>
            ))}
            {topMerchants.length === 0 && <div style={{ color: '#B2AC88', fontStyle: 'italic', gridColumn: '1/-1', textAlign: 'center', padding: '2rem' }}>Aún no se registran interacciones en este periodo.</div>}
         </div>
      </div>
    </div>
  );
}
