import React, {useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const carouselProperties = [
  {
    id: 1,
    title: "THE YORKVILLE PENTHOUSE",
    price: "$4,250,000",
    image: "https://plus.unsplash.com/premium_photo-1661913412680-c274b6fea096?q=80&w=2231&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    details: "4 BEDS | 5 BATHS | 3,200 SQFT"
  },
  {
    id: 2,
    title: "LAKESIDE LUXURY ESTATE",
    price: "$3,890,000",
    image: "https://images.unsplash.com/photo-1595877244574-e90ce41ce089?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    details: "5 BEDS | 6 BATHS | 4,500 SQFT"
  },
  {
    id: 3,
    title: "MODERN FOREST HILL VILLA",
    price: "$5,100,000",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600",
    details: "6 BEDS | 7 BATHS | 5,800 SQFT"
  }
];

const propertyListings = [
  {
    id: 1,
    address: "800 LAWRENCE AVE W",
    type: "RESIDENTIAL",
    specs: "2 BEDS | 2 BATHS | 850 SQFT",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800"
    ]
  },
  {
    id: 2,
    address: "WESTSHORE, LONG BRANCH",
    type: "PRE-CONSTRUCTION",
    specs: "3 BEDS | 3 BATHS | 1,200 SQFT",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"
    ]
  },
  {
    id: 3,
    address: "611 COLLEGE STREET W",
    type: "COMMERCIAL",
    specs: "N/A | 2 BATHS | 2,400 SQFT",
    images: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800"
    ]
  },
  {
    id: 4,
    address: "12 YORK STREET",
    type: "RESIDENTIAL",
    specs: "1 BED | 1 BATH | 600 SQFT",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1502672023488-70e25813ef6e?w=800"
    ]
  }
];

// --- Sub-Component for individual Cards ---
const ListingCard = ({ property, delay }: { property: any, delay: number }) => {
  const [imgIndex, setImgIndex] = useState(0);

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: false }}
      className="group flex flex-col"
    >
      {/* Mini Carousel Box */}
      <div className="relative aspect-[4/5] mb-4 overflow-hidden shadow-sm">
        <AnimatePresence mode="wait">
          <motion.img 
            key={imgIndex}
            src={property.images[imgIndex]} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Minimalist Arrows - Only visible on hover */}
        <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={prevImg} className="p-1 bg-white/80 rounded-full text-brand-maroon hover:bg-white">
            <ChevronLeft size={14} />
          </button>
          <button onClick={nextImg} className="p-1 bg-white/80 rounded-full text-brand-maroon hover:bg-white">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Property Details */}
      <div className="text-left space-y-1">
        <p className="text-[9px] tracking-[0.2em] text-brand-gold uppercase font-bold">
          {property.type}
        </p>
        <h4 className="text-[11px] tracking-widest text-brand-maroon font-medium uppercase">
          {property.address}
        </h4>
        <p className="text-[10px] tracking-widest text-gray-400 font-light italic">
          {property.specs}
        </p>
        <div className="pt-2">
           <button className="text-[9px] tracking-[0.3em] uppercase border-b border-brand-gold/30 pb-0.5 hover:border-brand-gold transition-colors">
            View Listing
           </button>
        </div>
      </div>
    </motion.div>
  );
};



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

  const [currentIndex, setCurrentIndex] = useState(0);

  // Logic to advance by 2, wrapping back to 0 if we hit the end
  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + 2 >= carouselProperties.length ? 0 : prev + 2
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.floor((carouselProperties.length - 1) / 2) * 2 : prev - 2
    );
  };

  // Helper to get the pair of items
  const visibleProperties = [
    carouselProperties[currentIndex],
    carouselProperties[currentIndex + 1]
  ].filter(Boolean); // Filter handles odd-numbered arrays so it doesn't crash

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
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200" className="w-full h-full object-cover" alt="Residential Hero" />
        </motion.div>
      </section>

      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-brand-maroon text-xs tracking-[0.5em] uppercase mb-4">Featured Collection</h2>
            <div className="w-12 h-[1px] bg-brand-gold mx-auto"></div>
          </div>

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
                    {/* Image Box */}
                    <div className="relative aspect-[16/10] overflow-hidden shadow-xl mb-6 bg-stone-100">
                      <img 
                        src={prop.image} 
                        className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                        alt={prop.title}
                      />
                      <div className="absolute inset-0 bg-brand-maroon/5"></div>
                    </div>

                    {/* Text Details */}
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
            <div className="absolute -bottom-16 right-0 flex gap-4 z-20">
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

export default Residential;