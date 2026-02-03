import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Types & Data ---
interface Category {
  title: string;
  desc: string;
  img: string;
  tag: string;
  path?: string;
}

const categories: Category[] = [
  { title: 'RESIDENTIAL', desc: "Thoughtful strategy and strong negotiation to ensure your biggest move is your best move.", img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', tag: 'EXPLORE HOMES', path: '/residential' },
  { title: 'INVESTMENT & MULTI-FAMILY', desc: "Transform real estate into a powerful tool for your financial legacy, both locally and abroad.", img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800', tag: 'EXPLORE INVESTMENT OPPORTUNITIES ' },
  { title: 'PRE-CONSTRUCTION ', desc: "Move beyond speculation with expert clarity on location, reputation, and long-term appreciation.", img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', tag: 'EXPLORE DEVELOPMENTS' },
  { title: 'INVESTMENT', desc: "Empowering your business growth through expert negotiation and deep-rooted local market knowledge.", img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800', tag: 'EXPLORE COMMERCIAL' }
];

const listings = [
  { id: 1, title: "611 COLLEGE STREET WEST", price: "$1.1M", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800", tag: "Pre-Construction" },
  { id: 2, title: "800 LAWRENCE AVE W", price:"$3.1M", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800", tag: "Investment" },
  { id: 3, title: "WESTSHORE, LONG BRANCH", price:"$2.2M", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800", tag: "Commerical" },
  { id: 4, title: "Forest Hill Classic", price: "$7.1M", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", tag: "Residential" }
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

  const [currentIndex, setCurrentIndex] = useState(0);

  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1 >= listings.length ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? listings.length - 1 : prev - 1));
  };

  // Logic to show 3 items starting from currentIndex, wrapping around the end
  const visibleListings = [
    listings[currentIndex],
    listings[(currentIndex + 1) % listings.length],
    listings[(currentIndex + 2) % listings.length],
  ];

  // Logic to get exactly 3 visible cards in a circular fashion
  const visibleTestimonials = [
    testimonials[startIndex % testimonials.length],
    testimonials[(startIndex + 1) % testimonials.length],
    testimonials[(startIndex + 2) % testimonials.length]
  ];

  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await supabase.from('blogs').select('*').order('created_at', { ascending: false }).limit(3);
      if (data) setBlogs(data);
    };
    fetchBlogs();
  }, []);

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

          {/* CONTENT CONTENT - Right-Aligned Editorial Layout */}
          <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-end justify-center h-full">
            
            {/* Header Stack */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-right mb-8"
            >
              <h1 className="text-brand-maroon text-5xl md:text-8xl font-light tracking-tighter uppercase leading-[0.9] drop-shadow-sm flex flex-col">
                <span>Lifestyle.</span>
                <span>Strategic.</span>
                <span className="italic text-brand-gold">Real Estate.</span>
              </h1>
            </motion.div>
            
            {/* Description Text */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-gray-700 font-medium text-sm md:text-base mb-12 text-right max-w-md leading-relaxed"
            >
              Every stage of life deserves a real estate strategy that prioritizes your lifestyle.
              By combining your vision with my 15 years of proven strategic real estate market expertise,
              your next move will be as rewarding as it is seamless. 
            </motion.p>
            
            {/* Buttons Container - Also Right Aligned */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-col md:flex-row gap-6 justify-end items-center"
            >
              <button className="btn-maroon">View Listings</button>
              <a className="btn-gold" href="/meet-daniel">Book a Call</a>
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
                <button className="text-[10px] tracking-[0.3em] uppercase border-b border-brand-gold pb-1 hover:text-brand-gold">{cat.tag}</button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* LISTINGS SECTION */}
        {/*<section className="py-24 px-6 lg:px-12 bg-white">
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
        </section> */}

        {/* Listings Carousel */}
        <section className="py-20 bg-white border-y border-stone-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            
            {/* Header Strip */}
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-brand-gold text-[10px] tracking-[0.5em] uppercase mb-2 font-bold">Curated Selection</h2>
                <h3 className="text-brand-maroon text-3xl font-light tracking-tight uppercase">Latest Opportunities</h3>
              </div>
              
              <div className="flex gap-2">
                <button onClick={prevSlide} className="p-2 border border-stone-200 hover:bg-brand-maroon hover:text-white transition-all">
                  <ChevronLeft size={18} />
                </button>
                <button onClick={nextSlide} className="p-2 border border-stone-200 hover:bg-brand-maroon hover:text-white transition-all">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* The 3-Column Carousel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout" initial={false}>
                {visibleListings.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden mb-4 bg-stone-100 shadow-sm">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 px-3 py-1">
                        <p className="text-[8px] tracking-widest uppercase text-brand-maroon font-bold">{item.tag}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="text-brand-maroon text-xs tracking-[0.2em] uppercase font-medium">{item.title}</h4>
                      <p className="text-gray-400 text-[10px] tracking-widest">{item.price}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>
        
        {/* Blog Carousel */}
        <section className="py-24 bg-white border-b border-stone-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-baseline justify-between mb-16">
              <h3 className="text-brand-maroon text-2xl font-light tracking-tight uppercase italic">Insights & Editorial</h3>
              <a href="" className="text-[9px] tracking-[0.4em] uppercase border-b border-brand-gold pb-1 hover:text-brand-gold transition-colors">View All</a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {blogs.map((blog) => (
                <motion.a 
                  href={`/journal/${blog.slug}`} 
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="group"
                >
                  <div className="aspect-[16/9] overflow-hidden mb-6 bg-stone-50">
                    <img 
                      src={blog.featured_image} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      alt={blog.title} 
                    />
                  </div>
                  <p className="text-brand-gold text-[9px] tracking-[0.3em] uppercase mb-3 font-bold">{blog.category}</p>
                  <h4 className="text-brand-maroon text-sm md:text-base leading-snug font-light uppercase tracking-wide max-w-[250px]">
                    {blog.title}
                  </h4>
                </motion.a>
              ))}
            </div>
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