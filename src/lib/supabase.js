import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if Supabase is configured
let supabase = null;
let isSupabaseConfigured = false;

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    isSupabaseConfigured = true;
    console.log('✅ Supabase client initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize Supabase client:', error);
    isSupabaseConfigured = false;
  }
} else {
  console.warn('⚠️ Supabase environment variables not found. Please check your .env file.');
  console.warn('📝 Create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  isSupabaseConfigured = false;
}

export { supabase, isSupabaseConfigured }
