// Robots.txt API endpoint
import { generateRobotsTxt } from '$lib/sitemap-generator.js';

export async function GET({ url }) {
  try {
    // Get website ID from query parameter or default to 1 (Kelantan)
    const websiteId = parseInt(url.searchParams.get('website_id')) || 1;
    
    // Generate robots.txt
    const robotsTxt = generateRobotsTxt(websiteId);
    
    return new Response(robotsTxt, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
      }
    });
  } catch (error) {
    console.error('Robots.txt generation error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
