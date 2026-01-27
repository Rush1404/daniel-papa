import React, {useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const carouselProperties = [
    {
    id: 1,
    title: "YORKVILLE RETAIL FLAGSHIP",
    price: "CONTACT FOR PRICING",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop",
    details: "3,200 SQFT | AAA TENANT | HIGH TRAFFIC"
  },
  {
    id: 2,
    title: "CREATIVE LOFT OFFICES",
    price: "$12,400,000",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
    details: "LIBERTY VILLAGE | 15,000 SQFT | RECENTLY REDEVELOPED"
  },
  {
    id: 3,
    title: "MIXED-USE PORTFOLIO",
    price: "$8,150,000",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop",
    details: "COLLEGE ST | RETAIL + 4 RESIDENTIAL UNITS"
  }
];

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

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === carouselProperties.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
  setCurrentIndex((prev) => (prev === 0 ? carouselProperties.length - 1 : prev - 1));
  };

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
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
            alt="Modern Glass Commercial Building" 
            />
        </motion.div>
      </section>

      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-brand-maroon text-xs tracking-[0.5em] uppercase mb-4">Featured Collection</h2>
            <div className="w-12 h-[1px] bg-brand-gold mx-auto"></div>
          </div>

          <div className="relative h-[600px] w-full group">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col lg:flex-row gap-12"
              >
                {/* Image Side */}
                <div className="flex-[1.5] relative overflow-hidden shadow-2xl">
                  <img 
                    src={carouselProperties[currentIndex].image} 
                    className="w-full h-full object-cover"
                    alt={carouselProperties[currentIndex].title}
                  />
                  <div className="absolute inset-0 bg-brand-maroon/5"></div>
                </div>

                {/* Text Side */}
                <div className="flex-1 flex flex-col justify-center text-left">
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 20 }}
                    transition={{ delay: 0.3 }}
                    className="text-brand-gold text-[10px] tracking-[0.4em] uppercase mb-6"
                  >
                    {carouselProperties[currentIndex].details}
                  </motion.p>
                  <h3 className="text-4xl md:text-5xl font-light tracking-tighter text-brand-maroon mb-6 uppercase leading-tight">
                    {carouselProperties[currentIndex].title}
                  </h3>
                  <p className="text-2xl font-light text-gray-400 mb-10 tracking-widest">
                    {carouselProperties[currentIndex].price}
                  </p>
                  <button className="btn-maroon self-start">View Gallery</button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute bottom-0 right-0 flex gap-4 z-20">
              <button 
                onClick={prevSlide}
                className="p-4 bg-white border border-gray-100 text-brand-maroon hover:bg-brand-maroon hover:text-white transition-all shadow-lg"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextSlide}
                className="p-4 bg-white border border-gray-100 text-brand-maroon hover:bg-brand-maroon hover:text-white transition-all shadow-lg"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Commercial;