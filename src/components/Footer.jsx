import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Zap } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Revenue Systems', href: '/revenue-systems' },
  { label: 'AI Voice Agents', href: '/voice-agents' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '/audit' },
];

/* tiny animated particle */
function Particle({ style }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        width: 3,
        height: 3,
        borderRadius: '50%',
        background: 'rgba(6,182,212,0.5)',
        pointerEvents: 'none',
        ...style,
      }}
      animate={{ y: [0, -18, 0], opacity: [0.2, 0.8, 0.2] }}
      transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 2 }}
    />
  );
}

export default function Footer() {
  const [isHovered, setIsHovered] = useState(false);

  const particles = Array.from({ length: 12 }, (_, i) => ({
    left: `${8 + i * 8}%`,
    top: `${20 + (i % 3) * 25}%`,
  }));

  return (
    <motion.footer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        background: 'rgba(3,7,18,0.97)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
        zIndex: 10,
        paddingBottom: '10px'
      }}
    >
      {/* Glowing top divider line */}
      <div style={{
        position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.5), rgba(99,102,241,0.4), transparent)',
      }} />

      {/* Floating orb */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', bottom: '-60px', left: '40%',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Particles */}
      {particles.map((p, i) => (
        <Particle key={i} style={p} />
      ))}

      {/* ── Main Grid ── */}
      <div
        className="container"
        style={{
          position: 'relative', zIndex: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          padding: '4rem 2rem 3rem',
        }}
      >
        {/* Brand col */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', color: '#fff' }}>OUTPERA</span>
            <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}> AI</span>
          </Link>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', lineHeight: 1.7, maxWidth: '260px', marginBottom: '1.25rem' }}>
            AI automations, voice agents, and web systems — engineered around your outcomes, not our deliverables.
          </p>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
            <span style={{ fontWeight: 700, color: '#fff', display: 'block', marginBottom: '4px' }}>Founders &amp; Contact:</span>
            Tharun Naik: +91 6362852526<br />
            Daksh Hadvani: +91 96646 96850
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem' }}>
            <span>outpera.com</span>
          </div>
        </motion.div>

        {/* Navigation col */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1.25rem' }}>Navigation</p>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            {navLinks.map(({ label, href }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.07 }}
              >
                <Link
                  to={href}
                  style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  onMouseOver={e => e.currentTarget.style.color = '#fff'}
                  onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>

        {/* Get Started col */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1.25rem' }}>Get Started</p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '260px' }}>
            Start with a free 30-minute business audit. We'll show you exactly where you're losing money.
          </p>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/audit"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.7rem 1.5rem', borderRadius: '999px',
                background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                color: '#fff', textDecoration: 'none',
                fontWeight: 700, fontSize: '0.85rem',
                boxShadow: '0 0 20px rgba(99,102,241,0.35)',
                transition: 'box-shadow 0.9s',
              }}
              onMouseOver={e => e.currentTarget.style.boxShadow = '0 0 35px rgba(99,102,241,0.55)'}
              onMouseOut={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(99,102,241,0.35)'}
            >
              <Zap size={15} /> Book Free Audit
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', zIndex: 2 }}>
        <div
          className="container"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', padding: '1.25rem 2rem', color: 'rgba(255,255,255,0.25)', fontSize: '0.72rem' }}
        >
          <span>© 2026 Outpera AI. All rights reserved.</span>
          <span>AI Voice Agents &amp; Automation Agency · Hyderabad, India · 2026</span>
        </div>
        {/* Visually hidden brand aliases for SEO crawlers — screen-reader accessible */}
        <p
          aria-label="Brand name variants"
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0,0,0,0)',
            whiteSpace: 'nowrap',
            borderWidth: 0,
          }}
        >
          Outpera is also known as Outpero, Outperra, and NomanAi — an AI Voice Agent and AI Automation agency based in Hyderabad, India, serving businesses across India with voice agents, WhatsApp automation, and revenue systems.
        </p>
      </div>
    </motion.footer>
  );
}
