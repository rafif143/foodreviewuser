import { getWebsiteBySlug } from '$lib/tenant.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
  try {
    const website = await getWebsiteBySlug(params.slug);
    
    if (!website) {
      throw error(404, 'Website not found');
    }

    // Jika website memiliki logo_url, redirect ke logo tersebut
    if (website.logo_url) {
      return new Response(null, {
        status: 302,
        headers: {
          'Location': website.logo_url,
          'Cache-Control': 'public, max-age=86400' // Cache 24 jam
        }
      });
    }

    // Jika tidak ada logo_url, serve default favicon sebagai apple-touch-icon
    const defaultFaviconPath = '/favicon.svg';
    return new Response(null, {
      status: 302,
      headers: {
        'Location': defaultFaviconPath,
        'Cache-Control': 'public, max-age=86400'
      }
    });

  } catch (err) {
    console.error('Error serving apple-touch-icon:', err);
    
    // Fallback ke default favicon
    const defaultFaviconPath = '/favicon.svg';
    return new Response(null, {
      status: 302,
      headers: {
        'Location': defaultFaviconPath,
        'Cache-Control': 'public, max-age=3600'
      }
    });
  }
}
