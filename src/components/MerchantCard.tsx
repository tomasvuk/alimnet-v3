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
  let mainType = types[0] || 'Productor';
  mainType = mainType.charAt(0).toUpperCase() + mainType.slice(1);
  const secondaryType = types.length > 1 ? types[1] : null;

  const IconComponent = CATEGORIES.find(c => c.id === mainType.toLowerCase())?.icon || Sprout;
  
  const allTags = merchant.tags || [];
  const productTags = allTags.filter((t: string) => PRODUCT_OPTIONS.includes(t));
  const otherTags = allTags.filter((t: string) => !PRODUCT_OPTIONS.includes(t) && t !== 'Venta directa');
  
  const isDirect = mainType.toLowerCase() === 'productor' && allTags.includes('Venta directa');
  
  // Location formatting
  const locations = merchant.locations || [];
  let displayLocation = 'Zona';
  if (locations.length > 0) {
    const loc = locations[0];
    const localities = (loc.locality || '').split(',').map((s: string) => s.trim()).filter(Boolean);
    const district = loc.district || '';
    const province = loc.province || '';
    const address = loc.address || '';
    
    let locText = '';
    if (localities.length > 0) {
      locText = localities.slice(0, 2).join(', ');
      if (localities.length > 2) locText += '...';
    }
    
    if (district) {
      displayLocation = locText ? `${locText}, ${district}` : district;
    } else if (locText) {
      displayLocation = locText;
    } else if (address) {
      // Heurística robusta para extraer la localidad de la dirección de GMaps
      let parts = address.split(',').map((s: string) => s.trim());
      if (parts[parts.length - 1] === 'Argentina') parts.pop();
      
      const last = parts[parts.length - 1] || '';
      if (last.includes('Provincia de Buenos Aires') || last.includes('Buenos Aires Province') || last === 'Buenos Aires') {
        parts.pop();
      }
      
      let locPart = parts[parts.length - 1] || province || 'Zona';
      locPart = locPart.replace(/^[A-Z]?\d{4}[A-Z]?\s+/, ''); // Quitar código postal
      
      if (locPart.includes('Cdad. Autónoma') || locPart.includes('Capital Federal') || locPart.includes('CABA')) {
        displayLocation = 'CABA';
      } else {
        displayLocation = locPart;
      }
    } else if (province === 'Ciudad Autónoma de Buenos Aires') {
      displayLocation = 'CABA';
    } else if (province === 'Buenos Aires') {
      displayLocation = 'Prov. de Buenos Aires';
    } else if (province) {
      displayLocation = province;
    } else {
      displayLocation = 'Zona';
    }

    if (locations.length > 1) {
      displayLocation = `${locations.length} suc. | ${displayLocation}`;
    }
  }

  return (
    <div
      id={`merchant-card-${merchant.id}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxSizing: 'border-box',
        padding: '0 12px', borderRadius: '20px', background: 'white', cursor: onClick ? 'pointer' : 'default',
        border: '1px solid #eee', boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
        display: 'flex', flexDirection: 'row', alignItems: 'center', transition: 'all 0.2s',
        maxWidth: '100%', width: '100%', height: '80px', minHeight: '80px', maxHeight: '80px', 
        position: 'relative', overflow: 'hidden'
      }}
      className="merchant-card-pro"
    >
      {/* Col 1: Logo (50px) */}
      <div style={{ width: '50px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ 
            width: '40px', height: '40px', borderRadius: '10px', background: '#F4F1E6', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5F7D4A',
            overflow: 'hidden', border: '1px solid rgba(95, 125, 74, 0.1)'
          }}>
            {merchant.logo_url ? (
              <img src={merchant.logo_url} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <IconComponent size={20} />
            )}
          </div>
          <div style={{ 
            position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%)',
            fontSize: '7px', fontWeight: '900', background: 'white', color: '#5F7D4A', 
            padding: '1px 4px', borderRadius: '4px', textTransform: 'uppercase',
            whiteSpace: 'nowrap', border: '1px solid rgba(95, 125, 74, 0.2)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)', zIndex: 2
          }}>
            {mainType}
          </div>
        </div>
      </div>

      {/* Col 2: Info (Flexible) */}
      <div style={{ 
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2px', 
        minWidth: 0, paddingLeft: '4px', overflow: 'hidden'
      }}>
        <h3 style={{ 
          fontSize: '13px', fontWeight: '950', color: '#2D3A20', margin: 0, 
          lineHeight: '1.2', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', wordBreak: 'break-word'
        }}>
          {merchant.name}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', overflow: 'hidden' }}>
          <MapPin size={8} color="#5F7D4A" style={{ opacity: 0.5, flexShrink: 0 }} />
          <span style={{ 
            fontSize: '10px', color: '#999', fontWeight: '700', 
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' 
          }}>
            {displayLocation}
          </span>
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '3px', marginTop: '2px', overflow: 'hidden' }}>
          {isDirect && (
            <span style={{ fontSize: '7px', fontWeight: '800', background: 'rgba(95, 125, 74, 0.05)', color: '#5F7D4A', padding: '0px 4px', borderRadius: '3px', flexShrink: 0 }}>
              Directo
            </span>
          )}
          {productTags.slice(0, 2).map((tag: string) => (
            <span key={tag} style={{ fontSize: '7px', fontWeight: '700', background: '#F9F9F9', color: '#999', padding: '0px 4px', borderRadius: '3px', flexShrink: 0, border: '1px solid #eee' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Col 3: Actions (75px) */}
      <div style={{ 
        width: '75px', flexShrink: 0, display: 'flex', flexDirection: 'column', 
        alignItems: 'flex-end', justifyContent: 'center', gap: '6px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {(merchant.validation_count || 0) > 0 && (
            <span style={{ fontSize: '10px', fontWeight: '950', color: '#2D3A20' }}>
              {merchant.validation_count}
            </span>
          )}
          <button 
            style={{
              fontSize: '8px', fontWeight: '950', border: '1.5px solid #5F7D4A', color: '#5F7D4A',
              padding: '2px 5px', borderRadius: '6px', background: 'white', cursor: 'pointer',
              whiteSpace: 'nowrap', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}
          >
            VALIDAR
          </button>
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsShareModalOpen(true);
          }}
          style={{ 
            background: '#F9F9F9', border: '1px solid #EEE', 
            width: '26px', height: '26px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666',
            transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}
          title="Compartir"
        >
          <Share2 size={13} strokeWidth={2.5} />
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
