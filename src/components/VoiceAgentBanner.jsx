import React from 'react';
import { motion } from 'framer-motion';
import { Mic, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/* Animated sound wave bars */
function SoundWave() {
  const heights = [8, 14, 20, 14, 8, 20, 12, 18, 10, 16];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 24 }}>
      {heights.map((h, i) => (
        <motion.div
          key={i}
          animate={{ scaleY: [1, 1.8, 0.6, 1.4, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
          style={{
            width: 3,
            height: h,
            borderRadius: 4,
            background: 'linear-gradient(180deg, #22d3ee, #06b6d4)',
            transformOrigin: 'center',
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
}

export default function VoiceAgentBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'relative',
        borderRadius: '16px',
        background: 'rgba(6,182,212,0.07)',
        border: '1px solid rgba(6,182,212,0.25)',
        padding: '1.25rem 1.75rem',
        marginBottom: '3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
        flexWrap: 'wrap',
        overflow: 'hidden',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 0 30px rgba(6,182,212,0.1)',
      }}
    >
      {/* Subtle gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '16px',
        background: 'linear-gradient(120deg, rgba(6,182,212,0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Floating mic icon with pulse ring */}
      <div style={{ position: 'absolute', right: '200px', top: '50%', transform: 'translateY(-50%)', opacity: 0.06, pointerEvents: 'none' }}>
        <Mic size={90} color="#06b6d4" />
      </div>

      {/* Left: text */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative', zIndex: 1 }}>
        {/* Animated mic + soundwave */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <motion.div
            animate={{ boxShadow: ['0 0 0 0 rgba(6,182,212,0)', '0 0 0 8px rgba(6,182,212,0.15)', '0 0 0 0 rgba(6,182,212,0)'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          >
            <Mic size={18} color="#22d3ee" />
          </motion.div>
          <SoundWave />
        </div>

        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', marginBottom: '0.2rem', letterSpacing: '-0.01em' }}>
            Looking for an AI Voice Agent? 🎙️
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, maxWidth: '460px' }}>
            Automate your inbound &amp; outbound calls with our lightning-fast, regional-language AI voice agents.
          </p>
        </div>
      </div>

      {/* Right: CTA */}
      <motion.div
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}
      >
        <Link
          to="/voice-agents"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.7rem 1.5rem', borderRadius: '999px',
            background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
            color: '#fff', textDecoration: 'none',
            fontWeight: 700, fontSize: '0.85rem',
            boxShadow: '0 0 20px rgba(6,182,212,0.4)',
            whiteSpace: 'nowrap',
          }}
        >
          Explore Voice Agents <ArrowRight size={14} />
        </Link>
      </motion.div>
    </motion.div>
  );
}
