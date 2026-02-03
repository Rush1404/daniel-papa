import React, { useState } from 'react';
import { supabase } from '../components/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Send, Lock } from 'lucide-react';

const AdminPortal: React.FC = () => {
  // Authorization States
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Form States
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  // 1. Password Gateway Handler
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace this with Daniel's chosen secure code
    if (password === "password") { 
      setIsAuthorized(true);
    } else {
      alert("Access Denied.");
    }
  };

  // 2. Image Upload Logic (Supabase Storage)
  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `blog-covers/${fileName}`;

    // Upload to 'editorial' bucket (Ensure bucket is PUBLIC in Supabase settings)
    const { error: uploadError } = await supabase.storage
      .from('editorial')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('editorial').getPublicUrl(filePath);
    return data.publicUrl;
  };

  // 3. Final Submission Handler
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return alert("Please upload a featured image.");

    setIsPublishing(true);
    try {
      // Step A: Upload Image
      const publicUrl = await uploadImage(imageFile);

      // Step B: Generate Slug
      const slug = title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');

      // Step C: Insert into Database
      const { error } = await supabase.from('blogs').insert([
        {
          title,
          slug,
          category,
          content,
          featured_image: publicUrl,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      alert("Editorial Published Successfully.");
      // Reset Form
      setTitle('');
      setCategory('');
      setContent('');
      setImageFile(null);
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setIsPublishing(false);
    }
  };

  // --- RENDER 1: LOCK SCREEN ---
  if (!isAuthorized) {
    return (
      <div className="h-screen flex items-center justify-center bg-stone-50 px-6">
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleAuth} 
          className="w-full max-w-sm text-center"
        >
          <Lock className="mx-auto mb-6 text-brand-gold" size={32} strokeWidth={1} />
          <p className="text-[10px] tracking-[0.5em] uppercase mb-8 text-brand-maroon font-bold">Secure Access Gateway</p>
          <input 
            type="password" 
            autoFocus
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b border-stone-300 bg-transparent py-3 text-center outline-none focus:border-brand-maroon transition-colors text-lg font-light" 
            placeholder="Enter Entry Code"
          />
        </motion.form>
      </div>
    );
  }

  // --- RENDER 2: ADMIN FORM ---
  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-16">
          <h2 className="text-brand-gold text-[10px] tracking-[0.5em] uppercase mb-4 font-bold font-serif">Internal Management</h2>
          <h3 className="text-brand-maroon text-4xl font-light tracking-tight uppercase">New Editorial Entry</h3>
        </div>

        <form onSubmit={handlePublish} className="space-y-12">
          {/* Title Input */}
          <div className="flex flex-col gap-2">
            <label className="text-[9px] tracking-widest uppercase text-gray-400">Article Title (5-10 Words)</label>
            <input 
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-b border-stone-200 py-4 text-xl font-light outline-none focus:border-brand-gold transition-colors"
              placeholder="e.g. The Shift in Toronto Luxury Real Estate"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Category */}
            <div className="flex flex-col gap-2">
              <label className="text-[9px] tracking-widest uppercase text-gray-400">Category</label>
              <input 
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border-b border-stone-200 py-4 outline-none focus:border-brand-gold transition-colors"
                placeholder="Market Update / Lifestyle / Design"
              />
            </div>

            {/* Image Picker */}
            <div className="flex flex-col gap-2">
              <label className="text-[9px] tracking-widest uppercase text-gray-400">Featured Render/Photo</label>
              <label className="cursor-pointer border-b border-stone-200 py-4 flex items-center justify-between text-stone-400 hover:text-brand-gold transition-colors">
                <span className="text-sm">{imageFile ? imageFile.name : "Select Image File"}</span>
                <Camera size={18} strokeWidth={1.5} />
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                />
              </label>
            </div>
          </div>

          {/* Content TextArea */}
          <div className="flex flex-col gap-2">
            <label className="text-[9px] tracking-widest uppercase text-gray-400">Journal Content</label>
            <textarea 
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border border-stone-100 p-6 min-h-[400px] text-gray-700 font-light leading-relaxed outline-none focus:border-brand-gold transition-colors"
              placeholder="Begin writing Daniel's insights here..."
            />
          </div>

          {/* Submit Button */}
          <button 
            disabled={isPublishing}
            type="submit"
            className="w-full py-6 bg-brand-maroon text-white text-[10px] tracking-[0.5em] uppercase font-bold hover:bg-brand-gold transition-all duration-500 flex items-center justify-center gap-4 disabled:bg-stone-300"
          >
            {isPublishing ? "Publishing to Live Site..." : (
              <>
                Publish Editorial <Send size={14} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPortal;