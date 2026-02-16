import React, { useState, useEffect } from 'react';
import { supabase } from '../components/supabaseClient'; 
import { motion } from 'framer-motion';
import { 
  Camera, Send, Lock, Trash2, Home, BookOpen, 
  Eye, EyeOff, Edit2, RefreshCw, X 
} from 'lucide-react';

// --- INTERFACES ---
interface Property {
  id: string;
  title: string;
  price: string;
  image: string;
  details: string;
  category: string;
  is_hidden: boolean; // Added this
}

interface Blog {
  id: string;
  title: string;
  category: string;
  content: string;
  featured_image: string;
  is_hidden: boolean;
  created_at: string;
}

const AdminPortal: React.FC = () => {
  // --- GLOBAL STATE ---
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState<'blogs' | 'properties'>('properties');
  const [loading, setLoading] = useState(false);

  // --- PROPERTY STATE ---
  const [properties, setProperties] = useState<Property[]>([]);
  const [editingPropId, setEditingPropId] = useState<string | null>(null); // Track if editing
  const [propTitle, setPropTitle] = useState('');
  const [propPrice, setPropPrice] = useState('');
  const [propDetails, setPropDetails] = useState('');
  const [propCategory, setPropCategory] = useState('Commercial');
  const [propImage, setPropImage] = useState<File | null>(null);
  const [currentPropImageUrl, setCurrentPropImageUrl] = useState(''); // Store existing image URL

  // --- BLOG STATE ---
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogCategory, setBlogCategory] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogImage, setBlogImage] = useState<File | null>(null);
  const [currentBlogImageUrl, setCurrentBlogImageUrl] = useState('');

  // State for Hero Image Management
  const [heroPage, setHeroPage] = useState('commercial');
  const [heroFile, setHeroFile] = useState<File | null>(null);

  // --- TESTIMONIAL STATE ---
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [testName, setTestName] = useState('');
  const [testText, setTestText] = useState('');
  const [editingTestId, setEditingTestId] = useState<string | null>(null);


  // --- AUTH ---
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "password") { 
      setIsAuthorized(true);
      fetchProperties();
      fetchBlogs();
    } else {
      alert("Access Denied.");
    }
  };

  // --- FETCHERS ---
  const fetchProperties = async () => {
    setLoading(true);
    const { data } = await supabase.from('properties').select('*').order('created_at', { ascending: false });
    if (data) setProperties(data);
    setLoading(false);
  };

  const fetchBlogs = async () => {
    setLoading(true);
    const { data } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
    if (data) setBlogs(data);
    setLoading(false);
  };

  // --- SHARED UPLOAD LOGIC ---
  const uploadImage = async (file: File, folder: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('editorial') 
      .upload(filePath, file);

    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from('editorial').getPublicUrl(filePath);
    return data.publicUrl;
  };

  // ==============================
  //    PROPERTY HANDLERS
  // ==============================
  const handlePublishProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!propImage && !currentPropImageUrl) return alert("Image required");

    try {
      let imageUrl = currentPropImageUrl;
      // Only upload if new file selected
      if (propImage) {
        imageUrl = await uploadImage(propImage, 'property-images');
      }

      const payload = {
        title: propTitle,
        price: propPrice,
        details: propDetails,
        category: propCategory,
        image: imageUrl
      };

      if (editingPropId) {
        // UPDATE EXISTING
        const { error } = await supabase.from('properties').update(payload).eq('id', editingPropId);
        if (error) throw error;
        alert("Listing Updated Successfully");
      } else {
        // INSERT NEW
        const { error } = await supabase.from('properties').insert([payload]);
        if (error) throw error;
        alert("Property Listed Successfully");
      }

      resetPropForm();
      fetchProperties();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleHeroUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroFile) return;

    try {
      // 1. Upload to Supabase Storage
      const publicUrl = await uploadImage(heroFile, 'hero-banners');

      // 2. Upsert into page_assets (Insert if doesn't exist, Update if it does)
      const { error } = await supabase
        .from('page_assets')
        .upsert({ 
          page_name: heroPage, 
          hero_image_url: publicUrl 
        }, { onConflict: 'page_name' });

      if (error) throw error;
      alert(`${heroPage.toUpperCase()} hero image updated successfully.`);
      setHeroFile(null);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleEditProperty = (prop: Property) => {
    setEditingPropId(prop.id);
    setPropTitle(prop.title);
    setPropPrice(prop.price);
    setPropDetails(prop.details);
    setPropCategory(prop.category);
    setCurrentPropImageUrl(prop.image);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to form
  };

  const handleDeleteProperty = async (id: string) => {
    if(!window.confirm("Delete this listing?")) return;
    await supabase.from('properties').delete().eq('id', id);
    fetchProperties();
  };

  const handleToggleHideProperty = async (prop: Property) => {
    // 1. Send the update to Supabase
    const { error } = await supabase
      .from('properties') // Make sure this says 'properties'
      .update({ is_hidden: !prop.is_hidden })
      .eq('id', prop.id);
    
    if (error) {
      alert("Error hiding property: " + error.message);
    } else {
      fetchProperties();
    }
  };
  
  const resetPropForm = () => {
    setEditingPropId(null);
    setPropTitle('');
    setPropPrice('');
    setPropDetails('');
    setPropImage(null);
    setCurrentPropImageUrl('');
    // Keep category as is for convenience
  };

  // ==============================
  //    BLOG HANDLERS (Unchanged logic)
  // ==============================
  const handlePublishBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogImage && !currentBlogImageUrl) return alert("Image required");

    try {
      let publicUrl = currentBlogImageUrl;
      if (blogImage) {
        publicUrl = await uploadImage(blogImage, 'blog-covers');
      }

      const slug = blogTitle.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      const payload = {
        title: blogTitle,
        slug,
        category: blogCategory,
        content: blogContent,
        featured_image: publicUrl,
      };

      if (editingBlogId) {
        await supabase.from('blogs').update(payload).eq('id', editingBlogId);
        alert("Updated Successfully");
      } else {
        await supabase.from('blogs').insert([{ ...payload, created_at: new Date().toISOString() }]);
        alert("Published Successfully");
      }
      
      resetBlogForm();
      fetchBlogs();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlogId(blog.id);
    setBlogTitle(blog.title);
    setBlogCategory(blog.category);
    setBlogContent(blog.content);
    setCurrentBlogImageUrl(blog.featured_image);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteBlog = async (id: string) => {
    if(!window.confirm("Delete this editorial?")) return;
    await supabase.from('blogs').delete().eq('id', id);
    fetchBlogs();
  };

  const handleToggleHideBlog = async (blog: Blog) => {
    await supabase.from('blogs').update({ is_hidden: !blog.is_hidden }).eq('id', blog.id);
    fetchBlogs();
  };

  const resetBlogForm = () => {
    setEditingBlogId(null);
    setBlogTitle('');
    setBlogCategory('');
    setBlogContent('');
    setBlogImage(null);
    setCurrentBlogImageUrl('');
  };

  // ==============================
  //   TESTIMONIAL HANDLERS (Unchanged logic)
  // ==============================

  const fetchTestimonials = async () => {
    const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
    if (data) setTestimonials(data);
  };

  const handlePublishTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name: testName, text: testText };

    if (editingTestId) {
      await supabase.from('testimonials').update(payload).eq('id', editingTestId);
      alert("Updated Successfully");
    } else {
      await supabase.from('testimonials').insert([payload]);
      alert("Testimonial Added");
    }
    
    setTestName(''); setTestText(''); setEditingTestId(null);
    fetchTestimonials();
  };

  const handleDeleteTestimonial = async (id: string) => {
    if(!window.confirm("Delete this testimonial?")) return;
    await supabase.from('testimonials').delete().eq('id', id);
    fetchTestimonials();
  };

  // --- LOCK SCREEN ---
  if (!isAuthorized) {
    return (
      <div className="h-screen flex items-center justify-center bg-stone-50 px-6">
        <form onSubmit={handleAuth} className="w-full max-w-sm text-center">
          <Lock className="mx-auto mb-6 text-brand-gold" size={32} />
          <p className="text-[10px] tracking-[0.5em] uppercase mb-8 text-brand-maroon font-bold">Admin Portal</p>
          <input type="password" autoFocus onChange={(e) => setPassword(e.target.value)} className="w-full border-b border-stone-300 bg-transparent py-3 text-center outline-none" placeholder="Enter Code" />
        </form>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* TAB SWITCHER */}
        <div className="flex gap-8 mb-16 border-b border-stone-100 pb-4">
          <button onClick={() => setActiveTab('properties')} className={`flex items-center gap-2 text-xs tracking-widest uppercase pb-2 transition-all ${activeTab === 'properties' ? 'text-brand-maroon border-b-2 border-brand-maroon' : 'text-gray-400'}`}>
            <Home size={16} /> Listings
          </button>
          <button onClick={() => setActiveTab('blogs')} className={`flex items-center gap-2 text-xs tracking-widest uppercase pb-2 transition-all ${activeTab === 'blogs' ? 'text-brand-maroon border-b-2 border-brand-maroon' : 'text-gray-400'}`}>
            <BookOpen size={16} /> Editorials
          </button>
          <button 
            onClick={() => { setActiveTab('testimonials' as any); fetchTestimonials(); }} 
            className={`flex items-center gap-2 text-xs tracking-widest uppercase pb-2 transition-all ${activeTab as any === 'testimonials' ? 'text-brand-maroon border-b-2 border-brand-maroon' : 'text-gray-400'}`}
          >
            <Eye size={16} /> Testimonials
          </button>
        </div>

        {/* =======================
            PROPERTIES TAB 
           ======================= */}
        {activeTab === 'properties' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* LEFT COLUMN: FORMS */}
            <div className="space-y-16">
              {/* SECTION A: ADD/EDIT LISTING */}
              <div>
                <div className="flex justify-between items-end mb-8">
                  <h3 className="text-brand-maroon text-2xl font-light uppercase">{editingPropId ? "Edit Listing" : "Add Listing"}</h3>
                  {editingPropId && <button onClick={resetPropForm} className="text-xs text-red-400 uppercase tracking-widest flex items-center gap-1"><X size={12}/> Cancel</button>}
                </div>

                <form onSubmit={handlePublishProperty} className="space-y-6">
                  <select value={propCategory} onChange={(e) => setPropCategory(e.target.value)} className="w-full border-b border-stone-200 py-3 bg-transparent outline-none uppercase text-xs">
                      <option value="Commercial">Commercial</option>
                      <option value="Investment">Investment</option>
                      <option value="Residential">Residential</option>
                      <option value="Pre-Construction">Pre-Construction</option>
                  </select>
                  <input placeholder="Title" value={propTitle} onChange={e => setPropTitle(e.target.value)} className="w-full border-b border-stone-200 py-3 outline-none" required />
                  <div className="flex gap-4">
                      <input placeholder="Price" value={propPrice} onChange={e => setPropPrice(e.target.value)} className="w-full border-b border-stone-200 py-3 outline-none" required />
                      <input placeholder="Details" value={propDetails} onChange={e => setPropDetails(e.target.value)} className="w-full border-b border-stone-200 py-3 outline-none" required />
                  </div>
                  <label className="cursor-pointer border border-dashed border-stone-300 p-8 flex flex-col items-center justify-center text-gray-400 hover:border-brand-gold transition-all">
                    <Camera size={24} className="mb-2" />
                    <span className="text-xs uppercase tracking-widest">{propImage ? propImage.name : (currentPropImageUrl ? "Keep Current Image" : "Upload Image")}</span>
                    <input type="file" className="hidden" onChange={e => setPropImage(e.target.files ? e.target.files[0] : null)} />
                  </label>
                  <button className={`w-full py-4 text-white text-xs tracking-[0.3em] uppercase hover:bg-brand-gold transition-all ${editingPropId ? 'bg-blue-900' : 'bg-brand-maroon'}`}>
                    {editingPropId ? "Update Listing" : "Publish Listing"}
                  </button>
                </form>
              </div>

              {/* SECTION B: PAGE BRANDING (HERO IMAGES) */}
              <div className="pt-12 border-t border-stone-100">
                <div className="mb-8">
                  <h3 className="text-brand-maroon text-xl font-light uppercase mb-2">Page Branding</h3>
                  <p className="text-gray-400 text-[10px] tracking-widest uppercase">Update hero images for category pages</p>
                </div>

                <form onSubmit={handleHeroUpdate} className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label className="text-[9px] tracking-widest uppercase text-gray-400 mb-2 block">Select Page</label>
                      <select 
                        value={heroPage} 
                        onChange={(e) => setHeroPage(e.target.value)}
                        className="w-full border-b border-stone-200 py-2 outline-none uppercase text-xs bg-transparent"
                      >
                        <option value="commercial">Commercial</option>
                        <option value="investment">Investment</option>
                        <option value="residential">Residential</option>
                        <option value="pre-construction">Pre-Construction</option>
                      </select>
                    </div>
                    
                    <div className="flex-1">
                      <label className="text-[9px] tracking-widest uppercase text-gray-400 mb-2 block">Hero Photo</label>
                      <label className="cursor-pointer border-b border-stone-200 py-2 flex justify-between items-center text-stone-400 hover:text-brand-gold transition-colors">
                        <span className="text-[10px] uppercase truncate max-w-[150px]">
                          {heroFile ? heroFile.name : "Choose New Photo"}
                        </span>
                        <Camera size={14} />
                        <input type="file" className="hidden" onChange={(e) => setHeroFile(e.target.files ? e.target.files[0] : null)} />
                      </label>
                    </div>
                  </div>

                  <button 
                    disabled={!heroFile}
                    type="submit" 
                    className="w-full py-3 border border-brand-gold text-brand-gold text-[10px] uppercase tracking-[0.3em] hover:bg-brand-gold hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-brand-gold"
                  >
                    Update Banner Image
                  </button>
                </form>
              </div>
            </div>

            {/* RIGHT: PROPERTY LIST */}
            <div className="bg-stone-50 p-8 h-[600px] overflow-y-auto">
              <div className="flex justify-between mb-6">
                <h3 className="text-gray-400 text-xs tracking-widest uppercase">Inventory</h3>
                <button onClick={fetchProperties}><RefreshCw size={14} className="text-gray-400 hover:text-brand-maroon"/></button>
              </div>
              
              <div className="space-y-4">
                {properties.map(p => (
                  <div key={p.id} className={`bg-white p-4 flex flex-col gap-3 shadow-sm border-l-4 ${p.is_hidden ? 'border-red-300 opacity-60' : 'border-brand-maroon'}`}>
                    <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 bg-stone-200 overflow-hidden shrink-0">
                            <img src={p.image} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <p className="text-[9px] text-brand-gold uppercase tracking-widest font-bold">{p.category}</p>
                            <h4 className="text-brand-maroon text-sm font-medium uppercase">{p.title}</h4>
                        </div>
                    </div>
                    {/* ACTION BUTTONS */}
                    <div className="flex gap-2 justify-end pt-2 border-t border-stone-50">
                        {/* TOGGLE HIDE */}
                        <button onClick={() => handleToggleHideProperty(p)} className="p-2 text-gray-400 hover:text-brand-maroon" title={p.is_hidden ? "Unhide" : "Hide"}>
                            {p.is_hidden ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        {/* EDIT */}
                        <button onClick={() => handleEditProperty(p)} className="p-2 text-gray-400 hover:text-blue-600"><Edit2 size={16} /></button>
                        {/* DELETE */}
                        <button onClick={() => handleDeleteProperty(p.id)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =======================
            BLOGS TAB (Same logic as before)
           ======================= */}
        {activeTab === 'blogs' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* LEFT: BLOG FORM */}
            <div>
              <div className="flex justify-between items-end mb-8">
                <h3 className="text-brand-maroon text-2xl font-light uppercase">{editingBlogId ? "Edit Editorial" : "New Editorial"}</h3>
                {editingBlogId && <button onClick={resetBlogForm} className="text-xs text-red-400 uppercase tracking-widest flex items-center gap-1"><X size={12}/> Cancel</button>}
              </div>

              <form onSubmit={handlePublishBlog} className="space-y-6">
                <input placeholder="Article Title" value={blogTitle} onChange={e => setBlogTitle(e.target.value)} className="w-full border-b border-stone-200 py-3 outline-none text-lg" required />
                <input placeholder="Category" value={blogCategory} onChange={e => setBlogCategory(e.target.value)} className="w-full border-b border-stone-200 py-3 outline-none" required />
                
                <label className="cursor-pointer border-b border-stone-200 py-3 flex justify-between items-center text-gray-400 hover:text-brand-gold">
                  <span className="text-sm">{blogImage ? blogImage.name : (currentBlogImageUrl ? "Keep Current Image" : "Upload Cover")}</span>
                  <Camera size={18} />
                  <input type="file" className="hidden" onChange={e => setBlogImage(e.target.files ? e.target.files[0] : null)} />
                </label>

                <textarea placeholder="Write content here..." value={blogContent} onChange={e => setBlogContent(e.target.value)} className="w-full border border-stone-200 p-4 h-[300px] outline-none" required />

                <button className={`w-full py-4 text-white text-xs tracking-[0.3em] uppercase hover:bg-brand-gold transition-all ${editingBlogId ? 'bg-blue-900' : 'bg-brand-maroon'}`}>
                   {editingBlogId ? "Update Editorial" : "Publish Editorial"}
                </button>
              </form>
            </div>

            {/* RIGHT: BLOG LIST */}
            <div className="bg-stone-50 p-8 h-[600px] overflow-y-auto">
              <div className="flex justify-between mb-6">
                <h3 className="text-gray-400 text-xs tracking-widest uppercase">Archive</h3>
                <button onClick={fetchBlogs}><RefreshCw size={14} className="text-gray-400 hover:text-brand-maroon"/></button>
              </div>

              <div className="space-y-4">
                {blogs.map(blog => (
                  <div key={blog.id} className={`bg-white p-4 flex flex-col gap-3 shadow-sm border-l-4 ${blog.is_hidden ? 'border-red-300 opacity-60' : 'border-brand-maroon'}`}>
                    <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 bg-stone-200 overflow-hidden shrink-0">
                            <img src={blog.featured_image} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-brand-maroon text-sm font-medium uppercase line-clamp-1">{blog.title}</h4>
                            <p className="text-[10px] text-gray-400 tracking-widest">{new Date(blog.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-2 justify-end pt-2 border-t border-stone-50">
                        <button onClick={() => handleToggleHideBlog(blog)} className="p-2 text-gray-400 hover:text-brand-maroon" title={blog.is_hidden ? "Unhide" : "Hide"}>
                            {blog.is_hidden ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        <button onClick={() => handleEditBlog(blog)} className="p-2 text-gray-400 hover:text-blue-600"><Edit2 size={16} /></button>
                        <button onClick={() => handleDeleteBlog(blog.id)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        )}

        {/* =======================
          TESTIMONIALS TAB 
        ======================= */}
      {(activeTab as any) === 'testimonials' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-brand-maroon text-2xl font-light mb-8 uppercase">
              {editingTestId ? "Edit Testimonial" : "Add Testimonial"}
            </h3>
            <form onSubmit={handlePublishTestimonial} className="space-y-6">
              <input 
                placeholder="Client Name" 
                value={testName} onChange={e => setTestName(e.target.value)}
                className="w-full border-b border-stone-200 py-3 outline-none" 
                required 
              />
              <textarea 
                placeholder="The client experience..." 
                value={testText} onChange={e => setTestText(e.target.value)}
                className="w-full border border-stone-200 p-4 h-[200px] outline-none text-sm leading-relaxed" 
                required 
              />
              <button className="w-full py-4 bg-brand-maroon text-white text-xs tracking-[0.3em] uppercase hover:bg-brand-gold transition-all">
                {editingTestId ? "Update Testimonial" : "Save Testimonial"}
              </button>
            </form>
          </div>

          <div className="bg-stone-50 p-8 h-[600px] overflow-y-auto">
            <h3 className="text-gray-400 text-xs tracking-widest uppercase mb-6">Live Reviews</h3>
            <div className="space-y-4">
              {testimonials.map(t => (
                <div key={t.id} className="bg-white p-6 shadow-sm border-l-4 border-brand-gold">
                  <p className="text-xs text-gray-500 italic mb-4 line-clamp-3">"{t.text}"</p>
                  <div className="flex justify-between items-center">
                    <h4 className="text-brand-maroon text-[10px] font-bold uppercase">{t.name}</h4>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingTestId(t.id); setTestName(t.name); setTestText(t.text); }} className="text-gray-400 hover:text-blue-500"><Edit2 size={14}/></button>
                      <button onClick={() => handleDeleteTestimonial(t.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={14}/></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      </div>
    </div>
  );
};

export default AdminPortal;