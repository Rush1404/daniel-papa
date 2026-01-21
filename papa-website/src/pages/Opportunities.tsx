import React from 'react';
import { motion } from 'framer-motion';

const Opportunities: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" as const },
    viewport: { once: false, amount: 0.2 }
  };

  const sideFade = (direction: 'left' | 'right') => ({
    initial: { opacity: 0, x: direction === 'left' ? -100 : 100 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 1, ease: "easeOut" as const },
    viewport: { once: false, amount: 0.2 }
  });

  return (
    <div className="bg-white pt-32 min-h-screen font-sans">
      
      {/* SECTION 1: HERO & REGISTRATION */}
      <section className="relative px-6 lg:px-12 py-16 max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-light tracking-[0.3em] text-brand-maroon uppercase mb-4">
            WESTSHORE—LONG BRANCH
          </h1>
          <p className="text-gray-500 text-sm tracking-widest uppercase italic">
            Hybrid Stacked Towns in South Etobicoke
          </p>
        </motion.div>

        <div className="relative aspect-[16/7] overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600" 
            className="w-full h-full object-cover" 
            alt="Opportunities Hero" 
          />
          {/* Registration Overlay Card */}
          <motion.div 
            {...sideFade('right')}
            className="absolute top-0 right-0 h-full w-full lg:w-1/3 bg-brand-maroon/95 p-10 text-white flex flex-col justify-center"
          >
            <h3 className="text-xl font-light tracking-[0.2em] mb-4 uppercase">
              Register Below for Prices & Floor Plans
            </h3>
            <p className="text-xs tracking-widest text-brand-gold mb-8">
              or call/text 416.953.3540
            </p>
            <div className="space-y-4">
              <input type="text" placeholder="First Name" className="w-full bg-white/10 border border-white/20 p-3 text-xs outline-none focus:border-brand-gold" />
              <input type="text" placeholder="Last Name" className="w-full bg-white/10 border border-white/20 p-3 text-xs outline-none focus:border-brand-gold" />
              <input type="email" placeholder="Email" className="w-full bg-white/10 border border-white/20 p-3 text-xs outline-none focus:border-brand-gold" />
              <button className="w-full bg-white text-brand-maroon py-4 text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-brand-gold hover:text-white transition-all">
                Submit Request
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: VALUE GRID */}
      <section className="bg-gray-100 py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { title: "Best Value in Toronto", desc: "A townhome for less than the price of a 2-bedroom condo downtown." },
            { title: "Waterfront Neighborhood", desc: "In the heart of Etobicoke and at the centre of Lakeshore's gentrification." },
            { title: "Incredible Investment", desc: "Affordable new build at resale value with much lower carrying costs." },
            { title: "Long Closing", desc: "Estimated completion 2026." }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              {...fadeInUp} 
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 text-center border-t-4 border-brand-gold"
            >
              <h4 className="text-brand-maroon text-[11px] tracking-[0.3em] uppercase mb-6 font-bold h-12 flex items-center justify-center leading-tight">
                {item.title}
              </h4>
              <p className="text-gray-500 text-xs leading-relaxed italic">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 3: ALTERNATING ABOUT SECTIONS */}
      <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto space-y-40">
        
        {/* About Community */}
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <motion.div {...sideFade('left')} className="flex-1 aspect-video overflow-hidden shadow-xl">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000" className="w-full h-full object-cover" alt="Community Aerial" />
          </motion.div>
          <motion.div {...fadeInUp} className="flex-1">
            <h2 className="text-brand-maroon text-4xl font-light tracking-tighter uppercase mb-8 leading-tight">
              About the <br/> <span className="text-brand-gold">Community</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Introducing <span className="font-bold">Westshore at Long Branch</span>, an upcoming pre-construction townhouse project. This project invites you to embrace a unique urban and eco-conscious community, meticulously designed to offer an extraordinary lifestyle.
            </p>
            <button className="btn-maroon">View Site Map</button>
          </motion.div>
        </div>

        {/* About Townhouses */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-20">
          <motion.div {...sideFade('right')} className="flex-1 aspect-video overflow-hidden shadow-xl">
            <img src="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1000" className="w-full h-full object-cover" alt="Townhouse Interior" />
          </motion.div>
          <motion.div {...fadeInUp} className="flex-1">
            <h2 className="text-brand-maroon text-4xl font-light tracking-tighter uppercase mb-8 leading-tight">
              About the <br/> <span className="text-brand-gold">Townhouses</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Long Branch is a well-established neighbourhood located on the Toronto waterfront. This lakeside village has many wonderful features such as picturesque waterfront parks, a local arena, and a GO Transit station.
            </p>
            <button className="btn-gold">Request Floorplans</button>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-brand-maroon py-24 text-center text-white">
        <motion.div {...fadeInUp}>
          <h2 className="text-3xl font-light tracking-[0.3em] uppercase mb-10">Register for more Information</h2>
          <button className="px-12 py-4 border-2 border-brand-gold text-brand-gold text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-white hover:text-brand-maroon transition-all">
            Get Instant Access
          </button>
        </motion.div>
      </section>

    </div>
  );
};

export default Opportunities;