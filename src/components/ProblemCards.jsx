import React from 'react';
import { motion } from 'framer-motion';
import { Timer, FileText, Globe } from 'lucide-react';
import HoverCloudCard from './HoverCloudCard';

export default function ProblemCards() {
  const problems = [
    {
      num: '01',
      icon: <Timer size={18} color="rgba(255,255,255,0.6)" />,
      title: 'Leads Going Cold',
      desc: "You pay for ads. Leads come in. Nobody calls back in time. 78% of customers buy from whoever responds first — by the time you respond, the deal's already gone."
    },
    {
      num: '02',
      icon: <FileText size={18} color="rgba(255,255,255,0.6)" />,
      title: 'Too Much Manual Work',
      desc: "Your team spends 20-40 hours a week on repetitive tasks. Data entry, scheduling, generating reports... That's 40 hours every week not spent on growing revenue."
    },
    {
      num: '03',
      icon: <Globe size={18} color="rgba(255,255,255,0.6)" />,
      title: "Websites That Don't Convert",
      desc: "Traffic lands on your site, looks around, and leaves. Without a clear system to capture and qualify visitors, you're losing potential revenue."
    }
  ];

  return (
    <section className="section-padding container">
      <div className="grid-3">
        {problems.map((prob, i) => (
          <HoverCloudCard 
            key={i}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            className="glass-panel"
            style={{ 
              padding: '2.5rem', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '2rem',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
              backdropFilter: 'blur(16px)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ 
                border: '1px solid rgba(255,255,255,0.08)', 
                borderRadius: '50%', 
                width: '42px', 
                height: '42px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.02)'
              }}>
                {prob.icon}
              </div>
              <span style={{ fontSize: '1.5rem', fontWeight: 600, color: 'rgba(255,255,255,0.1)' }}>{prob.num}</span>
            </div>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem', color: '#fff' }}>{prob.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', lineHeight: 1.7 }}>{prob.desc}</p>
            </div>
          </HoverCloudCard>
        ))}
      </div>
    </section>
  );
}
