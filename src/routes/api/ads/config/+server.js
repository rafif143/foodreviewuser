// API Endpoint untuk Ads Configuration (untuk External Admin)
import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  const websiteId = url.searchParams.get('website_id');
  
  if (!websiteId) {
    return json({ error: 'website_id is required' }, { status: 400 });
  }
  
  try {
    const { data, error } = await supabase
      .from('website_ads_config')
      .select('*')
      .eq('website_id', websiteId)
      .single();
    
    if (error) {
      return json({ error: error.message }, { status: 500 });
    }
    
    return json({ data });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  try {
    const body = await request.json();
    const { website_id, ...config } = body;
    
    if (!website_id) {
      return json({ error: 'website_id is required' }, { status: 400 });
    }
    
    const { data, error } = await supabase
      .from('website_ads_config')
      .upsert({
        website_id,
        ...config,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) {
      return json({ error: error.message }, { status: 500 });
    }
    
    return json({ data, message: 'Ads configuration updated successfully' });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}
