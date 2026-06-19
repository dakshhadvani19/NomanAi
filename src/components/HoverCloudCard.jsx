import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * A highly premium wrapper card that tracks the mouse and renders 
 * an organic, "cloud-like" mixture of cyan and gray in the background 
 * as the user hovers over it.
 */
export default function HoverCloudCard({ children, style, className, onClick, ...props }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Buttery smooth spring physics for the glow to follow the mouse
  const springConfig = { damping: 30, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    // Center the glow exactly on the cursor
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        // Make sure background doesn't overwrite our glow container
        ...style,
      }}
      {...props}
    >
      {/* 
        THE CLOUD SPOTLIGHT CONTAINER
        We isolate the glow in an absolute container with a high blur and mix-blend-mode 
        so it feels organic and deep.
      */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.6s ease',
          zIndex: 0,
          overflow: 'hidden',
          borderRadius: style?.borderRadius || 0
        }}
      >
        {/* The Cloud Origin that follows the mouse */}
        <motion.div
          style={{
            position: 'absolute',
            left: smoothX,
            top: smoothY,
            width: 0,
            height: 0,
          }}
        >
          {/* Cloud Blob 1: Light Gray / Silver */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              width: 300,
              height: 400,
              left: -150,
              top: -200,
              background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.05) 0%, transparent 60%)',
              borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
              transformOrigin: '50% 50%',
              filter: 'blur(20px)'
            }}
          />
          
          {/* Cloud Blob 2: Cyan (Noman ai Brand Color) */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              width: 350,
              height: 250,
              left: -175,
              top: -125,
              background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.08) 0%, transparent 60%)',
              borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
              transformOrigin: '40% 60%',
              filter: 'blur(25px)'
            }}
          />

          {/* Cloud Blob 3: Deep Blue core for depth */}
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: 200,
              height: 200,
              left: -100,
              top: -100,
              background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.05) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(15px)'
            }}
          />
        </motion.div>
      </motion.div>

      {/* Content wrapper */}
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
        {children}
      </div>
    </motion.div>
  );
}
