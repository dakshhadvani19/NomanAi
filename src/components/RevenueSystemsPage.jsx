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

        <motion.div {...fadeUp(0.45)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }} style={{ display: 'inline-block' }}>
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
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
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
        title="AI Revenue Systems & Sales Automation India | Outpera (Outpero / NomanAi)"
        description="End-to-end AI Revenue Systems that catch every lead, qualify intent and convert with zero human bottleneck. WhatsApp automation, CRM integration, AI calling & retargeting pipelines for Indian businesses. Hyderabad-based, India-wide. Also known as Outpero & NomanAi."
        url="https://outperavercel.vercel.app/revenue-systems"
        keywords="AI revenue system india, revenue automation india, sales automation india, automated sales pipeline, AI CRM integration, WhatsApp automation for business, lead management AI, revenue automation hyderabad, AI for business growth india, Outpero revenue system, NomanAi revenue system, ai automation india, automated sales india, lead pipeline automation, AI sales automation, best AI revenue system india"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          '@id': 'https://outperavercel.vercel.app/revenue-systems#service',
          name: 'Automated Revenue Systems',
          alternateName: ['Outpero Revenue System', 'NomanAi Revenue System', 'AI Sales Automation India'],
          provider: {
            '@type': 'Organization',
            name: 'Outpera',
            alternateName: ['Outpero', 'NomanAi'],
            url: 'https://outperavercel.vercel.app',
          },
          serviceType: ['Sales Automation', 'Revenue Automation', 'Lead Automation', 'WhatsApp Automation', 'CRM Integration'],
          description: 'End-to-end operational pipelines designed to catch every lead, qualify intent, and convert with zero human bottleneck. Built for Indian businesses.',
          areaServed: [
            { '@type': 'Country', name: 'India' },
            { '@type': 'State', name: 'Telangana' },
          ],
          offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            price: '75000',
            availability: 'https://schema.org/InStock',
          },
        }}
      />
      <HeroSection />
      <SystemsSection />
      <RevenueCalculator />
      <BottomCTA />
    </div>
  );
}
