import React, {useState, useEffect} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../../components/supabaseClient';


// Define Interface
interface Property {
  id: string;
  title: string;
  price: string;
  image: string;
  details: string;
}



const Residential: React.FC = () => {
  const sideFade = (direction: 'left' | 'right') => ({
    initial: { opacity: 0, x: direction === 'left' ? -100 : 100 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 1.2, ease: "easeOut" as const },
    viewport: { once: false, amount: 0.2 }
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
    viewport: { once: false }
  };

  const [properties, setProperties] = useState<Property[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // FETCH DATA FROM SUPABASE
  useEffect(() => {
    const fetchProperties = async () => {
      const { data } = await supabase
        .from('properties')
        .select('*')
        .eq('category', 'Residential') 
        .eq('is_hidden', false)
        .order('created_at', { ascending: false });
      
      if (data) setProperties(data);
      setLoading(false);
    };

    fetchProperties();
  }, []);

  // CAROUSEL LOGIC
  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + 2 >= properties.length ? 0 : prev + 2
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.floor((properties.length - 1) / 2) * 2 : prev - 2
    );
  };

  const visibleProperties = properties.length > 0 ? [
    properties[currentIndex],
    properties[currentIndex + 1]
  ].filter(Boolean) : [];

  return (
    <div className="bg-white pt-32 min-h-screen">
      {/* SECTION 1: HERO - Residential Properties */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 flex flex-col lg:flex-row items-center gap-16">
        <motion.div {...fadeInUp} className="flex-1 order-2 lg:order-1">
          <h1 className="text-5xl md:text-7xl font-light tracking-widest text-brand-maroon mb-8 uppercase">
            RESIDENTIAL <br/> PROPERTIES
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-lg">
            Buying or selling a home is one of the most important financial and lifestyle decisions you'll make. Daniel works closely with clients to understand priorities, timing, and market conditions, delivering thoughtful guidance, strong negotiation, and a seamless experience designed to achieve the best outcome. 
          </p>
          <button className="btn-maroon">Book a Call with Daniel</button>
        </motion.div>
        <motion.div {...sideFade('right')} className="flex-1 order-1 lg:order-2 aspect-[4/5] lg:aspect-square overflow-hidden shadow-2xl">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600" className="w-full h-full object-cover" alt="Residential Hero" />
        </motion.div>
      </section>

      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="text-center mb-16">
            <h2 className="text-brand-maroon text-xs tracking-[0.5em] uppercase mb-4">Featured Collection</h2>
            <div className="w-12 h-[1px] bg-brand-gold mx-auto"></div>
          </div>

          {loading ? (
             <div className="text-center text-gray-400 py-20">Loading Exclusive Listings...</div>
          ) : properties.length === 0 ? (
             <div className="text-center text-gray-400 py-20">No Current Commercial Listings Available.</div>
          ) : (
            <div className="relative min-h-[600px] w-full group">
                <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
                >
                    {visibleProperties.map((prop) => (
                    <div key={prop.id} className="flex flex-col">
                        <div className="relative aspect-[16/10] overflow-hidden shadow-xl mb-6 bg-stone-100">
                        <img 
                            src={prop.image} 
                            className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                            alt={prop.title}
                        />
                        </div>
                        <div className="text-left">
                        <p className="text-brand-gold text-[10px] tracking-[0.4em] uppercase mb-3 font-bold">
                            {prop.details}
                        </p>
                        <h3 className="text-2xl md:text-3xl font-light tracking-widest text-brand-maroon mb-4 uppercase leading-tight">
                            {prop.title}
                        </h3>
                        <p className="text-xl font-light text-gray-400 mb-6 tracking-widest">
                            {prop.price}
                        </p>
                        <button className="text-[10px] tracking-[0.3em] uppercase border-b border-brand-gold/30 pb-1 hover:border-brand-gold transition-all">
                            View Details
                        </button>
                        </div>
                    </div>
                    ))}
                </motion.div>
                </AnimatePresence>

                {/* Navigation Controls */}
                {properties.length > 2 && (
                    <div className="absolute -bottom-16 right-0 flex gap-4 z-20">
                    <button onClick={prevSlide} className="p-4 bg-white border border-gray-100 text-brand-maroon hover:bg-brand-maroon hover:text-white transition-all shadow-lg"><ChevronLeft size={20} /></button>
                    <button onClick={nextSlide} className="p-4 bg-white border border-gray-100 text-brand-maroon hover:bg-brand-maroon hover:text-white transition-all shadow-lg"><ChevronRight size={20} /></button>
                    </div>
                )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Residential;