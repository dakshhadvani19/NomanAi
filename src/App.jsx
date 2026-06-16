import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Code2, Zap } from 'lucide-react';

function App() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background glowing orbs */}
      <div className="glow-orb glow-orb-1"></div>
      <div className="glow-orb glow-orb-2"></div>

      {/* Navigation (simplified) */}
      <nav className="container flex items-center justify-between" style={{ padding: '1.5rem 2rem', position: 'relative', zIndex: 10 }}>
        <div className="flex items-center gap-sm" style={{ fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.02em' }}>
          <Sparkles className="text-gradient" size={28} />
          <span>Outpero</span>
        </div>
        <div className="flex gap-md">
          <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'white'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>Features</a>
          <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'white'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>Testimonials</a>
          <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'white'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>Pricing</a>
        </div>
        <div>
          <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Log in</button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container" style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', paddingTop: '2rem', paddingBottom: '4rem' }}>
        <motion.div 
          className="flex-col items-center justify-center" 
          style={{ textAlign: 'center', width: '100%', maxWidth: '800px', margin: '0 auto' }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={itemVariants}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '999px', backgroundColor: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '2rem' }}
          >
            <Zap size={16} />
            <span>The Next Generation of UI Building</span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            style={{ fontSize: 'clamp(3rem, 5vw + 1rem, 5rem)', marginBottom: '1.5rem', lineHeight: 1.1 }}
          >
            Crafting <span className="text-gradient">Stunning Digital</span> Experiences
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            style={{ fontSize: 'clamp(1.125rem, 2vw, 1.25rem)', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}
          >
            Build breathtaking interfaces faster than ever before. Equipped with industry-leading tools like Framer Motion and Lucide React.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center gap-md"
            style={{ flexWrap: 'wrap' }}
          >
            <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Start Building Now
              <ArrowRight size={20} />
            </button>
            <button className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              <Code2 size={20} />
              Read Documentation
            </button>
          </motion.div>

          {/* Floating glass panel preview */}
          <motion.div 
            variants={itemVariants}
            className="glass-panel"
            style={{ marginTop: '5rem', padding: '1.5rem', width: '100%', height: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div className="flex gap-sm" style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#eab308' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
            </div>
            <div className="flex flex-col gap-md" style={{ height: '100%', justifyContent: 'center', alignItems: 'center', color: 'var(--text-secondary)' }}>
               <Sparkles size={48} className="text-gradient" style={{ opacity: 0.5 }} />
               <p style={{ fontWeight: 500 }}>Your Premium UI Canvas</p>
            </div>
          </motion.div>

        </motion.div>
      </main>
    </div>
  );
}

export default App;
