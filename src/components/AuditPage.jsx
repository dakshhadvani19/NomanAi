import React, { useState } from 'react';
import SEO from './SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock, Mail, Phone, ArrowRight, Sparkles, Send, ChevronDown } from 'lucide-react';
import VoiceAgentBanner from './VoiceAgentBanner';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

const BUSINESS_TYPES = ['Real Estate', 'Clinic', 'Coaching', 'D2C', 'Legal', 'SaaS', 'E-commerce', 'Other'];
const BUSINESS_SIZES = ['Solo (1 person)', '2–10 employees', '11–50 employees', '51–200 employees', '200+ employees'];

const inputStyle = {
  width: '100%',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(6,182,212,0.04)',
  padding: '14px 16px',
  fontSize: '0.9rem',
  color: 'var(--text-main)',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
  fontFamily: 'inherit',
  backdropFilter: 'blur(4px)',
};

function FormField({ label, children, delay }) {
  return (
    <motion.div {...fadeUp(delay)} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
        {label}
      </label>
      {children}
    </motion.div>
  );
}

function FocusInput({ style: extraStyle, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...props}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputStyle,
        ...extraStyle,
        borderColor: focused ? 'rgba(6,182,212,0.6)' : 'rgba(255,255,255,0.08)',
        boxShadow: focused ? '0 0 0 3px rgba(6,182,212,0.12), inset 0 0 20px rgba(6,182,212,0.04)' : 'none',
        background: focused ? 'rgba(6,182,212,0.07)' : 'rgba(6,182,212,0.04)',
      }}
    />
  );
}

function FocusTextarea({ ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      {...props}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputStyle,
        resize: 'none',
        borderColor: focused ? 'rgba(6,182,212,0.6)' : 'rgba(255,255,255,0.08)',
        boxShadow: focused ? '0 0 0 3px rgba(6,182,212,0.12)' : 'none',
        background: focused ? 'rgba(6,182,212,0.07)' : 'rgba(6,182,212,0.04)',
      }}
    />
  );
}

