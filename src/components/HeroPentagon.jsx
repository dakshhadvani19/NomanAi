import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

// Track if the animation has played in this React session. 
// This survives navigation but resets on hard browser refresh.
let hasTypedOnce = false;

// Advanced Multi-Line Typewriter with following cursor
const MultiLineTypewriter = ({ lines, typingSpeed = 35, linePause = 150 }) => {
  const totalChars = lines.reduce((acc, line) => acc + line.text.length, 0);
  
  const [visibleChars, setVisibleChars] = useState(() => {
    // Check if we already typed this in the current React app session
    if (hasTypedOnce) {
      return totalChars;
    }
    return 0;
  });

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
        setVisibleChars(prev => {
          const next = prev + 1;
          if (next >= totalChars) {
            hasTypedOnce = true;
          }
          return next;
        });
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
      {visibleChars < totalChars && (
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
      )}
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
      
      <div className="hero-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}>
        
        {/* Left Column: Text & CTA */}
        <div style={{ zIndex: 10 }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.75rem', borderRadius: '999px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2rem' }}
          >
            SYSTEMS THAT OUTPERFORM
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
            initial={{ opacity: 0, y: 20, pointerEvents: 'none' }}
            animate={{ opacity: 1, y: 0, pointerEvents: 'auto' }}
            transition={{ delay: 3.5, duration: 0.6 }}
            style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}
          >
            <Link to="/audit" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem', textDecoration: 'none' }}>
              Book a Free Audit 

              
            </Link>
            <Link to="/revenue-systems" style={{ textDecoration: 'none' }}>
              <motion.div 
                style={{ 
                  color: 'var(--text-main)', 
                  textDecoration: 'none', 
                  fontWeight: 600, 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  padding: '0.9rem 2rem', 
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'transparent'
                }} 
                whileHover={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 0 25px rgba(255, 255, 255, 0.1)'
                }}
                transition={{ duration: 0.3 }}
                whileTap={{ scale: 0.97 }}
              >
                See Our Systems
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Right Column: Interactive Diagram */}
        <div className="hero-diagram" style={{ position: 'relative', height: '420px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

          {/* Dots: travel from edge of central circle to edge of each outer circle */}
          {outerNodes.map((pos, i) => {
            const dist = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
            const ux = pos.x / dist;
            const uy = pos.y / dist;

            // Start at edge of central circle (r=60px)
            const sx = ux * 62;
            const sy = uy * 62;
            // End at edge of each outer circle (node r=35px from center)
            const ex = pos.x - ux * 37;
            const ey = pos.y - uy * 37;

            return [0, 1, 2].map((d) => {
              const size = d === 0 ? 8 : d === 1 ? 6 : 4;
              const dur = 1.6;
              const del = i * 0.4 + d * 0.55;
              return (
                <motion.div
                  key={`dot-${i}-${d}`}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: size,
                    height: size,
                    marginLeft: -size / 2,
                    marginTop: -size / 2,
                    borderRadius: '50%',
                    background: '#0ea5e9',
                    boxShadow: '0 0 8px 2px rgba(14,165,233,0.7)',
                    zIndex: 6,
                    pointerEvents: 'none',
                  }}
                  animate={{
                    x: [sx, ex],
                    y: [sy, ey],
                    opacity: [0, 1, 1, 0],
                    scale: [0.5, 1, 1, 0.5],
                  }}
                  transition={{
                    x: { duration: dur, repeat: Infinity, delay: del, ease: 'easeInOut', repeatDelay: 0 },
                    y: { duration: dur, repeat: Infinity, delay: del, ease: 'easeInOut', repeatDelay: 0 },
                    opacity: { duration: dur, repeat: Infinity, delay: del, times: [0, 0.08, 0.85, 1], repeatDelay: 0 },
                    scale: { duration: dur, repeat: Infinity, delay: del, times: [0, 0.1, 0.85, 1], repeatDelay: 0 },
                  }}
                />
              );
            });
          })}

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
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
              cursor: 'pointer'
            }}
            animate={{ boxShadow: [
              '0 0 30px rgba(6,182,212,0.3), inset 0 0 20px rgba(6,182,212,0.15)',
              '0 0 55px rgba(6,182,212,0.6), inset 0 0 30px rgba(6,182,212,0.25)',
              '0 0 30px rgba(6,182,212,0.3), inset 0 0 20px rgba(6,182,212,0.15)',
            ]}}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2, repeat: 0 } }}
          >
            <span style={{ fontSize: '0.875rem', fontWeight: 800, letterSpacing: '0.05em', lineHeight: 1.3, position: 'relative', zIndex: 2 }}>
              YOUR<br/>BUSINESS
            </span>
          </motion.div>

          {/* Outer Nodes — absolutely positioned, static */}
          {outerNodes.map((pos, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { delay: 0.3 + i * 0.15, duration: 0.6, ease: 'easeOut' } }}
              style={{
                width: '70px', height: '70px',
                borderRadius: '50%',
                background: 'rgba(3,7,18,0.85)',
                border: '3px solid rgba(6,182,212,0.25)',
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                left: `calc(50% + ${pos.x}px - 35px)`,
                top:  `calc(50% + ${pos.y}px - 35px)`,
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                color: 'var(--text-muted)',
                userSelect: 'none',
                fontSize: '0.63rem',
                fontWeight: 700,
                textAlign: 'center',
                letterSpacing: '0.06em',
                boxShadow: '0 0 0 rgba(6,182,212,0)',
                zIndex: 5,
                cursor: 'pointer',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
              }}
              whileHover={{ 
                scale: 1.15, 
                boxShadow: '0 0 20px rgba(6,182,212,0.6)', 
                color: '#ffffff',
                borderColor: 'rgba(6,182,212,0.8)',
                transition: { duration: 0.2, delay: 0 } 
              }}
            >
              <span style={{ position: 'relative', zIndex: 2 }}>{pos.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
