import { supabase } from '$lib/supabase.js';
import { 
  generateCanonicalUrl, 
  generateWebsiteTitle, 
  generateRobotsMeta
} from '$lib/seo.js';

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

    // Generate SEO data untuk halaman tag
    const canonicalUrl = generateCanonicalUrl(website, `tag/${tag}`);
    const formattedTag = tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, ' ');
    const seoData = {
      title: generateWebsiteTitle(website, `Artikel dengan Tag: ${formattedTag}`),
      description: `Temukan artikel tentang ${formattedTag} di ${website.name}. Koleksi artikel terbaik dengan tag ${formattedTag} untuk panduan kuliner Anda.`,
      keywords: `${formattedTag}, ${website.name.toLowerCase()}, makanan, kuliner, artikel`,
      canonical: canonicalUrl,
      robots: generateRobotsMeta(true, true)
    };

    return {
      articles: articles || [],
      tag: tag,
      websiteSlug: slug,
      seo: seoData
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
