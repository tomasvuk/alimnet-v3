'use client';

import React from 'react';
import { Search, ArrowUpRight, Store, MapPin, Layout, Globe, Monitor, Laptop, Smartphone } from 'lucide-react';

interface MetricItem {
  label: string;
  visitors: number;
  views?: number;
  icon?: React.ReactNode;
  flag?: string;
}

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
  trafficByCountry?: { country: string, visitors: number, views: number }[];
  trafficByProvince?: { province: string, visitors: number, views: number }[];
  trafficByDevice?: { device: string, visitors: number, views: number }[];
  trafficByBrowser?: { browser: string, visitors: number, views: number }[];
  trafficByOS?: { os: string, visitors: number, views: number }[];
  timeseriesData?: { label: string, value: number }[];
  sessionStats?: { avgDuration: number, bounceRate: number, conversionRate: number };
  peakData?: { peakDay: string, peakHour: string };
  analyticsError?: string | null;
}

const getFlagEmoji = (countryName: string) => {
  const map: Record<string, string> = {
    'Argentina': '🇦🇷',
    'Sweden': '🇸🇪',
    'United States': '🇺🇸',
    'United States of America': '🇺🇸',
    'Germany': '🇩🇪',
    'Spain': '🇪🇸',
    'Australia': '🇦🇺',
    'Chile': '🇨🇱',
    'China': '🇨🇳',
    'People\'s Republic of China': '🇨🇳',
    'Cambodia': '🇰🇭',
    'Netherlands': '🇳🇱',
    'Tunisia': '🇹🇳',
    'Uruguay': '🇺🇾',
    'Brazil': '🇧🇷',
    'Mexico': '🇲🇽',
    'Italy': '🇮🇹',
    'France': '🇫🇷',
    'AR': '🇦🇷',
    'US': '🇺🇸',
    'SE': '🇸🇪',
    'DE': '🇩🇪',
    'ES': '🇪🇸',
    'AU': '🇦🇺',
    'CL': '🇨🇱',
    'CN': '🇨🇳',
    'KH': '🇰🇭',
    'NL': '🇳🇱',
    'TN': '🇹🇳',
    'UY': '🇺🇾',
    'BR': '🇧🇷',
    'MX': '🇲🇽',
    'IT': '🇮🇹',
    'FR': '🇫🇷'
  };
  return map[countryName] || map[countryName.toUpperCase()] || '🌐';
};

