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
      
      {/* EL LOGO ESFERA */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ zIndex: 1 }}
      >
        <img 
          src="/logo.png" 
          alt="Alimnet Loading" 
          style={{ 
            width: size, 
            height: size, 
            objectFit: 'contain',
            mixBlendMode: 'multiply'
          }} 
        />
      </motion.div>
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
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ 
            marginTop: '2rem', 
            fontSize: '0.8rem', 
            fontWeight: '900', 
            color: '#5F7D4A', 
            letterSpacing: '0.2em',
            textTransform: 'uppercase'
          }}
        >
          Pensando Alimnet...
        </motion.p>
      </div>
    );
  }

  return loaderContent;
}
