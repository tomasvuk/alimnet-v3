'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix para los iconos de Leaflet por defecto en Next.js
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

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
        
        {(providers || []).map((p) => (
          <Marker 
            key={p.id} 
            position={[p.location_lat, p.location_lng]} 
            icon={defaultIcon}
          >
            <Popup>
              <div style={{ textAlign: 'center' }}>
                <strong style={{ display: 'block' }}>{p.name}</strong>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>{p.city_zone}</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