const AlimnetMetricTable = ({ title, items, visitorsLabel = 'VISITORS', viewsLabel = 'PAGE VIEWS', limit = 15 }: { title: string, items: MetricItem[], visitorsLabel?: string, viewsLabel?: string, limit?: number }) => {
  const maxVisitors = Math.max(...items.map(i => i.visitors), 1);
  const displayItems = items.slice(0, limit);

  return (
    <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #E4EBDD', overflow: 'hidden', color: '#2D3A20', marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
      <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1.5px solid #F0F4ED', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8F9F5' }}>
        <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 1000, color: '#2D3A20' }}>{title}</h4>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.65rem', fontWeight: 900, color: '#B2AC88', letterSpacing: '0.05em' }}>
          <span>{visitorsLabel}</span>
          {items[0]?.views !== undefined && <span>{viewsLabel}</span>}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {displayItems.length === 0 ? (
          <div style={{ padding: '2.5rem', textAlign: 'center', color: '#B2AC88', fontSize: '0.85rem', fontWeight: 700 }}>Sin datos en este periodo</div>
        ) : displayItems.map((item, idx) => {
          const percentage = (item.visitors / maxVisitors) * 100;
          return (
            <div key={idx} style={{ position: 'relative', padding: '0.9rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: idx < displayItems.length - 1 ? '1px solid #F0F4ED' : 'none' }}>
              {/* Alimnet Background Bar (Subtle Beige/Green) */}
              <div style={{ position: 'absolute', left: 0, top: '4px', bottom: '4px', width: `${percentage}%`, background: '#F0F4ED', borderRadius: '0 8px 8px 0', zIndex: 0, opacity: 0.7 }} />
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', zIndex: 1 }}>
                {item.flag && <span style={{ fontSize: '1.2rem' }}>{item.flag}</span>}
                {item.icon && <span style={{ color: '#5F7D4A' }}>{item.icon}</span>}
                <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#2D3A20' }}>{item.label}</span>
              </div>
              
              <div style={{ display: 'flex', gap: '1.5rem', zIndex: 1 }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', width: '70px', justifyContent: 'flex-end' }}>
                   <span style={{ fontSize: '0.7rem', color: '#B2AC88', fontWeight: 800 }}>{Math.round((item.visitors / displayItems.reduce((acc, curr) => acc + curr.visitors, 0)) * 100)}%</span>
                   <span style={{ fontSize: '0.9rem', fontWeight: 1000, color: '#5F7D4A' }}>{item.visitors}</span>
                </div>
                {item.views !== undefined && (
                   <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2D3A20', width: '70px', textAlign: 'right' }}>{item.views}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function IntelligenceTab({ 
  stats, 
  topSearches, 
  analyticsTimeRange, 
  setAnalyticsTimeRange,
  topCities,
  topCitiesReal,
  topPages,
  topReferrers,
  trafficByCountry,
  trafficByDevice,
  trafficByBrowser,
  trafficByOS,
  analyticsError
}: IntelligenceTabProps) {
  
  const countryItems: MetricItem[] = (trafficByCountry || []).map(c => ({
    label: c.country,
    visitors: c.visitors,
    views: c.views,
    flag: getFlagEmoji(c.country)
  }));

  const osItems: MetricItem[] = (trafficByOS || []).map(o => ({
    label: o.os,
    visitors: o.visitors,
    views: o.views
  }));

  const browserItems: MetricItem[] = (trafficByBrowser || []).map(b => ({
    label: b.browser,
    visitors: b.visitors,
    views: b.views
  }));

  const deviceItems: MetricItem[] = (trafficByDevice || []).map(d => ({
    label: d.device,
    visitors: d.visitors,
    icon: d.device === 'Mobile' ? <Smartphone size={16} /> : <Monitor size={16} />
  }));

  const pageItems: MetricItem[] = (topPages || []).map(p => ({
    label: p.path,
    visitors: p.count // Mapping count (views) to the first metric column
  }));

  const referrerItems: MetricItem[] = (topReferrers || []).map(r => ({
    label: r.referrer,
    visitors: r.count,
    icon: r.referrer.includes('google') ? <Globe size={16} /> : <ArrowUpRight size={16} />
  }));

  return (
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      
      {analyticsError && (
        <div style={{ background: '#FEE2E2', border: '1px solid #FECACA', padding: '1.2rem 2rem', borderRadius: '24px', color: '#991B1B', fontWeight: 1000, fontSize: '0.9rem', textAlign: 'center' }}>
          ⚠️ ALERTA DE DATOS: {analyticsError}
        </div>
      )}

      {/* Header Selector */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F0F4ED', padding: '1.2rem 2rem', borderRadius: '24px', border: '1px solid #E4EBDD' }}>
        <div>
          <h3 style={{ margin: 0, fontWeight: 1000, color: '#2D3A20', fontSize: '1.4rem' }}>Análisis Estratégico de Red</h3>
          <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#5F7D4A', fontWeight: 800 }}>Métricas avanzadas de tracción y comportamiento</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', background: 'white', padding: '6px', borderRadius: '15px', border: '1px solid #E4EBDD' }}>
          {[
            { id: 'day', label: 'Hoy' },
            { id: 'week', label: '7 Días' },
            { id: 'month', label: 'Mes' },
            { id: 'year', label: 'Año' }
          ].map(range => (
            <button 
              key={range.id}
              onClick={() => setAnalyticsTimeRange(range.id)}
              style={{ 
                padding: '10px 18px', 
                borderRadius: '12px', 
                border: 'none',
                background: analyticsTimeRange === range.id ? '#5F7D4A' : 'transparent',
                color: analyticsTimeRange === range.id ? 'white' : '#5F7D4A',
                fontSize: '0.85rem',
                fontWeight: 1000,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '2.5rem' }}>
        
        {/* Row 1 */}
        <AlimnetMetricTable title="Tráfico por Países" items={countryItems} limit={20} />
        <AlimnetMetricTable title="Sistemas Operativos" items={osItems} limit={10} />

        {/* Row 2 */}
        <AlimnetMetricTable title="Navegadores" items={browserItems} limit={15} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
           <AlimnetMetricTable title="Dispositivos" items={deviceItems} visitorsLabel="VISITORS" />
           <AlimnetMetricTable title="Fuentes de Tráfico (Referidos)" items={referrerItems} visitorsLabel="VISITORS" limit={15} />
        </div>

        {/* Row 3 */}
        <AlimnetMetricTable title="Contenido más visto (Páginas)" items={pageItems} visitorsLabel="PAGE VIEWS" limit={20} />
        <div style={{ background: 'white', borderRadius: '32px', border: '1px solid #E4EBDD', padding: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
           <h4 style={{ margin: '0 0 2rem', fontSize: '1.2rem', fontWeight: 1000, color: '#2D3A20', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Search size={20} color="#5F7D4A" /> Búsquedas populares
           </h4>
           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {topSearches.slice(0, 20).map(([q, count]) => (
                <div key={q} style={{ background: '#F8F9F5', padding: '10px 18px', borderRadius: '16px', border: '1.5px solid #F0F4ED', fontSize: '0.9rem', color: '#2D3A20', display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ fontWeight: 900, textTransform: 'capitalize' }}>{q}</span>
                  <span style={{ color: '#5F7D4A', fontWeight: 1000, background: '#E4EBDD', padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem' }}>{count}</span>
                </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
}
