import React, { useState } from 'react';
import SEO from './SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Phone, Zap, BarChart3, MessageSquare, UserPlus, PhoneCall,
  Play, Volume2, ChevronDown, Building2, GraduationCap,
  Stethoscope, Car, Headset, TrendingUp, CheckCircle, ArrowRight, Target, Activity
} from 'lucide-react';
import HoverCloudCard from './HoverCloudCard';
import { useCurrency } from '../context/CurrencyContext';

/* ─── helpers ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

/* ─── Sound Wave Bars ─── */
function SoundWave({ color = '#38bdf8', count = 8, height = 16 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3, height }}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ scaleY: [0.3, 1, 0.4, 0.8, 0.3] }}
          transition={{ duration: 1 + i * 0.1, repeat: Infinity, ease: 'easeInOut', delay: i * 0.12 }}
          style={{ width: 3, height: '100%', borderRadius: 4, background: color, transformOrigin: 'bottom' }}
        />
      ))}
    </div>
  );
}

/* ─── SECTION 1: HERO ─── */
function HeroSection() {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 80, background: 'radial-gradient(ellipse at 70% 40%, rgba(14,165,233,0.12) 0%, transparent 60%)' }}>
      {/* bg glow */}
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.18, 0.08] }} transition={{ duration: 8, repeat: Infinity }} style={{ position: 'absolute', top: '-20%', right: '-10%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,189,248,0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="hero-layout container" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '55% 45%', alignItems: 'center', gap: '3rem', width: '100%' }}>
        {/* Left */}
        <div>
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1rem', borderRadius: 999, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(8px)', marginBottom: '2rem' }}>
            <SoundWave color="#38bdf8" count={6} height={16} />
            <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>High-Speed AI Calling Infrastructure</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }} style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
            Instantly Handle Leads{' '}
            <br />
            <span style={{ background: 'linear-gradient(135deg, #38bdf8, #0ea5e9, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>At Scale.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 500, marginBottom: '2.5rem' }}>
            Deploy Telugu-First AI Voice Agents built for operational speed. Instant lead response. Scalable communication. Flawless inbound &amp; outbound workflows.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <motion.a href="#deploy-form" whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(14,165,233,0.55)' }} whileTap={{ scale: 0.97 }}
              style={{ padding: '1rem 2rem', borderRadius: 999, background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)', color: '#fff', fontWeight: 800, fontSize: '1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 0 25px rgba(14,165,233,0.4)' }}>
              <Zap size={18} /> Deploy AI Voice Agent
            </motion.a>
            <motion.a href="#how-it-works" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              style={{ padding: '1rem 2rem', borderRadius: 999, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', backdropFilter: 'blur(8px)' }}>
              How It Works
            </motion.a>
          </motion.div>
        </div>

        {/* Right — orbital */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} style={{ position: 'relative', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: 480, margin: '0 auto' }}>
          {/* outer ring */}
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ position: 'absolute', width: 2, height: 48, background: 'linear-gradient(transparent, #38bdf8, transparent)', top: '50%', left: -1, transform: 'translateY(-50%)', boxShadow: '0 0 10px #38bdf8' }} />
          </motion.div>
          {/* inner ring */}
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', inset: '8%', borderRadius: '50%', border: '1px solid rgba(14,165,233,0.25)' }}>
            <motion.div animate={{ boxShadow: ['0 0 10px #38bdf8', '0 0 25px #38bdf8', '0 0 10px #38bdf8'] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: 'absolute', width: 12, height: 12, borderRadius: '50%', background: '#38bdf8', top: -6, left: '50%', transform: 'translateX(-50%)' }} />
          </motion.div>
          {/* glow orb */}
          <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 3, repeat: Infinity }} style={{ position: 'absolute', inset: '18%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,189,248,0.45) 0%, transparent 70%)', filter: 'blur(20px)' }} />
          {/* Telugu text */}
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(56,189,248,0.8)', marginBottom: '0.5rem' }}>Native Engine</div>
            <div style={{ fontSize: 'clamp(3.5rem, 8vw, 5.5rem)', fontWeight: 900, background: 'linear-gradient(180deg, #fff 0%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>తెలుగు</div>
            {/* play bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '1.25rem' }}>
              <motion.button whileHover={{ scale: 1.12, boxShadow: '0 0 30px rgba(14,165,233,0.7)' }} whileTap={{ scale: 0.95 }} style={{ width: 48, height: 48, borderRadius: '50%', background: '#0ea5e9', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(14,165,233,0.5)' }}>
                <Play size={20} style={{ marginLeft: 3 }} fill="#fff" />
              </motion.button>
              <div style={{ padding: '0.5rem 1.25rem', borderRadius: 999, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
                <SoundWave color="#38bdf8" count={12} height={14} />
              </div>
            </div>
          </div>
          {/* language pills orbiting */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', inset: -15, pointerEvents: 'none' }}
          >
            {/* English Pill */}
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)' }}>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{ padding: '0.4rem 1rem', borderRadius: 999, background: 'rgba(10,12,30,0.9)', border: '1px solid rgba(255,255,255,0.14)', fontSize: '0.8rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 0 20px rgba(56,189,248,0.15)', backdropFilter: 'blur(8px)', pointerEvents: 'auto' }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#38bdf8', display: 'inline-block' }} />
                English
              </motion.div>
            </div>
            {/* Hindi Pill */}
            <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translate(-50%, 50%)' }}>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{ padding: '0.4rem 1rem', borderRadius: 999, background: 'rgba(10,12,30,0.9)', border: '1px solid rgba(255,255,255,0.14)', fontSize: '0.8rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 0 20px rgba(56,189,248,0.15)', backdropFilter: 'blur(8px)', pointerEvents: 'auto' }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#38bdf8', display: 'inline-block' }} />
                हिंदी
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── SECTION 2: INDUSTRY TICKER ─── */
const industries = [
  { icon: <Building2 size={22} />, label: 'Real Estate' },
  { icon: <GraduationCap size={22} />, label: 'Coaching Institutes' },
  { icon: <Stethoscope size={22} />, label: 'Clinics' },
  { icon: <Car size={22} />, label: 'Automotive' },
  { icon: <Headset size={22} />, label: 'Customer Support' },
  { icon: <TrendingUp size={22} />, label: 'High-Volume Sales' },
];

