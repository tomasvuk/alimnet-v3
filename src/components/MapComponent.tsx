'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, ZoomControl, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// GPS Interno para mover el mapa suavemente sin reiniciarlo
const ChangeView = ({ center, zoom }: { center: [number, number], zoom: number }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, zoom, { animate: true, duration: 1 });
  }, [center, zoom, map]);
  return null;
};

// Subcomponente para arreglar el re-dibujado en smartphones (Optimizado para no laggear)
const MapResizer = () => {
  const map = useMap();
  React.useEffect(() => {
    if (!map) return;

    let timeoutId: NodeJS.Timeout;
    const trigger = () => {
      map.invalidateSize();
      // Solo forzar carga si es necesario, sin disparar eventos globales pesados
    };

    // 1. Observer para detectar cambios reales en el tamaño
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(trigger, 100);
    });

    const container = map.getContainer();
    if (container) resizeObserver.observe(container);

    // 2. Un único disparo inicial para asegurar
    timeoutId = setTimeout(trigger, 250);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(timeoutId);
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
  onInteraction?: (direction: 'up' | 'down') => void;
  onMarkerClick?: (id: string) => void;
}

const MapEvents = ({ onInteraction }: { onInteraction?: (direction: 'up' | 'down') => void }) => {
  const lastInteraction = React.useRef<number>(0);

  useMapEvents({
    drag: (e) => {
      const now = Date.now();
      if (now - lastInteraction.current < 200) return; // Throttle fuerte para fluidez
      
      onInteraction?.('up'); // Siempre ocultar al mover por defecto para ganar espacio
      lastInteraction.current = now;
    },
    zoomstart: () => onInteraction?.('up'),
  });
  return null;
};

const MapComponent = ({ providers, center = [-34.6037, -58.3816], zoom = 11, onInteraction, onMarkerClick }: MapProps) => {
  return (
    <div style={{ 
      height: '100%', 
      width: '100%', 
      borderRadius: '16px', 
      overflow: 'hidden', 
      border: '1px solid var(--border)', 
      boxShadow: 'var(--shadow-md)',
      willChange: 'transform', // Aceleración por Hardware
      transform: 'translateZ(0)' // Forzar capa de composición GPU
    }}>
      <MapContainer 
        key="main-persistent-map" // KEY ESTÁTICO PARA QUE NO SE REINICIE
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={true}
        zoomControl={false}
        attributionControl={false}
        style={{ height: '100%', width: '100%' }}
        preferCanvas={true} // Usar Canvas en lugar de SVG para los círculos (más rápido)
      >
        <ChangeView center={center} zoom={zoom} />
        <MapEvents onInteraction={onInteraction} />
        <MapResizer />
        <ZoomControl position="bottomright" />
        <TileLayer
          key={`${center[0]}-tiles-v2`} 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {providers.map((p) => {
          const position: [number, number] = [p.location_lat, p.location_lng];
          
          return (
            <React.Fragment key={p.id}>
              {p.is_exact_location ? (
                <Marker position={position} icon={getAlimnetIcon(p.type || p.category || 'productor')} eventHandlers={{ click: () => onMarkerClick?.(p.id) }}>
                  <Popup>
                    <div style={{ textAlign: 'center', padding: '3px 4px' }}>
                      <strong style={{ display: 'block', fontSize: '0.85rem', marginBottom: '2px' }}>{p.name}</strong>
                      <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'capitalize' }}>{p.type || p.category}</span>
                      <br />
                      <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#5F7D4A' }}>{p.city_zone}</span>
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
