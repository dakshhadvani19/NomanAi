import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import HoverCloudCard from './HoverCloudCard';
import { useCurrency } from '../context/CurrencyContext';

export default function Systems() {
  const { formatPrice } = useCurrency();
  const systems = [
    {
      label: 'SYSTEM 1',
      title: 'Revenue Capture',
      desc: 'Contact, qualify, and book leads in seconds.',
      features: ['AI Voice Agent (24/7)', 'WhatsApp & SMS Bot', 'Instant CRM Sync'],
      price: `From ${formatPrice(0, { inrBase: 60000, decimalsOverride: 0 })}`,
      link: '/voice-agents'
    },
    {
      label: 'SYSTEM 2',
      badge: 'CLASSIC',
      title: 'Ops Efficiency',
      desc: 'Eliminate 20-40 hours of manual tasks weekly.',
      features: ['Workflow Process Mapping', '3-5 Core Automations', 'Custom n8n/Make Logic'],
      price: `From ${formatPrice(0, { inrBase: 100000, decimalsOverride: 0 })}`,
      link: '/solutions'
    },
    {
      label: 'SYSTEM 3',
      title: 'Web Capture',
      desc: 'Turn passive website visitors into qualified leads.',
      features: ['High-Converting Landing Pages', 'Frictionless Lead Capture', 'Automated WhatsApp Triggers'],
      price: `From ${formatPrice(0, { inrBase: 50000, decimalsOverride: 0 })}`,
      link: '/revenue-systems'
    }
  ];

  return (
    <section className="section-padding container">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>REVENUE SYSTEMS</p>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1rem' }}>
          Three systems.<br />
          <span style={{ color: 'var(--text-muted)' }}>Each solves one expensive problem.</span>
        </h2>
      </div>

      <div className="grid-3">
        {systems.map((sys, i) => (
          <Link key={i} to={sys.link} style={{ display: 'block', textDecoration: 'none', height: '100%', outline: 'none' }}>
            <HoverCloudCard 
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileHover="hover"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="glass-panel"
              style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', height: '100%', color: 'inherit' }}
            >
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', minHeight: '24px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', letterSpacing: '0.05em' }}>{sys.label}</span>
                  {sys.badge && <span className="badge" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>{sys.badge}</span>}
                </div>
                <h3 style={{ fontSize: '2rem', marginBottom: '0.75rem', color: '#fff' }}>{sys.title}</h3>
                <p style={{ color: 'var(--text-muted)', minHeight: '48px' }}>{sys.desc}</p>
              </div>

              <div style={{ flexGrow: 1, marginBottom: '2rem' }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', fontWeight: 600 }}>KEY FEATURES</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {sys.features.map((feat, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                      <CheckCircle2 size={16} className="text-gradient" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>{sys.price}</span>
                <div style={{ color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  EXPLORE 
                  <motion.span variants={{ hover: { x: 5 } }} transition={{ duration: 0.2, ease: "easeInOut" }} style={{ display: 'flex' }}>
                    <ArrowRight size={16} />
                  </motion.span>
                </div>
              </div>
            </HoverCloudCard>
          </Link>
        ))}
      </div>
    </section>
  );
}
