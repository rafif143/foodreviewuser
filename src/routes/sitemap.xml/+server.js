import { json } from '@sveltejs/kit';
import { getAllWebsites } from '$lib/tenant.js';
import { getWebsiteDomain } from '$lib/website-seo-data.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  try {
    // Ambil semua website dari database
    const websites = await getAllWebsites();

    // Generate sitemap index XML
    const sitemapIndex = generateSitemapIndexXML(websites);

    return new Response(sitemapIndex, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    });

  } catch (error) {
    console.error('Error generating sitemap index:', error);
    return new Response('Error generating sitemap index', { status: 500 });
  }
}

/**
 * Generate XML sitemap index
 * @param {Array} websites - Array of websites
 * @returns {string} - XML sitemap index
 */
function generateSitemapIndexXML(websites) {
  const currentDate = new Date().toISOString();
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  websites.forEach(website => {
    const domain = getWebsiteDomain(website.slug);
    const sitemapUrl = `https://${domain}/sitemap.xml`;
    
    xml += `
  <sitemap>
    <loc>${sitemapUrl}</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>`;
  });

  xml += `
</sitemapindex>`;

  return xml;
}
