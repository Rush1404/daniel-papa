import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import MeetDaniel from './pages/MeetDaniel';
import Residential from './pages/Ontario/Residential';
import Contact from './pages/Contact';
import Yucatan from './pages/Yucatan';
import PreConstruction from './pages/Ontario/PreConstruction';
import Investment from './pages/Ontario/Investment';
import Commercial from './pages/Ontario/Commercial'
import AdminPortal from './pages/AdminPortal';
import BlogPost from './pages/BlogPost';
import Insights from './pages/Insights';
// Added Phone and Calendar icons here
import { Instagram, Facebook, Linkedin, Phone, Calendar } from 'lucide-react';
import './index.css';

const App: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-gold selection:text-white overflow-x-hidden">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/meet-daniel" element={<MeetDaniel />} />
        <Route path="/residential" element={<Residential />} />
        <Route path='/pre-construction' element={<PreConstruction />} />
        <Route path='/investment' element={<Investment />} />
        <Route path="/commercial" element={<Commercial />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/yucatan" element={<Yucatan />} />
        <Route path="/internal-portal" element={<AdminPortal />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/journal/:slug" element={<BlogPost />} />
      </Routes>

      {/* --- MOBILE ACTION BUTTONS --- */}
      {/* md:hidden ensures it only shows on mobile devices */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-[9999] px-4 pb-6 pt-4 bg-white/80 backdrop-blur-md border-t border-gray-100 flex gap-3 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        
        {/* Call Now Button */}
        <a 
          href="tel:4169533540" 
          className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-4 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-transform active:scale-95 shadow-lg"
        >
          <Phone size={14} className="text-brand-gold" />
          Call Now
        </a>

        {/* Book a Call Button */}
        <Link 
          to="/contact" 
          className="flex-1 flex items-center justify-center gap-2 bg-brand-gold text-white py-4 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-transform active:scale-95 shadow-lg"
        >
          <Calendar size={14} />
          Book a Call
        </Link>
      </div>

      <footer className="bg-black py-24 px-6 lg:px-12 border-t border-white/5 text-white">
        {/* ... (Existing footer code remains unchanged) ... */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="flex-1 space-y-8 text-left">
            <div>
              <h2 className="text-white text-2xl font-bold tracking-[0.3em] uppercase">
                DANIEL PAPA
              </h2>
              <p className="text-brand-gold text-[10px] tracking-[0.5em] uppercase mt-2">
                REALTOR
              </p>
            </div>
            <div className="flex gap-6 text-white">
              <a href="#" className="hover:text-brand-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-brand-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-brand-gold transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
            <div className="text-[10px] tracking-[0.2em] uppercase space-y-2 font-light text-white">
              <a href="tel:+1 4169533540" className="block hover:text-brand-gold transition-colors">
                M +1 416.953.3540
              </a>
              <a href="mailto:PROPERTIES@DANIELPAPA.COM" className="block hover:text-brand-gold transition-colors">
                PROPERTIES@DANIELPAPA.COM
              </a>
              <p className="pt-2">WWW.DANIELPAPA.COM</p>
            </div>
          </div>
          <div className="flex-1 md:text-right space-y-6">
            <div className="opacity-80">
              <h3 className="text-white font-bold tracking-[0.3em] text-xl uppercase">
                CENTURY 21.
              </h3>
              <p className="text-brand-gold text-[9px] tracking-[0.4em] uppercase mt-1">
                Leading Edge Realty Inc.
              </p>
            </div>
            <div className="text-white text-[9px] tracking-[0.25em] uppercase leading-loose font-light">
              <p className="mb-1">Brokerage</p>
              <p className="max-w-[250px] md:ml-auto">
                18 Wynford Drive #214, <br/> Toronto, ON M3C 3S2
              </p>
            </div>
            <p className="text-[8px] tracking-widest text-white uppercase pt-8">
              Independently Owned and Operated.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-4 pt-2 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[8px] tracking-[0.3em] text-white uppercase">
          <p>© 2026 Daniel Papa Real Estate. All Rights Reserved.</p>
          <div className="flex gap-8">
            <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;