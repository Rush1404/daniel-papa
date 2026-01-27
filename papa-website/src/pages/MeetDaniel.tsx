import React from 'react';
import { motion} from 'framer-motion';
import Navbar from '../components/Navbar';

const sideFade = (direction: 'left' | 'right') => ({
  initial: { opacity: 0, x: direction === 'left' ? -100 : 100 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 1.2, ease: "easeOut" as const },
  viewport: { once: false, amount: 0.2 }
});



// --- Main App Component ---
const MeetDaniel: React.FC = () => {
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
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1000" 
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
                  With nearly 15 years of experience navigating the fast-paced markets of the GTA, Durham, Peel, 
                  and York Regions, Daniel is more than just a Realtor-he is a strategic advisor, a multi-year 
                  award-winning professional, and a master of the high-stakes transaction. 
                </p>
                <p className="md:text-2xl font-light tracking-tighter text-brand-maroon mb-12 uppercase leading-tight">
                  Deep Roots. Global Perspective. 
                </p>
                <p>
                  Daniel's understanding of the Greater Toronto Area is built on lived experience. Raised in 
                  Scarborough and having spent over a decade living behind the Eaton Centre, he has 
                  witnessed the transformation of the city's skyline firsthand. This local DNA, combined with 
                  the global perspective gained from developing his own compound in Mexico, gives Daniel a "builder's 
                  eye" that most agents lack. He sees beyond the staging-identifying structural integrity and 
                  navigating the critical minutiae of building permits to protect his clients from liability and 
                  ensure a seamless close. 
                </p>
                <p className="md:text-2xl font-light tracking-tighter text-brand-maroon mb-12 uppercase leading-tight">
                  The Investor's Edge
                </p>
                <p>
                  As a sophisticated investor, Daniel understands value across the board. Whether it is real estate, stocks, 
                  crypto, precious metals, or the high-end sports card market, he has a proven track record of identifying 
                  assets with growth potential. He doesn't just "show houses"; he analyzes opportunities. His negotiation 
                  skills are refined and high-end, allowing him to maneuver through complex scenarios with a level of transparency 
                  and straightforwardness that is rare in the industry. Daniel takes the lead as an educator, ensuring his clients 
                  are the most informed people in the room. 
                </p>
                <p className="md:text-2xl font-light tracking-tighter text-brand-maroon mb-12 uppercase leading-tight">
                  Driven by Discipline and Heritage
                </p>
                <p>
                  Deeply rooted in his Filipino heritage, Daniel operates with a "family-first" philosophy. To him, his clients are 
                  an extension of that circle. This sense of loyalty, combined with the competitive spirit he sharpens on the Padel 
                  and basketball courts, fuels his drive to win. As an award-winning top producer, he isn't satisfied until his clients prosper. 
                  
                  When you work with Daniel, you aren't just getting a salesperson; you are gaining a disciplined, transparent, and highly adaptable partner who treats your investment with the same rigor he applies to his own. 

                </p>
              </div>

              <button className="mt-16 btn-maroon w-full md:w-auto">
                Book a Call with Daniel
              </button>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MeetDaniel;