'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useMap } from 'react-leaflet';

// Subcomponente para arreglar el re-dibujado en smartphones (Múltiples disparos para asegurar el área)
const MapResizer = () => {
  const map = useMap();
  React.useEffect(() => {
    if (!map) return;

    const trigger = () => {
      map.invalidateSize();
      map.panBy([0, 0], { animate: false }); // Forzar carga de tiles
    };

    // 1. Observer para detectar cambios reales en el tamaño del contenedor (display: none -> block)
    const resizeObserver = new ResizeObserver(() => {
      trigger();
    });

    const container = map.getContainer();
    if (container) resizeObserver.observe(container);

    // 2. Disparos manuales preventivos
    const timers = [
      setTimeout(trigger, 100),
      setTimeout(trigger, 500),
      setTimeout(trigger, 1500)
    ];

    window.addEventListener('resize', trigger);
    
    return () => {
      resizeObserver.disconnect();
      timers.forEach(t => clearTimeout(t));
      window.removeEventListener('resize', trigger);
    };
  }, [map]);
  return null;
};

// --- Iconos por Categoría (SVG Paths simplificados y centrados) ---
const CATEGORY_PATHS: Record<string, string> = {
  productor: `<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#F4F1E6"/>`, 
  almacen: `<path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1z" fill="#F4F1E6"/>`,
  restaurante: `<path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" fill="#F4F1E6"/>`,
  chef: `<path d="M12 3a9 9 0 00-6.19 15.55L4.5 21h15l-1.31-2.45A9 9 0 0012 3zm0 2a7 7 0 015.65 11.11L18.42 19H5.58l.77-2.89A7 7 0 0112 5z" fill="#F4F1E6"/>`
};

const getAlimnetIcon = (type: string) => {
  const safeType = (type || 'productor').toLowerCase();
  const iconPath = CATEGORY_PATHS[safeType] || CATEGORY_PATHS['productor'];
  
  return L.divIcon({
    html: `
      <div style="position: relative; width: 36px; height: 46px;">
        <svg width="36" height="46" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2C7.16 2 0 9.16 0 18C0 30 16 44 16 44C16 44 32 30 32 18C32 9.16 24.84 2 16 2Z" fill="rgba(0,0,0,0.1)"/>
          <path d="M16 0C7.16 0 0 7.16 0 16C0 28 16 42 16 42C16 42 32 28 32 16C32 7.16 24.84 0 16 0Z" fill="#5F7D4A"/>
          <circle cx="16" cy="16" r="10" fill="#3F5232" stroke="#4a613b" stroke-width="1.5"/>
          <svg x="8" y="8" width="16" height="16" viewBox="0 0 24 24">
            ${iconPath}
          </svg>
        </svg>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [36, 46],
    iconAnchor: [18, 46],
    popupAnchor: [0, -40],
  });
};

interface MapProvider {
  id: string;
  name: string;
  category?: string;
  type?: string;
  city_zone?: string;
  location_lat: number;
  location_lng: number;
  is_exact_location: boolean;
}

interface MapProps {
  providers: MapProvider[];
  center?: [number, number];
  zoom?: number;
}

const MapComponent = ({ providers, center = [-34.6037, -58.3816], zoom = 11 }: MapProps) => {
  return (
    <div style={{ height: '100%', width: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={true}
        attributionControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        <MapResizer />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {providers.map((p) => {
          const position: [number, number] = [p.location_lat, p.location_lng];
          
          return (
            <React.Fragment key={p.id}>
              {p.is_exact_location ? (
                <Marker position={position} icon={getAlimnetIcon(p.type || p.category || 'productor')}>
                  <Popup>
                    <div style={{ textAlign: 'center', padding: '5px' }}>
                      <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '4px' }}>{p.name}</strong>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{p.category}</span>
                      <br />
                      <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{p.city_zone}</span>
                    </div>
                  </Popup>
                </Marker>
              ) : (
                <>
                  <Circle 
                    center={position}
                    radius={3000}
                    pathOptions={{ 
                      fillColor: 'var(--secondary)', 
                      fillOpacity: 0.1, 
                      color: 'var(--secondary)', 
                      weight: 1,
                      dashArray: '5, 5'
                    }}
                  >
                    <Popup>
                      <div style={{ textAlign: 'center' }}>
                        <strong>{p.name}</strong>
                        <br />
                        <span style={{ fontSize: '0.8rem' }}>Zona de entrega: {p.city_zone}</span>
                      </div>
                    </Popup>
                  </Circle>
                  <Circle 
                    center={position} 
                    radius={200} 
                    pathOptions={{ color: 'var(--secondary)', weight: 2 }} 
                  />
                </>
              )}
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
