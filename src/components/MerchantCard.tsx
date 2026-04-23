'use client';

import React, { useState } from 'react';
import { MapPin, ShieldCheck, Shield, Leaf, Store, UtensilsCrossed, ChefHat, Sprout, Sun, CloudSun, Wheat, Share2 } from 'lucide-react';
import ShareModal from './ShareModal';

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
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
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
        padding: '8px 16px', borderRadius: '24px', background: 'white', cursor: onClick ? 'pointer' : 'default',
        border: '1px solid #eee', boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
        display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', transition: 'all 0.2s',
        maxWidth: '500px', width: '100%', height: '94px', position: 'relative', overflow: 'hidden'
      }}
    >
      {/* Identity Section (Logo + Badge) */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ 
          width: '42px', height: '42px', borderRadius: '12px', background: '#F4F1E6', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5F7D4A',
          overflow: 'hidden'
        }}>
          {merchant.logo_url ? (
            <img src={merchant.logo_url} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <IconComponent size={22} />
          )}
        </div>
        <div style={{ 
          position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%)',
          fontSize: '0.55rem', fontWeight: '900', background: '#2D3A20', color: 'white', 
          padding: '1px 5px', borderRadius: '3px', textTransform: 'uppercase',
          whiteSpace: 'nowrap', tracking: '-0.02em'
        }}>
          {mainType}
        </div>
      </div>

      {/* Info Section */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1px', minWidth: 0, paddingLeft: '4px' }}>
        <h3 style={{ 
          fontSize: '14px', fontWeight: '900', color: '#2D3A20', margin: 0, 
          lineHeight: '1.1', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' 
        }}>
          {merchant.name}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
          <MapPin size={10} color="#5F7D4A" />
          <span style={{ fontSize: '11px', color: '#888', fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {displayLocation}
          </span>
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
          {isDirect && (
            <span style={{ fontSize: '9px', fontWeight: '800', background: '#F0F4ED', color: '#5F7D4A', padding: '2px 6px', borderRadius: '4px' }}>
              Directo
            </span>
          )}
          {productTags.slice(0, 2).map((tag: string) => (
            <span key={tag} style={{ fontSize: '9px', fontWeight: '700', background: '#F0F4ED', color: '#5F7D4A', padding: '2px 6px', borderRadius: '4px' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Actions Section */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <button 
          style={{
            fontSize: '10px', fontWeight: '900', border: '1px solid #5F7D4A', color: '#5F7D4A',
            padding: '4px 8px', borderRadius: '8px', background: 'transparent', cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          className="hover-scale"
        >
          VALIDAR
        </button>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsShareModalOpen(true);
          }}
          style={{ 
            background: '#F9F9F9', border: 'none', borderRadius: '50%', 
            width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888',
            transition: 'all 0.2s'
          }}
          title="Compartir"
        >
          <Share2 size={12} />
        </button>
      </div>

      <ShareModal 
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        merchantName={merchant.name}
        merchantId={merchant.id}
        merchantLogo={merchant.logo_url}
        merchantCategory={mainType}
      />
    </div>
  );
}
