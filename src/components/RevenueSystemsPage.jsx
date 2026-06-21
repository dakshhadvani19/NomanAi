import React from 'react';
import SEO from './SEO';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowRight,
  Activity,
  BarChart,
  Zap
} from 'lucide-react';
import HoverCloudCard from './HoverCloudCard';
import RevenueCalculator from './RevenueCalculator';
import RevenueCarousel from './RevenueCarousel';
import { useCurrency } from '../context/CurrencyContext';

/* ─── HELPERS ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

/* ─── SECTION 1: HERO ─── */
function HeroSection() {
  return (
    <section style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: 80,
      background: 'radial-gradient(circle at 50% 20%, rgba(99,102,241,0.08) 0%, transparent 60%)'
    }}>
      {/* Circuit grid background */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />

      {/* Slow breathing glow orb */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }}
      />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 2rem', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <motion.div
          {...fadeUp(0)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#22d3ee' }}>REVENUE SYSTEMS</span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.15)}
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.5rem', color: '#fff' }}
        >
          The Big Three
        </motion.h1>

        <motion.p
          {...fadeUp(0.3)}
          style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: 600, margin: '0 auto 3rem' }}
        >
          Three of the most expensive problems in any growing business — each one fixed completely.
        </motion.p>

        <motion.div {...fadeUp(0.45)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ display: 'inline-block' }}>
          <Link
            to="/audit"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.1rem 2.5rem',
              borderRadius: 999,
              background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
              color: '#fff',
              fontWeight: 800,
              fontSize: '1.1rem',
              textDecoration: 'none',
              boxShadow: '0 0 40px rgba(6,182,212,0.4)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '30%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)', transform: 'skewX(-20deg)' }}
            />
            Book Free Audit
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── SECTION 2: SYSTEMS CARDS ─── */
const SYSTEMS_DATA = [
  {
    num: "01",
    title: "Revenue Capture",
    desc: "Contact, qualify, and book leads in seconds.",
    longDesc: "Every minute matters. This system calls and texts every new inbound lead within 60 seconds, 24/7. It asks the right qualifying questions and books highly interested prospects directly onto your calendar.",
    features: ["AI Voice Agent (24/7)", "WhatsApp Bot", "Instant CRM Sync", "Automated Follow-ups", "Live Analytics Dashboard"],
    priceInr: 60000,
    subpriceInr: 15000,
    subpriceText: "/mo management (optional)",
    bestFor: "Real Estate, Clinics, Service Businesses",
    icon: <Zap size={24} />
  },
  {
    num: "02",
    badge: "Flagship",
    title: "Ops Efficiency",
    desc: "Eliminate 20–40 hours of manual tasks weekly.",
    longDesc: "We audit your workflows and automate the repetitive tasks—like client onboarding, data entry, and CRM updates—so your team can focus on high-value work.",
    features: ["Workflow Process Mapping", "3–5 Core Automations", "Custom n8n/Make Logic", "Team Onboarding & Training", "30-Day Check-in"],
    priceInr: 100000,
    subprice: "Custom scoped after discovery",
    bestFor: "Agencies, Legal, B2B Services",
    icon: <Activity size={24} />
  },
  {
    num: "03",
    title: "Web Capture",
    desc: "Turn passive website visitors into qualified leads.",
    longDesc: "We replace outdated websites with landing systems built to capture intent. Connect forms directly to WhatsApp and your CRM to drive immediate bookings.",
    features: ["High-Converting Landing Pages", "Frictionless Lead Capture", "Automated WhatsApp Triggers", "Instant Auto Follow-ups", "Full CRM Integration"],
    priceInr: 50000,
    subpriceInr: 8000,
    subpriceText: "/mo management (optional)",
    bestFor: "Outdated sites, Low-conversion pages",
    icon: <BarChart size={24} />
  }
];

