import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { supabase } from '../components/supabaseClient';


const sideFade = (direction: 'left' | 'right') => ({
  initial: { opacity: 0, x: direction === 'left' ? -100 : 100 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 1.2, ease: "easeOut" as const },
  viewport: { once: false, amount: 0.2 }
});

const MeetDaniel: React.FC = () => {
  const [portraitImage, setPortraitImage] = useState("https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1000");

  useEffect(() => {
    const fetchPortrait = async () => {
      const { data } = await supabase
        .from('page_assets')
        .select('hero_image_url')
        .eq('page_name', 'meet_daniel_portrait')
        .single();
      if (data?.hero_image_url) {
        setPortraitImage(data.hero_image_url);
      }
    };
    fetchPortrait();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-gold selection:text-white overflow-x-hidden">
      <Navbar />
      <main>
        {/* MEET THE TEAM SECTION (Full Body) */}
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
                  With nearly 15 years in the GTA's most competitive markets, Daniel Papa is a strategic advisor known for 
                  disciplined execution and consistent recognition as a top-performing agent. A [X-time award-winning Realtor], 
                  he has built his reputation on structured strategy, transparent negotiation, and measurable performance.
                </p>
                <p className="md:text-2xl font-light tracking-tighter text-brand-maroon mb-12 uppercase leading-tight">
                  Deep Roots. Global Perspective. 
                </p>
                <p>
                  Raised in Scarborough and having lived in Toronto's urban core for over a decade, Daniel has witnessed the city's 
                  evolution firsthand. That lived perspective—combined with his experience developing property internationally—gives 
                  him a builder's eye and an investor's discipline. He evaluates beyond surface appeal, identifying structural integrity, 
                  permit considerations, and long-term value before a contract is ever signed.
                </p>
                <p className="md:text-2xl font-light tracking-tighter text-brand-maroon mb-12 uppercase leading-tight">
                  The Investor's Edge
                </p>
                <p>
                  Daniel approaches every transaction with the mindset of an investor. He analyzes risk, negotiates from leverage, and 
                  ensures his clients are the most informed decision-makers at the table. His style is direct, transparent, and structured—designed 
                  to protect capital and position clients advantageously in high-stakes environments.
                </p>
                <p className="md:text-2xl font-light tracking-tighter text-brand-maroon mb-12 uppercase leading-tight">
                  Driven by Discipline and Heritage
                </p>
                <p>
                  When you work with Daniel, you gain more than representation—you gain a disciplined partner committed to protecting and 
                  advancing your investment.
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
      </main>
    </div>
  );
};

export default MeetDaniel;