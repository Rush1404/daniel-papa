import React, { useState, useEffect } from 'react';
import { motion, LazyMotion, domMax, type HTMLMotionProps } from 'framer-motion';
import { supabase } from '../components/supabaseClient';

// Static Asset Imports (used as fallback defaults)
import YucatanHeroDefault from '../assets/yucatan_imgs/yucatan_hero.webp';
import YucatanExteriorDefault from '../assets/yucatan_imgs/yucatan_exterior.webp';
import FrontExteriorDefault from '../assets/yucatan_imgs/front_exterior_view.webp';
import LivingRoomKitchenDefault from '../assets/yucatan_imgs/living_room_+_kitchen.webp';
import MasterBathDefault from '../assets/yucatan_imgs/master_bathroom.webp';
import GuestBed1Default from '../assets/yucatan_imgs/guest_bedroom_1.webp';

// 1. Fixed TypeScript Animation Object
const fadeInUpProps: HTMLMotionProps<"div"> = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true, amount: 0.1 }
};

const pillars = [
  {
    id: "01",
    title: "Global Perspective.",
    subtitle: "The Builder's Eye",
    description: "15 years of GTA mastery combined with international development experience. Daniel identifies structural integrity and navigates complex permits with a level of scrutiny most agents lack."
  },
  {
    id: "02",
    title: "Investor's Edge.",
    subtitle: "Multi-Asset Strategy",
    description: "More than a Realtor, a sophisticated asset strategist. From real estate to high-stakes markets, Daniel analyzes hidden value and negotiates with a precision that protects your bottom line."
  },
  {
    id: "03",
    title: "Unwavering Discipline.",
    subtitle: "Family-First Philosophy",
    description: "Rooted in heritage and driven by a competitive spirit. You gain a transparent, highly adaptable partner who treats your investment with the same rigor he applies to his own family's wealth."
  }
];

