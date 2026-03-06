import React, { useEffect, useState,  } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

import phoneImage from "../assets/Downtown_Toronto.jpg";

// --- Types & Data ---
interface Category {
  title: string;
  desc: string;
  img: string;
  path: string;
}

interface FeaturedProperty {
  id: string;
  title: string;
  price: string;
  image: string;
  details: string;
  category: string;
  mls_link?: string;
}

const categories: Category[] = [
  { title: 'RESIDENTIAL', desc: "Thoughtful strategy and strong negotiation to ensure your biggest move is your best move.", img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', path: '/residential' },
  { title: 'INVESTMENT & MULTI-FAMILY', desc: "Transform real estate into a powerful tool for your financial legacy, both locally and abroad.", img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800', path: '/investment' },
  { title: 'PRE-CONSTRUCTION ', desc: "Move beyond speculation with expert clarity on location, reputation, and long-term appreciation.", img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', path: '/pre-construction' },
  { title: 'COMMERCIAL', desc: "Empowering your business growth through expert negotiation and deep-rooted local market knowledge.", img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800', path: '/commercial' },
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

  const [featuredListings, setFeaturedListings] = useState<FeaturedProperty[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [heroImage, setHeroImage] = useState("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600");
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle');

  useEffect(() => {
    const fetchLandingData = async () => {
      setLoading(true);
      const [blogsRes, testimonialsRes, featuredRes, heroRes] = await Promise.all([
        supabase
          .from('blogs')
          .select('*')
          .eq('is_hidden', false)
          .order('created_at', { ascending: false })
          .limit(3),
        supabase
          .from('testimonials')
          .select('*')
          .eq('is_hidden', false)
          .order('created_at', { ascending: false }),
        supabase
          .from('properties')
          .select('*')
          .eq('is_featured', true)
          .eq('is_hidden', false)
          .limit(3),
        supabase
          .from('page_assets')
          .select('hero_image_url')
          .eq('page_name', 'landing_hero')
          .single()
      ]);

      if (blogsRes.data) setBlogs(blogsRes.data);
      if (testimonialsRes.data) setTestimonials(testimonialsRes.data);
      if (featuredRes.data) setFeaturedListings(featuredRes.data);
      if (heroRes.data?.hero_image_url) setHeroImage(heroRes.data.hero_image_url);
      setLoading(false);
    };

    fetchLandingData();
  }, []);

  // SAFE CALCULATION: Only calculate if testimonials has items
  const visibleTestimonials = testimonials.length > 0 
    ? [
        testimonials[startIndex % testimonials.length],
        testimonials[(startIndex + 1) % testimonials.length],
        testimonials[(startIndex + 2) % testimonials.length]
      ].filter(Boolean)
    : [];

  const nextSlide = () => {
    if (testimonials.length > 0) {
      setStartIndex((prev) => (prev + 1) % testimonials.length);
    }
  };

  const prevSlide = () => {
    if (testimonials.length > 0) {
      setStartIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    }
  };

  const handleNewsletterSignup = async () => {
    const email = newsletterEmail.trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setNewsletterStatus('loading');
    const { error } = await supabase
      .from('marketing_subscribers')
      .insert([{ email }]);
    if (!error) {
      setNewsletterStatus('success');
      setNewsletterEmail('');
    } else if (error.code === '23505') {
      setNewsletterStatus('duplicate');
    } else {
      setNewsletterStatus('error');
    }
  };
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  

  const webImage = "https://images.unsplash.com/photo-1546614409-810f10108b74?q=80&w=2066&auto=format&fit=crop";

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-gold selection:text-white overflow-x-hidden">
      <Navbar />

      <main>
        {/* LIGHT THEME HERO SECTION - Left Aligned */}
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-white">
          {/* BACKGROUND LAYERS */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* 1. The Image - Much lower opacity for bright, subtle feel */}
            <img 
              src={heroImage} 
              className="w-full h-full object-cover opacity-60"
              alt="Luxury Interior" 
            />
            {/* 2. Stronger White Overlay */}
            <div className="absolute inset-0 bg-white/70"></div>
            {/* 3. Subtle bottom gradient for text contrast if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
          </motion.div>

          {/* TEXT CONTENT */}
          <div className="relative z-10 w-full max-w-7xl px-6 lg:px-12 text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-brand-maroon text-6xl md:text-8xl font-light tracking-tighter mb-6 leading-[1.05]"
            >
              BUILDING YOUR <br /> <span className="italic text-brand-gold">FUTURE.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-gray-700 text-sm md:text-lg font-light max-w-xl mb-12 leading-relaxed"
            >
              With 15 years of Award-winning and proven strategic real
              estate market expertise.
            </motion.p>
            
            {/* Buttons Container - Left Aligned */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-col md:flex-row gap-6 justify-start items-center"
            >
              <a className="btn-maroon" href="/investment">Ontario, Canada</a>
              <a className="btn-gold" href="/yucatan">Yucatán, México</a>
            </motion.div>
          </div>
        </section>

        {/* ABOUT DANIEL — Mobile Only */}
        <section className="block md:hidden py-16 px-6 bg-white border-t border-stone-100">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-sm mx-auto"
          >
            <div className="w-12 h-[1px] bg-brand-gold mx-auto mb-6"></div>
            <h3 className="text-brand-maroon text-[10px] tracking-[0.5em] uppercase font-bold mb-4">About Daniel</h3>
            <p className="text-gray-700 text-sm leading-relaxed font-light mb-6">
              With nearly 15 years of award-winning expertise across the GTA, Daniel is a strategic negotiator who turns complex market moves into your greatest advantage. A Scarborough native with a global perspective, he brings an investor's eye and an educator's clarity to every transaction.
            </p>
            <Link 
              to="/meet-daniel" 
              className="inline-block text-[9px] tracking-[0.4em] uppercase border-b border-brand-gold pb-1 text-brand-maroon hover:text-brand-gold transition-colors"
            >
              Meet Daniel
            </Link>
          </motion.div>
        </section>

        {/* CATEGORY GRID (BLOG SECTION) */}
        <section className="py-24 px-6 lg:px-12 bg-white">
          <div className="text-center mb-16">
             <p className="text-xl tracking-[0.4em] uppercase text-dark-400 mb-4">Our Expertise</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {categories.map((cat, i) => (
              <motion.div key={i} {...fadeInUp} transition={{ ...fadeInUp.transition, delay: i * 0.1 }} className="text-center group">
              <Link to={cat.path} className="block overflow-hidden mb-6 aspect-[4/5]">
                  <img 
                    src={cat.img} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" 
                    alt={cat.title} 
                  />
                </Link>
                <a className="text-brand-maroon tracking-[0.3em] font-medium mb-5 text-sm border-brand-gold hover:text-brand-gold" href={cat.path}>{cat.title}</a>
                <p className="text-gray-700 text-xs leading-relaxed mt-3 mb-6 px-4">{cat.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Listings Section */}
        <section className="py-20 bg-white border-y border-stone-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            
            {/* Header Strip */}
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-brand-gold text-[10px] tracking-[0.5em] uppercase mb-2 font-bold">Curated Selection</h2>
                <h3 className="text-brand-maroon text-3xl font-light tracking-tight uppercase">Latest Opportunities</h3>
              </div>
            </div>

            {/* The 3-Column Grid */}
            {featuredListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredListings.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
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
                        <p className="text-[8px] tracking-widest uppercase text-brand-maroon font-bold">{item.category}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-brand-gold text-[9px] tracking-[0.3em] uppercase font-bold">
                        {item.details}
                      </p>
                      <h4 className="text-brand-maroon text-sm md:text-base tracking-[0.2em] uppercase font-medium leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-gray-700 text-sm tracking-widest font-light">{item.price}</p>
                      {item.mls_link ? (
                      <a 
                        href={item.mls_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] tracking-[0.3em] uppercase border-b border-brand-gold/30 pb-1 hover:border-brand-gold transition-all"
                      >
                        View Details
                      </a>
                    ) : (
                      <Link 
                        to="/contact"
                        className="text-[10px] tracking-[0.3em] uppercase border-b border-brand-gold/30 pb-1 hover:border-brand-gold transition-all"
                      >
                        View Details
                      </Link>
                    )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-700 text-sm tracking-widest uppercase">
                Featured listings coming soon
              </div>
            )}
          </div>
        </section>
        
        {/* Blog Carousel */}
        <section className="py-24 bg-white border-b border-stone-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-baseline justify-between mb-16">
              <h3 className="text-brand-maroon text-4xl font-med tracking-tight uppercase italic">Insights</h3>
              <a href="/insights" className="text-[9px] tracking-[0.4em] uppercase border-b border-brand-gold pb-1 hover:text-brand-gold transition-colors">View All</a>
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
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            {/* Editorial Heading */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-14 border-b border-gray-100 pb-12">
              <div className="max-w-xl">
                <h3 className="text-4xl md:text-6xl font-light tracking-tighter text-black uppercase leading-tight">
                  Client<span className="italic text-brand-gold"> Experiences.</span>
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
                    <div className="text-brand-gold text-5xl font-serif mb-4 opacity-40">"</div>
                    
                    <p className="text-gray-700 leading-relaxed text-sm tracking-wide mb-6 flex-grow italic font-light">
                      {item.text}
                    </p>
                    
                    <div className="flex items-center gap-5 pt-2 border-t border-gray-50">
                      <div className="leading-none">
                        <h4 className="text-[11px] tracking-[0.3em] font-bold text-brand-maroon uppercase mb-2">
                            {item.name}
                        </h4>
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
          {/* BACKGROUND IMAGE LAYER */}
          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 0.4 }} 
            className="absolute inset-0 pointer-events-none"
          >
            <img 
              src={isMobile ? phoneImage : webImage} 
              className="w-full h-full object-cover" 
              alt="Toronto Skyline" 
            />
            {/* Added a dark overlay to ensure text contrast regardless of the image */}
            <div className="absolute inset-0 bg-black/40"></div>
          </motion.div>

          {/* CONTENT LAYER */}
          <div className="relative z-10 px-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl text-brand-gold font-medium tracking-[0.2em] mb-4 uppercase italic"
            >
              Stay Informed.
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white text-[10px] tracking-widest mb-12"
            >
              Sign up for the latest market reports & industry updates.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center gap-3"
            >
              {newsletterStatus === 'success' ? (
                <p className="text-brand-gold text-xs tracking-[0.3em] uppercase py-4">
                  ✓ You're on the list. Welcome.
                </p>
              ) : (
                <div className="flex flex-col md:flex-row max-w-md w-full mx-auto gap-4">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={newsletterEmail}
                    onChange={e => { setNewsletterEmail(e.target.value); setNewsletterStatus('idle'); }}
                    onKeyDown={e => e.key === 'Enter' && handleNewsletterSignup()}
                    className="flex-1 bg-white/5 border border-white/20 px-6 py-4 text-xs tracking-widest focus:outline-none focus:border-brand-gold text-white"
                  />
                  <button
                    onClick={handleNewsletterSignup}
                    disabled={newsletterStatus === 'loading'}
                    className="bg-white text-black px-10 py-4 text-[10px] tracking-widest uppercase hover:bg-brand-gold hover:text-white transition-all duration-500 disabled:opacity-50"
                  >
                    {newsletterStatus === 'loading' ? '...' : 'Sign Up'}
                  </button>
                </div>
              )}
              {newsletterStatus === 'duplicate' && (
                <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase">Already subscribed.</p>
              )}
              {newsletterStatus === 'error' && (
                <p className="text-red-400 text-[10px] tracking-[0.3em] uppercase">Something went wrong. Try again.</p>
              )}
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;