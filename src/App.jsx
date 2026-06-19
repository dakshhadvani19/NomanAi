import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/SEO';
import AnimatedBackground from './components/AnimatedBackground';
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

function HomePage() {
  return (
    <main style={{ position: 'relative', zIndex: 10 }}>
      <SEO 
        title="Noman ai | AI Voice Agents & Revenue Systems" 
        description="Stop stitching tools together. Noman ai provides fully integrated, end-to-end AI Voice Agents and Revenue Systems to eliminate operational bottlenecks and scale your business."
        url="https://nomanai.vercel.app/"
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
      <BrowserRouter>
        <GlobalCursorAurora />
        <AnimatedBackground />
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
    </HelmetProvider>
  );
}

export default App;

