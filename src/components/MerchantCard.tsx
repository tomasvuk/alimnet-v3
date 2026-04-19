'use client';

import React, { useState } from 'react';
import { MapPin, ShieldCheck, Shield, Leaf, Store, UtensilsCrossed, ChefHat, Sprout, Sun, CloudSun, Wheat, Share2 } from 'lucide-react';

interface MerchantCardProps {
  merchant: any;
  onClick?: () => void;
}

const CATEGORIES = [
  { id: 'productor', label: 'Productor', icon: (props: any) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM15.89 8.11C15.5 7.72 14.83 7 13.53 7h-3.06c-1.3 0-1.97.72-2.36 1.11L4 12.25V15h2v-2h1v9h2v-5h2v5h2v-9h1v2h2v-2.75l-4.11-4.14z" fill="currentColor" />
    </svg>
  )},
  { id: 'abastecedor', label: 'Abastecedor', icon: Store },
  { id: 'restaurante', label: 'Restaurante', icon: UtensilsCrossed },
  { id: 'chef', label: 'Chef', icon: ChefHat },
];

const PRODUCT_OPTIONS = [
  'Verduras', 'Frutas', 'Almacén', 'Lácteos', 'Carnes', 'Panificados', 'Bebidas', 'Plantas', 'Otros'
];

export default function MerchantCard({ merchant, onClick }: MerchantCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const types = (merchant.type || '').split(',').map((s: string) => s.trim());
  const mainType = types[0] || 'Productor';
  const secondaryType = types.length > 1 ? types[1] : null;

  const IconComponent = CATEGORIES.find(c => c.id === mainType.toLowerCase())?.icon || Sprout;
  
  const allTags = merchant.tags || [];
  const productTags = allTags.filter((t: string) => PRODUCT_OPTIONS.includes(t));
  const otherTags = allTags.filter((t: string) => !PRODUCT_OPTIONS.includes(t) && t !== 'Venta directa');
  
  const isDirect = mainType.toLowerCase() === 'productor' && allTags.includes('Venta directa');
  
  const locations = merchant.locations || [];
  let displayLocation = 'Zona Norte';
  if (locations.length === 1) {
    displayLocation = locations[0].locality || 'Zona Norte'; 
  } else if (locations.length > 1) {
    const firstLocality = locations[0]?.locality?.split(' | ')?.[1] || locations[0]?.locality || 'Zona';
    displayLocation = `${locations.length} sucursales | ${firstLocality}`;
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '1.2rem', borderRadius: '24px', background: 'white', cursor: onClick ? 'pointer' : 'default',
        border: '1px solid #eee', boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
        display: 'flex', flexDirection: 'column', gap: '8px', transition: 'all 0.2s',
        maxWidth: '400px', width: '100%'
      }}
    >
      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div style={{ 
            width: '42px', height: '42px', borderRadius: '12px', background: '#F4F1E6', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5F7D4A', flexShrink: 0, marginTop: '2px',
            overflow: 'hidden'
          }}>
            {merchant.logo_url ? (
              <img src={merchant.logo_url} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <IconComponent size={24} />
            )}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '950', color: '#2D3A20', margin: 0, lineHeight: '1.2', marginBottom: '4px' }}>{merchant.name}</h3>
            <p style={{ fontSize: '0.75rem', color: '#888', margin: 0, fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={10} /> {displayLocation}
            </p>
          </div>
        </div>

        {merchant.validation_count > 0 && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', borderRadius: '10px',
            background: 'rgba(95, 125, 74, 0.08)', border: '1px solid rgba(95, 125, 74, 0.15)',
            color: '#5F7D4A', flexShrink: 0
          }}>
            <ShieldCheck size={14} />
            <span style={{ fontSize: '0.7rem', fontWeight: '900' }}>{merchant.validation_count}</span>
          </div>
        )}
      </div>

      <p style={{ fontSize: '0.85rem', color: '#2D3A20', opacity: 0.8, margin: '4px 0 8px 0', lineHeight: '1.4' }}>
        {merchant.bio_short ? (merchant.bio_short.length > 85 ? merchant.bio_short.substring(0, 85) + '...' : merchant.bio_short) : 'Sin descripción cargada aún.'}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', gap: '8px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {isDirect && (
            <span style={{ fontSize: '0.65rem', fontWeight: '800', background: '#e8f5e9', color: '#2e7d32', padding: '3px 8px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Leaf size={10} strokeWidth={2.5} /> Del campo
            </span>
          )}
          {productTags.slice(0, 2).map((tag: string) => (
            <span key={tag} style={{ fontSize: '0.65rem', fontWeight: '700', background: 'transparent', color: '#888', padding: '3px 8px', borderRadius: '12px', border: '1px solid #eee' }}>
              {tag}
            </span>
          ))}
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
           <div style={{ fontSize: '0.55rem', fontWeight: '950', background: '#2D3A20', color: 'white', padding: '2px 8px', borderRadius: '20px', textTransform: 'uppercase' }}>
              {mainType}
           </div>
           {(merchant.verified || merchant.owner_id) && (
              <div style={{ fontSize: '0.5rem', fontWeight: '950', background: '#A67C00', color: 'white', padding: '2px 8px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                 <ShieldCheck size={8} /> OFICIAL
              </div>
           )}
           <button 
                onClick={(e) => {
                  e.stopPropagation();
                  const shareUrl = `${window.location.host.includes('localhost') ? 'http://' : 'https://'}${window.location.host}/explorar?id=${merchant.id}`;
                  if (navigator.share) {
                    navigator.share({
                      title: `Alimnet | ${merchant.name}`,
                      text: `Te comparto este proyecto de alimentos cuidados en Alimnet: ${merchant.name}`,
                      url: shareUrl
                    }).catch(() => {
                      navigator.clipboard.writeText(shareUrl);
                    });
                  } else {
                    navigator.clipboard.writeText(shareUrl);
                    alert('¡Enlace copiado! 🚀');
                  }
                }}
                style={{ 
                  marginTop: '4px', background: 'none', border: '1px solid #eee', borderRadius: '50%', padding: '4px', cursor: 'pointer', display: 'flex', color: '#5F7D4A' 
                }}
                title="Compartir"
              >
                <Share2 size={12} />
              </button>
        </div>
      </div>
    </div>
  );
}
