import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage'; // Move your current App content here
import Residential from './pages/Residential';
import Team from './pages/Team';
import Mission from './pages/Mission';
import Opportunities from './pages/Opportunities';
import Contact from './pages/Contact';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-gold selection:text-white overflow-x-hidden">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/residential" element={<Residential />} />
        <Route path="/team" element={<Team />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {/* Persistent Footer using Daniel's branding */}
      <footer className="bg-black py-20 px-6 text-center border-t border-white/5">
        <h2 className="text-white font-bold tracking-[0.2em] text-xl">CENTURY 21.</h2>
        <p className="text-brand-gold text-[10px] tracking-[0.3em] uppercase">Leading Edge Realty Inc.</p>
      </footer>
    </div>
  );
};

export default App;