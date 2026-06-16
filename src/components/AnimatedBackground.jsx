import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  const orbs = [
    { id: 1, size: 400, color: 'rgba(6, 182, 212, 0.15)', top: '-10%', left: '-10%', duration: 20 },
    { id: 2, size: 600, color: 'rgba(14, 165, 233, 0.1)', top: '40%', right: '-20%', duration: 25 },
    { id: 3, size: 500, color: 'rgba(20, 184, 166, 0.12)', bottom: '-20%', left: '20%', duration: 22 },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, overflow: 'hidden', pointerEvents: 'none' }}>
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          style={{
            position: 'absolute',
            width: orb.size,
            height: orb.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${orb.color} 0%, rgba(3,7,18,0) 70%)`,
            filter: 'blur(60px)',
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -50, 40, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      {/* Dynamic Grid Overlay */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '4rem 4rem',
        maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
      }}></div>
    </div>
  );
}
