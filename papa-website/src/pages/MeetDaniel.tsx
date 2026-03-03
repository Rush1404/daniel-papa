import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import LogoKey from '../assets/clear_logo.png';
import Pfp from '../assets/daniel_pfp.jpeg';
import { supabase } from '../components/supabaseClient';


const sideFade = (direction: 'left' | 'right') => ({
  initial: { opacity: 0, x: direction === 'left' ? -100 : 100 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 1.2, ease: "easeOut" as const },
  viewport: { once: false, amount: 0.2 }
});

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: "easeOut" as const },
  viewport: { once: false, amount: 0.2 }
};

const MeetDaniel: React.FC = () => {
  const [portraitImage, setPortraitImage] = useState(Pfp);
  const [visionImage, setVisionImage] = useState("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000");

  useEffect(() => {
    const fetchImages = async () => {
      const [portraitRes, visionRes] = await Promise.all([
        supabase
          .from('page_assets')
          .select('hero_image_url')
          .eq('page_name', 'meet_daniel_portrait')
          .single(),
        supabase
          .from('page_assets')
          .select('hero_image_url')
          .eq('page_name', 'mission_vision')
          .single(),
      ]);
      if (portraitRes.data?.hero_image_url) {
        setPortraitImage(portraitRes.data.hero_image_url);
      }
      if (visionRes.data?.hero_image_url) {
        setVisionImage(visionRes.data.hero_image_url);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-gold selection:text-white overflow-x-hidden">
      <Navbar />
      <main>
        {/* ===================== MEET DANIEL SECTION ===================== */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Portrait Column */}
            <motion.div {...sideFade('left')} className="flex-1 sticky top-40">
              <div className="aspect-[2/4] overflow-hidden shadow-2xl">
                <img 
                  src={portraitImage} 
                  className="w-full h-full object-cover" 
                  alt="Daniel Papa Portrait" 
                />
              </div>
            </motion.div>

            {/* Biography Column */}
            <motion.div {...sideFade('right')} className="flex-1 py-10">
              <h2 className="text-5xl md:text-6xl font-light tracking-tighter text-brand-maroon mb-12 uppercase leading-tight">
                Meet Daniel Papa
              </h2>
              
              <div className="space-y-8 text-gray-700 text-lg leading-relaxed font-light">
                <p>
                  With nearly 15 years of multi-award winning excellence
                  across the GTA, Durham, Peel, and York. Daniel is a
                  strategic master of the high-stakes transaction, turning
                  complex market moves into your greatest competitive
                  advantage.
                </p>
                <p className="md:text-2xl font-light tracking-tighter text-brand-maroon mb-12 uppercase leading-tight">
                  Deep Roots. Global Perspective. 
                </p>
                <p>
                  A Scarborough native with a global perspective, Daniel
                  possesses a "builder's eye" honed through developing
                  personal assets in both Ontario and Mexico. He identifies
                  structural nuances and permit complexities that others
                  miss, ensuring every acquisition is protected from liability
                  and every close is seamless.
                </p>
                <p className="md:text-2xl font-light tracking-tighter text-brand-maroon mb-12 uppercase leading-tight">
                  The Investor's Edge
                </p>
                <p>
                  A sophisticated investor across real estate, equities, and
                  alternative assets, Daniel doesn't just show houses-he
                  analyzes opportunities. His refined negotiation style and
                  transparent approach allow him to maneuver through
                  complex transactions with ease. As an educator first,
                  Daniel ensures his clients are always the most informed
                  people in the room.
                </p>
                <p className="md:text-2xl font-light tracking-tighter text-brand-maroon mb-12 uppercase leading-tight">
                  Driven by Discipline and Heritage
                </p>
                <p>
                  Guided by a Filipino "family-first" philosophy, Daniel
                  treats every client as a personal extension of his own
                  circle. This deep-rooted loyalty, paired with a
                  competitive drive honed on the Padel and basketball
                  courts, makes him a disciplined and transparent partner.
                  For Daniel, a transaction is only successful when his
                  clients truly prosper.
                </p>
              </div>

              <section className="pt-12">
                <Link 
                  to="/contact" 
                  className="inline-block px-12 py-4 bg-brand-maroon text-white text-[10px] tracking-[0.4em] uppercase hover:bg-brand-gold transition-all duration-500"
                >
                  Book a Call with Daniel
                </Link>
              </section>
            </motion.div>
          </div>
        </section>

        {/* ===================== DIVIDER: MY APPROACH ===================== */}
        <section className="py-20 bg-brand-maroon">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.5 }}
              className="w-24 h-[1px] bg-brand-gold mx-auto mb-8 origin-center"
            />
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: false, amount: 0.5 }}
              className="text-white text-3xl md:text-5xl font-light tracking-[0.3em] uppercase"
            >
              My Approach
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
              viewport={{ once: false, amount: 0.5 }}
              className="w-24 h-[1px] bg-brand-gold mx-auto mt-8 origin-center"
            />
          </div>
        </section>

        {/* ===================== MY APPROACH CONTENT ===================== */}

        {/* CORE MISSION STATEMENT */}
        <section className="max-w-5xl mx-auto px-6 py-24 text-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: false, amount: 0.3 }}
            className="mb-12 flex justify-center"
          >
            <img src={LogoKey} alt="Daniel Papa Key Logo" className="h-24 w-auto" />
          </motion.div>
          
          <motion.h2 {...fadeInUp} className="text-brand-maroon text-4xl md:text-6xl font-light tracking-[0.2em] uppercase leading-tight mb-8">
            STRATEGIC MOVES. SUPERIOR RESULTS
          </motion.h2>
          
          <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="w-24 h-[1px] bg-brand-gold mx-auto mb-12"></motion.div>
          
          <motion.p {...fadeInUp} transition={{ delay: 0.5 }} className="text-gray-700 text-lg md:text-xl leading-relaxed font-light max-w-3xl mx-auto italic">
            "Real estate decisions extend beyond transactions, they shape lifestyle, security, and long-term opportunity. Daniel's approach is built around clarity, strategy, and a hands on experience designed to make complex decisions feel confident and manageable. He delivers highly personalized guidance supported by market intelligence, global perspective, and trusted professional networks."
          </motion.p>
        </section>

        {/* THE VISION */}
        <section className="bg-gray-50 py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-20">
            <motion.div {...sideFade('left')} className="flex-1 aspect-video lg:aspect-[4/5] overflow-hidden shadow-2xl">
              <img 
                src={visionImage} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
                alt="Modern Toronto Architecture" 
              />
            </motion.div>
            
            <motion.div {...fadeInUp} className="flex-1">
              <h2 className="text-brand-gold text-xs tracking-[0.5em] uppercase mb-6 font-bold">The Vision</h2>
              <h3 className="text-brand-maroon text-4xl md:text-5xl font-light tracking-tight mb-8 uppercase">Built on 15 years of Experience, Not Promises.</h3>
              <p className="text-gray-700 leading-loose mb-8">
                Fifteen years of disciplined execution.<br />
                One seamless experience built on clarity and structure. 
              </p>
            </motion.div>
          </div>
        </section>

        {/* THE PAPA WAY */}
        <section className="py-32 px-6 lg:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.h2 {...fadeInUp} className="text-center text-brand-maroon text-3xl font-light tracking-[0.4em] uppercase mb-24">The Papa Way</motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="text-center group">
                <div className="text-brand-gold text-4xl font-extralight mb-6">01</div>
                <h4 className="text-brand-maroon tracking-[0.2em] font-medium mb-4">INTEGRITY</h4>
                <p className="text-gray-700 text-sm leading-relaxed">Advice you can trust. Every step.</p>
              </motion.div>

              <motion.div {...fadeInUp} transition={{ delay: 0.4 }} className="text-center group">
                <div className="text-brand-gold text-4xl font-extralight mb-6">02</div>
                <h4 className="text-brand-maroon tracking-[0.2em] font-medium mb-4">INNOVATION</h4>
                <p className="text-gray-700 text-sm leading-relaxed">Fusing market intelligence with modern Al tools to identify exclusive opportunities and drive smarter decisions</p>
              </motion.div>

              <motion.div {...fadeInUp} transition={{ delay: 0.6 }} className="text-center group">
                <div className="text-brand-gold text-4xl font-extralight mb-6">03</div>
                <h4 className="text-brand-maroon tracking-[0.2em] font-medium mb-4">COMMUNITY</h4>
                <p className="text-gray-700 text-sm leading-relaxed">Built on trust, strengthened over time.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FOOTER CTA */}
        <section className="py-32 bg-brand-maroon text-center text-white">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl font-light tracking-[0.3em] uppercase mb-8">Ready to Start Your Journey?</h2>
            <Link 
              to="/contact" 
              className="px-12 py-4 bg-white text-brand-maroon text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-brand-gold hover:text-white transition-all duration-500 shadow-xl"
            >
              Book a Call with Daniel
            </Link>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default MeetDaniel;