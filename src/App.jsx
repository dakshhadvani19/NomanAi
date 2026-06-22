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
import Solutions from './components/Solutions';
import AuditPage from './components/AuditPage';
import Footer from './components/Footer';
import VoiceAgentsPage from './components/VoiceAgentsPage';
import RevenueSystemsPage from './components/RevenueSystemsPage';
import SolutionsPage from './components/SolutionsPage';

const homeSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI Voice Agents & Revenue Systems',
  provider: {
    '@type': 'Organization',
    name: 'Outpera',
    url: 'https://outperavercel.vercel.app',
  },
  serviceType: 'AI Automation',
  areaServed: { '@type': 'Country', name: 'India' },
  description:
    'Outpera deploys Telugu-first AI Voice Agents and fully automated Revenue Systems that call leads in seconds, handle objections, qualify intent and close deals — 24/7, without a human team.',
  offers: {
    '@type': 'Offer',
    price: '75000',
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
  },
};

function HomePage() {
  return (
    <main style={{ position: 'relative', zIndex: 10 }}>
      <SEO
        title="Outpera | AI Voice Agents & Revenue Systems for Indian Businesses"
        description="Telugu-first AI Voice Agents that call leads in 3 seconds, qualify and close — 24/7. Outpera automates your entire revenue pipeline: WhatsApp, calls, CRM and more."
        url="https://outperavercel.vercel.app/"
        keywords="AI voice agent India, Telugu AI calling agent, automated lead follow-up India, AI revenue system, WhatsApp automation India, business automation Hyderabad, lead conversion AI, AI for real estate India, AI calling software, sales automation India, Outpera"
        schema={homeSchema}
      />
      <HeroPentagon />
      <ProblemCards />
      <Systems />
      <Process />
      <Solutions />
    </main>
  );
}


function App() {
  return (
    <HelmetProvider>
      <CurrencyProvider>
        <BrowserRouter>
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

