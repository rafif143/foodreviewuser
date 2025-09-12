import { json } from '@sveltejs/kit';
import { getAllWebsites } from '$lib/tenant.js';
import { getWebsiteDomain } from '$lib/website-seo-data.js';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  try {
    // Ambil semua website dari database
    const websites = await getAllWebsites();

    // Generate global robots.txt
    const robotsTxt = generateGlobalRobotsTxt(websites);

    return new Response(robotsTxt, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
      }
    });

  } catch (error) {
    console.error('Error generating global robots.txt:', error);
    return new Response('Error generating robots.txt', { status: 500 });
  }
}

/**
 * Generate global robots.txt content
 * @param {Array} websites - Array of websites
 * @returns {string} - robots.txt content
 */
function generateGlobalRobotsTxt(websites) {
  let robotsTxt = `User-agent: *
Allow: /

       # Production Website - MakanKedah
       Host: https://makankedah.com

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /_app/

       # Main sitemap index - PRODUCTION MODE
       Sitemap: https://makankedah.com/sitemap.xml

`;

  // Tambahkan sitemap untuk setiap website
  websites.forEach(website => {
    const domain = getWebsiteDomain(website.slug);
    robotsTxt += `Sitemap: https://${domain}/sitemap.xml\n`;
  });

  robotsTxt += `
# Crawl delay
Crawl-delay: 1`;

  return robotsTxt;
}
