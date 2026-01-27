import React from 'react';
import { motion, LazyMotion, domMax, type HTMLMotionProps } from 'framer-motion';

// Asset Imports
import YucatanHero from '../assets/yucatan_imgs/yucatan_hero.webp';
import YucatanExterior from '../assets/yucatan_imgs/yucatan_exterior.webp';
import FrontExterior from '../assets/yucatan_imgs/front_exterior_view.webp';
import LivingRoomKitchen from '../assets/yucatan_imgs/living_room_+_kitchen.webp';
import MasterBath from '../assets/yucatan_imgs/master_bathroom.webp';
import GuestBed1 from '../assets/yucatan_imgs/guest_bedroom_1.webp';

// 1. Fixed TypeScript Animation Object
// Using HTMLMotionProps<"div"> ensures compatibility with motion.div, motion.h1, etc.
const fadeInUpProps: HTMLMotionProps<"div"> = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true, amount: 0.1 }
};

const Yucatan: React.FC = () => {
  return (
    <LazyMotion features={domMax}>
      <div className="bg-white min-h-screen pt-20 selection:bg-brand-gold/30">
        
        {/* HERO: CASA AIDA INTRO */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-stone-100">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <img 
              src={YucatanHero} 
              // fetchPriority and eager loading makes the hero show up first
              fetchPriority="high"
              loading="eager"
              className="w-full h-full object-cover opacity-70" 
              alt="Casa Aida Progreso Rendering" 
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </motion.div>

          <div className="relative z-10 text-center px-6">
            <motion.h1 
              {...(fadeInUpProps as any)} 
              className="text-white text-5xl md:text-9xl font-light tracking-tighter mb-6 uppercase"
            >
              CASA <span className="italic text-brand-gold">AIDA.</span>
            </motion.h1>
            <motion.p 
              {...(fadeInUpProps as any)} 
              transition={{ delay: 0.3 }} 
              className="text-white/90 text-sm md:text-base tracking-[0.5em] uppercase"
            >
              Progreso, Yucatan, Mexico
            </motion.p>
          </div>
        </section>

        {/* INVESTMENT SNAPSHOT */}
        <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeInUpProps}>
              <h2 className="text-brand-gold text-[10px] tracking-[0.5em] uppercase mb-6 font-bold">Investment Opportunity</h2>
              <h3 className="text-brand-maroon text-4xl md:text-5xl font-light tracking-tight mb-8 leading-tight">
                A Masterpiece <br/> of Coastal Living.
              </h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                Casa Aida represents a unique opportunity to invest in the rapidly growing market of Progreso, Yucatan.
              </p>
              <div className="flex gap-12 border-t border-gray-100 pt-8">
                <div>
                  <p className="text-brand-maroon font-bold text-xl">$299k+</p>
                  <p className="text-[10px] text-gray-400 tracking-widest uppercase">Starting Price</p>
                </div>
                <div>
                  <p className="text-brand-maroon font-bold text-xl">2027</p>
                  <p className="text-[10px] text-gray-400 tracking-widest uppercase">Completion Date</p>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeInUpProps} transition={{ delay: 0.2 }} className="aspect-[4/3] overflow-hidden shadow-2xl bg-stone-100">
              <img 
                src={YucatanExterior} 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
                alt="Casa Aida Exterior" 
              />
            </motion.div>
          </div>
        </section>

        {/* INTERIOR GALLERY SECTION */}
        <section className="py-32 px-6 lg:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <h2 className="text-brand-gold text-[10px] tracking-[0.5em] uppercase mb-4 font-bold">The Interiors</h2>
              <h3 className="text-brand-maroon text-4xl font-light tracking-tight uppercase">Modern Comfort, <br/> Timeless Design.</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[1200px]">
              <motion.div {...fadeInUpProps} className="md:col-span-8 relative overflow-hidden group shadow-lg bg-stone-100">
                <img 
                  src={LivingRoomKitchen} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  alt="Living Room" 
                />
              </motion.div>

              <motion.div {...fadeInUpProps} className="md:col-span-4 relative overflow-hidden group shadow-lg bg-stone-100">
                <img 
                  src={MasterBath} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  alt="Master Bath" 
                />
              </motion.div>

              <motion.div {...fadeInUpProps} className="md:col-span-4 relative overflow-hidden group shadow-lg bg-stone-100">
                <img 
                  src={GuestBed1} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  alt="Guest Bedroom" 
                />
              </motion.div>

              <motion.div {...fadeInUpProps} className="md:col-span-8 relative overflow-hidden group shadow-lg bg-stone-100">
                <img 
                  src={FrontExterior} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  alt="Exterior View" 
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* WHY YUCATAN? GRID */}
        <section className="py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-brand-maroon text-xs tracking-[0.5em] uppercase mb-20 font-bold">Why Yucatan?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-left">
              {[
                { title: "Economic Growth", desc: "The Yucatan Peninsula is experiencing a massive influx of infrastructure investment." },
                { title: "Tourism Boom", desc: "Progreso is becoming a preferred destination for international travelers." },
                { title: "Lifestyle Value", desc: "Unrivaled quality of life with world-class beaches and culture." }
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-brand-gold text-2xl mb-4 font-light italic">0{i + 1}.</p>
                  <h4 className="text-brand-maroon tracking-widest text-sm font-bold mb-4 uppercase">{item.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL REGISTRATION SECTION */}
        <section className="py-32 px-6 lg:px-12 bg-white text-center">
          <motion.div {...fadeInUpProps} className="max-w-3xl mx-auto">
            <h2 className="text-brand-maroon text-4xl font-light tracking-tight mb-8 uppercase">Request the <span className="italic">Casa Aida</span> Investor Kit</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <input type="text" placeholder="First Name" className="border-b border-gray-200 py-4 outline-none focus:border-brand-gold transition-colors" />
              <input type="text" placeholder="Last Name" className="border-b border-gray-200 py-4 outline-none focus:border-brand-gold transition-colors" />
            </div>
            <input type="email" placeholder="Email Address" className="w-full border-b border-gray-200 py-4 outline-none focus:border-brand-gold transition-colors mb-12" />
            <button className="px-16 py-5 bg-brand-maroon text-white text-[10px] tracking-[0.5em] uppercase font-bold hover:bg-brand-gold transition-all duration-500 shadow-xl">
              Download Investor Kit
            </button>
          </motion.div>
        </section>
      </div>
    </LazyMotion>
  );
};

export default Yucatan;