import React from 'react';
import { motion } from 'framer-motion';

export default function Process() {
  const steps = [
    { num: '01', title: 'We understand your business', desc: '30-minute call. We learn your business, find where money is leaking, and decide what to build.' },
    { num: '02', title: 'We Scope & Price It', desc: 'You get exact deliverables, timeline, and cost in writing. No surprises before we start or after.' },
    { num: '03', title: 'We Build It', desc: 'We handle the entire build and setup. You stay focused on your business.' },
    { num: '04', title: 'Goes Live. You See Results.', desc: 'System goes live in 2 weeks. You see hours saved, and revenue retained within 30 days.' }
  ];

  const stats = [
    { value: '60', unit: 'sec', label: 'LEAD RESPONSE TIME' },
    { value: '40', unit: 'hrs', label: 'MANUAL WORK ELIMINATED' },
    { value: '2', unit: 'x', label: 'AVERAGE CONVERSION LIFT' },
    { value: 'Zero', unit: '', label: 'TECH HEADACHE FOR YOU' }
  ];

  return (
    <section className="section-padding container">
      <div style={{ marginBottom: '4rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          — OUR PROCESS <span style={{ flexGrow: 1, height: '1px', background: 'var(--glass-border)' }}></span>
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
            From first call to live system.<br />
            <span style={{ color: 'var(--text-muted)' }}>In 2 weeks.</span>
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>Fixed scope. Fixed price. No surprises.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginBottom: '6rem' }}>
        {steps.map((step, i) => (
          <motion.div 
            key={i}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
          >
            <div style={{ fontSize: '4rem', fontWeight: 800, color: 'rgba(255,255,255,0.05)', lineHeight: 1, marginBottom: '1rem' }}>{step.num}</div>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{step.title}</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{step.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass-panel" style={{ padding: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', textAlign: 'center' }}>
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + (i * 0.1), duration: 0.5 }}
          >
            <div style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'baseline' }}>
              {stat.value} <span style={{ fontSize: '1.5rem', color: 'var(--accent-primary)', marginLeft: '4px' }}>{stat.unit}</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
