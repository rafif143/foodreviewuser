// Script untuk generate sitemap.xml otomatis dari database
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Supabase configuration
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are set
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase environment variables not set!');
  console.error('Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Website configuration
const WEBSITE_CONFIG = {
  domain: 'https://foodreviewuser.netlify.app',
  websiteId: 1, // Kelantan
  name: 'Kelantan Food Review'
};

// Generate sitemap XML
async function generateSitemap() {
  try {
    console.log('🚀 Generating sitemap for', WEBSITE_CONFIG.name);
    
    // Get articles from database
    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .select('slug, updated_at, category')
      .eq('website_id', WEBSITE_CONFIG.websiteId)
      .eq('is_published', true)
      .order('updated_at', { ascending: false });
    
    if (articlesError) {
      console.error('❌ Error fetching articles:', articlesError);
      return;
    }
    
    // Get restaurants from database (jika ada table restaurants)
    const { data: restaurants, error: restaurantsError } = await supabase
      .from('restaurants')
      .select('slug, updated_at')
      .eq('website_id', WEBSITE_CONFIG.websiteId)
      .eq('is_active', true);
    
    if (restaurantsError) {
      console.log('⚠️ No restaurants table found, skipping...');
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
      const lastmod = new Date().toISOString();
      sitemap += `
  <url>
    <loc>${WEBSITE_CONFIG.domain}${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    });
    
    // Add articles
    if (articles && articles.length > 0) {
      console.log(`📝 Adding ${articles.length} articles to sitemap`);
      articles.forEach(article => {
        const lastmod = article.updated_at ? new Date(article.updated_at).toISOString() : new Date().toISOString();
        sitemap += `
  <url>
    <loc>${WEBSITE_CONFIG.domain}/article/${article.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
      });
    }
    
    // Add restaurants
    if (restaurants && restaurants.length > 0) {
      console.log(`🍽️ Adding ${restaurants.length} restaurants to sitemap`);
      restaurants.forEach(restaurant => {
        const lastmod = restaurant.updated_at ? new Date(restaurant.updated_at).toISOString() : new Date().toISOString();
        sitemap += `
  <url>
    <loc>${WEBSITE_CONFIG.domain}/restaurant/${restaurant.slug}</loc>
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
    <loc>${WEBSITE_CONFIG.domain}/${category}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
    });
    
    // Add tag pages (jika ada tags di database)
    const { data: tags, error: tagsError } = await supabase
      .from('tags')
      .select('slug')
      .eq('website_id', WEBSITE_CONFIG.websiteId)
      .limit(20); // Limit untuk menghindari sitemap terlalu besar
    
    if (tags && tags.length > 0) {
      console.log(`🏷️ Adding ${tags.length} tag pages to sitemap`);
      tags.forEach(tag => {
        sitemap += `
  <url>
    <loc>${WEBSITE_CONFIG.domain}/tag/${tag.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
      });
    }
    
    sitemap += `
</urlset>`;
    
    // Save sitemap to file
    const sitemapPath = path.join(process.cwd(), 'static', 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemap);
    
    console.log('✅ Sitemap generated successfully!');
    console.log(`📁 Saved to: ${sitemapPath}`);
    console.log(`🌐 URL: ${WEBSITE_CONFIG.domain}/sitemap.xml`);
    
    // Statistics
    const totalUrls = staticPages.length + 
                     (articles ? articles.length : 0) + 
                     (restaurants ? restaurants.length : 0) + 
                     categories.length + 
                     (tags ? tags.length : 0);
    
    console.log(`📊 Total URLs: ${totalUrls}`);
    console.log(`📝 Articles: ${articles ? articles.length : 0}`);
    console.log(`🍽️ Restaurants: ${restaurants ? restaurants.length : 0}`);
    console.log(`🏷️ Tags: ${tags ? tags.length : 0}`);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
  }
}

// Run the script
generateSitemap();
