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
  rawEvents?: any[];
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
    'France': '🇫🇷',
    'AR': '🇦🇷',
    'ARGENTINA': '🇦🇷',
    'US': '🇺🇸',
    'UNITED STATES': '🇺🇸',
    'SE': '🇸🇪',
    'SWEDEN': '🇸🇪',
    'DE': '🇩🇪',
    'GERMANY': '🇩🇪',
    'ES': '🇪🇸',
    'SPAIN': '🇪🇸',
    'AU': '🇦🇺',
    'AUSTRALIA': '🇦🇺',
    'CL': '🇨🇱',
    'CHILE': '🇨🇱',
    'CN': '🇨🇳',
    'CHINA': '🇨🇳',
    'KH': '🇰🇭',
    'CAMBODIA': '🇰🇭',
    'NL': '🇳🇱',
    'NETHERLANDS': '🇳🇱',
    'TN': '🇹🇳',
    'TUNISIA': '🇹🇳',
    'UY': '🇺🇾',
    'URUGUAY': '🇺🇾',
    'BR': '🇧🇷',
    'BRAZIL': '🇧🇷',
    'MX': '🇲🇽',
    'MEXICO': '🇲🇽',
    'IT': '🇮🇹',
    'ITALY': '🇮🇹',
    'FR': '🇫🇷'
  };
  const key = countryName.toUpperCase();
  return map[key] || '🌐';
};

