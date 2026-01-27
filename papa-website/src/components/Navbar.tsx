import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import LogoKey from '../assets/clear_logo.png';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isInvestmentSubOpen, setIsInvestmentSubOpen] = useState<boolean>(false);

  const isLandingPage = location.pathname === '/';
  const isDarkNavPage = ['/', '/residential', '/mission', '/opportunities', '/contact', '/yucatan'].includes(location.pathname);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bgColorClass = (isScrolled || isDarkNavPage) ? 'bg-white shadow-xl py-4' : 'bg-transparent py-6';
  const textColorClass = 'text-brand-maroon'; 
  const logoTextColor = 'text-brand-maroon';

  const navLinks = [
    { name: 'Meet Daniel', path: '/meet-daniel' },
    { name: 'My Approach', path: '/mission' },
    { name: 'MLS Search', path: '/MLS' },
    { name: 'Ontario', path: '', dropdown: true },
    { name: 'Yucatan', path: '/yucatan' },
  ];

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-700 ${bgColorClass}`}>
      <div className="px-6 lg:px-12 flex justify-between items-center">
        {/* Branding */}
        <Link to="/" className="flex items-center gap-4 flex-shrink-0 min-w-[250px]">
          <div className="h-10 md:h-12 w-12 flex-shrink-0">
            <img src={LogoKey} alt="Daniel Papa Logo" className="h-full w-full object-contain" />
          </div>
          <div className="flex flex-col leading-none">
            <span className={`text-xl font-bold tracking-[0.2em] transition-colors duration-500 ${logoTextColor}`}>DANIEL PAPA</span>
            <span className="text-[9px] tracking-[0.5em] text-brand-gold font-medium uppercase mt-1">REALTOR</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className={`hidden lg:flex items-center gap-8 text-[10px] tracking-[0.25em] uppercase font-semibold ${textColorClass}`}>
          {navLinks.map((link) => (
            <div 
              key={link.name} 
              className="relative group py-2 h-full"
              onMouseEnter={() => link.dropdown && setIsDropdownOpen(true)}
              onMouseLeave={() => {
                if (link.dropdown) {
                  setIsDropdownOpen(false);
                  setIsInvestmentSubOpen(false); // Close sub-menu when leaving main dropdown
                }
              }}
            >
              <button className="flex items-center gap-1 hover:text-brand-gold transition-colors focus:outline-none uppercase">
                {link.dropdown ? (
                  <>{link.name} <ChevronDown size={12} /></>
                ) : (
                  <Link to={link.path}>{link.name}</Link>
                )}
              </button>

              {/* Main Dropdown Menu */}
              {link.dropdown && isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 bg-white shadow-2xl py-6 px-8 min-w-[220px] flex flex-col gap-4 text-brand-maroon border-t-2 border-brand-gold mt-2
                             before:content-[''] before:absolute before:-top-4 before:left-0 before:w-full before:h-4"
                >
                  <Link to="/residential" className="hover:text-brand-gold transition-colors">Residential</Link>
                  <Link to="/investment" className="hover:text-brand-gold transition-colors">Investment & <br></br>Multi-Family</Link>
                  <Link to="/pre-construction" className="hover:text-brand-gold transition-colors">Pre-Construction</Link>
                  <Link to="/commercial" className="hover:text-brand-gold transition-colors">Commercial</Link>           
                </motion.div>
              )}
            </div>
          ))}
          <Link to="/contact" className="px-8 py-3 transition-all duration-500 text-[10px] tracking-[0.3em] font-bold text-center bg-brand-maroon text-white hover:bg-brand-gold">
            Book a Call with Daniel
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 bg-brand-maroon z-[110] flex flex-col items-center justify-center gap-8 text-white"
          >
            <button className="absolute top-8 right-6" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={32} />
            </button>
            <Link to="/team" className="text-xl tracking-[0.4em] uppercase" onClick={() => setIsMobileMenuOpen(false)}>Team</Link>
            <Link to="/residential" className="text-xl tracking-[0.4em] uppercase" onClick={() => setIsMobileMenuOpen(false)}>Residential</Link>
            <Link to="/contact" className="text-xl tracking-[0.4em] uppercase" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="mt-4 px-10 py-4 border-2 border-brand-gold text-brand-gold text-xs tracking-[0.4em] uppercase font-bold">
              Book Discovery Call
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;