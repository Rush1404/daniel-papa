import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import LogoKey from '../assets/clear_logo.png';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isMobileAccordionOpen, setIsMobileAccordionOpen] = useState<boolean>(false);
  
  // Reference for the close timer "Grace Period"
  const timeoutRef = useRef<number | null>(null);

  const isDarkNavPage = ['/', '/residential', '/mission', '/opportunities', '/contact', '/yucatan'].includes(location.pathname);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
  }, [isMobileMenuOpen]);

  // Dropdown Handlers
  const handleMouseEnter = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsDropdownOpen(false);
    }, 250); // Increased to 250ms for a more forgiving user experience
  };

  const navLinks = [
    { name: 'Meet Daniel', path: '/meet-daniel' },
    { name: 'Insights', path: '/insights' },
    { 
      name: 'Ontario', 
      path: '', 
      dropdown: true, 
      subLinks: [
        { name: 'Residential', path: '/residential' },
        { name: 'Investment & Multi-Family', path: '/investment' },
        { name: 'Pre-Construction', path: '/pre-construction' },
        { name: 'Commercial', path: '/commercial' }
      ] 
    },
    { name: 'Yucátan', path: '/yucatan' },
  ];

  const bgColorClass = (isScrolled || isDarkNavPage) ? 'bg-white shadow-xl py-4' : 'bg-transparent py-6';

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-700 ${bgColorClass}`}>
      <div className="px-6 lg:px-12 flex justify-between items-center max-w-[1600px] mx-auto">
        
        {/* Branding */}
        <Link to="/" className="flex items-center gap-3 md:gap-4 flex-shrink-0">
          <div className="h-10 md:h-12 w-10 md:w-12 flex-shrink-0">
            <img src={LogoKey} alt="Daniel Papa Logo" className="h-full w-full object-contain" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg md:text-xl font-bold tracking-[0.2em] text-brand-maroon">DANIEL PAPA</span>
            <span className="text-[8px] md:text-[9px] tracking-[0.5em] text-brand-gold font-medium uppercase mt-1">REALTOR</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 text-[10px] tracking-[0.25em] uppercase font-semibold text-brand-maroon">
          {navLinks.map((link) => (
            <div 
              key={link.name} 
              className="relative group py-2"
              onMouseEnter={() => link.dropdown && handleMouseEnter()}
              onMouseLeave={() => link.dropdown && handleMouseLeave()}
            >
              <button className="flex items-center gap-1 hover:text-brand-gold transition-colors uppercase">
                {link.dropdown ? <>{link.name} <ChevronDown size={12} /></> : <Link to={link.path}>{link.name}</Link>}
              </button>

              {link.dropdown && (
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute top-full left-0 bg-white shadow-2xl py-6 px-8 min-w-[260px] flex flex-col gap-4 text-brand-maroon border-t-2 border-brand-gold mt-2"
                    >
                      {/* INVISIBLE BRIDGE: Fills the air gap between the nav and the dropdown box */}
                      <div className="absolute -top-6 left-0 w-full h-6 bg-transparent" />
                      
                      {link.subLinks?.map(sub => (
                        <Link 
                          key={sub.path} 
                          to={sub.path} 
                          className="hover:text-brand-gold transition-colors py-1"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
          <Link to="/contact" className="px-8 py-3 bg-brand-maroon text-white text-[10px] tracking-[0.3em] font-bold hover:bg-brand-gold transition-all duration-500">
            Contact Us
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="lg:hidden p-2 text-brand-maroon" 
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={28} strokeWidth={1.5} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[120] flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-xs tracking-[0.5em] text-brand-gold uppercase font-bold">Navigation</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-brand-maroon">
                <X size={32} strokeWidth={1} />
              </button>
            </div>

            <div className="flex flex-col gap-8 flex-1 overflow-y-auto">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col">
                  {link.dropdown ? (
                    <>
                      <button 
                        onClick={() => setIsMobileAccordionOpen(!isMobileAccordionOpen)}
                        className="flex justify-between items-center text-2xl tracking-[0.3em] uppercase text-brand-maroon text-left"
                      >
                        {link.name}
                        <motion.div animate={{ rotate: isMobileAccordionOpen ? 180 : 0 }}>
                          <ChevronDown size={20} />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {isMobileAccordionOpen && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden flex flex-col gap-4 mt-6 pl-4 border-l border-brand-gold/30"
                          >
                            {link.subLinks?.map(sub => (
                              <Link 
                                key={sub.path} 
                                to={sub.path} 
                                className="text-sm tracking-[0.2em] uppercase text-gray-700"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link 
                      to={link.path} 
                      className="text-2xl tracking-[0.3em] uppercase text-brand-maroon"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col gap-6">
               <Link 
                to="/contact" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="w-full py-5 bg-brand-maroon text-white text-[10px] tracking-[0.4em] uppercase font-bold text-center shadow-lg"
              >
                Book Discovery Call
              </Link>
              <div className="flex justify-center gap-6 text-brand-gold">
                <p className="text-[9px] tracking-widest uppercase italic">Toronto • Durham • Peel • York</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;