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
    'France': '🇫🇷'
  };
  return map[countryName] || '🌐';
};

const VercelMetricTable = ({ title, items, visitorsLabel = 'VISITORS', viewsLabel = 'PAGE VIEWS', limit = 10 }: { title: string, items: MetricItem[], visitorsLabel?: string, viewsLabel?: string, limit?: number }) => {
  const maxVisitors = Math.max(...items.map(i => i.visitors), 1);
  const displayItems = items.slice(0, limit);

  return (
    <div style={{ background: '#0A0A0A', borderRadius: '12px', border: '1px solid #333', overflow: 'hidden', color: 'white', marginBottom: '2rem' }}>
      <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: '#EDEDED' }}>{title}</h4>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.65rem', fontWeight: 700, color: '#888', letterSpacing: '0.05em' }}>
          <span>{visitorsLabel}</span>
          {items[0]?.views !== undefined && <span>{viewsLabel}</span>}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {displayItems.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#666', fontSize: '0.8rem' }}>No data available</div>
        ) : displayItems.map((item, idx) => {
          const percentage = (item.visitors / maxVisitors) * 100;
          return (
            <div key={idx} style={{ position: 'relative', padding: '0.75rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: idx < displayItems.length - 1 ? '1px solid #1A1A1A' : 'none' }}>
              {/* Background Bar */}
              <div style={{ position: 'absolute', left: 0, top: '4px', bottom: '4px', width: `${percentage}%`, background: '#1A1A1A', borderRadius: '0 4px 4px 0', zIndex: 0 }} />
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', zIndex: 1 }}>
                {item.flag && <span style={{ fontSize: '1.1rem' }}>{item.flag}</span>}
                {item.icon && <span style={{ color: '#888' }}>{item.icon}</span>}
                <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#EDEDED' }}>{item.label}</span>
              </div>
              
              <div style={{ display: 'flex', gap: '1.5rem', zIndex: 1 }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', width: '60px', justifyContent: 'flex-end' }}>
                   <span style={{ fontSize: '0.7rem', color: '#888', fontWeight: 600 }}>{Math.round((item.visitors / displayItems.reduce((acc, curr) => acc + curr.visitors, 0)) * 100)}%</span>
                   <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{item.visitors}</span>
                </div>
                {item.views !== undefined && (
                   <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#EDEDED', width: '60px', textAlign: 'right' }}>{item.views}</span>
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
    icon: d.device === 'Mobile' ? <Smartphone size={14} /> : <Monitor size={14} />
  }));

  const pageItems: MetricItem[] = (topPages || []).map(p => ({
    label: p.path,
    visitors: p.count // Here visitors maps to views/count in the simple topPages state
  }));

  const referrerItems: MetricItem[] = (topReferrers || []).map(r => ({
    label: r.referrer,
    visitors: r.count,
    icon: r.referrer.includes('google') ? <Globe size={14} /> : <ArrowUpRight size={14} />
  }));

  return (
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: '#000', borderRadius: '32px' }}>
      
      {analyticsError && (
        <div style={{ background: '#331111', border: '1px solid #662222', padding: '1rem', borderRadius: '12px', color: '#FF5555', fontWeight: 600, fontSize: '0.85rem' }}>
          ⚠️ Sync Error: {analyticsError}
        </div>
      )}

      {/* Header Selector */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ margin: 0, fontWeight: 700, color: 'white', fontSize: '1.5rem' }}>Analytics</h3>
        </div>
        <div style={{ display: 'flex', gap: '8px', background: '#111', padding: '4px', borderRadius: '8px', border: '1px solid #333' }}>
          {[
            { id: 'day', label: 'Today' },
            { id: 'week', label: '7D' },
            { id: 'month', label: '30D' },
            { id: 'year', label: '12M' }
          ].map(range => (
            <button 
              key={range.id}
              onClick={() => setAnalyticsTimeRange(range.id)}
              style={{ 
                padding: '6px 12px', 
                borderRadius: '6px', 
                border: 'none',
                background: analyticsTimeRange === range.id ? '#333' : 'transparent',
                color: analyticsTimeRange === range.id ? 'white' : '#888',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem' }}>
        
        {/* Row 1 */}
        <VercelMetricTable title="Countries" items={countryItems} />
        <VercelMetricTable title="Operating Systems" items={osItems} />

        {/* Row 2 */}
        <VercelMetricTable title="Browsers" items={browserItems} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
           <VercelMetricTable title="Devices" items={deviceItems} viewsLabel="" />
           <VercelMetricTable title="Top Referrers" items={referrerItems} visitorsLabel="VISITORS" />
        </div>

        {/* Row 3 */}
        <VercelMetricTable title="Pages" items={pageItems} visitorsLabel="PAGE VIEWS" />
        <div style={{ background: '#0A0A0A', borderRadius: '12px', border: '1px solid #333', padding: '1.5rem', color: 'white' }}>
           <h4 style={{ margin: '0 0 1.5rem', fontSize: '0.9rem', fontWeight: 600, color: '#EDEDED' }}>Top Searches</h4>
           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {topSearches.slice(0, 15).map(([q, count]) => (
                <div key={q} style={{ background: '#1A1A1A', padding: '6px 12px', borderRadius: '20px', border: '1px solid #333', fontSize: '0.8rem', color: '#EDEDED', display: 'flex', gap: '8px' }}>
                  <span style={{ fontWeight: 400 }}>{q}</span>
                  <span style={{ color: '#888', fontWeight: 700 }}>{count}</span>
                </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
}
