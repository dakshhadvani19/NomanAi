import React from 'react';
import { motion } from 'framer-motion';

export default function HeroPentagon() {
  const orbitRadius = 140;
  
  // Create 5 pentagons orbiting a center one
  const outerPentagons = [0, 1, 2, 3, 4].map((i) => {
    const angle = (i * (360 / 5)) * (Math.PI / 180);
    return {
      x: Math.cos(angle) * orbitRadius,
      y: Math.sin(angle) * orbitRadius,
      delay: i * 0.2
    };
  });

  return (
    <section className="section-padding" style={{ paddingTop: '160px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Pentagon Animation */}
      <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '4rem' }}>
        
        {/* Center Pentagon */}
        <motion.div
          className="clip-pentagon"
          style={{
            width: '80px', height: '80px',
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-teal))',
            position: 'absolute',
            zIndex: 10,
            boxShadow: '0 0 40px rgba(6, 182, 212, 0.5)'
          }}
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
        />

        {/* Orbiting Pentagons */}
        <motion.div
          style={{ position: 'absolute', width: '100%', height: '100%' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {outerPentagons.map((pos, i) => (
            <motion.div
              key={i}
              className="clip-pentagon"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: pos.delay, duration: 0.8 }}
              style={{
                width: '50px', height: '50px',
                background: 'rgba(14, 165, 233, 0.2)',
                border: '1px solid var(--accent-primary)', // Clip path makes borders tricky, so we use a trick or just background
                position: 'absolute',
                top: '50%', left: '50%',
                marginLeft: '-25px', marginTop: '-25px',
                x: pos.x, y: pos.y,
                backdropFilter: 'blur(4px)'
              }}
            >
              {/* Inner glowing core to simulate border since clip-path cuts actual borders */}
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(6,182,212,0.5), transparent)' }} />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Connecting lines can be added via SVG in the background if needed, but the floating is cleaner */}
      </div>

      {/* Hero Typography */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{ textAlign: 'center', zIndex: 10 }}
      >
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Systems Built For</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', maxWidth: '800px', margin: '0 auto' }}>
            {['D2C Brands', 'Legal Firms', 'E-commerce', 'SaaS Startups', 'Real Estate', 'Clinics & Healthcare', 'Coaches & Consultants'].map((tag, i) => (
              <span key={i} style={{ 
                padding: '0.5rem 1rem', 
                borderRadius: '999px', 
                border: '1px solid var(--glass-border)', 
                background: 'var(--bg-card)', 
                fontSize: '0.875rem',
                color: 'var(--text-muted)'
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1.1, marginBottom: '1.5rem', fontWeight: 800 }}>
          You're doing everything right.<br />
          <span style={{ color: 'var(--text-muted)' }}>But still losing.</span>
        </h1>
        
        <p style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', fontWeight: 600, marginBottom: '2rem' }}>
          We fix all three. <a href="#" style={{ color: 'var(--text-main)', textDecoration: 'underline', textUnderlineOffset: '4px' }}>See how</a>
        </p>
      </motion.div>

    </section>
  );
}
