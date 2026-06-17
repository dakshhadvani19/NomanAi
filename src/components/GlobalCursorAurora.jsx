import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function GlobalCursorAurora() {
  // Use a very high default coordinate so it doesn't flash on screen top-left before mouse moves
  const mouseX = useMotionValue(-2000);
  const mouseY = useMotionValue(-2000);
  
  const springFastX = useSpring(mouseX, { stiffness: 800, damping: 30, mass: 0.1 });
  const springFastY = useSpring(mouseY, { stiffness: 800, damping: 30, mass: 0.1 });

  const springMidX = useSpring(mouseX, { stiffness: 300, damping: 40, mass: 0.2 });
  const springMidY = useSpring(mouseY, { stiffness: 300, damping: 40, mass: 0.2 });

  const springSlowX = useSpring(mouseX, { stiffness: 100, damping: 50, mass: 0.4 });
  const springSlowY = useSpring(mouseY, { stiffness: 100, damping: 50, mass: 0.4 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }}>
      {/* Outer Glow (Slow) - Indigo */}
      <motion.div
        style={{
          position: 'absolute', top: 0, left: 0,
          width: '700px', height: '700px',
          x: springSlowX, y: springSlowY,
          translateX: '-50%', translateY: '-50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 60%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Mid Aura (Medium) - Magenta / Pink */}
      <motion.div
        style={{
          position: 'absolute', top: 0, left: 0,
          width: '450px', height: '450px',
          x: springMidX, y: springMidY,
          translateX: '-50%', translateY: '-50%',
          background: 'radial-gradient(circle, rgba(217,70,239,0.18) 0%, transparent 60%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          mixBlendMode: 'screen'
        }}
      />

      {/* Core Light (Fast) - Cyan / Bright Blue */}
      <motion.div
        style={{
          position: 'absolute', top: 0, left: 0,
          width: '250px', height: '250px',
          x: springFastX, y: springFastY,
          translateX: '-50%', translateY: '-50%',
          background: 'radial-gradient(circle, rgba(14,165,233,0.25) 0%, transparent 60%)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
          mixBlendMode: 'screen'
        }}
      />
    </div>
  );
}
