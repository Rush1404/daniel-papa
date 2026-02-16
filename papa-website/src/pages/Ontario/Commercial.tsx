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

// --- Sub-Component for individual Cards ---
// const ListingCard = ({ property, delay }: { property: any, delay: number }) => {
//   const [imgIndex, setImgIndex] = useState(0);

//   const nextImg = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setImgIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
//   };

//   const prevImg = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setImgIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8, delay }}
//       viewport={{ once: false }}
//       className="group flex flex-col"
//     >
//       {/* Mini Carousel Box */}
//       <div className="relative aspect-[4/5] mb-4 overflow-hidden shadow-sm">
//         <AnimatePresence mode="wait">
//           <motion.img 
//             key={imgIndex}
//             src={property.images[imgIndex]} 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.4 }}
//             className="w-full h-full object-cover"
//           />
//         </AnimatePresence>

//         {/* Minimalist Arrows - Only visible on hover */}
//         <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
//           <button onClick={prevImg} className="p-1 bg-white/80 rounded-full text-brand-maroon hover:bg-white">
//             <ChevronLeft size={14} />
//           </button>
//           <button onClick={nextImg} className="p-1 bg-white/80 rounded-full text-brand-maroon hover:bg-white">
//             <ChevronRight size={14} />
//           </button>
//         </div>
//       </div>

//       {/* Property Details */}
//       <div className="text-left space-y-1">
//         <p className="text-[9px] tracking-[0.2em] text-brand-gold uppercase font-bold">
//           {property.type}
//         </p>
//         <h4 className="text-[11px] tracking-widest text-brand-maroon font-medium uppercase">
//           {property.address}
//         </h4>
//         <p className="text-[10px] tracking-widest text-gray-400 font-light italic">
//           {property.specs}
//         </p>
//         <div className="pt-2">
//            <button className="text-[9px] tracking-[0.3em] uppercase border-b border-brand-gold/30 pb-0.5 hover:border-brand-gold transition-colors">
//             View Listing
//            </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };



const Commercial: React.FC = () => {
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
  const [heroImage, setHeroImage] = useState("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070"); // Fallback

  // FETCH DATA FROM SUPABASE
  
  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true);
      
      // Perform both fetches in parallel for better performance
      const [propertiesRes, heroRes] = await Promise.all([
        supabase
          .from('properties')
          .select('*')
          .eq('category', 'Commercial')
          .eq('is_hidden', false)
          .order('created_at', { ascending: false }),
        supabase
          .from('page_assets')
          .select('hero_image_url')
          .eq('page_name', 'commercial')
          .single()
      ]);

      // Handle Properties
      if (propertiesRes.data) {
        setProperties(propertiesRes.data);
      }

      // Handle Hero Image
      if (heroRes.data?.hero_image_url) {
        setHeroImage(heroRes.data.hero_image_url);
      }

      setLoading(false);
    };

    fetchPageData();
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
      {/* SECTION 1: HERO*/}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 flex flex-col lg:flex-row items-center gap-16">
        <motion.div {...fadeInUp} className="flex-1 order-2 lg:order-1">
            <h1 className="text-5xl md:text-7xl font-light tracking-widest text-brand-maroon mb-8 uppercase leading-tight">
            COMMERCIAL <br/> PROPERTIES
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-lg">
            Elevating your commercial footprint. From high-street retail flagships to innovative creative workspaces, we connect premier businesses with Toronto's most prestigious commercial addresses.
            </p>
            <button className="px-10 py-4 bg-brand-maroon text-white text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-brand-gold transition-all duration-500 shadow-xl">
            Request Offering Memorandum
            </button>
        </motion.div>
        
        <motion.div {...sideFade('right')} className="flex-1 order-1 lg:order-2 aspect-[4/5] lg:aspect-square overflow-hidden shadow-2xl bg-stone-100">
          <img 
            src={heroImage} 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
            alt="Commercial Hero" 
          />
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
                        <a className="text-[10px] tracking-[0.3em] uppercase border-b border-brand-gold/30 pb-1 hover:border-brand-gold transition-all" href='/contact'>
                            Book a Call
                        </a>
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

export default Commercial;