// Sitemap API endpoint
import { generateSitemap } from '$lib/sitemap-generator.js';
import { supabase } from '$lib/supabase.js';

export async function GET({ url }) {
  try {
    // Get website ID from query parameter or default to 1 (Kelantan)
    const websiteId = parseInt(url.searchParams.get('website_id')) || 1;
    
    // Generate sitemap
    const sitemap = await generateSitemap(websiteId, supabase);
    
    if (sitemap) {
      return new Response(sitemap, {
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
          'X-Robots-Tag': 'index, follow'
        }
      });
    } else {
      return new Response('Error generating sitemap', { 
        status: 500,
        headers: {
          'Content-Type': 'text/plain'
        }
      });
    }
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return new Response('Internal Server Error', { 
      status: 500,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }
}
