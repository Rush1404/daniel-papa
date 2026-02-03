import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage'; // Move your current App content here
import MeetDaniel from './pages/MeetDaniel';
import Residential from './pages/Ontario/Residential';
import Mission from './pages/Mission';
import Contact from './pages/Contact';
import Yucatan from './pages/Yucatan';
import PreConstruction from './pages/Ontario/PreConstruction';
import Investment from './pages/Ontario/Investment';
import Commercial from './pages/Ontario/Commercial'
import AdminPortal from './pages/AdminPortal';
import BlogPost from './pages/BlogPost';
import { Instagram, Facebook, Linkedin} from 'lucide-react';

const App: React.FC = () => {
  const { pathname } = useLocation();

  // Scroll to top every time the URL changes
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
        <Route path="/mission" element={<Mission />} />
        <Route path='/pre-construction' element={<PreConstruction />} />
        <Route path='/investment' element={<Investment />} />
        <Route path="/commercial" element={<Commercial />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/yucatan" element={<Yucatan />} />
        <Route path="/internal-portal" element={<AdminPortal />} />
        {/* DYNAMIC BLOG ROUTE */}
        <Route path="/journal/:slug" element={<BlogPost />} />
      </Routes>

      

      {/* Persistent Footer using Daniel's branding */}
      <footer className="bg-black py-24 px-6 lg:px-12 border-t border-white/5 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          
          {/* LEFT SIDE: DANIEL PAPA & SOCIALS */}
          <div className="flex-1 space-y-8 text-left">
            <div>
              <h2 className="text-white text-2xl font-bold tracking-[0.3em] uppercase">
                DANIEL PAPA
              </h2>
              <p className="text-brand-gold text-[10px] tracking-[0.5em] uppercase mt-2">
                REALTOR
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-6 text-white/40">
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

            {/* Direct Contact */}
            <div className="text-[10px] tracking-[0.2em] uppercase space-y-2 font-light text-white/60">
              <a href="tel:4169533540" className="block hover:text-brand-gold transition-colors">
                M 416.953.3540
              </a>
              <a href="mailto:PROPERTIES@DANIELPAPA.COM" className="block hover:text-brand-gold transition-colors">
                PROPERTIES@DANIELPAPA.COM
              </a>
              <p className="pt-2">WWW.DANIELPAPA.COM</p>
            </div>
          </div>

          {/* RIGHT SIDE: CENTURY 21 & BROKERAGE */}
          <div className="flex-1 md:text-right space-y-6">
            <div className="opacity-80">
              <h3 className="text-white font-bold tracking-[0.3em] text-xl uppercase">
                CENTURY 21.
              </h3>
              <p className="text-brand-gold text-[9px] tracking-[0.4em] uppercase mt-1">
                Leading Edge Realty Inc.
              </p>
            </div>

            <div className="text-white/30 text-[9px] tracking-[0.25em] uppercase leading-loose font-light">
              <p className="mb-1">Brokerage</p>
              <p className="max-w-[250px] md:ml-auto">
                501 Queen St W Suite 200, <br/> Toronto, ON M5V 2B4
              </p>
            </div>
            
            {/* Small Legal/Disclaimer */}
            <p className="text-[8px] tracking-widest text-white/20 uppercase pt-8">
              Independently Owned and Operated.
            </p>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[8px] tracking-[0.3em] text-white/20 uppercase">
          <p>© 2026 Daniel Papa Real Estate. All Rights Reserved.</p>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;