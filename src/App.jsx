import React from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import HeroPentagon from './components/HeroPentagon';
import ProblemCards from './components/ProblemCards';
import Systems from './components/Systems';
import Process from './components/Process';
import Solutions from './components/Solutions';

function App() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      
      <main style={{ position: 'relative', zIndex: 10 }}>
        <HeroPentagon />
        <ProblemCards />
        <Systems />
        <Process />
        <Solutions />
      </main>
      
      {/* Footer can be added later if needed */}
      <footer style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', borderTop: '1px solid var(--glass-border)' }}>
        <p>© 2026 Outpero. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
