// API Endpoint untuk Ads Content (untuk External Admin)
import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  const websiteId = url.searchParams.get('website_id');
  const adType = url.searchParams.get('ad_type');
  const position = url.searchParams.get('position');
  
  if (!websiteId) {
    return json({ error: 'website_id is required' }, { status: 400 });
  }
  
  try {
    let query = supabase
      .from('ads_content')
      .select('*')
      .eq('website_id', websiteId);
    
    if (adType) {
      query = query.eq('ad_type', adType);
    }
    
    if (position) {
      query = query.eq('position', position);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
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
    const { website_id, ad_type, position, ad_code, is_active = true, display_conditions = {} } = body;
    
    if (!website_id || !ad_type || !position) {
      return json({ error: 'website_id, ad_type, and position are required' }, { status: 400 });
    }
    
    const { data, error } = await supabase
      .from('ads_content')
      .insert([{
        website_id,
        ad_type,
        position,
        ad_code,
        is_active,
        display_conditions
      }])
      .select()
      .single();
    
    if (error) {
      return json({ error: error.message }, { status: 500 });
    }
    
    return json({ data, message: 'Ads content created successfully' });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request }) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    
    if (!id) {
      return json({ error: 'id is required' }, { status: 400 });
    }
    
    const { data, error } = await supabase
      .from('ads_content')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      return json({ error: error.message }, { status: 500 });
    }
    
    return json({ data, message: 'Ads content updated successfully' });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ url }) {
  const id = url.searchParams.get('id');
  
  if (!id) {
    return json({ error: 'id is required' }, { status: 400 });
  }
  
  try {
    const { error } = await supabase
      .from('ads_content')
      .delete()
      .eq('id', id);
    
    if (error) {
      return json({ error: error.message }, { status: 500 });
    }
    
    return json({ message: 'Ads content deleted successfully' });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}