function SystemsSection() {
  const { formatPrice } = useCurrency();
  return (
    <section className="section-padding container" style={{ background: 'transparent', position: 'relative' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <RevenueCarousel cards={SYSTEMS_DATA} formatPrice={formatPrice} />
      </div>
    </section>
  );
}

/* ─── SECTION 3: BANNER CTA ─── */
function BannerCTA() {
  return (
    <section className="section-padding container" style={{ background: 'transparent' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ maxWidth: 1000, margin: '0 auto' }}
      >
        <motion.div
          className="glass-panel"
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: 'linear-gradient(90deg, rgba(6,182,212,0.05), transparent)',
            border: '1px solid rgba(6,182,212,0.2)',
            borderRadius: 24,
            padding: '3rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle glow inside banner */}
          <div style={{ position: 'absolute', top: '-50%', right: '10%', width: 200, height: 200, background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)', filter: 'blur(30px)' }} />

          <div style={{ maxWidth: 500, position: 'relative', zIndex: 10 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#22d3ee', marginBottom: '0.75rem', display: 'block' }}>INDIVIDUAL SOLUTIONS</span>
            <h3 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', fontWeight: 900, color: '#fff', marginBottom: '1rem' }}>Not ready for a full system?</h3>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>Don't wait to fix what hurts most. Explore our library of 19 standalone solutions designed to solve specific bottlenecks instantly.</p>
          </div>

          <div style={{ position: 'relative', zIndex: 10 }}>
            <Link
              to="/solutions"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem 2rem',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1rem',
                textDecoration: 'none',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
              }}
            >
              Explore 19 Solutions
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── SECTION 4: BOTTOM CTA ─── */
function BottomCTA() {
  return (
    <section className="section-padding container" style={{
      background: 'transparent',
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'center'
    }}>
      {/* Background orbs */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <motion.h2
          {...fadeUp(0)}
          style={{ fontSize: 'clamp(1.5rem, 6vw, 4rem)', fontWeight: 900, color: '#fff', lineHeight: 1.2, marginBottom: '1.5rem', wordWrap: 'break-word', overflowWrap: 'break-word', maxWidth: '100%' }}
        >
          Your revenue leak has a fix.<br />
          Let's find it.
        </motion.h2>

        <motion.p
          {...fadeUp(0.1)}
          style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.6)', marginBottom: '3rem', maxWidth: 600, margin: '0 auto 3rem' }}
        >
          Book a free 30-minute strategy call. We'll show you exactly where you can automate tasks and capture more revenue.
        </motion.p>

        <motion.div {...fadeUp(0.2)} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
          <Link
            to="/audit"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.1rem 2.5rem',
              borderRadius: 999,
              background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
              color: '#fff',
              fontWeight: 800,
              fontSize: '1.1rem',
              textDecoration: 'none',
              boxShadow: '0 0 30px rgba(6,182,212,0.3)',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Book Free Audit <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
          </Link>
          <a
            href="#top"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.1rem 2.5rem',
              borderRadius: 999,
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.1rem',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
            }}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Explore the Solutions
          </a>
        </motion.div>

        <motion.p {...fadeUp(0.3)} style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>
          No obligation. No pitch. Just clarity.
        </motion.p>
      </div>
    </section>
  );
}


/* ─── PAGE ROOT ─── */
export default function RevenueSystemsPage() {
  // Scroll to top on mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: 'transparent', color: '#fff', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <SEO
        title="AI Revenue Systems & Sales Automation for India | Noman ai"
        description="End-to-end AI Revenue Systems that catch every lead, qualify intent and convert — with zero human bottleneck. WhatsApp automation, CRM integration, AI calling and retargeting pipelines built for Indian businesses."
        url="https://nomanaivercel.vercel.app/revenue-systems"
        keywords="AI revenue system India, sales automation India, automated sales pipeline, AI CRM integration, WhatsApp automation for business, lead management AI, revenue automation Hyderabad, AI for business growth India, Noman ai revenue system"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Automated Revenue Systems',
          provider: { '@type': 'Organization', name: 'Noman ai', url: 'https://nomanaivercel.vercel.app' },
          serviceType: 'Sales & Revenue Automation',
          description: 'End-to-end operational pipelines designed to catch every lead, qualify intent, and convert with zero human bottleneck.',
          areaServed: { '@type': 'Country', name: 'India' },
        }}
      />
      <HeroSection />
      <SystemsSection />
      <RevenueCalculator />
      <BannerCTA />
      <BottomCTA />
    </div>
  );
}
