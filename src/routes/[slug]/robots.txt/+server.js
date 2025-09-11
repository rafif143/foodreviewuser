import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabase.js';
import { getWebsiteDomain } from '$lib/website-seo-data.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
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

    // Generate robots.txt
    const domain = getWebsiteDomain(website.slug);
    const robotsTxt = generateRobotsTxt(domain, website);

    return new Response(robotsTxt, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
      }
    });

  } catch (error) {
    console.error('Error generating robots.txt:', error);
    return new Response('Error generating robots.txt', { status: 500 });
  }
}

/**
 * Generate robots.txt content
 * @param {string} domain - Website domain
 * @param {Object} website - Website data
 * @returns {string} - robots.txt content
 */
function generateRobotsTxt(domain, website) {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: https://${domain}/sitemap.xml

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /_app/
Disallow: /search?*

# Allow important pages
Allow: /food
Allow: /cafe
Allow: /recipe
Allow: /events
Allow: /things-to-do
Allow: /about
Allow: /contact
Allow: /advertise

# Crawl delay (optional)
Crawl-delay: 1

# Host directive
Host: https://${domain}`;
}
