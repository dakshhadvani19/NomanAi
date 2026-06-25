import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from "@vercel/analytics/react";
import { CurrencyProvider } from './context/CurrencyContext';
import SEO from './components/SEO';
import AnimatedBackground from './components/AnimatedBackground';
import DottedSurface from './components/DottedSurface';
import GlobalCursorAurora from './components/GlobalCursorAurora';
import Navbar from './components/Navbar';
import HeroPentagon from './components/HeroPentagon';
import ProblemCards from './components/ProblemCards';
import Systems from './components/Systems';
import Process from './components/Process';
import AuditPage from './components/AuditPage';
import Footer from './components/Footer';
import VoiceAgentsPage from './components/VoiceAgentsPage';
import RevenueSystemsPage from './components/RevenueSystemsPage';
import SolutionsPage from './components/SolutionsPage';
import ScrollToTop from './components/ScrollToTop';
import ClientPortal from './components/ClientPortal';

const homeSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://outperavercel.vercel.app/#service',
  name: 'AI Voice Agents & Revenue Automation',
  alternateName: ['Outpero AI Service', 'NomanAi Services', 'AI Voice Agent India'],
  provider: {
    '@type': 'Organization',
    name: 'Outpera',
    alternateName: ['Outpero', 'Outperra', 'NomanAi'],
    url: 'https://outperavercel.vercel.app',
  },
  serviceType: ['AI Automation', 'AI Voice Agent', 'Revenue Automation', 'Lead Automation', 'WhatsApp Automation'],
  areaServed: [
    { '@type': 'Country', name: 'India' },
    { '@type': 'State', name: 'Telangana' },
  ],
  description:
    'Outpera (also known as Outpero or NomanAi) deploys Telugu-first AI Voice Agents and fully automated Revenue Systems that call leads in seconds, handle objections, qualify intent and close deals — 24/7, without a human team.',
  offers: {
    '@type': 'Offer',
    price: '75000',
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
    seller: { '@type': 'Organization', name: 'Outpera' },
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '38',
    bestRating: '5',
  },
};

function HomePage() {
  return (
    <main style={{ position: 'relative', zIndex: 10 }}>
      <SEO
        title="Outpera | #1 AI Voice Agents & Revenue Automation for Indian Businesses"
        description="Outpera (also searched as Outpero, Outperra, NomanAi) — Telugu-first AI Voice Agents that call leads in 3 seconds, qualify intent & close 24/7. Full revenue automation: WhatsApp, AI calls, CRM & more. Hyderabad, India."
        url="https://outperavercel.vercel.app/"
        keywords="Outpera, Outpero, Outperra, NomanAi, Noman AI, ai voice agent india, ai voice agents india, voice agent india, ai automation india, ai automation agency india, voice agent and ai automation, Telugu AI voice agent, Telugu AI calling, automated lead follow-up india, AI revenue system india, WhatsApp automation india, business automation Hyderabad, lead conversion AI, AI for real estate India, AI calling software, sales automation india, ai agency india, best ai agency india"
        schema={homeSchema}
      />
      <HeroPentagon />
      <ProblemCards />
      <Systems />
      <Process />
    </main>
  );
}


function App() {
  return (
    <HelmetProvider>
      <CurrencyProvider>
        <BrowserRouter>
        <ScrollToTop />
        <GlobalCursorAurora />
        <DottedSurface style={{ position: 'fixed', zIndex: -1, opacity: 0.65 }} />
        <Navbar />
        <div className="mobile-page-wrapper">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/audit" element={<AuditPage />} />
            <Route path="/voice-agents" element={<VoiceAgentsPage />} />
            <Route path="/revenue-systems" element={<RevenueSystemsPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/client-portal" element={<ClientPortal />} />
          </Routes>
        </div>
        <Footer />
        </BrowserRouter>
        <Analytics />
      </CurrencyProvider>
    </HelmetProvider>
  );
}

export default App;

