import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabase.js';
import { generateCanonicalUrl } from '$lib/seo.js';
import { getWebsiteDomain } from '$lib/website-seo-data.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, url }) {
  const websiteSlug = params.slug;
  
  try {
    // Ambil data website dari database
    const { data: website, error: websiteError } = await supabase
      .from('websites')
      .select('*')
      .eq('slug', websiteSlug)
      .single();

    if (websiteError || !website) {
      return new Response('Website not found', { status: 404 });
    }

    // Ambil semua artikel yang sudah dipublish
    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .select('slug, published_at, updated_at')
      .eq('website_id', website.id)
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (articlesError) {
      console.error('Error fetching articles for sitemap:', articlesError);
      return new Response('Error generating sitemap', { status: 500 });
    }

    // Generate sitemap XML
    const domain = getWebsiteDomain(website.slug);
    const baseUrl = `https://${domain}`;
    
    const sitemap = generateSitemapXML(baseUrl, articles || [], website);

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    });

  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}

/**
 * Generate XML sitemap
 * @param {string} baseUrl - Base URL website
 * @param {Array} articles - Array of articles
 * @param {Object} website - Website data
 * @returns {string} - XML sitemap
 */
function generateSitemapXML(baseUrl, articles, website) {
  const currentDate = new Date().toISOString();
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Category Pages -->
  <url>
    <loc>${baseUrl}/food</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/cafe</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/recipe</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/events</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/things-to-do</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Static Pages -->
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/advertise</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`;

  // Tambahkan artikel
  articles.forEach(article => {
    const articleUrl = `${baseUrl}/article/${article.slug}`;
    const lastmod = article.updated_at || article.published_at || currentDate;
    
    xml += `
  <url>
    <loc>${articleUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  xml += `
</urlset>`;

  return xml;
}
