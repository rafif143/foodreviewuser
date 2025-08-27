import { supabase } from '$lib/supabase.js';

export async function load({ params, parent, url }) {
  const { slug } = params;
  const { website } = await parent();
  const searchQuery = url.searchParams.get('q') || '';
  
  try {
    let articles = [];
    
    if (searchQuery.trim()) {
      // Search berdasarkan title, summary, atau content
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('website_id', website.id)
        .or(`title.ilike.%${searchQuery}%,summary.ilike.%${searchQuery}%`)
        .order('published_at', { ascending: false });
      
      if (error) {
        console.error('Error searching articles:', error);
      } else {
        articles = data || [];
      }
    }
    
    return {
      articles,
      searchQuery,
      websiteSlug: slug,
      totalResults: articles.length
    };
  } catch (error) {
    console.error('Error in search page load:', error);
    return {
      articles: [],
      searchQuery,
      websiteSlug: slug,
      totalResults: 0
    };
  }
}
