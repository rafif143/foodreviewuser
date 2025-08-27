import { supabase } from '$lib/supabase.js';

export async function load({ params, parent }) {
  const { slug, tag } = params;
  const { website } = await parent();
  
  try {
    // Ambil artikel berdasarkan tag
    const { data: articles, error } = await supabase
      .from('articles')
      .select('*')
      .eq('website_id', website.id)
      .filter('tags', 'cs', `{${tag}}`)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching articles by tag:', error);
      return {
        articles: [],
        tag: tag,
        websiteSlug: slug
      };
    }

    return {
      articles: articles || [],
      tag: tag,
      websiteSlug: slug
    };
  } catch (error) {
    console.error('Error in tag page load:', error);
    return {
      articles: [],
      tag: tag,
      websiteSlug: slug
    };
  }
}
