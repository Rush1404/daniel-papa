import { createClient } from '@supabase/supabase-js';

// Create it OUTSIDE of any function or component
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);