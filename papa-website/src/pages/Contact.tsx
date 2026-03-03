import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../components/supabaseClient';
import { ChevronRight } from 'lucide-react';

const Contact: React.FC = () => {
  const [portraitImage, setPortraitImage] = useState("");
  const [activeStep, setActiveStep] = useState<1 | 2>(1);

  // Form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [market, setMarket] = useState('');
  const [timing, setTiming] = useState('');
  const [budget, setBudget] = useState('');
  const [goal, setGoal] = useState('');

  useEffect(() => {
    const fetchPortrait = async () => {
      const { data } = await supabase
        .from('page_assets')
        .select('hero_image_url')
        .eq('page_name', 'meet_daniel_portrait')
        .single();
      if (data?.hero_image_url) setPortraitImage(data.hero_image_url);
    };
    fetchPortrait();
  }, []);

  const inputClasses = "w-full border-b border-gray-200 py-3 focus:border-brand-gold outline-none transition-colors bg-transparent text-xs tracking-widest text-gray-800 placeholder:text-gray-400";
  const labelClasses = "block text-[9px] tracking-[0.35em] uppercase text-gray-400 mb-2 font-medium";

  const canProceed = fullName.trim() !== '' && email.trim() !== '';

  return (
    <div className="bg-[#f0ede8] min-h-screen pt-24 flex items-start justify-center py-12 px-4 lg:px-8">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row shadow-2xl overflow-hidden" style={{ minHeight: '85vh' }}>

        {/* ── LEFT: PORTRAIT (sticky) ── */}
        <div className="lg:w-[42%] relative hidden lg:block">
          <div className="sticky top-0 h-screen">
            <img
              src={portraitImage}
              className="w-full h-full object-cover object-top"
              alt="Daniel Papa"
            />
            {/* Gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-10">
              <p className="text-brand-gold text-[9px] tracking-[0.5em] uppercase font-bold mb-2">Daniel Papa</p>
              <h2 className="text-white text-3xl font-light tracking-tight leading-tight">
                Let's build your<br /><span className="italic">future together.</span>
              </h2>
            </div>
          </div>
        </div>

        {/* ── RIGHT: STEPS ── */}
        <div className="lg:w-[58%] bg-white flex flex-col" style={{ maxHeight: '100vh', overflow: 'hidden' }}>

          {/* Step Tab Navigation */}
          <div className="flex border-b border-stone-100">
            <button
              onClick={() => setActiveStep(1)}
              className={`flex-1 py-6 px-8 text-left transition-all duration-300 relative group ${activeStep === 1 ? 'bg-white' : 'bg-stone-50 hover:bg-stone-100/50'}`}
            >
              {activeStep === 1 && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-maroon"
                />
              )}
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${activeStep === 1 ? 'bg-brand-maroon text-white' : 'bg-stone-200 text-stone-400'}`}>
                  1
                </span>
                <div>
                  <p className={`text-[9px] tracking-[0.4em] uppercase font-bold transition-colors ${activeStep === 1 ? 'text-brand-maroon' : 'text-stone-400'}`}>
                    Your Details
                  </p>
                  <p className="text-[10px] text-stone-400 mt-0.5 hidden md:block">Tell us about your goals</p>
                </div>
              </div>
            </button>

            <div className="w-px bg-stone-100 my-4" />

            <button
              onClick={() => canProceed && setActiveStep(2)}
              className={`flex-1 py-6 px-8 text-left transition-all duration-300 relative ${activeStep === 2 ? 'bg-white' : canProceed ? 'bg-stone-50 hover:bg-stone-100/50 cursor-pointer' : 'bg-stone-50 cursor-not-allowed opacity-60'}`}
            >
              {activeStep === 2 && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-maroon"
                />
              )}
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${activeStep === 2 ? 'bg-brand-maroon text-white' : canProceed ? 'bg-brand-gold text-white' : 'bg-stone-200 text-stone-400'}`}>
                  2
                </span>
                <div>
                  <p className={`text-[9px] tracking-[0.4em] uppercase font-bold transition-colors ${activeStep === 2 ? 'text-brand-maroon' : canProceed ? 'text-brand-gold' : 'text-stone-400'}`}>
                    Book a Call
                  </p>
                  <p className="text-[10px] text-stone-400 mt-0.5 hidden md:block">Schedule your discovery call</p>
                </div>
              </div>
            </button>
          </div>

          {/* Step Content */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">

              {/* ── STEP 1 ── */}
              {activeStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-10 lg:p-16"
                >
                  <div className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-light tracking-[0.15em] text-brand-maroon uppercase mb-3">
                      Contact Us
                    </h1>
                    <p className="text-gray-400 text-xs tracking-widest uppercase">
                      We aim to respond within 24 hours.
                    </p>
                  </div>

                  <div className="space-y-8">
                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClasses}>Full Name <span className="text-brand-gold">*</span></label>
                        <input
                          type="text"
                          className={inputClasses}
                          placeholder="First & Last Name"
                          value={fullName}
                          onChange={e => setFullName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>Phone Number</label>
                        <input
                          type="tel"
                          className={inputClasses}
                          placeholder="+1"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClasses}>Email <span className="text-brand-gold">*</span></label>
                      <input
                        type="email"
                        className={inputClasses}
                        placeholder="email@address.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>

                    {/* Proceed CTA */}
                    <div className="pt-4">
                      <motion.button
                        onClick={() => canProceed && setActiveStep(2)}
                        disabled={!canProceed}
                        whileHover={canProceed ? { scale: 1.01 } : {}}
                        whileTap={canProceed ? { scale: 0.99 } : {}}
                        className={`w-full py-5 flex items-center justify-center gap-3 text-[10px] tracking-[0.5em] uppercase font-bold transition-all duration-500 ${
                          canProceed
                            ? 'bg-brand-maroon text-white hover:bg-brand-gold cursor-pointer'
                            : 'bg-stone-100 text-stone-300 cursor-not-allowed'
                        }`}
                      >
                        Next: Book Your Discovery Call
                        <ChevronRight size={14} strokeWidth={2} />
                      </motion.button>
                      {!canProceed && (
                        <p className="text-center text-[9px] tracking-widest uppercase text-stone-400 mt-3">
                          Name & email required to continue
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── STEP 2 ── */}
              {activeStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 lg:p-10"
                >
                  <div className="mb-6">
                    <h2 className="text-3xl md:text-4xl font-light tracking-[0.15em] text-brand-maroon uppercase mb-3">
                      Book Your Call
                    </h2>
                    <p className="text-gray-400 text-xs tracking-widest uppercase">
                      Select a time that works for you, {fullName.split(' ')[0]}.
                    </p>
                  </div>

                  <div className="border border-stone-100 overflow-hidden">
                    <iframe
                      src="https://zcal.co/i/QNGWcw-O?embed=1&embedType=iframe"
                      loading="lazy"
                      style={{ border: 'none', width: '100%', height: '680px', display: 'block' }}
                      id="zcal-invite"
                      scrolling="yes"
                      title="Schedule a meeting with Daniel Papa"
                    />
                  </div>

                  <button
                    onClick={() => setActiveStep(1)}
                    className="mt-5 text-[9px] tracking-[0.4em] uppercase text-stone-400 hover:text-brand-maroon transition-colors"
                  >
                    ← Back to Details
                  </button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;