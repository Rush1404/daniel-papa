import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image - Fades in from bottom */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Property" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-maroon/30 to-black/60"></div>
      </motion.div>

      <div className="relative z-10 text-center px-6">
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-white text-5xl md:text-8xl font-light tracking-tighter mb-4"
        >
          BUILDING YOUR <span className="italic text-brand-gold">FUTURE.</span>
        </motion.h1>
        
        {/* Buttons - Fade in from the side */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex gap-4 justify-center mt-8"
        >
          <button className="btn-maroon">View Listings</button>
          <button className="btn-gold">Meet the Team</button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;