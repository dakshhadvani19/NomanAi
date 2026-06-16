import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

// Smooth Typing Animation Component
const SmoothTypewriter = ({ text, delay = 0, speed = 0.05 }) => {
  const characters = text.split("");
  
  return (
    <span style={{ display: 'inline-block' }}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 5, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.3,
            delay: delay + index * speed,
            ease: "easeOut"
          }}
          style={{ display: 'inline-block' }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

export default function HeroSection() {
  const orbitRadius = 160;
  
  // Outer nodes data based on the provided image
  const outerNodes = [
    { label: 'Leads', angle: -126 },
    { label: 'Follow-up', angle: -54 },
    { label: 'Bookings', angle: 18 },
    { label: 'WhatsApp', angle: 90 },
    { label: '24/7 Calls', angle: 162 }
  ].map((node, i) => {
    // Convert angle to radians
    const rad = node.angle * (Math.PI / 180);
    return {
      ...node,
      x: Math.cos(rad) * orbitRadius,
      y: Math.sin(rad) * orbitRadius,
      delay: i * 0.2
    };
  });

  return (
    <section className="section-padding container" style={{ paddingTop: '120px' }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}>
        
        {/* Left Column: Text & CTA */}
        <div style={{ zIndex: 10 }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.75rem', borderRadius: '999px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2rem' }}
          >
            <Sparkles size={14} /> SYSTEMS THAT OUTPERFORM
          </motion.div>

          <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', lineHeight: 1.1, marginBottom: '1.5rem', fontWeight: 800, minHeight: '160px' }}>
            <SmoothTypewriter text="Your business is leaking revenue." delay={0} speed={0.03} />
            <br />
            <span style={{ color: 'var(--text-muted)' }}>
              <SmoothTypewriter text="We seal it." delay={1.2} speed={0.04} />
            </span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              style={{
                display: 'inline-block',
                width: '4px',
                height: '0.9em',
                background: 'linear-gradient(180deg, #4285F4, #9b72cb, #d96570)', // Google AI style gradient
                marginLeft: '8px',
                verticalAlign: 'bottom',
                borderRadius: '2px',
                boxShadow: '0 0 8px rgba(155, 114, 203, 0.5)'
              }}
            />
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '500px' }}
          >
            AI automations, voice agents, and web solutions — engineered around your outcomes, not our deliverables.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.6 }}
            style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}
          >
            <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
              Book a Free Audit
            </button>
            <a href="#" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseOut={(e) => e.target.style.color = 'var(--text-main)'}>
              See Our Systems <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>

        {/* Right Column: Interactive Diagram */}
        <div style={{ position: 'relative', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          
          {/* Connecting Lines / Network */}
          <motion.svg 
            style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(6, 182, 212, 0.1)" />
                <stop offset="100%" stopColor="rgba(14, 165, 233, 0.5)" />
              </linearGradient>
            </defs>
            <g transform="translate(50%, 50%)">
              
              {/* Main Circular Orbit */}
              <circle
                cx="0" cy="0" r={orbitRadius}
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              
              {/* Outer Concentric Circle */}
              <circle
                cx="0" cy="0" r={orbitRadius * 1.5}
                fill="none"
                stroke="rgba(255,255,255,0.02)"
                strokeWidth="1"
                strokeDasharray="2 8"
              />

              {/* Pentagon Lines Connecting Nodes */}
              <polygon
                points={outerNodes.map(pos => `${pos.x},${pos.y}`).join(' ')}
                fill="none"
                stroke="url(#lineGrad)"
                strokeWidth="1.5"
                strokeDasharray="6 6"
                strokeLinejoin="round"
              />

              {/* Lines from Center to Nodes */}
              {outerNodes.map((pos, i) => (
                <line 
                  key={`line-${i}`}
                  x1="0" y1="0" 
                  x2={pos.x} y2={pos.y} 
                  stroke="url(#lineGrad)" 
                  strokeWidth="1.5" 
                  strokeDasharray="4 4"
                />
              ))}
            </g>
          </motion.svg>

          {/* Central Node */}
          <motion.div
            style={{
              width: '120px', height: '120px',
              borderRadius: '50%',
              background: 'var(--bg-dark)',
              border: '2px solid var(--accent-primary)',
              position: 'absolute',
              zIndex: 10,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 0 30px rgba(6, 182, 212, 0.3), inset 0 0 20px rgba(6, 182, 212, 0.2)',
              textAlign: 'center'
            }}
            animate={{ boxShadow: ['0 0 30px rgba(6, 182, 212, 0.3)', '0 0 50px rgba(6, 182, 212, 0.6)', '0 0 30px rgba(6, 182, 212, 0.3)'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span style={{ fontSize: '0.875rem', fontWeight: 800, letterSpacing: '0.05em', lineHeight: 1.2 }}>
              YOUR<br/>BUSINESS
            </span>
            
            {/* Leaking revenue indicator below center */}
            <motion.div 
              style={{ position: 'absolute', bottom: '-40px', color: '#ef4444', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', whiteSpace: 'nowrap' }}
              animate={{ opacity: [0.5, 1, 0.5], y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ↓ LEAKING REVENUE
            </motion.div>
          </motion.div>

          {/* Orbiting Nodes forming pentagon structure */}
          <motion.div
            style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            {outerNodes.map((pos, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: pos.delay, duration: 0.8 }}
                style={{
                  width: '70px', height: '70px',
                  borderRadius: '50%',
                  background: 'rgba(3, 7, 18, 0.8)',
                  border: '1px solid var(--glass-border)',
                  position: 'absolute',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  x: pos.x, y: pos.y,
                  backdropFilter: 'blur(8px)',
                  color: 'var(--text-muted)',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  textAlign: 'center',
                  letterSpacing: '0.05em'
                }}
              >
                {/* Counter-rotate text so it stays upright */}
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}>
                  {pos.label}
                </motion.div>

                {/* Flow particle */}
                <motion.div
                  style={{
                    position: 'absolute',
                    width: '6px', height: '6px',
                    borderRadius: '50%',
                    background: 'var(--accent-secondary)',
                    boxShadow: '0 0 10px var(--accent-secondary)',
                  }}
                  animate={{
                    x: [0, -pos.x * 0.8],
                    y: [0, -pos.y * 0.8],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5, ease: 'easeIn' }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Systems Built For Marquee */}
      <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '3rem', paddingBottom: '1rem', overflow: 'hidden', position: 'relative' }}>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2rem', fontWeight: 600 }}>Systems Built For</p>
        
        {/* Fade edges */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '150px', background: 'linear-gradient(90deg, var(--bg-dark) 0%, transparent 100%)', zIndex: 2, pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '150px', background: 'linear-gradient(270deg, var(--bg-dark) 0%, transparent 100%)', zIndex: 2, pointerEvents: 'none' }}></div>

        <motion.div 
          style={{ display: 'flex', gap: '1rem', width: 'max-content' }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {/* Duplicate list twice for seamless loop */}
          {[...['D2C Brands', 'Legal Firms', 'E-commerce', 'SaaS Startups', 'Real Estate', 'Clinics & Healthcare', 'Coaches & Consultants'], ...['D2C Brands', 'Legal Firms', 'E-commerce', 'SaaS Startups', 'Real Estate', 'Clinics & Healthcare', 'Coaches & Consultants']].map((tag, i) => (
            <span key={i} style={{ 
              padding: '0.75rem 1.75rem', 
              borderRadius: '9999px', 
              background: 'rgba(5, 10, 20, 0.6)', 
              border: '1px solid rgba(255,255,255,0.06)', 
              fontSize: '0.9rem',
              color: '#8c95a6',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }}
            onMouseOver={(e) => { e.target.style.color = '#ffffff'; e.target.style.background = 'rgba(15, 25, 40, 0.8)'; e.target.style.borderColor = 'rgba(255,255,255,0.15)'; }}
            onMouseOut={(e) => { e.target.style.color = '#8c95a6'; e.target.style.background = 'rgba(5, 10, 20, 0.6)'; e.target.style.borderColor = 'rgba(255,255,255,0.06)'; }}
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
