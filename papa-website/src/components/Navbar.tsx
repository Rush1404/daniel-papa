import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import LogoKey from '../assets/clear_logo.png';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const isDarkNavPage = ['/residential', '/team', '/mission', '/opportunities', '/contact'].includes(location.pathname);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const textColorClass = (isScrolled || isDarkNavPage) ? 'text-black' : 'text-white';
  const bgColorClass = (isScrolled || isDarkNavPage) ? 'bg-white shadow-xl py-4' : 'bg-transparent py-6';
  const logoTextColor = (isScrolled || isDarkNavPage) ? 'text-brand-maroon' : 'text-white';

  const navLinks = [
    { name: 'Team', path: '/team' },
    { name: 'Mission', path: '/mission' },
    { name: 'REAL ESTATE', path: '', dropdown: true },
    { name: 'Opportunities', path: '/opportunities' },
  ];

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-700 ${bgColorClass}`}>
      <div className="px-6 lg:px-12 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-4">
          <img src={LogoKey} alt="Daniel Papa Logo" className="h-10 md:h-12 w-auto" />
          <div className="flex flex-col leading-none">
            <span className={`text-xl font-bold tracking-[0.2em] transition-colors duration-500 ${logoTextColor}`}>
              DANIEL PAPA
            </span>
            <span className="text-[9px] tracking-[0.5em] text-brand-gold font-medium uppercase mt-1">
              REALTOR
            </span>
          </div>
        </Link>

        <div className={`hidden lg:flex items-center gap-8 text-[10px] tracking-[0.25em] uppercase font-semibold ${textColorClass}`}>
          {navLinks.map((link) => (
            <div 
              key={link.name} 
              className="relative group py-2 h-full"
              onMouseEnter={() => link.dropdown && setIsDropdownOpen(true)}
              onMouseLeave={() => link.dropdown && setIsDropdownOpen(false)}
            >
              {link.dropdown ? (
                <button className="flex items-center gap-1 hover:text-brand-gold transition-colors focus:outline-none">
                  {link.name} <ChevronDown size={12} />
                </button>
              ) : (
                <Link to={link.path} className="hover:text-brand-gold transition-colors">
                  {link.name}
                </Link>
              )}

              {/* Dropdown Menu - Fixed with Bridge */}
              {link.dropdown && isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 bg-white shadow-2xl py-6 px-8 min-w-[220px] flex flex-col gap-4 text-brand-maroon border-t-2 border-brand-gold mt-2
                             before:content-[''] before:absolute before:-top-4 before:left-0 before:w-full before:h-4"
                >
                  <Link to="/residential" onClick={() => setIsDropdownOpen(false)} className="hover:text-brand-gold transition-colors">Residential</Link>
                  <Link to="#" className="hover:text-brand-gold transition-colors">Pre-Construction</Link>
                  <Link to="#" className="hover:text-brand-gold transition-colors">Commercial</Link>
                  <Link to="#" className="hover:text-brand-gold transition-colors">Investment</Link>
                </motion.div>
              )}
            </div>
          ))}
          
          <Link 
            to="/contact" 
            className={`px-8 py-3 border-2 transition-all duration-500 text-[10px] tracking-[0.3em] font-bold text-center ${
                (isScrolled || isDarkNavPage) 
                ? 'bg-brand-maroon text-white border-brand-maroon hover:bg-transparent hover:text-brand-maroon' 
                : 'bg-white text-black border-white hover:bg-transparent hover:text-white'
            }`}
          >
            Book a Discovery Call
          </Link>
        </div>

        <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className={textColorClass} /> : <Menu className={textColorClass} />}
        </button>
      </div>

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