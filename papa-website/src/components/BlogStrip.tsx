import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from './supabaseClient';

interface Blog {
  id: string;
  title: string;
  slug: string;
  category: string;
  featured_image: string;
  created_at: string;
}

const BlogStrip: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (!error && data) {
        setBlogs(data);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="py-24 max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[16/9] bg-stone-100 mb-6" />
            <div className="h-2 w-20 bg-stone-100 mb-4" />
            <div className="h-4 w-full bg-stone-100" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="py-24 bg-white border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-baseline justify-between mb-16">
          <div className="space-y-1">
            <h3 className="text-brand-maroon text-2xl font-light tracking-tight uppercase italic">
              Insights & Editorial
            </h3>
            <p className="text-[10px] text-gray-400 tracking-[0.3em] uppercase">The Daniel Papa Journal</p>
          </div>
          <a 
            href="/journal" 
            className="text-[9px] tracking-[0.4em] uppercase border-b border-brand-gold pb-1 hover:text-brand-gold transition-colors"
          >
            View All
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {blogs.map((blog) => (
            <motion.a 
              href={`/journal/${blog.slug}`} 
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="aspect-[16/9] overflow-hidden mb-6 bg-stone-50 shadow-sm">
                <img 
                  src={blog.featured_image} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  alt={blog.title} 
                />
              </div>
              <p className="text-brand-gold text-[9px] tracking-[0.3em] uppercase mb-3 font-bold">
                {blog.category}
              </p>
              <h4 className="text-brand-maroon text-sm md:text-base leading-snug font-light uppercase tracking-wide max-w-[280px]">
                {blog.title}
              </h4>
              <div className="mt-4 overflow-hidden h-[1px] w-0 group-hover:w-12 bg-brand-gold transition-all duration-500" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogStrip;