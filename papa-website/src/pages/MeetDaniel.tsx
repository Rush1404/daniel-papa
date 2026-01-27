import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';


// --- Types & Data ---
interface Category {
  title: string;
  desc: string;
  img: string;
  path?: string;
}

const categories: Category[] = [
  { title: 'RESIDENTIAL', desc: "Find your perfect fit at the absolute best price.", img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', path: '/residential' },
  { title: 'PRE-CONSTRUCTION', desc: "Educating you on the best pre-construction options.", img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800' },
  { title: 'COMMERCIAL', desc: "A space that shares your story with your customers.", img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800' },
  { title: 'INVESTMENT', desc: "Real estate as a way to diversify your portfolio.", img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800' }
];

const listings = [
  { id: 1, addr: "611 COLLEGE STREET WEST", type: "COMMERCIAL", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800" },
  { id: 2, addr: "800 LAWRENCE AVE W", type: "RESIDENTIAL", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800" },
  { id: 3, addr: "WESTSHORE, LONG BRANCH", type: "PRE-CONSTRUCTION", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800" }
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
const MeetDaniel: React.FC = () => {

  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Logic to get exactly 3 visible cards in a circular fashion
  const visibleTestimonials = [
    testimonials[startIndex % testimonials.length],
    testimonials[(startIndex + 1) % testimonials.length],
    testimonials[(startIndex + 2) % testimonials.length]
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-gold selection:text-white overflow-x-hidden">
      <Navbar />
      <main>
        {/* MEET THE TEAM SECTION (Full Body) */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32">

          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Portrait Column */}
            <motion.div {...sideFade('left')} className="flex-1 sticky top-40">
              <div className="aspect-[3/4] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1000" 
                  className="w-full h-full object-cover" 
                  alt="Daniel Papa Portrait" 
                />
              </div>
            </motion.div>

            {/* Biography Column */}
            <motion.div {...sideFade('right')} className="flex-1 py-10">
              <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-brand-maroon mb-12 uppercase leading-tight">
                DANIEL <br/> PAPA
              </h2>
              
              <div className="space-y-8 text-gray-700 text-lg leading-relaxed font-light">
                <p>
                  A dedicated and passionate realtor, Daniel has blazed a serious trail in the real estate industry, 
                  redefining the standards of service and professionalism. As the founder of his team, he has devoted 
                  his career to crafting a real estate experience like no other.
                </p>
                <p>
                  Born into an environment that valued hard work and entrepreneurship, Daniel's journey began with a 
                  bold move into the Toronto market. He recognizes potential for growth and value, helping his 
                  clients make informed decisions through every step of the process.
                </p>
                <p>
                  Currently residing in the Greater Toronto Area, Daniel's connection to the community runs deep. 
                  His love for the neighborhood and its residents drives his dedication to helping clients find 
                  their perfect homes in this diverse and exciting locale.
                </p>
              </div>

              <button className="mt-16 btn-maroon w-full md:w-auto">
                Book a Call with Daniel
              </button>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MeetDaniel;