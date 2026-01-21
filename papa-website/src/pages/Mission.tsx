import React from 'react';
import { motion } from 'framer-motion';
import LogoKey from '../assets/clear_logo.png';

const Mission: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut" as const },
    viewport: { once: false, amount: 0.2 }
  };

  const sideFade = (direction: 'left' | 'right') => ({
    initial: { opacity: 0, x: direction === 'left' ? -80 : 80 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 1.2, ease: "easeOut" as const },
    viewport: { once: false, amount: 0.3 }
  });

  return (
    <div className="bg-white min-h-screen pt-32 overflow-hidden">
      {/* SECTION 1: CORE MISSION STATEMENT */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="mb-12 flex justify-center"
        >
          <img src={LogoKey} alt="Daniel Papa Key Logo" className="h-24 w-auto" />
        </motion.div>
        
        <motion.h1 {...fadeInUp} className="text-brand-maroon text-4xl md:text-6xl font-light tracking-[0.2em] uppercase leading-tight mb-8">
          Redefining Excellence <br/> in Real Estate.
        </motion.h1>
        
        <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="w-24 h-[1px] bg-brand-gold mx-auto mb-12"></motion.div>
        
        <motion.p {...fadeInUp} transition={{ delay: 0.5 }} className="text-gray-600 text-lg md:text-xl leading-relaxed font-light max-w-3xl mx-auto italic">
          "Our mission is simple: to provide a unique and unparalleled experience to buyers and sellers by combining deep industry knowledge with a profound passion for transforming dreams into reality."
        </motion.p>
      </section>

      {/* SECTION 2: THE VISION (ALTERNATING LAYOUT) */}
      <section className="bg-gray-50 py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-20">
          <motion.div {...sideFade('left')} className="flex-1 aspect-video lg:aspect-[4/5] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
              alt="Modern Toronto Architecture" 
            />
          </motion.div>
          
          <motion.div {...fadeInUp} className="flex-1">
            <h2 className="text-brand-gold text-xs tracking-[0.5em] uppercase mb-6 font-bold">The Vision</h2>
            <h3 className="text-brand-maroon text-4xl md:text-5xl font-light tracking-tight mb-8 uppercase">A Standard of <br/> Unrivaled Service.</h3>
            <p className="text-gray-600 leading-loose mb-8">
              Under Daniel’s leadership, we have become a symbol of excellence in the industry, setting a new standard for client-focused service. We believe that every transaction is more than a deal—it is a life-changing milestone.
            </p>
            <p className="text-gray-600 leading-loose">
              By leveraging the resources of Century 21 Leading Edge Realty Inc., we ensure our clients' goals are not only met but exceeded.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: THE THREE PILLARS */}
      <section className="py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2 {...fadeInUp} className="text-center text-brand-maroon text-3xl font-light tracking-[0.4em] uppercase mb-24">The Pillars</motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="text-center group">
              <div className="text-brand-gold text-4xl font-extralight mb-6">01</div>
              <h4 className="text-brand-maroon tracking-[0.2em] font-medium mb-4">INTEGRITY</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Doing the right thing, even when no one is watching. Honesty is the foundation of our client relationships.</p>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.4 }} className="text-center group">
              <div className="text-brand-gold text-4xl font-extralight mb-6">02</div>
              <h4 className="text-brand-maroon tracking-[0.2em] font-medium mb-4">INNOVATION</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Utilizing cutting-edge marketing and AI technology to give your property the global exposure it deserves.</p>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.6 }} className="text-center group">
              <div className="text-brand-gold text-4xl font-extralight mb-6">03</div>
              <h4 className="text-brand-maroon tracking-[0.2em] font-medium mb-4">COMMUNITY</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Building a lasting impact on the world of real estate, one successful client and one neighborhood at a time.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-32 bg-brand-maroon text-center text-white">
        <motion.div {...fadeInUp}>
          <h2 className="text-3xl font-light tracking-[0.3em] uppercase mb-8">Ready to Start Your Journey?</h2>
          <button className="px-12 py-4 bg-white text-brand-maroon text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-brand-gold hover:text-white transition-all duration-500 shadow-xl">
            Book a Discovery Call
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default Mission;