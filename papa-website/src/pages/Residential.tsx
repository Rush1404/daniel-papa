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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === carouselProperties.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
  setCurrentIndex((prev) => (prev === 0 ? carouselProperties.length - 1 : prev - 1));
  };

  return (
    <div className="bg-white pt-32 min-h-screen">
      {/* SECTION 1: HERO - Residential Properties */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 flex flex-col lg:flex-row items-center gap-16">
        <motion.div {...fadeInUp} className="flex-1 order-2 lg:order-1">
          <h1 className="text-5xl md:text-7xl font-light tracking-widest text-brand-maroon mb-8 uppercase">
            RESIDENTIAL <br/> PROPERTIES
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-lg">
            If you’re looking to buy or sell your home, there is no better real estate team to take excellent care of you. We will work tirelessly to find you the perfect home at the absolute best price.
          </p>
          <button className="btn-maroon">Book a Discovery Call</button>
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

      {/* SECTION 2: BUYING & SELLING YOUR HOME */}
      <section className="bg-[#f7f7f7] py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row-reverse items-center gap-16">
          <motion.div {...fadeInUp} className="flex-1">
            <h2 className="text-4xl md:text-6xl font-light tracking-widest text-brand-maroon mb-8 uppercase">
              BUYING & SELLING <br/> YOUR HOME
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-10">
              Whether you’re looking to buy a home or looking to sell your existing home (or both), we work hard to make the experience of buying and selling feel effortless for you. With our industry knowledge & hands-on experience in the Toronto market, we make it our business to not rest until we find you the perfect fit.
            </p>
            <button className="btn-gold">Book a Discovery Call</button>
          </motion.div>
          <motion.div {...sideFade('left')} className="flex-1 aspect-[4/3] overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000" className="w-full h-full object-cover" alt="Home Buying" />
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: NEW LISTINGS GRID */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-light tracking-[0.5em] text-brand-maroon mb-20 uppercase"
        >
          NEW LISTINGS
        </motion.h2>
        
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {propertyListings.map((property, i) => (
            <ListingCard key={property.id} property={property} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* SECTION 4: DETAILED PROPERTY LAYOUT (Based on Screenshot) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div {...fadeInUp} className="mb-12">
            <h3 className="text-brand-maroon text-xs tracking-[0.4em] uppercase mb-2">
                611 COLLEGE STREET WEST — COMMERCIAL 
            </h3>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
            {/* Large Left Image */}
            <motion.div {...sideFade('left')} className="md:col-span-2 overflow-hidden shadow-lg">
                <img 
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" 
                alt="Commercial Interior 1" 
                />
            </motion.div>
            
            {/* Stacked Right Images */}
            <motion.div {...sideFade('right')} className="flex flex-col gap-4">
                <div className="flex-1 overflow-hidden shadow-lg">
                <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" 
                    alt="Commercial Interior 2" 
                />
                </div>
                <div className="flex-1 overflow-hidden shadow-lg">
                <img 
                    src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" 
                    alt="Commercial Interior 3" 
                />
                </div>
            </motion.div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Residential;