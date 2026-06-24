import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

// ------------------------------------------------------------------
// Helper: decide layout role based on relative index
// ------------------------------------------------------------------
function getRole(index, active, total) {
  const diff = ((index - active) % total + total) % total;
  if (diff === 0) return 'center';
  if (diff === 1) return 'right';
  return 'left';
}

// ------------------------------------------------------------------
// Per-role animation targets
// ------------------------------------------------------------------
const VARIANTS = {
  center: {
    x: '0%',
    scale: 1,
    rotate: 0,
    opacity: 1,
    zIndex: 30,
    filter: 'blur(0px) brightness(1) saturate(1)',
  },
  right: {
    x: '46%',
    scale: 0.80,
    rotate: 7,
    opacity: 0.22,
    zIndex: 20,
    filter: 'blur(8px) brightness(0.35) saturate(0.4)',
  },
  left: {
    x: '-46%',
    scale: 0.80,
    rotate: -7,
    opacity: 0.22,
    zIndex: 20,
    filter: 'blur(8px) brightness(0.35) saturate(0.4)',
  },
};

const SPRING = {
  type: 'spring',
  stiffness: 280,
  damping: 32,
  mass: 0.9,
};

// ------------------------------------------------------------------
// Individual card renderer
// ------------------------------------------------------------------
function FanCard({ sys, role, onClick, index }) {
  const isCenter = role === 'center';

  const cardContent = (
    <motion.div
      className="glass-panel fan-card-inner"
      style={{
        padding: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        color: 'inherit',
        cursor: isCenter ? 'pointer' : 'pointer',
        userSelect: 'none',
        pointerEvents: 'all',
        transition: 'box-shadow 0.3s ease',
        boxShadow: isCenter
          ? '0 0 0 1px rgba(0,188,212,0.25), 0 32px 80px rgba(0,0,0,0.5), 0 0 60px rgba(0,188,212,0.07)'
          : '0 16px 48px rgba(0,0,0,0.4)',
      }}
      whileHover={isCenter ? { boxShadow: '0 0 0 1px rgba(0,188,212,0.45), 0 40px 100px rgba(0,0,0,0.55), 0 0 80px rgba(0,188,212,0.12)' } : {}}
    >
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', minHeight: '24px' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', letterSpacing: '0.05em' }}>{sys.label}</span>
          {sys.badge && (
            <span className="badge" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>
              {sys.badge}
            </span>
          )}
        </div>
        <h3 style={{ fontSize: '2rem', marginBottom: '0.75rem', color: '#fff' }}>{sys.title}</h3>
        <p style={{ color: 'var(--text-muted)', minHeight: '48px' }}>{sys.desc}</p>
      </div>

      <div style={{ flexGrow: 1, marginBottom: '2rem' }}>
        <p style={{
          fontSize: '0.875rem',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '1rem',
          fontWeight: 600,
        }}>
          KEY FEATURES
        </p>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {sys.features.map((feat, j) => (
            <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
              <CheckCircle2 size={16} className="text-gradient" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{
        marginTop: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid var(--glass-border)',
        paddingTop: '1.5rem',
        paddingBottom: '1rem',
      }}>
        <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>{sys.price}</span>
        {isCenter && (
          <div style={{
            color: 'var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            EXPLORE
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              style={{ display: 'flex' }}
            >
              <ArrowRight size={16} />
            </motion.span>
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <motion.div
      key={index}
      layout
      animate={VARIANTS[role]}
      transition={SPRING}
      onClick={onClick}
      style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        translateX: '-50%',
        width: '360px',
        height: '100%',
        originX: '50%',
        originY: '50%',
        willChange: 'transform, opacity',
      }}
    >
      {isCenter ? (
        <Link to={sys.link} style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </motion.div>
  );
}

// ------------------------------------------------------------------
// Main Carousel
// ------------------------------------------------------------------
export default function CardFanCarousel({ cards }) {
  const [active, setActive] = useState(0);
  const total = cards.length;

  const goPrev = () => setActive((a) => (a - 1 + total) % total);
  const goNext = () => setActive((a) => (a + 1) % total);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3.5rem' }}>
      {/* Fan container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '900px',
          height: '520px',
          margin: '0 auto',
        }}
      >
        {cards.map((card, i) => {
          const role = getRole(i, active, total);
          return (
            <FanCard
              key={i}
              index={i}
              sys={card}
              role={role}
              onClick={() => role !== 'center' && setActive(i)}
            />
          );
        })}
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {/* Prev button — Liquid Glass */}
        <button
          className="liquid-glass-btn"
          onClick={goPrev}
          aria-label="Previous system"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Dots */}
        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
          {cards.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to card ${i + 1}`}
              animate={{
                width: i === active ? 28 : 8,
                backgroundColor: i === active ? 'var(--accent-primary)' : 'rgba(255,255,255,0.25)',
                boxShadow: i === active ? '0 0 10px rgba(0,188,212,0.6)' : 'none',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              style={{
                height: 8,
                borderRadius: 999,
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                outline: 'none',
              }}
            />
          ))}
        </div>

        {/* Next button — Liquid Glass */}
        <button
          className="liquid-glass-btn"
          onClick={goNext}
          aria-label="Next system"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
