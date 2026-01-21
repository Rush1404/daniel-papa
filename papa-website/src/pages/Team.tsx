import React from 'react';
import { motion } from 'framer-motion';

const Team: React.FC = () => {
  const sideFade = (direction: 'left' | 'right') => ({
    initial: { opacity: 0, x: direction === 'left' ? -100 : 100 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 1.2, ease: "easeOut" as const },
    viewport: { once: false, amount: 0.2 }
  });

  return (
    <div className="bg-[#e5e7eb] min-h-screen pt-32">
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center text-4xl md:text-6xl font-light tracking-[0.3em] text-black mb-24 uppercase"
        >
          Meet The Team
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Portrait Column */}
          <motion.div {...sideFade('left')} className="flex-1 sticky top-40">
            <div className="aspect-[3/4] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1000" 
                className="w-full h-full object-cover" 
                alt="Daniel Papa Portrait" 
              />
            </div>
          </motion.div>

          {/* Biography Column */}
          <motion.div {...sideFade('right')} className="flex-1 py-10">
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-brand-maroon mb-12 uppercase leading-tight">
              DANIEL <br/> PAPA
            </h2>
            
            <div className="space-y-8 text-gray-700 text-lg leading-relaxed font-light">
              <p>
                A dedicated and passionate realtor, Daniel has blazed a serious trail in the real estate industry, 
                redefining the standards of service and professionalism. As the founder of his team, he has devoted 
                his career to crafting a real estate experience like no other.
              </p>
              <p>
                Born into an environment that valued hard work and entrepreneurship, Daniel's journey began with a 
                bold move into the Toronto market. He recognizes potential for growth and value, helping his 
                clients make informed decisions through every step of the process.
              </p>
              <p>
                Currently residing in the Greater Toronto Area, Daniel's connection to the community runs deep. 
                His love for the neighborhood and its residents drives his dedication to helping clients find 
                their perfect homes in this diverse and exciting locale.
              </p>
            </div>

            <button className="mt-16 btn-maroon w-full md:w-auto">
              Book a Call with Daniel
            </button>
          </motion.div>
        </div>
      </section>

      {/* Modern Kitchen CTA Section */}
      <section className="h-[60vh] relative flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1628745277874-919d8f8ed03a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Modern Kitchen"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="relative z-10 text-center text-white">
          <h3 className="text-3xl tracking-[0.5em] font-light uppercase mb-8">Stay Informed.</h3>
          <div className="flex gap-4">
             <input type="text" placeholder="Email Address" className="bg-white/20 border border-white/40 px-6 py-4 outline-none" />
             <button className="bg-white text-black px-12 py-4 uppercase tracking-widest hover:bg-brand-gold transition-colors">Sign Up</button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Team;