function CustomDropdown({ value, options, placeholder, onChange, name, required }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      {isOpen && (
        <div 
          style={{ position: 'fixed', inset: 0, zIndex: 99 }} 
          onClick={() => setIsOpen(false)} 
        />
      )}
      
      <input
        type="text"
        name={name}
        value={value}
        required={required}
        readOnly
        style={{ position: 'absolute', opacity: 0, width: '1px', height: '1px', top: '50%', left: '50%', pointerEvents: 'none' }}
        tabIndex={-1}
      />

      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          ...inputStyle,
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderColor: isOpen ? 'rgba(6,182,212,0.6)' : 'rgba(255,255,255,0.08)',
          boxShadow: isOpen ? '0 0 0 3px rgba(6,182,212,0.12), inset 0 0 20px rgba(6,182,212,0.04)' : 'none',
          background: isOpen ? 'rgba(6,182,212,0.07)' : 'rgba(6,182,212,0.04)',
          color: value ? 'var(--text-main)' : 'rgba(255,255,255,0.5)',
          position: 'relative',
          zIndex: isOpen ? 100 : 1
        }}
      >
        <span>{value || placeholder}</span>
        <motion.div 
          animate={{ rotate: isOpen ? 180 : 0 }} 
          transition={{ duration: 0.2 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', transformOrigin: 'center' }}
        >
          <ChevronDown size={16} color="rgba(255,255,255,0.4)" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 0,
              right: 0,
              background: '#0b1121',
              border: '1px solid rgba(6,182,212,0.3)',
              borderRadius: '12px',
              padding: '6px',
              zIndex: 100,
              boxShadow: '0 10px 40px -10px rgba(0,0,0,0.8), 0 0 20px rgba(6,182,212,0.15)',
              maxHeight: '220px',
              overflowY: 'auto'
            }}
          >
            {options.map((opt) => (
              <motion.div
                key={opt}
                whileHover={{ background: 'rgba(6,182,212,0.15)', paddingLeft: '18px' }}
                transition={{ duration: 0.05 }}
                onClick={() => {
                  onChange({ target: { name, value: opt } });
                  setIsOpen(false);
                }}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  color: value === opt ? '#0ea5e9' : '#ffffff',
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontWeight: value === opt ? 600 : 400
                }}
              >
                {opt}
                {value === opt && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <CheckCircle size={15} color="#0ea5e9" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AuditPage() {
  const [form, setForm] = useState({ name: '', business: '', email: '', phone: '', businessType: '', businessSize: '', challenge: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Send data to Firestore
      await addDoc(collection(db, 'audit_bookings'), {
        ...form,
        createdAt: serverTimestamp(),
      });



      setSubmitted(true);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const checklistItems = [
    'We review your current workflows or website',
    'Identify 2–3 immediate quick wins',
    'Map out the highest-ROI system for your business',
    'Give you an estimate of the solution',
  ];

  return (
    <>
      <SEO
        title="Free AI Automation Audit for Indian Businesses | Noman ai"
        description="Book a free 30-minute business automation audit with Noman ai. Discover exactly where you're losing leads and revenue — and get a custom AI roadmap to fix it. No cost, no obligation."
        url="https://nomanaivercel.vercel.app/audit"
        keywords="free automation audit India, business automation consultation, AI audit free, lead automation audit, revenue system audit, AI for business India free consultation, Noman ai audit"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Noman ai',
          image: 'https://nomanaivercel.vercel.app/Logo_website.png',
          url: 'https://nomanaivercel.vercel.app',
          telephone: '+91-6362852526',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Hyderabad',
            addressRegion: 'Telangana',
            addressCountry: 'IN',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 17.385,
            longitude: 78.4867,
          },
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
            opens: '09:00',
            closes: '20:00',
          },
          priceRange: '₹₹',
        }}
      />
      <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', paddingTop: '100px', paddingBottom: '80px' }}>

      {/* Animated background orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '-15%', left: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{ position: 'absolute', bottom: '0', right: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }}
      />

      {/* Floating decorative ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', top: '18%', right: '6%', width: '90px', height: '90px', borderRadius: '50%', border: '1.5px dashed rgba(6,182,212,0.25)', pointerEvents: 'none', zIndex: 0 }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', top: '18%', right: '6%', width: '120px', height: '120px', borderRadius: '50%', border: '1px dashed rgba(99,102,241,0.15)', pointerEvents: 'none', zIndex: 0, marginTop: '-15px', marginRight: '-15px' }}
      />

      {/* Floating diamond */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [45, 55, 45], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{ position: 'absolute', bottom: '25%', left: '4%', width: '22px', height: '22px', background: 'rgba(6,182,212,0.3)', transform: 'rotate(45deg)', pointerEvents: 'none', zIndex: 0, borderRadius: '3px' }}
      />

      {/* Tiny floating dots */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -14, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
          style={{ position: 'absolute', width: 4, height: 4, borderRadius: '50%', background: 'rgba(99,102,241,0.6)', pointerEvents: 'none', zIndex: 0, left: `${10 + i * 15}%`, top: `${30 + (i % 3) * 20}%` }}
        />
      ))}

      <div className="container section-padding" style={{ position: 'relative', zIndex: 10, maxWidth: '1100px', margin: '0 auto' }}>

        {/* Voice Agent Banner */}
        <VoiceAgentBanner />

        {/* Badge */}
        <motion.div {...fadeUp(0)} style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 1rem', borderRadius: '999px', background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.25)', color: 'var(--accent-primary)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            <Sparkles size={13} /> Free 30-Minute Audit
          </div>
        </motion.div>

        <div className="audit-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}>

          {/* ── LEFT COLUMN ── */}
          <div>
            <motion.h1 {...fadeUp(0.1)} style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
              Book your free<br />
              <span style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                business audit.
              </span>
            </motion.h1>

            <motion.p {...fadeUp(0.2)} style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: '440px' }}>
              Start with a free 30-minute audit. We'll show you exactly where you're losing money and what to build first. No obligation. No pitch. Just clarity.
            </motion.p>

            {/* Checklist */}
            <motion.div {...fadeUp(0.25)} style={{ marginBottom: '2.5rem' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>What to expect</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {checklistItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    >
                      <CheckCircle size={17} style={{ color: '#0ea5e9', flexShrink: 0, marginTop: '2px' }} />
                    </motion.div>
                    <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact details */}
            <motion.div {...fadeUp(0.55)} style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { icon: <Clock size={15} />, text: 'We respond within 24 hours' },
                { icon: <Mail size={15} />, text: 'hello@nomanai.com' },
                { icon: <Phone size={15} />, text: 'Tharun Naik (Founder): +91 6362852526' },
                { icon: <Phone size={15} />, text: 'Daksh Hadvani (Founder): +91 96646 96850' },
              ].map(({ icon, text }, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--accent-primary)' }}>{icon}</span>
                  {text}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: FORM ── */}
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '24px',
                  padding: '2.5rem',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Top shimmer line */}
                <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.5), transparent)' }} />

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <FormField label="Name *" delay={0.15}>
                    <FocusInput type="text" name="name" placeholder="Your full name" required value={form.name} onChange={handleChange} />
                  </FormField>

                  <FormField label="Business Name *" delay={0.2}>
                    <FocusInput type="text" name="business" placeholder="Your company name" required value={form.business} onChange={handleChange} />
                  </FormField>

                  <FormField label="Email *" delay={0.25}>
                    <FocusInput type="email" name="email" placeholder="you@company.com" required value={form.email} onChange={handleChange} />
                  </FormField>

                  <FormField label="Phone (WhatsApp preferred) *" delay={0.3}>
                    <FocusInput type="tel" name="phone" placeholder="+91 98765 43210" required value={form.phone} onChange={handleChange} />
                  </FormField>

                  <div className="mobile-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <FormField label="Business Type *" delay={0.35}>
                      <CustomDropdown
                        name="businessType"
                        value={form.businessType}
                        options={BUSINESS_TYPES}
                        placeholder="Select type"
                        required
                        onChange={handleChange}
                      />
                    </FormField>

                    <FormField label="Business Size *" delay={0.4}>
                      <CustomDropdown
                        name="businessSize"
                        value={form.businessSize}
                        options={BUSINESS_SIZES}
                        placeholder="Select size"
                        required
                        onChange={handleChange}
                      />
                    </FormField>
                  </div>

                  <FormField label="Biggest Challenge (Optional)" delay={0.45}>
                    <FocusTextarea name="challenge" rows={4} placeholder="What is the biggest operational or growth challenge your business faces right now?" value={form.challenge} onChange={handleChange} />
                  </FormField>

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(6,182,212,0.5)' }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      marginTop: '0.5rem',
                      padding: '1rem 2rem',
                      background: submitting ? 'rgba(6,182,212,0.3)' : 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                      border: 'none',
                      borderRadius: '999px',
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: '1rem',
                      letterSpacing: '0.03em',
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.6rem',
                      boxShadow: '0 0 25px rgba(6,182,212,0.3)',
                      transition: 'background 0.3s',
                    }}
                  >
                    {submitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={17} /> Book My Free Audit
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            ) : (
              /* SUCCESS STATE */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: 'rgba(6,182,212,0.06)',
                  border: '1px solid rgba(6,182,212,0.3)',
                  borderRadius: '24px',
                  padding: '3.5rem 2.5rem',
                  textAlign: 'center',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 0 60px rgba(6,182,212,0.15)',
                }}
              >
                <motion.div
                  animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}
                >
                  <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(6,182,212,0.15)', border: '2px solid rgba(6,182,212,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(6,182,212,0.3)' }}>
                    <CheckCircle size={40} style={{ color: '#0ea5e9' }} />
                  </div>
                </motion.div>
                <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                  You're in! 🎉
                </motion.h2>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: '360px', margin: '0 auto 2rem' }}>
                  We've received your request. Our team will reach out within <strong style={{ color: '#0ea5e9' }}>24 hours</strong> to schedule your free audit.
                </motion.p>
                <motion.a
                  href="/"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}
                  whileHover={{ gap: '0.8rem' }}
                >
                  Back to home <ArrowRight size={16} />
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
    </>
  );
}
