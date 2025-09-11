// Sitemap Index API endpoint
import { generateSitemapIndex } from '$lib/sitemap-generator.js';

export async function GET() {
  try {
    // Generate sitemap index for all websites
    const websiteIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]; // All website IDs
    const sitemapIndex = generateSitemapIndex(websiteIds);
    
    return new Response(sitemapIndex, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        'X-Robots-Tag': 'index, follow'
      }
    });
  } catch (error) {
    console.error('Sitemap index generation error:', error);
    return new Response('Internal Server Error', { 
      status: 500,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }
}
