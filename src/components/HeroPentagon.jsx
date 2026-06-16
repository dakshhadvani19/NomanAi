import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

// Advanced Multi-Line Typewriter with following cursor
const MultiLineTypewriter = ({ lines, typingSpeed = 35, linePause = 600 }) => {
  const [visibleChars, setVisibleChars] = useState(0);
  const totalChars = lines.reduce((acc, line) => acc + line.text.length, 0);

  useEffect(() => {
    if (visibleChars < totalChars) {
      // Check if we just finished a line
      let isEndOfLine = false;
      let charsSoFar = 0;
      for (const line of lines) {
        charsSoFar += line.text.length;
        if (visibleChars === charsSoFar && visibleChars !== totalChars) {
          isEndOfLine = true;
          break;
        }
      }

      const delay = isEndOfLine ? linePause : typingSpeed;

      const timeout = setTimeout(() => {
        setVisibleChars(prev => prev + 1);
      }, delay);
      
      return () => clearTimeout(timeout);
    }
  }, [visibleChars, totalChars, typingSpeed, linePause, lines]);

  let charsRendered = 0;

  return (
    <>
      {lines.map((line, lineIndex) => {
        const lineStartChars = charsRendered;
        
        // How many characters of THIS line should be visible?
        const visibleInThisLine = Math.max(0, Math.min(line.text.length, visibleChars - lineStartChars));
        
        charsRendered += line.text.length;

        // Only render the <br /> if we have started rendering this line
        const showBr = line.br && visibleChars >= lineStartChars;

        return (
          <React.Fragment key={lineIndex}>
            {showBr && <br />}
            <span style={{ color: line.color || 'inherit' }}>
              {line.text.slice(0, visibleInThisLine).split('').map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  initial={{ opacity: 0, y: 5, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  style={{ display: 'inline-block', whiteSpace: 'pre' }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </React.Fragment>
        );
      })}
      
      {/* The Following Cursor */}
      <motion.span
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          display: 'inline-block',
          width: '4px',
          height: '0.9em',
          background: 'linear-gradient(180deg, #4285F4, #9b72cb, #d96570)',
          marginLeft: '4px',
          verticalAlign: 'bottom',
          borderRadius: '2px',
          boxShadow: '0 0 8px rgba(155, 114, 203, 0.5)'
        }}
      />
    </>
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

  const typewriterLines = [
    { text: "Your business is ", br: false },
    { text: "leaking revenue.", br: true },
    { text: "We seal it.", br: true, color: 'var(--text-muted)' }
  ];

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
            <MultiLineTypewriter lines={typewriterLines} typingSpeed={40} linePause={500} />
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 0.8 }}
            style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '500px' }}
          >
            AI automations, voice agents, and web solutions — engineered around your outcomes, not our deliverables.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 0.6 }}
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
        <div style={{ position: 'relative', height: '420px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

          {/* Static SVG: lines + animated dots traveling outward */}
          <svg
            style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}
          >
            <defs>
              {/* Gradient for lines */}
              <linearGradient id="lineGradH" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(6,182,212,0.6)" />
                <stop offset="100%" stopColor="rgba(14,165,233,0.05)" />
              </linearGradient>
              {/* Glow filter for dots */}
              <filter id="dotGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g transform={`translate(50%, 50%)`}>
              {/* Subtle orbit ring */}
              <circle cx="0" cy="0" r={orbitRadius} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3 5" />

              {outerNodes.map((pos, i) => {
                const lineLen = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
                // Path from center (0,0) to the edge of the outer node circle (shrink by 35px so dot stops at node edge)
                const scale = (lineLen - 35) / lineLen;
                const ex = pos.x * scale;
                const ey = pos.y * scale;
                const pathId = `path-${i}`;
                const dotDuration = 1.8 + i * 0.15; // slight stagger per arm

                return (
                  <g key={i}>
                    {/* Radial line: center → node */}
                    <line
                      x1="0" y1="0"
                      x2={pos.x} y2={pos.y}
                      stroke="rgba(6,182,212,0.18)"
                      strokeWidth="1.5"
                    />

                    {/* Invisible path for animateMotion */}
                    <path id={pathId} d={`M 0 0 L ${ex} ${ey}`} fill="none" stroke="none" />

                    {/* PRIMARY dot — travels 0→node */}
                    <circle r="4" fill="rgba(6,182,212,0.95)" filter="url(#dotGlow)">
                      <animateMotion
                        dur={`${dotDuration}s`}
                        repeatCount="indefinite"
                        begin={`${i * 0.36}s`}
                        keyTimes="0;0.7;1"
                        keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                        calcMode="spline"
                      >
                        <mpath href={`#${pathId}`} />
                      </animateMotion>
                      <animate
                        attributeName="opacity"
                        values="0;1;1;0"
                        keyTimes="0;0.05;0.8;1"
                        dur={`${dotDuration}s`}
                        repeatCount="indefinite"
                        begin={`${i * 0.36}s`}
                      />
                      <animate
                        attributeName="r"
                        values="2;4;4;2"
                        keyTimes="0;0.1;0.8;1"
                        dur={`${dotDuration}s`}
                        repeatCount="indefinite"
                        begin={`${i * 0.36}s`}
                      />
                    </circle>

                    {/* TRAIL dot — slightly behind primary */}
                    <circle r="2.5" fill="rgba(14,165,233,0.5)" filter="url(#dotGlow)">
                      <animateMotion
                        dur={`${dotDuration}s`}
                        repeatCount="indefinite"
                        begin={`${i * 0.36 + 0.12}s`}
                        keyTimes="0;0.7;1"
                        keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                        calcMode="spline"
                      >
                        <mpath href={`#${pathId}`} />
                      </animateMotion>
                      <animate
                        attributeName="opacity"
                        values="0;0.6;0.6;0"
                        keyTimes="0;0.05;0.8;1"
                        dur={`${dotDuration}s`}
                        repeatCount="indefinite"
                        begin={`${i * 0.36 + 0.12}s`}
                      />
                    </circle>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Central Node — fixed, no rotation */}
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
              boxShadow: '0 0 30px rgba(6,182,212,0.3), inset 0 0 20px rgba(6,182,212,0.15)',
              textAlign: 'center',
            }}
            animate={{ boxShadow: [
              '0 0 30px rgba(6,182,212,0.3), inset 0 0 20px rgba(6,182,212,0.15)',
              '0 0 55px rgba(6,182,212,0.6), inset 0 0 30px rgba(6,182,212,0.25)',
              '0 0 30px rgba(6,182,212,0.3), inset 0 0 20px rgba(6,182,212,0.15)',
            ]}}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span style={{ fontSize: '0.875rem', fontWeight: 800, letterSpacing: '0.05em', lineHeight: 1.3 }}>
              YOUR<br/>BUSINESS
            </span>
          </motion.div>

          {/* Outer Nodes — absolutely positioned, static */}
          {outerNodes.map((pos, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.6, ease: 'easeOut' }}
              style={{
                width: '70px', height: '70px',
                borderRadius: '50%',
                background: 'rgba(3,7,18,0.85)',
                border: '1px solid rgba(6,182,212,0.25)',
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                left: `calc(50% + ${pos.x}px - 35px)`,
                top:  `calc(50% + ${pos.y}px - 35px)`,
                backdropFilter: 'blur(10px)',
                color: 'var(--text-muted)',
                fontSize: '0.63rem',
                fontWeight: 700,
                textAlign: 'center',
                letterSpacing: '0.06em',
                boxShadow: '0 0 0 rgba(6,182,212,0)',
                zIndex: 5,
              }}
              whileHover={{ scale: 1.12, boxShadow: '0 0 20px rgba(6,182,212,0.4)', color: '#ffffff' }}
            >
              {pos.label}
            </motion.div>
          ))}
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
