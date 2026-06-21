import React from 'react';
import CardFanCarousel from './CardFanCarousel';
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
      <CardFanCarousel cards={systems} />
    </section>
  );
}
