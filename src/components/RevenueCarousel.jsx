import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
function getRole(index, active, total) {
  const diff = ((index - active) % total + total) % total;
  if (diff === 0) return 'center';
  if (diff === 1) return 'right';
  return 'left';
}

/* ─────────────────────────────────────────────
   PER-ROLE ANIMATION VARIANTS  (large card)
───────────────────────────────────────────── */
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
    x: '50%',
    scale: 0.76,
    rotate: 7,
    opacity: 0.38,
    zIndex: 20,
    filter: 'blur(5px) brightness(0.50) saturate(0.55)',
  },
  left: {
    x: '-50%',
    scale: 0.76,
    rotate: -7,
    opacity: 0.38,
    zIndex: 20,
    filter: 'blur(5px) brightness(0.50) saturate(0.55)',
  },
};

const SPRING = { type: 'spring', stiffness: 240, damping: 30, mass: 1 };

/* ─────────────────────────────────────────────
   WATER RIPPLE EFFECT (animated SVG blobs)
   Absolutely positioned behind the active card
───────────────────────────────────────────── */
function WaterRipple({ active }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={active}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '120%',
          height: '130%',
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        {/* Pulsing outer ring */}
        {[0, 1, 2].map((n) => (
          <motion.div
            key={n}
            animate={{
              scale: [1, 1.3 + n * 0.12, 1],
              opacity: [0.12 - n * 0.03, 0, 0.12 - n * 0.03],
            }}
            transition={{
              duration: 3.5 + n * 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: n * 0.7,
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: `${320 + n * 80}px`,
              height: `${320 + n * 80}px`,
              borderRadius: '50%',
              border: `1px solid rgba(6,182,212,${0.25 - n * 0.06})`,
              boxShadow: `0 0 40px rgba(6,182,212,${0.08 - n * 0.02})`,
            }}
          />
        ))}

        {/* Flowing blob glow */}
        <motion.div
          animate={{
            scale: [1, 1.1, 0.95, 1],
            x: [0, 15, -10, 0],
            y: [0, -10, 12, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            height: 500,
            borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
            background:
              'radial-gradient(ellipse at center, rgba(6,182,212,0.07) 0%, rgba(99,102,241,0.04) 50%, transparent 75%)',
            filter: 'blur(30px)',
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   LIQUID GLASS CARD SURFACE
───────────────────────────────────────────── */
function LiquidCard({ sys, isCenter, onClick, formatPrice }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Subtle tilt only when center
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [3, -3]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-3, 3]), { stiffness: 200, damping: 20 });
  const shimmerX = useTransform(mouseX, [0, 1], ['-30%', '130%']);
  const shimmerY = useTransform(mouseY, [0, 1], ['-30%', '130%']);

  function handleMouseMove(e) {
    if (!isCenter || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }
  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  const inner = (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={!isCenter ? onClick : undefined}
      style={{
        position: 'relative',
        height: '100%',
        borderRadius: 28,
        overflow: 'hidden',
        cursor: isCenter ? 'default' : 'pointer',
        rotateX: isCenter ? rotateX : 0,
        rotateY: isCenter ? rotateY : 0,
        transformStyle: 'preserve-3d',
        // Liquid glass layered background
        background: isCenter
          ? 'linear-gradient(145deg, rgba(6,182,212,0.10) 0%, rgba(10,13,30,0.72) 40%, rgba(99,102,241,0.06) 100%)'
          : 'rgba(10,13,30,0.5)',
        backdropFilter: 'blur(28px) saturate(150%)',
        WebkitBackdropFilter: 'blur(28px) saturate(150%)',
        border: isCenter
          ? '1px solid rgba(6,182,212,0.22)'
          : '1px solid rgba(255,255,255,0.06)',
        boxShadow: isCenter
          ? [
              'inset 0 1px 0 rgba(6,182,212,0.25)',
              'inset 0 -1px 0 rgba(0,0,0,0.4)',
              '0 0 0 1px rgba(6,182,212,0.1)',
              '0 40px 100px rgba(0,0,0,0.6)',
              '0 0 80px rgba(6,182,212,0.08)',
            ].join(', ')
          : '0 20px 60px rgba(0,0,0,0.4)',
      }}
    >
      {/* Animated water shimmer (mouse-tracked) */}
      {isCenter && (
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 28,
            background: 'radial-gradient(circle 180px at var(--mx, 50%) var(--my, 30%), rgba(6,182,212,0.10), transparent 70%)',
            pointerEvents: 'none',
            zIndex: 1,
            left: shimmerX,
            top: shimmerY,
            width: '60%',
            height: '60%',
            filter: 'blur(20px)',
          }}
        />
      )}

      {/* Top edge highlight (liquid refraction effect) */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 1,
        background: isCenter
          ? 'linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.5) 30%, rgba(255,255,255,0.3) 60%, transparent 100%)'
          : 'rgba(255,255,255,0.06)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />

      {/* Left edge highlight */}
      {isCenter && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, bottom: 0,
          width: 1,
          background: 'linear-gradient(180deg, rgba(6,182,212,0.4) 0%, rgba(99,102,241,0.2) 50%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }} />
      )}

      {/* Floating orb accent (top-right corner) */}
      {isCenter && (
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: -40, right: -40,
            width: 200, height: 200, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)',
            filter: 'blur(20px)', pointerEvents: 'none', zIndex: 1,
          }}
        />
      )}

      {/* CARD CONTENT */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: '2.75rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.75rem',
      }}>
        {/* Header */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 40, height: 40, borderRadius: 12,
              background: 'rgba(6,182,212,0.1)',
              border: '1px solid rgba(6,182,212,0.2)',
              color: '#22d3ee',
            }}>
              {sys.icon}
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#22d3ee' }}>
              System {sys.num}
            </span>
            {sys.badge && (
              <span style={{
                padding: '0.2rem 0.65rem', borderRadius: 999,
                background: 'rgba(6,182,212,0.15)',
                border: '1px solid rgba(6,182,212,0.35)',
                color: '#67e8f9', fontSize: '0.65rem', fontWeight: 800,
                textTransform: 'uppercase', letterSpacing: '0.1em',
              }}>{sys.badge}</span>
            )}
          </div>

          <h3 style={{
            fontSize: isCenter ? 'clamp(1.8rem, 4vw, 2.6rem)' : '1.6rem',
            fontWeight: 900, color: '#fff',
            marginBottom: '0.5rem', lineHeight: 1.1,
          }}>
            {sys.title}
          </h3>

          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.75)', fontWeight: 600, marginBottom: '0.5rem' }}>
            {sys.desc}
          </p>

          {isCenter && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, maxWidth: 560 }}
            >
              {sys.longDesc}
            </motion.p>
          )}
        </div>

        {/* Features */}
        {isCenter && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <p style={{
              fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
              marginBottom: '1rem',
            }}>
              What's Included
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
              {sys.features.map((feat, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + j * 0.07 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}
                >
                  <CheckCircle2 size={15} color="#22d3ee" style={{ flexShrink: 0 }} />
                  {feat}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Footer / Pricing */}
        <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: '1rem' }}>
            <span style={{ fontSize: isCenter ? '1.35rem' : '1.1rem', fontWeight: 800, color: '#f9fafb' }}>
              From {formatPrice(0, { inrBase: sys.priceInr, decimalsOverride: 0 })}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
              {sys.subpriceInr
                ? `${formatPrice(0, { inrBase: sys.subpriceInr, decimalsOverride: 0 })}${sys.subpriceText}`
                : sys.subprice}
            </span>
          </div>

          {isCenter && (
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>
                Best for: {sys.bestFor}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  if (isCenter && sys.link) {
    return (
      <Link to={sys.link} style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
        {inner}
      </Link>
    );
  }
  return inner;
}

/* ─────────────────────────────────────────────
   MAIN CAROUSEL
───────────────────────────────────────────── */
export default function RevenueCarousel({ cards, formatPrice }) {
  const [active, setActive] = useState(0);
  const total = cards.length;

  const goPrev = () => setActive((a) => (a - 1 + total) % total);
  const goNext = () => setActive((a) => (a + 1) % total);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3.5rem' }}>
      {/* FAN STAGE */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 760,
        height: 540,
        margin: '0 auto',
        perspective: 1200,
      }}>
        {/* Water ripple backdrop (only for active card) */}
        <WaterRipple active={active} />

        {cards.map((card, i) => {
          const role = getRole(i, active, total);
          const isCenter = role === 'center';
          return (
            <motion.div
              key={i}
              animate={VARIANTS[role]}
              transition={SPRING}
              onClick={() => !isCenter && setActive(i)}
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                translateX: '-50%',
                width: '100%',
                height: '100%',
                originX: '50%',
                originY: '50%',
                willChange: 'transform, opacity, filter',
              }}
            >
              <LiquidCard
                sys={card}
                isCenter={isCenter}
                formatPrice={formatPrice}
                onClick={() => setActive(i)}
              />
            </motion.div>
          );
        })}
      </div>

      {/* NAVIGATION */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {/* Prev */}
        <motion.button
          className="liquid-glass-btn"
          onClick={goPrev}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.93 }}
          aria-label="Previous"
        >
          <ChevronLeft size={22} />
        </motion.button>

        {/* Dots */}
        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
          {cards.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              animate={{
                width: i === active ? 32 : 8,
                backgroundColor: i === active ? '#22d3ee' : 'rgba(255,255,255,0.22)',
                boxShadow: i === active ? '0 0 14px rgba(6,182,212,0.7)' : 'none',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              style={{ height: 8, borderRadius: 999, border: 'none', padding: 0, cursor: 'pointer', outline: 'none' }}
              aria-label={`Go to system ${i + 1}`}
            />
          ))}
        </div>

        {/* Next */}
        <motion.button
          className="liquid-glass-btn"
          onClick={goNext}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.93 }}
          aria-label="Next"
        >
          <ChevronRight size={22} />
        </motion.button>
      </div>
    </div>
  );
}
