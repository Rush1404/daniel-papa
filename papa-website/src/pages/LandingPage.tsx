import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

const testimonials = [
  { id: 1, name: "Fatima Khoury", handle: "dilatory_curtains_98", text: "Working with Daniel was a fantastic experience. His dedication to finding the perfect home while managing every detail made the process effortless.", img: "https://i.pravatar.cc/150?u=fatima" },
  { id: 2, name: "Hassan Ali", handle: "turbulent_unicorn_29", text: "The market insights provided were invaluable. Daniel truly understands the Toronto landscape and helped me secure an incredible investment property.", img: "https://i.pravatar.cc/150?u=hassan" },
  { id: 3, name: "Jorge Martínez", handle: "nefarious_jellybeans_91", text: "Professionalism at its finest. From the first meeting to the final closing, the team was there to answer every question and provide expert guidance.", img: "https://i.pravatar.cc/150?u=jorge" },
  { id: 4, name: "Nicolás Sánchez", handle: "pervasive_inker_83", text: "I highly recommend Daniel for anyone looking for a seamless real estate journey. His use of AI-driven market reports gave us a serious edge.", img: "https://i.pravatar.cc/150?u=nicolas" },
  { id: 5, name: "Ahmad Khan", handle: "antic_circus_76", text: "A truly personalized experience. Daniel doesn't just sell houses; he builds futures. We couldn't be happier with our new family home.", img: "https://i.pravatar.cc/150?u=ahmad" }
];

// --- Animation Variants ---
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.2 },
  transition: { duration: 0.8, ease: "easeOut" as const }
};

const sideFade = (direction: 'left' | 'right') => ({
  initial: { opacity: 0, x: direction === 'left' ? -100 : 100 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 1.2, ease: "easeOut" as const },
  viewport: { once: false, amount: 0.2 }
});



// --- Main App Component ---
const App: React.FC = () => {

  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Logic to get exactly 3 visible cards in a circular fashion
  const visibleTestimonials = [
    testimonials[startIndex % testimonials.length],
    testimonials[(startIndex + 1) % testimonials.length],
    testimonials[(startIndex + 2) % testimonials.length]
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-gold selection:text-white overflow-x-hidden">
      <Navbar />

      <main>
        {/* LIGHT THEME HERO SECTION */}
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-white">
          {/* BACKGROUND LAYERS */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 pointer-events-none" // Added pointer-events-none so it doesn't block clicks
          >
            {/* 1. The Image - Much lower opacity for bright, subtle feel */}
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600" 
              className="w-full h-full object-cover opacity-60" // Reduced opacity significantly
              alt="Luxury Interior" 
            />
            {/* 2. Stronger White Overlay */}
            <div className="absolute inset-0 bg-white/70"></div> {/* Increased strength of white overlay */}
            {/* 3. Subtle Gradient to ensure bottom text is readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
          </motion.div>

          {/* CONTENT CONTENT - Higher Z-Index for clickable buttons */}
          <div className="relative z-20 text-center px-6"> {/* Bumped z-index to 20 */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-brand-maroon text-5xl md:text-8xl font-light tracking-tighter mb-6 uppercase drop-shadow-sm"
            >
              BUILDING YOUR <span className="italic text-brand-gold">FUTURE.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-gray-700 font-medium text-sm md:text-base tracking-[0.4em] uppercase mb-12"
            >
              Redefine the way you connect with Toronto Real Estate.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-col md:flex-row gap-6 justify-center items-center"
            >
              {/* Button 1: Solid Maroon */}
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

        {/* TESTIMONIALS */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            {/* Editorial Heading */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-gray-100 pb-12">
              <div className="max-w-xl">
                <h2 className="text-brand-maroon text-[10px] tracking-[0.5em] uppercase mb-6 font-bold">Client Experiences</h2>
                <h3 className="text-4xl md:text-6xl font-light tracking-tighter text-black uppercase leading-tight">
                  A Legacy of <br/> <span className="italic text-brand-gold">Excellence.</span>
                </h3>
              </div>
              
              <div className="flex gap-2 mt-8 md:mt-0">
                <button onClick={prevSlide} className="p-4 bg-white border border-gray-100 text-brand-maroon hover:bg-brand-maroon hover:text-white transition-all duration-500">
                  <ChevronLeft size={18} strokeWidth={1.5} />
                </button>
                <button onClick={nextSlide} className="p-4 bg-white border border-gray-100 text-brand-maroon hover:bg-brand-maroon hover:text-white transition-all duration-500">
                  <ChevronRight size={18} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <AnimatePresence mode="popLayout">
                {visibleTestimonials.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    className="flex flex-col h-full group"
                  >
                    {/* Quotation Icon Accents */}
                    <div className="text-brand-gold text-5xl font-serif mb-8 opacity-40">“</div>
                    
                    <p className="text-gray-600 leading-relaxed text-sm tracking-wide mb-12 flex-grow italic font-light">
                      {item.text}
                    </p>
                    
                    <div className="flex items-center gap-5 pt-8 border-t border-gray-50">
                      <div className="w-12 h-12 overflow-hidden bg-gray-100 grayscale group-hover:grayscale-0 transition-all duration-700">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="leading-none">
                        <h4 className="text-[11px] tracking-[0.3em] font-bold text-brand-maroon uppercase mb-2">
                            {item.name}
                        </h4>
                        <p className="text-[9px] tracking-[0.2em] text-brand-gold uppercase">
                            {item.handle}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* CTA*/}
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
      </main>
    </div>
  );
};

export default App;