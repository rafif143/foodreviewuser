import { supabase } from '$lib/supabase.js';
import { getCommentsByArticle } from '$lib/comments';

/** @type {import('./$types').PageLoad} */
export async function load({ params, parent }) {
  const { website } = await parent();
  const websiteSlug = params.slug;
  const articleSlug = params.articleSlug;
  
  try {
    // Ambil artikel berdasarkan slug
    const { data: articles, error } = await supabase
      .from('articles')
      .select('*')
      .eq('website_id', website.id)
      .eq('slug', articleSlug)
      .single();

    if (error || !articles) {
      return {
        status: 404,
        error: new Error('Artikel tidak ditemukan')
      };
    }

    const article = articles;
    
    // Ambil artikel terkait berdasarkan kategori
    const { data: relatedArticles, error: relatedError } = await supabase
      .from('articles')
      .select('*')
      .eq('website_id', website.id)
      .eq('category', article.category)
      .neq('id', article.id)
      .order('published_at', { ascending: false })
      .limit(6);

    // Ambil komentar artikel
    const comments = await getCommentsByArticle(article.id);
    
    // Ambil artikel trending untuk sidebar
    const { data: trendingArticles, error: trendingError } = await supabase
      .from('articles')
      .select('*')
      .eq('website_id', website.id)
      .order('visit_count', { ascending: false })
      .limit(5);

    return {
      article,
      relatedArticles: relatedArticles || [],
      comments,
      trendingArticles: trendingArticles || []
    };
  } catch (error) {
    console.error('Error loading article:', error);
    return {
      status: 500,
      error: new Error('Terjadi kesalahan saat memuat artikel')
    };
  }
}