const Yucatan: React.FC = () => {
  // Dynamic images with static fallbacks
  const [yucatanHero, setYucatanHero] = useState(YucatanHeroDefault);
  const [yucatanExterior, setYucatanExterior] = useState(YucatanExteriorDefault);
  const [livingRoomKitchen, setLivingRoomKitchen] = useState(LivingRoomKitchenDefault);
  const [masterBath, setMasterBath] = useState(MasterBathDefault);
  const [guestBed1, setGuestBed1] = useState(GuestBed1Default);
  const [frontExterior, setFrontExterior] = useState(FrontExteriorDefault);

  useEffect(() => {
    const fetchYucatanImages = async () => {
      const keys = [
        'yucatan_hero',
        'yucatan_exterior',
        'yucatan_living_room',
        'yucatan_master_bath',
        'yucatan_guest_bedroom',
        'yucatan_front_exterior'
      ];

      const { data } = await supabase
        .from('page_assets')
        .select('page_name, hero_image_url')
        .in('page_name', keys);

      if (data) {
        data.forEach((row: any) => {
          if (!row.hero_image_url) return; // Skip null — keep default
          switch (row.page_name) {
            case 'yucatan_hero': setYucatanHero(row.hero_image_url); break;
            case 'yucatan_exterior': setYucatanExterior(row.hero_image_url); break;
            case 'yucatan_living_room': setLivingRoomKitchen(row.hero_image_url); break;
            case 'yucatan_master_bath': setMasterBath(row.hero_image_url); break;
            case 'yucatan_guest_bedroom': setGuestBed1(row.hero_image_url); break;
            case 'yucatan_front_exterior': setFrontExterior(row.hero_image_url); break;
          }
        });
      }
    };

    fetchYucatanImages();
  }, []);

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
              src={yucatanHero} 
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
              Progreso, Yucatán, México
            </motion.p>
          </div>
        </section>

        {/* INVESTMENT SNAPSHOT */}
        <section className="pt-24 pb-8 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeInUpProps}>
              <h2 className="text-brand-gold text-[10px] tracking-[0.5em] uppercase mb-6 font-bold">Investment Opportunity</h2>
              <h3 className="text-brand-maroon text-4xl md:text-5xl font-light tracking-tight mb-8 leading-tight">
                A Masterpiece <br/> of Coastal Living.
              </h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                Casa Aida represents a unique opportunity to invest in the rapidly growing market of Progreso, Yucátan.
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
              <div className="mt-16">
                <a href="/contact" className="btn-gold w-full md:w-auto">
                  Explore Yucatán, México
                </a>
              </div>
            </motion.div>

            <motion.div {...fadeInUpProps} transition={{ delay: 0.2 }} className="aspect-[4/3] overflow-hidden shadow-2xl bg-stone-100">
              <img 
                src={yucatanExterior} 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
                alt="Casa Aida Exterior" 
              />
            </motion.div>
          </div>
        </section>

        {/* INTERIOR GALLERY SECTION */}
        <section className="py-20 px-6 lg:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <h2 className="text-brand-gold text-[10px] tracking-[0.5em] uppercase mb-4 font-bold">The Interiors</h2>
              <h3 className="text-brand-maroon text-4xl font-light tracking-tight uppercase">Modern Comfort, <br/> Timeless Design.</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[1200px]">
              <motion.div {...fadeInUpProps} className="md:col-span-8 relative overflow-hidden group shadow-lg bg-stone-100">
                <img 
                  src={livingRoomKitchen} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  alt="Living Room" 
                />
              </motion.div>

              <motion.div {...fadeInUpProps} className="md:col-span-4 relative overflow-hidden group shadow-lg bg-stone-100">
                <img 
                  src={masterBath} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  alt="Master Bath" 
                />
              </motion.div>

              <motion.div {...fadeInUpProps} className="md:col-span-4 relative overflow-hidden group shadow-lg bg-stone-100">
                <img 
                  src={guestBed1} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  alt="Guest Bedroom" 
                />
              </motion.div>

              <motion.div {...fadeInUpProps} className="md:col-span-8 relative overflow-hidden group shadow-lg bg-stone-100">
                <img 
                  src={frontExterior} 
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
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-brand-maroon text-xs tracking-[0.5em] uppercase mb-20 font-bold">Why Yucatán?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-left">
              {[
                { title: "Safety", desc: "According to CEOWORLD Magazine, the Progreso & Mérida corridor represents a global benchmark for safety; consistently outranking nearly every major city across the Continental Americas, it stands as the second most secure metropolitan region in the Western Hemisphere, outpaced only by Quebec City. " },
                { title: "Stability", desc: "The Yucatán, specifically Progreso and Mérida have emerged as one of Mexico's most stable and attractive real estate markets, driven by infrastructure investment, international demand, and long-term economic growth." },
                { title: "Lifestyle Value", desc: "With increasing interest from North American buyers, the region offers a rare balance of affordability, stability, and upside potential." }
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

        <section className="py-24 bg-stone-50 border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
              <h2 className="text-brand-maroon text-xs tracking-[0.5em] uppercase mb-20 font-bold">Why Daniel?</h2>
            </div>
            
            {/* 3 Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className={`relative p-8 md:p-12 group hover:bg-white transition-colors duration-500 ${
                    index !== 0 ? 'md:border-l border-stone-200' : ''
                  } ${index !== 2 ? 'border-b md:border-b-0 border-stone-200' : ''}`}
                >
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-brand-maroon text-2xl font-light uppercase tracking-wide mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-brand-gold uppercase tracking-[0.2em] mb-8 font-bold">
                      {pillar.subtitle}
                    </p>
                    <p className="text-gray-600 text-sm leading-7 font-light">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Hover Line Animation */}
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-maroon group-hover:w-full transition-all duration-700 ease-out" />
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <a href="/contact" className="inline-block border-b border-brand-maroon text-brand-maroon text-[10px] tracking-[0.3em] uppercase pb-1 hover:text-brand-gold hover:border-brand-gold transition-all">
                Book a Call with Daniel
              </a>
            </div>
          </div>
        </section>
      </div>
    </LazyMotion>
  );
};

export default Yucatan;