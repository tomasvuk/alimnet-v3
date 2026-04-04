'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--background)',
      zIndex: 9999
    }}>
      <div style={{ position: 'relative', width: '120px', height: '120px' }}>
        {/* Animated Sacred Geometry Mark */}
        <motion.img
          src="/icon.png"
          alt="Cargando Alimnet..."
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0.4, 1, 0.4],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Pulse Ring */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: '2px solid var(--primary)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }}
          initial={{ opacity: 0.5, scale: 0.8 }}
          animate={{ opacity: 0, scale: 1.5 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      </div>
    </div>
  );
}
