import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Moon, Sparkles } from 'lucide-react';

export default function Navbar() {
  const links = ['Home', 'Revenue Systems', 'AI Voice Agents', 'Solutions', 'About', 'Contact'];

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        background: 'rgba(3, 7, 18, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--glass-border)',
        zIndex: 100
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.5rem', letterSpacing: '0.05em' }}>
        <Sparkles className="text-gradient" size={24} />
        <span>OUTPERO</span>
      </div>

      <div style={{ display: 'none', gap: '2rem', '@media (min-width: 1024px)': { display: 'flex' } }}>
        {/* Responsive hide, but we'll just show for now using inline style override logic or assume desktop */}
      </div>
      
      {/* Links container */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {links.map((link, i) => {
          let to = '#';
          if (link === 'Home') to = '/';
          if (link === 'AI Voice Agents') to = '/voice-agents';
          if (link === 'Revenue Systems') to = '/revenue-systems';
          
          return (
            <Link key={i} to={to} style={{ 
              color: link === 'Home' ? 'var(--accent-primary)' : 'var(--text-muted)', 
              textDecoration: 'none', 
              fontWeight: 500,
              fontSize: '0.9rem',
              transition: 'color 0.2s',
              position: 'relative'
            }}
            onMouseOver={(e) => e.target.style.color = 'var(--text-main)'}
            onMouseOut={(e) => e.target.style.color = link === 'Home' ? 'var(--accent-primary)' : 'var(--text-muted)'}
            >
              {link}
              {link === 'AI Voice Agents' && (
                <span style={{ 
                  position: 'absolute', top: '-10px', right: '-30px', 
                  background: 'var(--accent-secondary)', color: '#fff', 
                  fontSize: '0.6rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 
                }}>NEW</span>
              )}
            </Link>
          );
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button style={{ 
          background: 'transparent', border: '1px solid var(--glass-border)', 
          color: 'var(--text-muted)', width: '36px', height: '36px', 
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'all 0.2s'
        }}
        onMouseOver={(e) => { e.currentTarget.style.color = 'var(--text-main)'; e.currentTarget.style.borderColor = 'var(--glass-highlight)'; }}
        onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--glass-border)'; }}
        >
          <Moon size={16} />
        </button>
        <Link
          to="/audit"
          className="btn btn-secondary"
          style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem', textDecoration: 'none' }}
        >
          Book Free Audit
        </Link>
      </div>
    </motion.nav>
  );
}
