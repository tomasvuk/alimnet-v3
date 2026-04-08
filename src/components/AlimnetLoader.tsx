'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AlimnetLoader({ size = 120, fullScreen = false }: { size?: number, fullScreen?: boolean }) {
  const loaderContent = (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* ONDA EFERVESCENTE / WAVE */}
      <motion.div
        animate={{
          scale: [1, 1.6],
          opacity: [0.3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut"
        }}
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: '50%',
          border: '2px solid #5F7D4A',
          zIndex: 0
        }}
      />
      
      {/* EL LOGO ESFERA - Usamos un div con fondo para transparencia robusta */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.9, 1, 0.9]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ 
          zIndex: 1,
          width: size, 
          height: size,
          backgroundImage: 'url(/logo.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#F8F9F5', // Merge with parent background
          backgroundBlendMode: 'multiply',
          filter: 'contrast(1.05) brightness(1.05)', // Refuerzo de blancos
          borderRadius: '50%' // Asegurar que nada se escape de la esfera
        }}
      />
    </div>
  );

  if (fullScreen) {
    return (
      <div style={{ 
        height: '100vh', 
        width: '100vw', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        background: '#F8F9F5',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999
      }}>
        {loaderContent}
      </div>
    );
  }

  return loaderContent;
}
