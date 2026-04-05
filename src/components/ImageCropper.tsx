'use client';

import React, { useState, useCallback } from 'react';
import Cropper, { Point, Area } from 'react-easy-crop';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Check 
} from 'lucide-react';

interface ImageCropperProps {
  image: string;
  onCropComplete: (croppedBlob: Blob) => void;
  onCancel: () => void;
  aspect?: number;
  circular?: boolean;
}

export default function ImageCropper({ 
  image, 
  onCropComplete, 
  onCancel, 
  aspect = 1, 
  circular = false 
}: ImageCropperProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropChange = useCallback((crop: Point) => setCrop(crop), []);
  const onZoomChange = useCallback((zoom: number) => setZoom(zoom), []);
  
  const onCropCompleteHandler = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createCroppedImage = async () => {
    if (!croppedAreaPixels) return;
    
    try {
      const croppedBlob = await getCroppedImg(image, croppedAreaPixels, rotation);
      if (croppedBlob) onCropComplete(croppedBlob);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ 
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
      background: 'rgba(0,0,0,0.9)', zIndex: 6000, display: 'flex', 
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ 
        width: '95%', maxWidth: '500px', height: '600px', background: 'white', 
        borderRadius: '32px', display: 'flex', flexDirection: 'column', overflow: 'hidden'
      }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontWeight: '950', color: '#2D3A20', margin: 0 }}>Centrar y Zoom</h3>
          <button onClick={onCancel} style={{ background: '#f0f4ed', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={20} color="#5F7D4A" />
          </button>
        </div>

        <div style={{ position: 'relative', flex: 1, background: '#111' }}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspect}
            cropShape={circular ? 'round' : 'rect'}
            showGrid={true}
            onCropChange={onCropChange}
            onCropComplete={onCropCompleteHandler}
            onZoomChange={onZoomChange}
          />
        </div>

        <div style={{ padding: '2rem', background: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <ZoomOut size={18} color="#AAA" />
            <input 
              type="range" 
              min={1} max={3} step={0.1} 
              value={zoom} 
              onChange={(e) => setZoom(Number(e.target.value))} 
              style={{ flex: 1, accentColor: '#5F7D4A' }}
            />
            <ZoomIn size={18} color="#AAA" />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
             <button 
               onClick={() => setRotation((r) => (r + 90) % 360)}
               style={{ 
                 flex: 1, padding: '1rem', borderRadius: '16px', border: '1px solid #E4EBDD', 
                 background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                 fontWeight: '800', color: '#5F7D4A', cursor: 'pointer' 
               }}
             >
               <RotateCw size={18} /> Rotar
             </button>
             <button 
               onClick={createCroppedImage}
               style={{ 
                 flex: 2, padding: '1rem', borderRadius: '16px', border: 'none',
                 background: '#2D3A20', color: 'white', fontWeight: '1000',
                 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer'
               }}
             >
               <Check size={18} /> APLICAR CAMBIOS
             </button>
          </div>
        </div>
      </div>
      <p style={{ marginTop: '1.5rem', color: 'white', opacity: 0.7, fontSize: '0.9rem', fontWeight: '600' }}>
        Arrastrá para centrar · Pellizcá para zoom
      </p>
    </div>
  );
}

// Helpers for canvas cropping
async function getCroppedImg(imageSrc: string, pixelCrop: Area, rotation = 0): Promise<Blob | null> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) return null;

  const rotRad = (rotation * Math.PI) / 180;
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation);

  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.translate(-image.width / 2, -image.height / 2);

  ctx.drawImage(image, 0, 0);

  const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(data, 0, 0);

  return new Promise((resolve) => {
    canvas.toBlob((file) => resolve(file), 'image/jpeg', 0.85);
  });
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });
}

function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = (rotation * Math.PI) / 180;
  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}
