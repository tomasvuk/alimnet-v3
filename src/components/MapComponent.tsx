'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// --- Iconos por Categoría (SVG Paths simplificados y centrados) ---
const CATEGORY_PATHS: Record<string, string> = {
  productor: `<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#F4F1E6"/>`, 
  abastecedor: `<path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1z" fill="#F4F1E6"/>`,
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

const MapComponent = ({ providers = [], center = [-34.6037, -58.3816], zoom = 11 }: MapProps) => {
  return (
    <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
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
                      fillColor: '#5F7D4A', 
                      fillOpacity: 0.1, 
                      color: '#5F7D4A', 
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
                    pathOptions={{ color: '#5F7D4A', weight: 2 }} 
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
