import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" as const },
    viewport: { once: false }
  };

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-2">First Name (Required)</label>
                <input type="text" className="w-full border-b border-gray-200 py-3 focus:border-brand-gold outline-none transition-colors" />
              </motion.div>
              <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-2">Last Name (Required)</label>
                <input type="text" className="w-full border-b border-gray-200 py-3 focus:border-brand-gold outline-none transition-colors" />
              </motion.div>
            </div>

            <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-2">Email (Required)</label>
              <input type="email" className="w-full border-b border-gray-200 py-3 focus:border-brand-gold outline-none transition-colors" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-2">Country</label>
                <select className="w-full border-b border-gray-200 py-3 focus:border-brand-gold outline-none transition-colors bg-white">
                  <option>Canada</option>
                  <option>United States</option>
                </select>
              </motion.div>
              <motion.div {...fadeInUp} transition={{ delay: 0.5 }}>
                <label className="block text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-2">Phone Number</label>
                <input type="tel" placeholder="+1" className="w-full border-b border-gray-200 py-3 focus:border-brand-gold outline-none transition-colors" />
              </motion.div>
            </div>

            <motion.div {...fadeInUp} transition={{ delay: 0.6 }}>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-2">Message (Required)</label>
              <textarea rows={4} className="w-full border-b border-gray-200 py-3 focus:border-brand-gold outline-none transition-colors resize-none"></textarea>
            </motion.div>

            {/* INTERACTIVE MODERN BUTTON */}
            <motion.div 
              {...fadeInUp} 
              transition={{ delay: 0.7 }}
              className="pt-8"
            >
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full md:w-auto px-16 py-5 bg-brand-maroon text-white text-[10px] tracking-[0.5em] uppercase font-bold overflow-hidden transition-all duration-500"
              >
                <span className="relative z-10">Submit Inquiry</span>
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