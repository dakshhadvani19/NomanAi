import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import HoverCloudCard from './HoverCloudCard';

/* ─── HELPERS ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }
});

const TABS = ['All', 'AI & Automation', 'AI Voice', 'Web', 'Audit & Strategy'];

const SOLUTIONS = [
  { category: 'AI & Automation', title: 'WhatsApp Business Automation', desc: 'End-to-end automated WhatsApp interactions.' },
  { category: 'AI & Automation', title: 'AI Lead Qualification', desc: 'Automatic scoring and filtering for every lead.' },
  { category: 'AI & Automation', title: 'Appointment Booking Automation', desc: 'Zero-touch scheduling and reminders.' },
  { category: 'AI & Automation', title: 'Follow-up Sequence Automation', desc: 'Multi-channel automated engagement sequences.' },
  { category: 'AI & Automation', title: 'Cart Abandonment Recovery', desc: 'Automated recovery sequences for lost sales.' },
  { category: 'AI & Automation', title: 'Invoice & Payment Reminder', desc: 'Hands-free payment collection systems.' },
  { category: 'AI & Automation', title: 'Internal Workflow Automation', desc: 'Seamless data bridging across your daily tools.' },
  { category: 'AI & Automation', title: 'Custom AI & Automation', desc: 'Bespoke systems engineered perfectly for your specific bottleneck.' },
  { category: 'AI Voice', title: 'Inbound AI Voice Agent', desc: '24/7 intelligent answering and lead routing.' },
  { category: 'AI Voice', title: 'Outbound AI Voice Agent', desc: 'Scalable proactive calling and engagement.' },
  { category: 'AI Voice', title: 'Custom Voice Agent', desc: 'Complex voice logic and deep system integrations.' },
  { category: 'Web', title: 'Business Website', desc: 'Professional, conversion-focused online presence.' },
  { category: 'Web', title: 'Landing Page', desc: 'High-velocity standalone pages for campaigns.' },
  { category: 'Web', title: 'Website Redesign', desc: 'Total overhaul of speed, structure, and conversion flow.' },
  { category: 'Web', title: 'Website + Lead Pipeline', desc: 'High-converting site fully wired into automated CRM follow-ups.' },
  { category: 'Web', title: 'E-commerce Store', desc: 'Optimized storefront with integrated recovery systems.' },
  { category: 'Web', title: 'Custom Web Solution', desc: 'Tailored portals, dashboards, and booking platforms.' },
  { category: 'Audit & Strategy', title: 'Business Automation Audit', desc: 'Comprehensive mapping of operational leaks and ROI fixes.' },
  { category: 'Audit & Strategy', title: 'Conversion & Website Audit', desc: 'Deep structural analysis of digital friction points.' },
];

export default function SolutionsPage() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredSolutions = activeTab === 'All' 
    ? SOLUTIONS 
    : SOLUTIONS.filter(s => s.category === activeTab);

  return (
    <div style={{ background: '#030712', minHeight: '100vh', color: '#fff', overflowX: 'hidden' }}>
      
      {/* ─── HERO SECTION ─── */}
      <section style={{ paddingTop: '10rem', paddingBottom: '6rem', position: 'relative', textAlign: 'center' }}>
        {/* Glow Orbs */}
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity }} style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />
        
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1000, margin: '0 auto', padding: '0 2rem' }}>
          <motion.div {...fadeUp(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#38bdf8' }}>SOLUTIONS</span>
          </motion.div>
          
          <motion.h1 {...fadeUp(0.15)} style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.5rem', color: '#fff' }}>
            Drop-in solutions for<br />
            <span style={{ background: 'linear-gradient(135deg, #fff 0%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>immediate ROI.</span>
          </motion.h1>
          
          <motion.p {...fadeUp(0.3)} style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: 600, margin: '0 auto 3rem' }}>
            19 standalone solutions. Each one targets one specific problem and fixes it completely. Starting from ₹14,999.
          </motion.p>
          
          <motion.div {...fadeUp(0.4)} style={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ padding: '1rem 2.5rem', borderRadius: 999, background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)', border: 'none', color: '#fff', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 0 30px rgba(14,165,233,0.4)' }}>
                Book Free Audit
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── SOLUTIONS GRID SECTION ─── */}
      <section style={{ padding: '2rem 2rem 8rem 2rem', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          
          {/* Tabs */}
          <motion.div {...fadeUp(0.5)} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem' }}>
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: 999,
                  background: activeTab === tab ? '#0ea5e9' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${activeTab === tab ? '#0ea5e9' : 'rgba(255,255,255,0.1)'}`,
                  color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.6)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab ? '0 0 20px rgba(14,165,233,0.4)' : 'none'
                }}
              >
                {tab}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            <AnimatePresence mode="popLayout">
              {filteredSolutions.map((sol, idx) => (
                <motion.div
                  key={sol.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
                >
                  <HoverCloudCard style={{ 
                    padding: '2rem', 
                    background: 'rgba(10,13,28,0.6)', 
                    backdropFilter: 'blur(16px)', 
                    borderRadius: 24, 
                    border: '1px solid rgba(255,255,255,0.08)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer'
                  }}>
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#38bdf8', marginBottom: '1rem' }}>
                      {sol.category}
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', color: '#fff' }}>
                      {sol.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                      {sol.desc}
                    </p>
                  </HoverCloudCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          <div style={{ textAlign: 'center', marginTop: '4rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>
            All fees cover build and management. Platforms (Meta API, hosting, voice infra) billed separately at cost. Full estimate provided before any project starts.
          </div>

        </div>
      </section>

      {/* ─── BOTTOM CALL TO ACTION ─── */}
      <section style={{ padding: '0 2rem 6rem 2rem' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <HoverCloudCard style={{ 
            background: 'linear-gradient(135deg, rgba(14,165,233,0.1) 0%, rgba(3,7,18,0.8) 100%)', 
            borderRadius: 32, 
            padding: '3rem 4rem', 
            border: '1px solid rgba(14,165,233,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 300, height: 300, background: 'rgba(14,165,233,0.1)', filter: 'blur(80px)', borderRadius: '50%' }} />
            
            <div style={{ position: 'relative', zIndex: 1, maxWidth: 500 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#38bdf8', marginBottom: '1rem' }}>REVENUE SYSTEMS</div>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', marginBottom: '1rem' }}>Need a complete transformation?</h2>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>Stop stitching tools together. We offer fully integrated, end-to-end systems that eliminate operational bottlenecks and scale seamlessly.</p>
            </div>
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <Link to="/revenue-systems" style={{ textDecoration: 'none' }}>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ padding: '1rem 2rem', borderRadius: 999, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(14,165,233,0.4)', color: '#fff', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', backdropFilter: 'blur(10px)', transition: 'background 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(14,165,233,0.15)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
                  Explore Revenue Systems
                </motion.button>
              </Link>
            </div>
          </HoverCloudCard>
        </div>
      </section>

    </div>
  );
}
