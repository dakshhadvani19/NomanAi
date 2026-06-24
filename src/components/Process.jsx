import React from 'react';
import { motion } from 'framer-motion';

const IsometricNumber = ({ num, i }) => {
  const baseDelay = i * 0.15;
  const layers = 3; // Reduced from 6 to 3 for a 50% performance boost
  
  return (
    <div style={{ position: 'relative', height: 'clamp(4rem, 10vw, 6rem)', marginBottom: '3rem' }}>
      <motion.div 
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
        style={{ position: 'relative' }}
      >
        {/* 3D Trail Layers */}
      {[...Array(layers)].map((_, index) => {
        const isFront = index === 0;
        const opacity = 1 - (index * 0.18);
        return (
          <motion.div
            key={index}
            style={{
              position: 'absolute',
              top: 0, left: 0,
              fontSize: 'clamp(3.5rem, 12vw, 5.5rem)', /* Responsive font size */
              fontWeight: 900,
              lineHeight: 1,
              color: isFront ? 'transparent' : `rgba(255, 19, 97, ${opacity})`,
              backgroundImage: isFront ? 'linear-gradient(135deg, #ffffff 0%, #ffb3c6 100%)' : 'none',
              WebkitBackgroundClip: isFront ? 'text' : 'border-box',
              WebkitTextFillColor: isFront ? 'transparent' : 'currentColor',
              filter: isFront ? 'drop-shadow(0 0 10px rgba(255, 19, 97, 0.4))' : 'none',
              zIndex: 20 - index,
              WebkitTextStroke: isFront ? 'none' : `1px rgba(255, 19, 97, ${opacity + 0.2})`
            }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            whileInView={{ x: index * 8, y: index * 8, opacity: 1 }} /* Extrude down-right to avoid left border collision */
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: baseDelay + 0.2 + (index * 0.05),
              type: "spring",
              stiffness: 150,
              damping: 10
            }}
          >
            {num}
          </motion.div>
        );
      })}
      </motion.div>
    </div>
  );
};

export default function Process() {
  const steps = [
    { num: '01', title: 'We understand your business', desc: '30-minute call. We learn your business, find where money is leaking, and decide what to build.' },
    { num: '02', title: 'We Scope & Price It', desc: 'You get exact deliverables, timeline, and cost in writing. No surprises before we start or after.' },
    { num: '03', title: 'We Build It', desc: 'We handle the entire build and setup. You stay focused on your business.' },
    { num: '04', title: 'Goes Live , You See Results.', desc: 'System goes live in 2 weeks. You see hours saved, and revenue retained within 30 days.' }
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
          OUR PROCESS 
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
            From first call to live system<br />
            <span style={{ color: 'var(--text-muted)' }}>In 2 weeks.</span>
          </h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '6rem' }}>
        {steps.map((step, i) => (
          <motion.div 
            key={i}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
          >
            <IsometricNumber num={step.num} i={i} />
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
