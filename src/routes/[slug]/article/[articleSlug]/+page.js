import { supabase } from '$lib/supabase.js';
import { getCommentsByArticle } from '$lib/comments';
import { error } from '@sveltejs/kit';
import { 
  generateCanonicalUrl, 
  generateArticleTitle, 
  generateArticleDescription, 
  generateArticleKeywords,
  generateArticleOpenGraph,
  generateArticleTwitterCard,
  generateArticleStructuredData,
  generateRobotsMeta
} from '$lib/seo.js';

/** @type {import('./$types').PageLoad} */
export async function load({ params, parent }) {
  const { website } = await parent();
  const websiteSlug = params.slug;
  const articleSlug = params.articleSlug;
  
  try {
    // Cari artikel berdasarkan slug utama
    let { data: article, error } = await supabase
      .from('articles')
      .select('*')
      .eq('website_id', website.id)
      .eq('slug', articleSlug)
      .single();

    // Jika tidak ditemukan dengan slug utama, coba cari dengan slug alternatif
    if (error || !article) {
      // Hanya log jika bukan request yang sering terjadi
      if (!articleSlug.includes('favicon') && !articleSlug.includes('robots')) {
        console.warn(`Article not found with main slug "${articleSlug}", trying alternative search...`);
      }
      
      // Coba cari dengan slug yang mengandung artikel slug
      const { data: alternativeArticles, error: altError } = await supabase
        .from('articles')
        .select('*')
        .eq('website_id', website.id)
        .ilike('slug', `%${articleSlug}%`)
        .limit(1);

      if (altError || !alternativeArticles || alternativeArticles.length === 0) {
        // Coba cari berdasarkan ID jika slug adalah angka
        if (!isNaN(articleSlug)) {
          const { data: articleById, error: idError } = await supabase
            .from('articles')
            .select('*')
            .eq('website_id', website.id)
            .eq('id', parseInt(articleSlug))
            .single();

          if (!idError && articleById) {
            article = articleById;
          }
        }
        
        // Jika masih tidak ditemukan, coba cari berdasarkan title yang mengandung slug
        if (!article) {
          const { data: articlesByTitle, error: titleError } = await supabase
            .from('articles')
            .select('*')
            .eq('website_id', website.id)
            .ilike('title', `%${articleSlug.replace(/-/g, ' ')}%`)
            .limit(1);

          if (!titleError && articlesByTitle && articlesByTitle.length > 0) {
            article = articlesByTitle[0];
          }
        }
      } else {
        article = alternativeArticles[0];
      }
    }

    // Jika masih tidak ditemukan, throw 404 error
    if (!article) {
      console.error(`Article not found with slug "${articleSlug}" for website ${website.id}`);
      throw error(404, {
        message: 'Artikel tidak ditemukan',
        slug: articleSlug,
        website: website.slug
      });
    }
    
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

    // Generate SEO data
    const canonicalUrl = generateCanonicalUrl(website, `article/${article.slug}`);
    const seoData = {
      title: generateArticleTitle(article, website),
      description: generateArticleDescription(article, website),
      keywords: generateArticleKeywords(article, website),
      canonical: canonicalUrl,
      robots: generateRobotsMeta(article.is_published, true),
      openGraph: generateArticleOpenGraph(article, website, canonicalUrl),
      twitterCard: generateArticleTwitterCard(article, website, canonicalUrl),
      structuredData: generateArticleStructuredData(article, website, canonicalUrl)
    };

    return {
      article,
      relatedArticles: relatedArticles || [],
      comments,
      trendingArticles: trendingArticles || [],
      website, // Pastikan website data tersedia
      seo: seoData
    };
  } catch (err) {
    console.error('Error loading article:', err);
    // Jika ini adalah error 404 yang sudah di-throw, re-throw
    if (err.status === 404) {
      throw err;
    }
    // Untuk error lainnya, throw 500
    throw error(500, {
      message: 'Terjadi kesalahan saat memuat artikel',
      details: err.message
    });
  }
}
