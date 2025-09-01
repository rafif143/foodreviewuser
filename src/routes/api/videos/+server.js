// src/routes/api/videos/+server.js
// Atau sesuai dengan struktur routing Svelte Anda

import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabase.js';

export async function GET({ url }) {
  try {
    const websiteId = url.searchParams.get('website_id');
    
    if (!websiteId) {
      return json({ error: 'website_id is required' }, { status: 400 });
    }

    

    // Query langsung ke Supabase
    const { data: videos, error } = await supabase
      .from('videos')
      .select('*')
      .eq('website_id', parseInt(websiteId))
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return json({ error: 'Database error', details: error }, { status: 500 });
    }

    

    return json({ 
      success: true, 
      videos: videos || [],
      total: videos?.length || 0
    });

  } catch (error) {
    console.error('API error:', error);
    return json({ 
      error: 'Server error', 
      details: error.message 
    }, { status: 500 });
  }
}