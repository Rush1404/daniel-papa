import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Linkedin } from 'lucide-react';
import Navbar from '../components/Navbar';


// --- Types & Data ---
interface Category {
  title: string;
  desc: string;
  img: string;
  path?: string;
}

const categories: Category[] = [
  { title: 'RESIDENTIAL', desc: "Find your perfect fit at the absolute best price.", img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', path: '/residential' },
  { title: 'PRE-CONSTRUCTION', desc: "Educating you on the best pre-construction options.", img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800' },
  { title: 'COMMERCIAL', desc: "A space that shares your story with your customers.", img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800' },
  { title: 'INVESTMENT', desc: "Real estate as a way to diversify your portfolio.", img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800' }
];

const listings = [
  { id: 1, addr: "611 COLLEGE STREET WEST", type: "COMMERCIAL", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800" },
  { id: 2, addr: "800 LAWRENCE AVE W", type: "RESIDENTIAL", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800" },
  { id: 3, addr: "WESTSHORE, LONG BRANCH", type: "PRE-CONSTRUCTION", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800" }
];

// --- Animation Variants ---
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.2 },
  transition: { duration: 0.8, ease: "easeOut" as const }
};

// --- Main App Component ---
const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-gold selection:text-white overflow-x-hidden">
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600" 
              className="w-full h-full object-cover" 
              alt="Luxury Background" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-maroon/20 to-black/80"></div>
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
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-white/70 text-sm md:text-base tracking-[0.4em] uppercase mb-12"
            >
              Redefine the way you connect with Toronto Real Estate.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-col md:flex-row gap-4 justify-center"
            >
              <button className="btn-maroon">View Listings</button>
              <button className="btn-gold">Meet the Team</button>
            </motion.div>
          </div>
        </section>

        {/* CATEGORY GRID (BLOG SECTION) */}
        <section className="py-24 px-6 lg:px-12 bg-white">
          <div className="text-center mb-16">
             <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-4">Our Expertise</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {categories.map((cat, i) => (
              <motion.div key={i} {...fadeInUp} transition={{ ...fadeInUp.transition, delay: i * 0.1 }} className="text-center group">
                <div className="overflow-hidden mb-6 aspect-[4/5]">
                  <img src={cat.img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt={cat.title} />
                </div>
                <h3 className="text-brand-maroon tracking-[0.3em] font-medium mb-3 text-sm">{cat.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-6 px-4">{cat.desc}</p>
                <button className="text-[10px] tracking-[0.3em] uppercase border-b border-brand-gold pb-1 hover:text-brand-gold">Learn More</button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* MEET THE TEAM SECTION (Full Body) */}
        <section className="py-24 bg-gray-50 overflow-hidden">
          <motion.div {...fadeInUp} className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-[10px] tracking-[0.6em] uppercase text-brand-gold mb-16">Meet the Team</h2>
            <div className="aspect-[3/4] max-w-lg mx-auto bg-white shadow-2xl mb-12 overflow-hidden border-[12px] border-white">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1000" className="w-full h-full object-cover" alt="Daniel Papa" />
            </div>
            <h3 className="text-3xl font-light text-brand-maroon tracking-widest mb-2">DANIEL PAPA</h3>
            <p className="text-[10px] tracking-widest text-gray-400 uppercase mb-8">Realtor & Team Lead | Century 21</p>
            <button className="btn-maroon">Read Daniel's Story</button>
          </motion.div>
        </section>

        {/* LISTINGS SECTION */}
        <section className="py-24 px-6 lg:px-12 bg-white">
          <motion.h2 {...fadeInUp} className="text-center text-xs tracking-[0.5em] uppercase text-brand-gold mb-20">New Listings</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {listings.map((item) => (
              <motion.div key={item.id} {...fadeInUp} className="group">
                <div className="overflow-hidden mb-6 aspect-video">
                  <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={item.addr} />
                </div>
                <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                   <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-brand-gold mb-1">{item.type}</p>
                      <h4 className="text-sm tracking-widest text-brand-maroon font-light">{item.addr}</h4>
                   </div>
                   <button className="text-[10px] tracking-[0.2em] uppercase text-gray-400 hover:text-brand-maroon">View</button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA & FOOTER */}
        <section className="relative py-40 bg-black text-center text-white overflow-hidden">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.3 }} className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200" className="w-full h-full object-cover" alt="Kitchen" />
          </motion.div>
          <div className="relative z-10 px-6">
            <motion.h2 {...fadeInUp} className="text-4xl font-light tracking-[0.2em] mb-4 uppercase">Stay Informed.</motion.h2>
            <motion.p {...fadeInUp} className="text-white/50 text-[10px] tracking-widest mb-12">Sign up for the latest market reports & industry updates.</motion.p>
            <motion.div {...fadeInUp} className="flex flex-col md:flex-row max-w-md mx-auto gap-4">
              <input type="email" placeholder="Email Address" className="flex-1 bg-white/5 border border-white/20 px-6 py-4 text-xs tracking-widest focus:outline-none focus:border-brand-gold text-white" />
              <button className="bg-white text-black px-10 py-4 text-[10px] tracking-widest uppercase hover:bg-brand-gold hover:text-white transition-all">Sign Up</button>
            </motion.div>
          </div>
        </section>

        <footer className="bg-black py-24 px-6 text-center border-t border-white/5">
          <div className="mb-12">
            <h2 className="text-white font-bold tracking-[0.3em] text-2xl">CENTURY 21.</h2>
            <p className="text-brand-gold text-[10px] tracking-[0.5em] uppercase mt-2">Leading Edge Realty Inc.</p>
          </div>
          <div className="flex justify-center gap-8 mb-12 text-white/40">
            <Instagram size={18} className="hover:text-brand-gold cursor-pointer transition-colors" />
            <Facebook size={18} className="hover:text-brand-gold cursor-pointer transition-colors" />
            <Linkedin size={18} className="hover:text-brand-gold cursor-pointer transition-colors" />
          </div>
          <div className="text-white/30 text-[9px] tracking-[0.25em] uppercase leading-loose font-light">
            <p className="mb-1">Brokerage</p>
            <p className="mb-8">501 Queen St W Suite 200, Toronto, ON M5V 2B4</p>
            <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-12 pt-8 border-t border-white/5">
              <a href="tel:4169533540" className="hover:text-brand-gold transition-colors">M 416.953.3540</a>
              <a href="mailto:PROPERTIES@DANIELPAPA.COM" className="hover:text-brand-gold transition-colors uppercase">PROPERTIES@DANIELPAPA.COM</a>
              <p>WWW.DANIELPAPA.COM</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;