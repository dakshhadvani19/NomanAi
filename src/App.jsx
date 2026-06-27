import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from "@vercel/analytics/react";
import { CurrencyProvider } from './context/CurrencyContext';
import SEO from './components/SEO';
import DottedSurface from './components/DottedSurface';
import GlobalCursorAurora from './components/GlobalCursorAurora';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import PageLoader, { SuspenseLoader } from './components/PageLoader';

// ─── Lazy-load every page so each gets its own JS chunk.
// The SuspenseLoader shows while the chunk is being fetched —
// this means the loader stays visible exactly as long as data/code is loading,
// with no fixed timers.
const HomePage        = lazy(() => import('./pages/HomePage'));
const AuditPage       = lazy(() => import('./components/AuditPage'));
const VoiceAgentsPage = lazy(() => import('./components/VoiceAgentsPage'));
const RevenueSystemsPage = lazy(() => import('./components/RevenueSystemsPage'));
const SolutionsPage   = lazy(() => import('./components/SolutionsPage'));
const ClientPortal    = lazy(() => import('./components/ClientPortal'));
const Footer          = lazy(() => import('./components/Footer'));

function App() {
  // ── Initial load: show loader until the browser window fires its 'load'
  // event (all resources — JS, CSS, fonts — are fully parsed and ready).
  // No fixed timeout. If the browser is fast, loader disappears fast.
  const [initialLoad, setInitialLoad] = useState(
    document.readyState !== 'complete'
  );

  useEffect(() => {
    if (document.readyState === 'complete') {
      // Already done — hide immediately (still fades via AnimatePresence)
      setInitialLoad(false);
      return;
    }
    const handleLoad = () => setInitialLoad(false);
    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  return (
    <HelmetProvider>
      <CurrencyProvider>
        <BrowserRouter>
          <ScrollToTop />
          <GlobalCursorAurora />
          <DottedSurface style={{ position: 'fixed', zIndex: -1, opacity: 0.65 }} />

          {/* Initial site load — hides the moment window.load fires */}
          <PageLoader isLoading={initialLoad} />

          <Navbar />

          <div className="mobile-page-wrapper">
            {/* AnimatePresence here lets SuspenseLoader fade out when page is ready */}
            <AnimatePresence mode="wait">
              <Suspense fallback={<SuspenseLoader />}>
                <Routes>
                  <Route path="/"                element={<HomePage />} />
                  <Route path="/audit"           element={<AuditPage />} />
                  <Route path="/voice-agents"    element={<VoiceAgentsPage />} />
                  <Route path="/revenue-systems" element={<RevenueSystemsPage />} />
                  <Route path="/solutions"       element={<SolutionsPage />} />
                  <Route path="/client-portal"   element={<ClientPortal />} />
                </Routes>
              </Suspense>
            </AnimatePresence>
          </div>

          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </BrowserRouter>
        <Analytics />
      </CurrencyProvider>
    </HelmetProvider>
  );
}

export default App;
