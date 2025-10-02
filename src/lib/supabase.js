import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if Supabase is configured
let supabase = null;
let isSupabaseConfigured = false;

if (supabaseUrl && supabaseAnonKey) {
  try {
    // Optimized Supabase client configuration untuk performance tanpa cache
    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false, // No session caching
        autoRefreshToken: false // No token refresh caching
      },
      global: {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate', // No caching headers
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      },
      db: {
        schema: 'public'
      }
    });
    isSupabaseConfigured = true;
    console.log('✅ Supabase client initialized successfully (NO CACHE MODE)');
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
