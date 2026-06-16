import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function Solutions() {
  const solutions = [
    { tag: 'AI & AUTOMATION', title: 'Instant Lead Follow-Up', desc: 'When a lead submits a form, they instantly receive personalized WhatsApp and Email engagements.' },
    { tag: 'AI VOICE', title: 'Inbound AI Receptionist', desc: 'Human-like AI answers every inbound call immediately, routes requests, and schedules meetings 24/7.' },
    { tag: 'WEB', title: 'High-Converting Landing Pages', desc: 'A lightning-fast, single-page funnel precision-built to capture leads and book calls.' },
    { tag: 'AI & AUTOMATION', title: 'Appointment Booking Bot', desc: 'Let prospects book themselves automatically across WhatsApp or web — zero manual work.' }
  ];

  return (
    <section className="section-padding container">
      <div style={{ marginBottom: '4rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          — INDIVIDUAL SOLUTIONS <span style={{ flexGrow: 1, height: '1px', background: 'var(--glass-border)' }}></span>
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
            Not ready for a full system?<br />
            <span style={{ color: 'var(--text-muted)' }}>Start with one solution.</span>
          </h2>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&lt;</button>
            <button style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&gt;</button>
          </div>
        </div>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', marginTop: '1.5rem' }}>
          Not everything needs a full system. Start with what hurts most. Explore our catalogue of 19 pre-built solutions. Starting from ₹14,999.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {solutions.map((sol, i) => (
          <motion.div 
            key={i}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="glass-panel"
            style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer', transition: 'border-color 0.3s' }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--glass-border)'}
          >
            <div style={{ flexGrow: 1 }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>{sol.tag}</span>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{sol.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{sol.desc}</p>
            </div>
            <div style={{ marginTop: '2rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontSize: '0.875rem', fontWeight: 600 }}>
              View Details <ChevronRight size={16} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
