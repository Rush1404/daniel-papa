import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { supabase } from '../components/supabaseClient';
import { ArrowLeft, Share2, Clock } from 'lucide-react';

const BlogPost: React.FC = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Scroll Progress Logic for a premium feel
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const fetchPost = async () => {
      // Fetching based on slug to match your Landing Page links
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .single();

      if (!error && data) setPost(data);
      setLoading(false);
    };
    fetchPost();
    window.scrollTo(0, 0); // Ensure the page starts at the top
  }, [slug]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <div className="w-8 h-[1px] bg-brand-gold animate-pulse" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-brand-maroon px-6">
        <p className="text-[10px] tracking-[0.5em] uppercase mb-8">Entry Not Found</p>
        <Link to="/" className="border-b border-brand-gold pb-1 uppercase text-[9px] tracking-widest">
          Return to Journal
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen selection:bg-brand-gold/20">
      {/* 1. Top Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-gold z-50 origin-left"
        style={{ scaleX }}
      />

      {/* 2. Float Navigation */}
      <nav className="fixed top-24 left-6 lg:left-12 z-40 hidden md:block">
        <Link to="/" className="flex items-center gap-4 text-stone-400 hover:text-brand-maroon transition-colors group">
          <div className="p-2 border border-stone-100 group-hover:border-brand-maroon rounded-full transition-all">
            <ArrowLeft size={16} />
          </div>
          <span className="text-[10px] tracking-[0.4em] uppercase">Back</span>
        </Link>
      </nav>

      <article className="pt-40 pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* 3. Header Section */}
          <header className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-6 mb-8">
                <p className="text-brand-gold text-[10px] tracking-[0.5em] uppercase font-bold">{post.category}</p>
                <div className="w-1 h-1 rounded-full bg-stone-300" />
                <p className="text-stone-400 text-[10px] tracking-widest uppercase">
                  {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>
              
              <h1 className="text-brand-maroon text-4xl md:text-7xl font-light leading-[1.1] uppercase mb-12 tracking-tight">
                {post.title}
              </h1>
              
              <div className="w-12 h-[1px] bg-stone-200 mx-auto" />
            </motion.div>
          </header>

          {/* 4. Featured Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="aspect-[16/9] mb-24 overflow-hidden bg-stone-50 shadow-2xl"
          >
            <img 
              src={post.featured_image} 
              className="w-full h-full object-cover" 
              alt={post.title} 
            />
          </motion.div>

          {/* 5. Editorial Content Body */}
          <section className="max-w-2xl mx-auto">
            <div className="prose prose-stone">
              <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-light whitespace-pre-wrap first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-brand-maroon">
                {post.content}
              </p>
            </div>

            {/* 6. Signature Footer */}
            <footer className="mt-32 pt-12 border-t border-stone-100 text-center">
              <p className="text-[10px] tracking-[0.5em] uppercase text-brand-maroon font-bold mb-2">Daniel Papa</p>
              <p className="text-stone-400 text-xs italic mb-12">Principal Broker & Strategy Lead</p>
              <Link 
                to="/contact" 
                className="inline-block px-12 py-4 bg-brand-maroon text-white text-[10px] tracking-[0.4em] uppercase hover:bg-brand-gold transition-all duration-500"
              >
                Inquire About this Strategy
              </Link>
            </footer>
          </section>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;