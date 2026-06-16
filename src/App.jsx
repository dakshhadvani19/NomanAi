import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AnimatedBackground from './components/AnimatedBackground';
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
    <BrowserRouter>
      <AnimatedBackground />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/audit" element={<AuditPage />} />
        <Route path="/voice-agents" element={<VoiceAgentsPage />} />
        <Route path="/revenue-systems" element={<RevenueSystemsPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