const AlimnetMetricTable = ({ title, items, visitorsLabel = 'VISITORS', viewsLabel = 'PAGE VIEWS', limit = 15, onRowClick }: { title: string, items: MetricItem[], visitorsLabel?: string, viewsLabel?: string, limit?: number, onRowClick?: (label: string) => void }) => {
  const maxVisitors = Math.max(...items.map(i => i.visitors), 1);
  const displayItems = items.slice(0, limit);

  return (
    <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E4EBDD', overflow: 'hidden', color: '#2D3A20', marginBottom: '1rem', boxShadow: '0 2px 10px rgba(0,0,0,0.01)' }}>
      <div style={{ padding: '0.8rem 1.2rem', borderBottom: '1px solid #F0F4ED', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8F9F5' }}>
        <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 1000, color: '#2D3A20' }}>{title}</h4>
        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.6rem', fontWeight: 900, color: '#B2AC88', letterSpacing: '0.05em' }}>
          <span>{visitorsLabel}</span>
          {items[0]?.views !== undefined && <span>{viewsLabel}</span>}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {displayItems.length === 0 ? (
          <div style={{ padding: '1.5rem', textAlign: 'center', color: '#B2AC88', fontSize: '0.8rem', fontWeight: 700 }}>Sin datos</div>
        ) : displayItems.map((item, idx) => {
          const percentage = (item.visitors / maxVisitors) * 100;
          return (
            <div 
              key={idx} 
              onClick={() => onRowClick?.(item.label)}
              style={{ 
                position: 'relative', 
                padding: '0.5rem 1.2rem', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                borderBottom: idx < displayItems.length - 1 ? '1px solid #F0F4ED' : 'none',
                cursor: onRowClick ? 'pointer' : 'default',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => onRowClick && (e.currentTarget.style.background = '#F8F9F5')}
              onMouseLeave={(e) => onRowClick && (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{ position: 'absolute', left: 0, top: '2px', bottom: '2px', width: `${percentage}%`, background: '#F0F4ED', borderRadius: '0 4px 4px 0', zIndex: 0, opacity: 0.7 }} />
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', zIndex: 1, flex: 1, minWidth: 0 }}>
                {item.flag && <span style={{ fontSize: '1rem' }}>{item.flag}</span>}
                {item.icon && <span style={{ color: '#5F7D4A', flexShrink: 0 }}>{item.icon}</span>}
                <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#2D3A20', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
              </div>
              
              <div style={{ display: 'flex', gap: '0.8rem', zIndex: 1, flexShrink: 0, paddingLeft: '1rem' }}>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center', width: '50px', justifyContent: 'flex-end' }}>
                   <span style={{ fontSize: '0.6rem', color: '#B2AC88', fontWeight: 800 }}>{Math.round((item.visitors / (displayItems.reduce((acc, curr) => acc + curr.visitors, 0) || 1)) * 100)}%</span>
                   <span style={{ fontSize: '0.8rem', fontWeight: 1000, color: '#5F7D4A' }}>{item.visitors}</span>
                </div>
                {item.views !== undefined && (
                   <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2D3A20', width: '45px', textAlign: 'right' }}>{item.views}</span>
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
  analyticsError,
  rawEvents
}: IntelligenceTabProps) {
  const [selectedCountry, setSelectedCountry] = React.useState<string | null>(null);

  // Grouping rawEvents by sessionId for the drill-down
  const countrySessions = React.useMemo(() => {
    if (!selectedCountry || !rawEvents) return [];
    
    const sessionsMap: Record<string, any> = {};
    rawEvents.forEach(e => {
      let p = e.payload || {};
      if (typeof p === 'string') try { p = JSON.parse(p); } catch(err) {}
      
      let c = (p.country || 'Unknown').toUpperCase();
      if (c === 'AR') c = 'ARGENTINA';
      if (c === 'US') c = 'UNITED STATES';
      if (c === 'SE') c = 'SWEDEN';
      if (c === 'ES') c = 'SPAIN';
      if (c === 'CL') c = 'CHILE';

      if (c === selectedCountry) {
        const sid = p.sessionId || 'anon';
        if (!sessionsMap[sid]) {
          sessionsMap[sid] = {
            id: sid,
            city: p.city || 'Desconocido',
            os: 'Detectando...',
            browser: 'Detectando...',
            events: [],
            startTime: new Date(e.created_at).getTime(),
            endTime: new Date(e.created_at).getTime(),
          };
        }
        
        const time = new Date(e.created_at).getTime();
        sessionsMap[sid].events.push({
          type: e.event_type,
          path: p.path || '/',
          time: time
        });
        
        if (time < sessionsMap[sid].startTime) sessionsMap[sid].startTime = time;
        if (time > sessionsMap[sid].endTime) sessionsMap[sid].endTime = time;
        
        // Try to get OS/Browser from first event that has userAgent
        if (p.userAgent && sessionsMap[sid].os === 'Detectando...') {
           const ua = p.userAgent;
           if (ua.includes('Android')) sessionsMap[sid].os = 'Android';
           else if (ua.includes('iPhone')) sessionsMap[sid].os = 'iOS';
           else if (ua.includes('Mac')) sessionsMap[sid].os = 'Mac';
           else if (ua.includes('Windows')) sessionsMap[sid].os = 'Windows';
           
           if (ua.includes('Chrome')) sessionsMap[sid].browser = 'Chrome';
           else if (ua.includes('Safari')) sessionsMap[sid].browser = 'Safari';
           else if (ua.includes('Firefox')) sessionsMap[sid].browser = 'Firefox';
        }
      }
    });

    return Object.values(sessionsMap).sort((a,b) => b.startTime - a.startTime);
  }, [selectedCountry, rawEvents]);

  const countryMapNormalized: Record<string, { visitors: number, views: number }> = {};
  (trafficByCountry || []).forEach(c => {
    let name = c.country.toUpperCase();
    if (name === 'AR') name = 'ARGENTINA';
    if (name === 'US') name = 'UNITED STATES';
    if (name === 'SE') name = 'SWEDEN';
    if (name === 'DE') name = 'GERMANY';
    if (name === 'ES') name = 'SPAIN';
    if (name === 'CL') name = 'CHILE';
    if (name === 'UY') name = 'URUGUAY';
    if (name === 'BR') name = 'BRAZIL';
    if (name === 'MX') name = 'MEXICO';
    
    if (!countryMapNormalized[name]) countryMapNormalized[name] = { visitors: 0, views: 0 };
    countryMapNormalized[name].visitors += c.visitors;
    countryMapNormalized[name].views += c.views;
  });

  const countryItems: MetricItem[] = Object.entries(countryMapNormalized).map(([name, data]) => ({
    label: name,
    visitors: data.visitors,
    views: data.views,
    flag: getFlagEmoji(name)
  })).sort((a,b) => b.visitors - a.visitors);

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
    <div style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {analyticsError && (
        <div style={{ background: '#FEE2E2', border: '1px solid #FECACA', padding: '0.8rem 1.5rem', borderRadius: '16px', color: '#991B1B', fontWeight: 1000, fontSize: '0.8rem', textAlign: 'center' }}>
          ⚠️ ALERTA DE DATOS: {analyticsError}
        </div>
      )}

      {/* Header Selector Compact */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F0F4ED', padding: '0.8rem 1.5rem', borderRadius: '16px', border: '1px solid #E4EBDD' }}>
        <div>
          <h3 style={{ margin: 0, fontWeight: 1000, color: '#2D3A20', fontSize: '1.1rem' }}>Análisis Estratégico</h3>
          <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#5F7D4A', fontWeight: 800 }}>Métricas en tiempo real</p>
        </div>
        <div style={{ display: 'flex', gap: '4px', background: 'white', padding: '4px', borderRadius: '12px', border: '1px solid #E4EBDD' }}>
          {[
            { id: 'day', label: 'Hoy' },
            { id: 'week', label: '7D' },
            { id: 'month', label: 'Mes' },
            { id: 'year', label: 'Año' }
          ].map(range => (
            <button 
              key={range.id}
              onClick={() => setAnalyticsTimeRange(range.id)}
              style={{ 
                padding: '6px 12px', 
                borderRadius: '8px', 
                border: 'none',
                background: analyticsTimeRange === range.id ? '#5F7D4A' : 'transparent',
                color: analyticsTimeRange === range.id ? 'white' : '#5F7D4A',
                fontSize: '0.75rem',
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        
        {/* Row 1 */}
        <AlimnetMetricTable title="Países" items={countryItems} limit={20} onRowClick={(label) => setSelectedCountry(label)} />
        <AlimnetMetricTable title="Sistemas Operativos" items={osItems} limit={10} />

        {/* Row 2 */}
        <AlimnetMetricTable title="Navegadores" items={browserItems} limit={15} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
           <AlimnetMetricTable title="Dispositivos" items={deviceItems} visitorsLabel="VISITORS" />
           <AlimnetMetricTable title="Fuentes (Referidos)" items={referrerItems} visitorsLabel="VISITORS" limit={15} />
        </div>

        {/* Row 3 */}
        <AlimnetMetricTable title="Páginas Populares" items={pageItems} visitorsLabel="PAGE VIEWS" limit={20} />
        <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #E4EBDD', padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.01)' }}>
           <h4 style={{ margin: '0 0 1rem', fontSize: '0.9rem', fontWeight: 1000, color: '#2D3A20', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Search size={16} color="#5F7D4A" /> Búsquedas
           </h4>
           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {topSearches.slice(0, 15).map(([q, count]) => (
                <div key={q} style={{ background: '#F8F9F5', padding: '6px 12px', borderRadius: '12px', border: '1px solid #F0F4ED', fontSize: '0.75rem', color: '#2D3A20', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontWeight: 900, textTransform: 'capitalize' }}>{q}</span>
                  <span style={{ color: '#5F7D4A', fontWeight: 1000, background: '#E4EBDD', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem' }}>{count}</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Drill-down Modal */}
      {selectedCountry && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: 'white', width: '90%', maxWidth: '800px', maxHeight: '90vh', borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1.5rem 2rem', background: '#F0F4ED', borderBottom: '1px solid #E4EBDD', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div>
                 <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 1000, color: '#2D3A20' }}>{getFlagEmoji(selectedCountry)} Detalle: {selectedCountry}</h2>
                 <p style={{ margin: 0, fontSize: '0.85rem', color: '#5F7D4A' }}>Sesiones y comportamiento reciente</p>
               </div>
               <button onClick={() => setSelectedCountry(null)} style={{ background: 'white', border: '1px solid #E4EBDD', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', fontWeight: 900 }}>✕</button>
            </div>
            
            <div style={{ padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {countrySessions.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#B2AC88', fontWeight: 800 }}>
                  <p>No se encontraron sesiones recientes para este país en el periodo seleccionado.</p>
                </div>
              ) : countrySessions.map((session, idx) => (
                <div key={idx} style={{ background: '#F8F9F5', borderRadius: '16px', border: '1px solid #E4EBDD', padding: '1.2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ background: '#5F7D4A', color: 'white', padding: '8px', borderRadius: '10px' }}>
                         <Monitor size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 1000, color: '#2D3A20' }}>
                          Sesión {session.id.slice(0, 8)}...
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#5F7D4A', fontWeight: 700 }}>
                          {session.city} • {session.os} • {session.browser}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#2D3A20' }}>
                        {new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div style={{ fontSize: '0.65rem', color: '#B2AC88', fontWeight: 700 }}>
                        {Math.round((session.endTime - session.startTime) / 1000 / 60)} min duración
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderLeft: '2px solid #E4EBDD', marginLeft: '12px', paddingLeft: '18px' }}>
                    {session.events.map((ev: any, evIdx: number) => (
                      <div key={evIdx} style={{ fontSize: '0.75rem', color: '#5F7D4A', display: 'flex', justifyContent: 'space-between' }}>
                        <span>
                          <strong style={{ color: '#2D3A20' }}>{ev.type === 'PAGE_VIEW' ? 'Visto:' : 'Click:'}</strong> {ev.path}
                        </span>
                        <span style={{ fontSize: '0.65rem', color: '#B2AC88' }}>
                          {new Date(ev.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
