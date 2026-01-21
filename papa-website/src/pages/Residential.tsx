import React from 'react';
import { motion } from 'framer-motion';

const Residential: React.FC = () => {
  const sideFade = (direction: 'left' | 'right') => ({
    initial: { opacity: 0, x: direction === 'left' ? -100 : 100 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 1.2, ease: "easeOut" as const },
    viewport: { once: false, amount: 0.2 }
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
    viewport: { once: false }
  };

  return (
    <div className="bg-white pt-32 min-h-screen">
      {/* SECTION 1: HERO - Residential Properties */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 flex flex-col lg:flex-row items-center gap-16">
        <motion.div {...fadeInUp} className="flex-1 order-2 lg:order-1">
          <h1 className="text-5xl md:text-7xl font-light tracking-widest text-brand-maroon mb-8 uppercase">
            RESIDENTIAL <br/> PROPERTIES
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-lg">
            If you’re looking to buy or sell your home, there is no better real estate team to take excellent care of you. We will work tirelessly to find you the perfect home at the absolute best price.
          </p>
          <button className="btn-maroon">Book a Discovery Call</button>
        </motion.div>
        <motion.div {...sideFade('right')} className="flex-1 order-1 lg:order-2 aspect-[4/5] lg:aspect-square overflow-hidden shadow-2xl">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200" className="w-full h-full object-cover" alt="Residential Hero" />
        </motion.div>
      </section>

      {/* SECTION 2: BUYING & SELLING YOUR HOME */}
      <section className="bg-[#f7f7f7] py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row-reverse items-center gap-16">
          <motion.div {...fadeInUp} className="flex-1">
            <h2 className="text-4xl md:text-6xl font-light tracking-widest text-brand-maroon mb-8 uppercase">
              BUYING & SELLING <br/> YOUR HOME
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-10">
              Whether you’re looking to buy a home or looking to sell your existing home (or both), we work hard to make the experience of buying and selling feel effortless for you. With our industry knowledge & hands-on experience in the Toronto market, we make it our business to not rest until we find you the perfect fit.
            </p>
            <button className="btn-gold">Book a Discovery Call</button>
          </motion.div>
          <motion.div {...sideFade('left')} className="flex-1 aspect-[4/3] overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000" className="w-full h-full object-cover" alt="Home Buying" />
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: NEW LISTINGS GRID */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <motion.h2 {...fadeInUp} className="text-3xl font-light tracking-[0.5em] text-brand-maroon mb-20 uppercase">NEW LISTINGS</motion.h2>
        
        {/* Listings Layout from Screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          {/* Listing 1 */}
          <motion.div {...fadeInUp} className="group">
            <p className="text-[10px] tracking-widest text-gray-400 mb-4">800 LAWRENCE AVE W — RESIDENTIAL</p>
            <div className="grid grid-cols-2 gap-4 aspect-video mb-4">
              <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600" className="w-full h-full object-cover" />
              <img src="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600" className="w-full h-full object-cover" />
            </div>
            <button className="text-[10px] tracking-[0.3em] uppercase border-b border-brand-gold pb-1">View Listing</button>
          </motion.div>

          {/* Listing 2 */}
          <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="group">
            <p className="text-[10px] tracking-widest text-gray-400 mb-4">WESTSHORE, LONG BRANCH — PRECONSTRUCTION</p>
            <div className="grid grid-cols-2 gap-4 aspect-video mb-4">
              <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600" className="w-full h-full object-cover" />
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600" className="w-full h-full object-cover" />
            </div>
            <button className="text-[10px] tracking-[0.3em] uppercase border-b border-brand-gold pb-1">View Listing</button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: DETAILED PROPERTY LAYOUT (Based on Screenshot) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div {...fadeInUp} className="mb-12">
            <h3 className="text-brand-maroon text-xs tracking-[0.4em] uppercase mb-2">
                611 COLLEGE STREET WEST — COMMERCIAL 
            </h3>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
            {/* Large Left Image */}
            <motion.div {...sideFade('left')} className="md:col-span-2 overflow-hidden shadow-lg">
                <img 
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" 
                alt="Commercial Interior 1" 
                />
            </motion.div>
            
            {/* Stacked Right Images */}
            <motion.div {...sideFade('right')} className="flex flex-col gap-4">
                <div className="flex-1 overflow-hidden shadow-lg">
                <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" 
                    alt="Commercial Interior 2" 
                />
                </div>
                <div className="flex-1 overflow-hidden shadow-lg">
                <img 
                    src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" 
                    alt="Commercial Interior 3" 
                />
                </div>
            </motion.div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Residential;