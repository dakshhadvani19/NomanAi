import React from 'react';
import { motion } from 'framer-motion';
import { Timer, FileText, Globe } from 'lucide-react';

export default function ProblemCards() {
  const problems = [
    {
      num: '01',
      icon: <Timer size={24} className="text-gradient" />,
      title: 'Leads Going Cold',
      desc: "You pay for ads. Leads come in. Nobody calls back in time. 78% of customers buy from whoever responds first — by the time you respond, the deal's already gone."
    },
    {
      num: '02',
      icon: <FileText size={24} className="text-gradient" />,
      title: 'Too Much Manual Work',
      desc: "Your team spends 20-40 hours a week on repetitive tasks. Data entry, scheduling, generating reports... That's 40 hours every week not spent on growing revenue."
    },
    {
      num: '03',
      icon: <Globe size={24} className="text-gradient" />,
      title: "Websites That Don't Convert",
      desc: "Traffic lands on your site, looks around, and leaves. Without a clear system to capture and qualify visitors, you're losing potential revenue."
    }
  ];

  return (
    <section className="section-padding container">
      <div className="grid-3">
        {problems.map((prob, i) => (
          <motion.div 
            key={i}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            className="glass-panel"
            style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ background: 'rgba(6,182,212,0.1)', padding: '1rem', borderRadius: '12px' }}>
                {prob.icon}
              </div>
              <span style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--glass-border)', lineHeight: 1 }}>{prob.num}</span>
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{prob.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{prob.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
