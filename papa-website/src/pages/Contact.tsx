import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" as const },
    viewport: { once: false }
  };

  const inputClasses = "w-full border-b border-gray-200 py-3 focus:border-brand-gold outline-none transition-colors bg-white text-xs tracking-widest";
  const labelClasses = "block text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-2";

  return (
    <div className="bg-[#e5e7eb] min-h-screen pt-32 flex items-center justify-center py-20 px-6 lg:px-12">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row bg-white shadow-2xl overflow-hidden">
        
        {/* LEFT COLUMN: TEAM PORTRAIT */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="lg:w-1/2 relative min-h-[500px] lg:min-h-full"
        >
          <img 
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200" 
            className="absolute inset-0 w-full h-full object-cover" 
            alt="Daniel Papa and Team" 
          />
          <div className="absolute inset-0 bg-brand-maroon/10"></div>
        </motion.div>

        {/* RIGHT COLUMN: CONTACT FORM */}
        <div className="lg:w-1/2 p-10 lg:p-20 flex flex-col justify-center">
          <motion.div {...fadeInUp}>
            <h1 className="text-5xl md:text-7xl font-light tracking-[0.2em] text-brand-maroon uppercase mb-4">
              Contact Us
            </h1>
            <p className="text-gray-500 text-sm tracking-widest uppercase mb-12">
              We aim to get back to you within 24hrs. We look forward to connecting.
            </p>
          </motion.div>

          <form className="space-y-8">
            {/* 1. CONTACT INFO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
                <label className={labelClasses}>Full Name (Required)</label>
                <input type="text" className={inputClasses} placeholder="First & Last Name" />
              </motion.div>
              <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                <label className={labelClasses}>Phone Number</label>
                <input type="tel" className={inputClasses} placeholder="+1" />
              </motion.div>
            </div>

            <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
              <label className={labelClasses}>Email (Required)</label>
              <input type="email" className={inputClasses} placeholder="email@address.com" />
            </motion.div>

            {/* 2. MARKET & TIMING */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
                <label className={labelClasses}>Market of Interest</label>
                <select className={inputClasses}>
                  <option value="">Select Market</option>
                  <option>Ontario</option>
                  <option>Yucatan</option>
                  <option>Both</option>
                </select>
              </motion.div>
              <motion.div {...fadeInUp} transition={{ delay: 0.5 }}>
                <label className={labelClasses}>Timing</label>
                <select className={inputClasses}>
                  <option value="">Select Timeline</option>
                  <option>Immediate (&lt;3 mo)</option>
                  <option>Planning (3-12 mo)</option>
                  <option>Researching</option>
                </select>
              </motion.div>
            </div>

            {/* 3. BUDGET & GOAL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div {...fadeInUp} transition={{ delay: 0.6 }}>
                <label className={labelClasses}>Budget Range</label>
                <select className={inputClasses}>
                  <option value="">Select Budget</option>
                  <option>$500k–$1M</option>
                  <option>$1M–$3M</option>
                  <option>$3M+</option>
                </select>
              </motion.div>
              <motion.div {...fadeInUp} transition={{ delay: 0.7 }}>
                <label className={labelClasses}>Investment Goal</label>
                <select className={inputClasses}>
                  <option value="">Select Goal</option>
                  <option>Relocating</option>
                  <option>Investing</option>
                  <option>Vacation Home</option>
                </select>
              </motion.div>
            </div>
            
            {/* MANDATORY SCHEDULING SECTION */}
            <motion.div {...fadeInUp} transition={{ delay: 0.4 }} className="pt-8 border-t border-brand-gold/20">
              <h3 className="text-brand-maroon text-[11px] tracking-[0.4em] font-bold uppercase mb-6">
                Step 2: Book Your Discovery Call
              </h3>
              <div className="w-full overflow-hidden rounded-sm border border-gray-100 shadow-sm">
                <iframe 
                  src="https://zcal.co/emb/rush?embed=1&embedType=iframe" 
                  loading="lazy" 
                  style={{ border: 'none', width: '100%', height: '720px', minHeight: '544px' }} 
                  id="zcal-iframe" 
                  scrolling="no"
                  title="Schedule a meeting with Daniel Papa"
                ></iframe>
              </div>
            </motion.div>

            {/* INTERACTIVE MODERN BUTTON */}
            <motion.div 
              {...fadeInUp} 
              transition={{ delay: 0.8 }}
              className="pt-12 flex justify-center w-full"
            >
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-20 py-5 bg-brand-maroon text-white text-[10px] tracking-[0.5em] uppercase font-bold overflow-hidden transition-all duration-500 shadow-2xl"
              >
                {/* Label stays above the hover background */}
                <span className="relative z-10">Submit Inquiry</span>

                {/* Luxury Slide Effect: Maroon to Gold */}
                <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              </motion.button>
            </motion.div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;