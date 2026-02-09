import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../components/supabaseClient';
import { Search } from 'lucide-react';

// Define the Blog Interface
interface Blog {
  id: string;
  title: string;
  slug: string;
  category: string;
  featured_image: string;
  created_at: string;
  content: string; // Needed for calculating read time
}

const Insights: React.FC = () => {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  // Fetch Logic
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setPosts(data);
        setFilteredPosts(data);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Filter Logic
  const filterPosts = (category: string) => {
    setActiveCategory(category);
    if (category === 'All') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter((post) => post.category.includes(category)));
    }
  };

  // Get unique categories for the filter bar
  const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))];

  // Helper to calculate read time
  const getReadTime = (text: string) => {
    const wpm = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wpm);
  };

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      
      {/* 1. Page Header */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 mb-20 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-brand-gold text-[10px] tracking-[0.4em] uppercase mb-4 font-bold"
        >
          The Journal
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-light text-brand-maroon uppercase tracking-tight mb-12"
        >
          Market Insights & <br/> <span className="italic">Strategic Living</span>
        </motion.h1>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap justify-center gap-8 border-b border-stone-100 pb-6">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => filterPosts(cat)}
              className={`text-[10px] tracking-[0.3em] uppercase transition-all duration-300 ${
                activeCategory === cat 
                  ? 'text-brand-maroon border-b border-brand-maroon pb-1 font-bold' 
                  : 'text-gray-400 hover:text-brand-maroon'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 2. The Blog Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        {loading ? (
          // Loading Skeleton
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="bg-stone-100 aspect-[16/10] mb-6" />
                <div className="bg-stone-100 h-4 w-1/2 mb-4" />
                <div className="bg-stone-100 h-8 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20"
          >
            <AnimatePresence>
              {filteredPosts.map((post) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  key={post.id}
                  className="group cursor-pointer"
                >
                  <Link to={`/journal/${post.slug}`}>
                    {/* Image Container */}
                    <div className="relative overflow-hidden aspect-[16/10] bg-stone-100 mb-8 shadow-sm">
                      <img 
                        src={post.featured_image} 
                        alt={post.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                      />
                      {/* Date Badge */}
                      <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 backdrop-blur-sm">
                        <p className="text-[8px] tracking-widest uppercase text-brand-maroon font-bold">
                          {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center border-t border-stone-100 pt-4">
                        <p className="text-brand-gold text-[9px] tracking-[0.3em] uppercase font-bold">
                          {post.category}
                        </p>
                        <p className="text-stone-300 text-[8px] tracking-widest uppercase">
                          {getReadTime(post.content || "")} Min Read
                        </p>
                      </div>
                      
                      <h2 className="text-2xl font-light text-brand-maroon uppercase tracking-wide leading-snug group-hover:text-brand-gold transition-colors duration-300">
                        {post.title}
                      </h2>
                      
                      <p className="text-gray-500 text-sm font-light line-clamp-2 leading-relaxed">
                        {post.content}
                      </p>

                      <div className="pt-4">
                         <span className="text-[9px] tracking-[0.3em] uppercase border-b border-stone-200 pb-1 group-hover:border-brand-maroon transition-all">Read Editorial</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-brand-maroon text-lg font-light">No insights found in this category.</p>
            <button onClick={() => setActiveCategory('All')} className="mt-4 text-brand-gold underline text-xs uppercase tracking-widest">View All</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Insights;