function IndustryTicker() {
  const items = [...industries, ...industries];
  return (
    <div style={{ background: 'rgba(0,0,0,0.45)', borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '1.25rem 0', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(90deg, #050712, transparent)', zIndex: 2 }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(-90deg, #050712, transparent)', zIndex: 2 }} />
      <motion.div animate={{ x: [0, '-50%'] }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }} style={{ display: 'flex', gap: '1.5rem', whiteSpace: 'nowrap', width: 'max-content' }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1.75rem', borderRadius: 999, border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.8)', fontSize: '1rem', fontWeight: 700 }}>
            <span style={{ color: '#38bdf8' }}>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── SECTION 3: PROBLEM STATEMENT ─── */
function ProblemSection() {
  const problems = ['delayed follow-ups', 'missed calls', 'overloaded teams', 'slow response handling'];
  return (
    <section className="section-padding container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(5,7,18,0.95)', borderBottom: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <motion.p {...fadeUp(0)} style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '2rem' }}>The Human Bottleneck</motion.p>
        <motion.div {...fadeUp(0.1)} style={{ fontSize: 'clamp(1.5rem, 5vw, 3.75rem)', fontWeight: 900, lineHeight: 1.25, color: '#fff', marginBottom: '3rem' }}>
          Businesses lose leads because of{' '}
          {problems.map((p, i) => (
            <span key={i}>
              <motion.span initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.2 }} style={{ color: 'rgba(239,68,68,0.8)', textDecoration: 'line-through', textDecorationThickness: 3 }}>{p}</motion.span>
              {i < problems.length - 1 ? ', ' : '.'}
            </span>
          ))}
        </motion.div>
        <motion.p {...fadeUp(1.2)} style={{ fontSize: '1.25rem', color: '#38bdf8', fontWeight: 600 }}>
          Humans are bottlenecked by capacity and time.{' '}
          <span style={{ color: '#0ea5e9' }}>AI is not.</span>
        </motion.p>
      </div>
    </section>
  );
}

/* ─── SECTION 4: HOW IT WORKS ─── */
const HOW_TABS = ['Instant Lead Calling', 'Bulk Campaigns', '24/7 Inbound Support'];
const HOW_STEPS = [
  { icon: <UserPlus size={20} />, title: '1. Lead Captured', desc: "A prospect sees your ad and fills a lead form. They are interested but haven't spoken to anyone yet." },
  { icon: <PhoneCall size={20} />, title: '2. The 3-Second Call', desc: 'Before they close their browser, our AI agent calls them in fluent Telugu, engaging instantly.' },
  { icon: <MessageSquare size={20} />, title: '3. Qualifies & Objections', desc: 'The AI acts as your best salesperson — answers questions, handles pricing, qualifies intent.' },
  { icon: <BarChart3 size={20} />, title: '4. Noman ai Voice Hub', desc: 'Access full call recordings, real-time intent scores, and extracted lead details in your dashboard.' },
];

function HowItWorks() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  return (
    <section id="how-it-works" className="section-padding container" style={{ background: 'rgba(5,8,20,1)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.h2 {...fadeUp(0)} style={{ fontSize: 'clamp(1.5rem, 4vw, 3.25rem)', fontWeight: 900, textAlign: 'center', marginBottom: '2.5rem' }}>How It Actually Works</motion.h2>

        {/* Tab pills */}
        <motion.div {...fadeUp(0.1)} style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '3.5rem', flexWrap: 'wrap' }}>
          {HOW_TABS.map((t, i) => (
            <button key={i} onClick={() => setActiveTab(i)} style={{ padding: '0.6rem 1.4rem', borderRadius: 999, border: `1px solid ${activeTab === i ? '#0ea5e9' : 'rgba(255,255,255,0.1)'}`, background: activeTab === i ? '#0ea5e9' : 'transparent', color: activeTab === i ? '#fff' : 'rgba(255,255,255,0.55)', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.25s', boxShadow: activeTab === i ? '0 0 18px rgba(14,165,233,0.45)' : 'none' }}>
              {t}
            </button>
          ))}
        </motion.div>

        <div className="hero-layout" style={{ display: 'grid', gridTemplateColumns: '45% 55%', gap: '3rem', alignItems: 'center' }}>
          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', position: 'relative' }}>

            {HOW_STEPS.map((step, i) => (
              <motion.button key={i} onClick={() => setActiveStep(i)} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', borderRadius: 16, border: `1px solid ${activeStep === i ? 'rgba(14,165,233,0.4)' : 'transparent'}`, background: activeStep === i ? 'rgba(14,165,233,0.1)' : 'transparent', cursor: 'pointer', textAlign: 'left', transition: 'all 0.3s', position: 'relative', zIndex: 1, transform: activeStep === i ? 'scale(1.02)' : 'scale(1)' }}>
                <div style={{ flexShrink: 0, width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: activeStep === i ? '#0ea5e9' : 'rgba(255,255,255,0.06)', border: `1px solid ${activeStep === i ? '#0ea5e9' : 'rgba(255,255,255,0.1)'}`, color: activeStep === i ? '#fff' : 'rgba(255,255,255,0.5)', boxShadow: activeStep === i ? '0 0 20px rgba(14,165,233,0.5)' : 'none', transition: 'all 0.3s' }}>
                  {step.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: activeStep === i ? '#fff' : 'rgba(255,255,255,0.6)', marginBottom: '0.25rem', transition: 'color 0.3s' }}>{step.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: activeStep === i ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.35)', lineHeight: 1.6, transition: 'color 0.3s' }}>{step.desc}</p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Mock UI card container */}
          <div
            style={{ background: 'rgba(10,13,28,1)', borderRadius: 28, border: '1px solid rgba(255,255,255,0.09)', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 80px rgba(0,0,0,0.5)' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(14,165,233,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 15, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.96 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{ position: 'relative', zIndex: 2 }}
              >
                {activeStep === 0 && (
                  <div style={{ background: '#fff', borderRadius: 16, padding: '1.25rem', width: 280, boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1877f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: '1.1rem' }}>f</div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#111', fontSize: '0.85rem' }}>Facebook Lead Ad</div>
                        <div style={{ color: '#888', fontSize: '0.72rem' }}>Just now · {HOW_TABS[activeTab]}</div>
                      </div>
                    </div>
                    <div style={{ background: '#f0f9ff', borderRadius: 10, border: '1px solid #bae6fd', padding: '0.75rem', marginBottom: '0.75rem' }}>
                      <div style={{ fontWeight: 700, color: '#0369a1', fontSize: '0.8rem', marginBottom: '0.4rem' }}>✓ New Lead Received!</div>
                      <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#0284c7', lineHeight: 1.8 }}>
                        Name: Rahul S.<br />Phone: +91 98*** ****<br />City: Hyderabad
                      </div>
                    </div>
                    <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', borderRadius: 8, background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#166534' }}>AI Agent calling in 3s...</span>
                    </motion.div>
                  </div>
                )}

                {activeStep === 1 && (
                  <div style={{ background: '#09090b', borderRadius: 32, padding: '1.5rem', width: 260, height: 340, border: '6px solid #27272a', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ fontSize: '0.75rem', color: '#a1a1aa', marginTop: '1rem' }}>Incoming Call...</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '2.5rem' }}>Noman ai Agent</div>
                    
                    <div style={{ position: 'relative', marginBottom: 'auto' }}>
                      <motion.div animate={{ scale: [1, 1.5, 2.2], opacity: [0.8, 0.3, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: 'absolute', inset: -10, borderRadius: '50%', background: '#0ea5e9' }} />
                      <motion.div animate={{ scale: [1, 1.2, 1.8], opacity: [0.8, 0.5, 0] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }} style={{ position: 'absolute', inset: -10, borderRadius: '50%', background: '#0ea5e9' }} />
                      <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', position: 'relative', zIndex: 2, border: '2px solid #38bdf8' }}>
                         <Target size={32} />
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '2.5rem', width: '100%', justifyContent: 'center', paddingBottom: '1rem' }}>
                       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer' }}>
                             <Phone style={{ transform: 'rotate(135deg)' }} size={24} />
                          </div>
                       </div>
                       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                          <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: 56, height: 56, borderRadius: '50%', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', boxShadow: '0 0 25px rgba(34,197,94,0.5)' }}>
                             <Phone size={24} />
                          </motion.div>
                       </div>
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div style={{ background: '#fff', borderRadius: 16, padding: '1.25rem', width: 320, boxShadow: '0 8px 40px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                     <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Live Call Transcript</span>
                     </div>
                     
                     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ display: 'flex', gap: '0.75rem' }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#f3f4f6', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#6b7280', fontWeight: 700 }}>R</div>
                        <div style={{ background: '#f3f4f6', padding: '0.75rem', borderRadius: '0 12px 12px 12px', fontSize: '0.8rem', color: '#374151', lineHeight: 1.5, boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
                           Hello? Are you a real person or a bot?
                        </div>
                     </motion.div>
                     
                     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} style={{ display: 'flex', gap: '0.75rem', flexDirection: 'row-reverse' }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#e0f2fe', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0ea5e9' }}>
                           <Target size={14} />
                        </div>
                        <div style={{ background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)', padding: '0.75rem', borderRadius: '12px 0 12px 12px', fontSize: '0.8rem', color: '#fff', lineHeight: 1.5, boxShadow: '0 4px 15px rgba(14,165,233,0.3)' }}>
                           I'm a live AI from Noman ai! I saw you just filled our form. Were you looking to automate your lead follow-ups?
                        </div>
                     </motion.div>
                  </div>
                )}

                {activeStep === 3 && (
                  <div style={{ background: '#fff', borderRadius: 16, padding: '1.25rem', width: 320, boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div style={{ fontWeight: 800, color: '#111827', fontSize: '0.9rem' }}>Call Completed</div>
                        <div style={{ background: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0', fontSize: '0.65rem', fontWeight: 800, padding: '0.25rem 0.6rem', borderRadius: 999, textTransform: 'uppercase' }}>Meeting Booked</div>
                     </div>
                     
                     <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ flex: 1, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '0.75rem' }}>
                           <div style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.25rem' }}>Intent Score</div>
                           <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0ea5e9' }}>95%</div>
                           <motion.div initial={{ width: 0 }} animate={{ width: '95%' }} transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }} style={{ height: 6, background: 'linear-gradient(90deg, #38bdf8, #0ea5e9)', borderRadius: 3, marginTop: '0.5rem' }} />
                        </div>
                        <div style={{ flex: 1, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '0.75rem' }}>
                           <div style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.25rem' }}>Duration</div>
                           <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#334155' }}>2m 14s</div>
                           <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }} style={{ height: 6, background: '#cbd5e1', borderRadius: 3, marginTop: '0.5rem' }} />
                        </div>
                     </div>
                     
                     <div style={{ background: '#f1f5f9', borderRadius: 12, padding: '1rem', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: '0.65rem', color: '#475569', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', textTransform: 'uppercase' }}><CheckCircle size={14} color="#0ea5e9" /> AI Summary</div>
                        <p style={{ fontSize: '0.8rem', color: '#334155', lineHeight: 1.6, fontWeight: 500 }}>Prospect is highly qualified. Wants to deploy AI voice agents for real estate leads. Scheduled zoom call for tomorrow at 2 PM.</p>
                     </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 5: WHY NOMAN AI ─── */
const WHY_FEATURES = [
  { num: '01', title: 'Telugu-first conversational tuning', desc: 'Built specifically to understand native dialects, interruptions, and Tanglish mixed contexts natively.' },
  { num: '02', title: 'Instant lead response', desc: 'Seconds matter. React to incoming leads instantly before they bounce to a competitor.' },
  { num: '03', title: 'Scalable communication workflows', desc: 'Scale your outbound dialing from 10 to 10,000 parallel calls seamlessly without extra staff.' },
  { num: '04', title: 'Operational dashboard visibility', desc: 'Track every single interaction, outcome, and metric in real-time from your Voice Hub.' },
];

function WhyNomanai() {
  return (
    <section className="section-padding container" style={{ background: 'var(--bg-dark, #03070f)' }}>
      <div className="hero-layout" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', alignItems: 'start' }}>
        <div style={{ position: 'sticky', top: 120 }}>
          <motion.h2 {...fadeUp(0)} style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1rem' }}>Why<br />Noman ai.</motion.h2>
          <motion.p {...fadeUp(0.1)} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.1rem', lineHeight: 1.6 }}>We build operational efficiency, not conversational toys.</motion.p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          {WHY_FEATURES.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6 }} style={{ position: 'relative', paddingLeft: '4rem', borderBottom: i < WHY_FEATURES.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', paddingBottom: '3.5rem' }}>
              <span style={{ position: 'absolute', left: 0, top: -10, fontSize: '5rem', fontWeight: 900, color: 'rgba(255,255,255,0.04)', lineHeight: 1, userSelect: 'none' }}>{f.num}</span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '0.75rem', position: 'relative', zIndex: 1 }}>{f.title}</h3>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, position: 'relative', zIndex: 1 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 6: VOICE CARDS ─── */
const VOICES = [
  { name: "O' శాంతి", genre: 'Warm & Conversational', color: '#38bdf8', icon: <Target size={28} /> },
  { name: "Arjun", genre: 'Professional & Direct', color: '#0ea5e9', icon: <PhoneCall size={28} /> },
  { name: "Priya", genre: 'Energetic & Friendly', color: '#f472b6', icon: <Volume2 size={28} /> },
  { name: "Vikram", genre: 'Authoritative & Clear', color: '#10b981', icon: <Headset size={28} /> },
];

function VoiceCards() {
  const [playing, setPlaying] = useState(null);
  return (
    <section id="listen-voices" className="section-padding container" style={{ background: 'rgba(5,8,20,1)', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.09, 0.04] }} transition={{ duration: 8, repeat: Infinity }} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.3), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '1rem' }}>Hear the AI in Action</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1.05rem' }}>Choose from the Noman ai Voice Library featuring <span style={{ color: '#38bdf8', fontWeight: 700 }}>10+ native Telugu voices</span>.</p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          {VOICES.map((v, i) => (
            <HoverCloudCard key={i} className="glass-panel" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }}
              style={{ background: 'rgba(10,13,28,0.6)', backdropFilter: 'blur(16px)', borderRadius: 24, padding: '2rem', border: `1px solid rgba(255,255,255,0.07)`, position: 'relative', transition: 'border-color 0.3s', cursor: 'default' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle, ${v.color}22 0%, transparent 70%)`, pointerEvents: 'none' }} />
              {/* top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: `${v.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: v.color }}>
                  {v.icon}
                </div>
                <motion.button onClick={() => setPlaying(playing === i ? null : i)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
                  style={{ width: 56, height: 56, borderRadius: '50%', background: playing === i ? v.color : 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: playing === i ? `0 0 20px ${v.color}70` : 'none', transition: 'all 0.3s' }}>
                  <Play size={22} style={{ marginLeft: 3 }} fill={playing === i ? '#fff' : 'none'} />
                </motion.button>
              </div>
              {/* info */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                  <Volume2 size={14} style={{ color: v.color }} />
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: v.color }}>Native Telugu</span>
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '0.25rem' }}>{v.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>{v.genre}</p>
              </div>
              {/* waveform */}
              <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)' }}>0:00</span>
                <div style={{ flex: 1 }}>
                  {playing === i ? <SoundWave color={v.color} count={16} height={20} /> : <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.08)' }} />}
                </div>
              </div>
            </HoverCloudCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 7: PRICING ─── */
function PricingSection() {
  const { formatPrice } = useCurrency();
  return (
    <section id="pricing" className="section-padding container" style={{ background: 'transparent' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 1rem', borderRadius: 999, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            <Activity size={13} /> Transparent Pricing
          </span>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.1 }}>One System. <br /><span style={{ color: 'rgba(255,255,255,0.4)' }}>Infinite Scale.</span></h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem' }}>Start with setup — scale on usage.</p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {[
            { label: 'Setup & Deployment', price: formatPrice(0, { inrBase: 75000, decimalsOverride: 0 }), sub: 'One-time', highlight: true, features: ['Custom voice persona', 'Telugu NLP tuning', '1,000 test minutes', 'CRM integration', 'Noman ai Voice Hub access'] },
            { label: 'Growth Usage', price: `${formatPrice(6 / 83.5)}/min`, sub: '1,000 – 10,000 mins', features: ['Inbound + Outbound', 'Real-time transcription', 'Intent scoring', 'WhatsApp handoff'] },
            { label: 'Scale Usage', price: `${formatPrice(5 / 83.5)}/min`, sub: '10,000 – 30,000 mins', features: ['Everything in Growth', 'Priority queue', 'Dedicated call routing', 'Custom analytics'] },
          ].map((p, i) => (
            <HoverCloudCard key={i} className="glass-panel" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} whileHover={{ y: -8, boxShadow: p.highlight ? '0 0 60px rgba(14,165,233,0.4)' : '0 8px 40px rgba(0,0,0,0.4)' }}
              style={{ background: p.highlight ? 'linear-gradient(145deg, rgba(14,165,233,0.15), rgba(14,165,233,0.05))' : 'rgba(10,13,28,0.6)', backdropFilter: 'blur(16px)', borderRadius: 24, padding: '2rem', border: `1px solid ${p.highlight ? 'rgba(14,165,233,0.5)' : 'rgba(255,255,255,0.07)'}`, position: 'relative', transition: 'all 0.35s', boxShadow: p.highlight ? '0 0 40px rgba(14,165,233,0.2)' : 'none' }}>
              {p.highlight && <div style={{ position: 'absolute', top: '0.5rem', right: '0.25rem', padding: '0.25rem 0.75rem', borderRadius: 999, background: '#0ea5e9', fontSize: '0.65rem',  fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff' }}>Most Popular</div>}
              <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '0.75rem' }}>{p.label}</p>
              <div style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: '0.25rem' }}>{p.price}</div>
              <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.35)', marginBottom: '1.75rem' }}>{p.sub}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2rem' }}>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
                    <CheckCircle size={15} style={{ color: p.highlight ? '#38bdf8' : '#0ea5e9', flexShrink: 0 }} /> {f}
                  </div>
                ))}
              </div>
              <motion.a href="#deploy-form" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.85rem', borderRadius: 999, background: p.highlight ? 'linear-gradient(135deg, #0ea5e9, #38bdf8)' : 'rgba(255,255,255,0.07)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', border: `1px solid ${p.highlight ? 'transparent' : 'rgba(255,255,255,0.1)'}`, transition: 'all 0.2s', boxShadow: p.highlight ? '0 0 20px rgba(14,165,233,0.4)' : 'none' }}>
                Get Started <ArrowRight size={16} />
              </motion.a>
            </HoverCloudCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 8: DEPLOY FORM ─── */
function DeployForm() {
  const [form, setForm] = useState({ name: '', business: '', phone: '' });
  return (
    <section id="deploy-form" className="section-padding container" style={{ background: 'rgba(5,8,20,1)', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 10, repeat: Infinity }} style={{ position: 'absolute', top: '-30%', left: '30%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.12), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 640, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 1rem', borderRadius: 999, background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.3)', color: '#38bdf8', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            <Zap size={13} /> Ready to Deploy
          </span>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 900, marginBottom: '1rem' }}>Deploy Your AI Voice Agent</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', lineHeight: 1.7 }}>Fill in the form and we'll get your Telugu AI Voice Agent live in 72 hours.</p>
        </motion.div>
        <motion.div className="glass-panel" {...fadeUp(0.15)} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: '2.5rem', backdropFilter: 'blur(16px)', boxShadow: '0 8px 60px rgba(0,0,0,0.4)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.6), transparent)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[{ name: 'name', label: 'Full Name', placeholder: 'Your name' }, { name: 'business', label: 'Business Name', placeholder: 'Your company' }, { name: 'phone', label: 'WhatsApp Number', placeholder: '+91 98765 43210' }].map(f => (
              <div key={f.name}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem' }}>{f.label}</label>
                <input value={form[f.name]} onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))} placeholder={f.placeholder}
                  style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(14,165,233,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
              </div>
            ))}
            <motion.a href={`https://wa.me/910000000000?text=Hi Noman ai, I'm ready to deploy the Telugu AI Voice Agent. Name: ${form.name}`} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(37,211,102,0.5)' }} whileTap={{ scale: 0.97 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginTop: '0.5rem', padding: '1rem', borderRadius: 999, background: 'linear-gradient(135deg, #25d366, #128c7e)', color: '#fff', fontWeight: 800, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 0 25px rgba(37,211,102,0.35)' }}>
              <Phone size={18} /> Deploy via WhatsApp
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── SECTION 9: FAQ ─── */
function FAQ() {
  const [open, setOpen] = useState(null);
  const { formatPrice } = useCurrency();

  const FAQS = [
    { q: 'What is the Noman ai Telugu Voice Agent?', a: 'Noman ai provides high-speed AI voice systems built specifically for scalable lead handling and natural Telugu conversational flow. It eliminates delayed follow-ups and missed calls, engaging prospects instantly.' },
    { q: 'How much does the setup cost?', a: `The initial AI Voice Agent Setup & Deployment is ${formatPrice(0, { inrBase: 75000, decimalsOverride: 0 })}. Testing is initially performed using 1,000 talk-time minutes to optimize conversational quality and tune the voice persona.` },
    { q: 'What is the per-minute usage pricing?', a: `Usage pricing is ${formatPrice(6 / 83.5)}/min for 1,000 to 10,000 minutes, and drops to ${formatPrice(5 / 83.5)}/min for 10,000 to 30,000 minutes. Custom pricing is available for 30,000+ minutes per month.` },
  ];

  return (
    <section id="faq" className="section-padding container" style={{ background: 'var(--bg-dark, #03070f)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <motion.h2 {...fadeUp(0)} style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 900, textAlign: 'center', marginBottom: '3rem' }}>Frequently Asked</motion.h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {FAQS.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              style={{ background: open === i ? 'rgba(14,165,233,0.07)' : 'rgba(255,255,255,0.02)', border: `1px solid ${open === i ? 'rgba(14,165,233,0.35)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 16, overflow: 'hidden', transition: 'all 0.3s' }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{ width: '100%', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', color: '#fff', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', textAlign: 'left', gap: '1rem' }}>
                {faq.q}
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }} style={{ flexShrink: 0 }}>
                  <ChevronDown size={20} style={{ color: open === i ? '#38bdf8' : 'rgba(255,255,255,0.4)' }} />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden' }}>
                    <p style={{ padding: '0 1.5rem 1.5rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontSize: '0.95rem' }}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PAGE ROOT ─── */
export default function VoiceAgentsPage() {
  return (
    <main style={{ position: 'relative', zIndex: 10, background: '#050712', color: '#fff', minHeight: '100vh' }}>
      <SEO
        title="Telugu AI Voice Agents for Lead Automation | Noman ai"
        description="Deploy a Telugu-first AI Voice Agent that calls new leads in 3 seconds, handles objections in natural Telugu, qualifies intent and hands off to WhatsApp — automatically. Serving real estate, FMCG and education businesses across India."
        url="https://nomanaivercel.vercel.app/voice-agents"
        keywords="Telugu AI voice agent, AI calling agent India, automated lead calling, AI for real estate India, Telugu AI calling software, instant lead follow-up AI, voice bot India, AI inbound outbound calls, lead qualification AI, Noman ai voice agent"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'Noman ai Telugu Voice Agent',
          description: 'A Telugu-first AI voice agent that calls leads in under 3 seconds, qualifies intent and handles objections 24/7 — built for Indian businesses.',
          brand: { '@type': 'Brand', name: 'Noman ai' },
          offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            price: '75000',
            availability: 'https://schema.org/InStock',
            seller: { '@type': 'Organization', name: 'Noman ai' },
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '38',
          },
        }}
      />
      <HeroSection />
      <IndustryTicker />
      <ProblemSection />
      <HowItWorks />
      <WhyNomanai />
      <VoiceCards />
      <PricingSection />
      <DeployForm />
      <FAQ />
    </main>
  );
}
