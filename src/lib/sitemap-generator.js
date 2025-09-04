// Sitemap Generator untuk Multi-tenant SEO
import { getSEOConfig } from '$lib/seo-config.js';

// Generate sitemap untuk website tertentu
export async function generateSitemap(websiteId, supabase) {
  const config = getSEOConfig(websiteId);
  const baseUrl = `https://${config.domain}`;
  
  try {
    // Get articles dari database
    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .select('slug, updated_at, category')
      .eq('website_id', websiteId)
      .eq('is_published', true);
    
    if (articlesError) {
      console.error('Error fetching articles:', articlesError);
    }
    
    // Get restaurants dari database (jika ada table restaurants)
    const { data: restaurants, error: restaurantsError } = await supabase
      .from('restaurants')
      .select('slug, updated_at')
      .eq('website_id', websiteId)
      .eq('is_active', true);
    
    if (restaurantsError) {
      console.error('Error fetching restaurants:', restaurantsError);
    }
    
    // Static pages
    const staticPages = [
      { url: '', priority: '1.0', changefreq: 'daily' },
      { url: '/about', priority: '0.8', changefreq: 'monthly' },
      { url: '/contact', priority: '0.8', changefreq: 'monthly' },
      { url: '/advertise', priority: '0.7', changefreq: 'monthly' },
      { url: '/food', priority: '0.9', changefreq: 'weekly' },
      { url: '/cafe', priority: '0.9', changefreq: 'weekly' },
      { url: '/events', priority: '0.8', changefreq: 'weekly' },
      { url: '/recipe', priority: '0.8', changefreq: 'weekly' },
      { url: '/things-to-do', priority: '0.8', changefreq: 'weekly' },
      { url: '/search', priority: '0.6', changefreq: 'monthly' }
    ];
    
    // Generate sitemap XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    
    // Add static pages
    staticPages.forEach(page => {
      sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    });
    
    // Add articles
    if (articles) {
      articles.forEach(article => {
        const lastmod = article.updated_at ? new Date(article.updated_at).toISOString() : new Date().toISOString();
        sitemap += `
  <url>
    <loc>${baseUrl}/article/${article.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
      });
    }
    
    // Add restaurants
    if (restaurants) {
      restaurants.forEach(restaurant => {
        const lastmod = restaurant.updated_at ? new Date(restaurant.updated_at).toISOString() : new Date().toISOString();
        sitemap += `
  <url>
    <loc>${baseUrl}/restaurant/${restaurant.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
      });
    }
    
    // Add category pages
    const categories = ['food', 'cafe', 'events', 'recipe', 'things-to-do'];
    categories.forEach(category => {
      sitemap += `
  <url>
    <loc>${baseUrl}/${category}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
    });
    
    sitemap += `
</urlset>`;
    
    return sitemap;
    
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return null;
  }
}

// Generate sitemap index untuk semua website
export function generateSitemapIndex(websiteIds) {
  let sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  
  websiteIds.forEach(websiteId => {
    const config = getSEOConfig(websiteId);
    sitemapIndex += `
  <sitemap>
    <loc>https://${config.domain}/sitemap.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`;
  });
  
  sitemapIndex += `
</sitemapindex>`;
  
  return sitemapIndex;
}

// Generate robots.txt
export function generateRobotsTxt(websiteId) {
  const config = getSEOConfig(websiteId);
  
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: https://${config.domain}/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /_app/

# Allow important pages
Allow: /food/
Allow: /cafe/
Allow: /article/
Allow: /restaurant/
Allow: /events/
Allow: /recipe/
Allow: /things-to-do/

# Crawl delay
Crawl-delay: 1`;
}

// Generate sitemap untuk semua website
export async function generateAllSitemaps(supabase) {
  const websiteIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const results = [];
  
  for (const websiteId of websiteIds) {
    try {
      const sitemap = await generateSitemap(websiteId, supabase);
      if (sitemap) {
        results.push({
          websiteId,
          sitemap,
          robots: generateRobotsTxt(websiteId)
        });
      }
    } catch (error) {
      console.error(`Error generating sitemap for website ${websiteId}:`, error);
    }
  }
  
  return results;
}

// Save sitemap to file system
export async function saveSitemapToFile(websiteId, sitemap, robots) {
  const config = getSEOConfig(websiteId);
  const fs = await import('fs');
  const path = await import('path');
  
  try {
    // Create sitemaps directory if it doesn't exist
    const sitemapsDir = path.join(process.cwd(), 'static', 'sitemaps');
    if (!fs.existsSync(sitemapsDir)) {
      fs.mkdirSync(sitemapsDir, { recursive: true });
    }
    
    // Save sitemap
    const sitemapPath = path.join(sitemapsDir, `${config.slug}-sitemap.xml`);
    fs.writeFileSync(sitemapPath, sitemap);
    
    // Save robots.txt
    const robotsPath = path.join(process.cwd(), 'static', 'robots.txt');
    fs.writeFileSync(robotsPath, robots);
    
    console.log(`Sitemap saved for ${config.name}: ${sitemapPath}`);
    return true;
  } catch (error) {
    console.error(`Error saving sitemap for ${config.name}:`, error);
    return false;
  }
}

// API endpoint untuk generate sitemap
export async function generateSitemapAPI(websiteId, supabase) {
  try {
    const sitemap = await generateSitemap(websiteId, supabase);
    const robots = generateRobotsTxt(websiteId);
    
    if (sitemap) {
      return {
        success: true,
        sitemap,
        robots,
        websiteId
      };
    } else {
      return {
        success: false,
        error: 'Failed to generate sitemap'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}
