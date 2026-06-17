import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Menu, X } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Revenue Systems', path: '/revenue-systems' },
    { name: 'AI Voice Agents', path: '/voice-agents'},
    { name: 'Solutions', path: '/solutions' },
    { name: 'Contact', path: '/audit' }
  ];

  return (
    <>
      <style>{`
        .mobile-only { display: none !important; }
        @media (max-width: 900px) {
          .mobile-only { display: flex !important; }
        }
      `}</style>
      <motion.div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 100, paddingTop: '1.5rem', pointerEvents: 'none' }}>
        <motion.nav 
        className="nav-container"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
          padding: '0.6rem 0.6rem 0.6rem 1.5rem',
          background: 'rgba(10, 13, 28, 0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '999px',
          pointerEvents: 'auto',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '0.05em', textDecoration: 'none', color: '#fff' }}>
          <Sparkles className="text-gradient" size={20} />
          <span>OUTPERO</span>
        </Link>

        {/* Links container */}
        <div 
          className="desktop-only"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          onMouseLeave={() => setHoveredLink(null)}
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const isHovered = hoveredLink === item.path;

            return (
              <Link 
                key={item.path} 
                to={item.path} 
                onMouseEnter={() => setHoveredLink(item.path)}
                style={{ 
                  position: 'relative',
                  padding: '0.5rem 1.1rem',
                  textDecoration: 'none', 
                  fontSize: '0.85rem',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                  transition: 'color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  outline: 'none'
                }}
              >
                {/* Liquid Text Stretch Effect */}
                <motion.span 
                  animate={{ 
                    letterSpacing: (isHovered || isActive) ? '0.04em' : '0em',
                    fontWeight: (isHovered || isActive) ? 700 : 500,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  style={{ position: 'relative', zIndex: 2 }}
                >
                  {item.name}
                </motion.span>
                
                {/* Badge */}
                {item.badge && (
                  <span style={{ 
                    position: 'absolute', top: '-2px', right: '-8px', 
                    background: 'var(--accent-secondary)', color: '#fff', 
                    fontSize: '0.55rem', padding: '2px 5px', borderRadius: '4px', fontWeight: 800,
                    zIndex: 2
                  }}>
                    {item.badge}
                  </span>
                )}

                {/* Hover Indicator */}
                {isHovered && !isActive && (
                  <motion.div
                    layoutId="navbar-hover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                    style={{
                      position: 'absolute', inset: 0,
                      background: 'rgba(255,255,255,0.06)',
                      borderRadius: '999px',
                      zIndex: 1
                    }}
                  />
                )}

                {/* Active Indicator (Liquid Pill) */}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active"
                    transition={{ type: 'spring', stiffness: 250, damping: 22 }}
                    style={{
                      position: 'absolute', inset: 0,
                      background: 'rgba(255,255,255,0.1)',
                      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.15)',
                      borderRadius: '999px',
                      zIndex: 1
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          {/* Glass Cyan Droplet CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              borderRadius: '999px',
              boxShadow: '0 8px 25px rgba(6, 182, 212, 0.25)',
              cursor: 'pointer'
            }}
          >
            <Link
              to="/audit"
              style={{ 
                padding: '0.6rem 1.25rem', 
                fontSize: '0.85rem', 
                fontWeight: 700,
                textDecoration: 'none',
                color: '#ffffff',
                borderRadius: '999px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'linear-gradient(135deg, rgba(6,182,212,0.4) 0%, rgba(6,182,212,0.05) 100%)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 10px rgba(6,182,212,0.6), 0 0 0 1px rgba(6,182,212,0.3)',
                textShadow: '0 2px 5px rgba(0,0,0,0.3)'
              }}
            >
              Book Audit <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <div 
            className="mobile-only"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'auto'
            }}
          >
            {isMobileMenuOpen ? <X size={20} color="#fff" /> : <Menu size={20} color="#fff" />}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: '1.5rem',
              right: '1.5rem',
              marginTop: '1rem',
              background: 'rgba(10, 13, 28, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '24px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              zIndex: 99,
              pointerEvents: 'auto',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  color: location.pathname === item.path ? '#fff' : 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  padding: '1rem 0.5rem',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                {item.name}
                <ArrowRight size={16} opacity={0.5} />
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  </>
  );
}
