/**
 * App Configuration - Konfigurasi dinamis untuk app.html berdasarkan tenant
 */

import { getCurrentTenantConfig } from './tenant.js';

/**
 * Generate dynamic meta tags berdasarkan tenant config
 * @returns {string} HTML meta tags
 */
export function generateAppMetaTags() {
  const config = getCurrentTenantConfig();
  
  return `
    <!-- Dynamic Meta Tags berdasarkan Tenant -->
    <title>${config.seo.title}</title>
    <meta name="description" content="${config.description}" />
    <meta name="keywords" content="${config.seo.keywords}" />
    <meta name="author" content="${config.seo.author}" />
    <meta name="theme-color" content="${config.seo.themeColor}" />
    
    <!-- Geo Location -->
    <meta name="geo.region" content="${config.location.region}" />
    <meta name="geo.placename" content="${config.location.placename}" />
    <meta name="geo.position" content="${config.location.coordinates}" />
    <meta name="ICBM" content="${config.location.icbm}" />
    
    <!-- Open Graph -->
    <meta property="og:site_name" content="${config.name}" />
    <meta property="og:title" content="${config.seo.title}" />
    <meta property="og:description" content="${config.description}" />
    <meta property="og:url" content="${config.domain}" />
    <meta property="og:image" content="${config.seo.ogImage}" />
    
    <!-- Twitter Card -->
    <meta name="twitter:site" content="${config.seo.twitterSite}" />
    <meta name="twitter:title" content="${config.seo.title}" />
    <meta name="twitter:description" content="${config.description}" />
    <meta name="twitter:image" content="${config.seo.ogImage}" />
  `;
}

/**
 * Update document title berdasarkan tenant
 */
export function updateAppTitle() {
  if (typeof document !== 'undefined') {
    const config = getCurrentTenantConfig();
    document.title = config.seo.title;
  }
}

/**
 * Update semua meta tags berdasarkan tenant
 */
export function updateAppMetaTags() {
  if (typeof document !== 'undefined') {
    const config = getCurrentTenantConfig();
    
    // Update basic meta tags
    updateMetaContent('description', config.description);
    updateMetaContent('keywords', config.seo.keywords);
    updateMetaContent('author', config.seo.author);
    updateMetaContent('theme-color', config.seo.themeColor);
    
    // Update geo tags
    updateMetaContent('geo.region', config.location.region);
    updateMetaContent('geo.placename', config.location.placename);
    updateMetaContent('geo.position', config.location.coordinates);
    updateMetaContent('ICBM', config.location.icbm);
    
    // Update Open Graph
    updateMetaProperty('og:site_name', config.name);
    updateMetaProperty('og:title', config.seo.title);
    updateMetaProperty('og:description', config.description);
    updateMetaProperty('og:url', config.domain);
    updateMetaProperty('og:image', config.seo.ogImage);
    
    // Update Twitter Card
    updateMetaContent('twitter:site', config.seo.twitterSite);
    updateMetaContent('twitter:title', config.seo.title);
    updateMetaContent('twitter:description', config.description);
    updateMetaContent('twitter:image', config.seo.ogImage);
  }
}

/**
 * Helper untuk update meta tag by name
 */
function updateMetaContent(name, content) {
  const meta = document.querySelector(`meta[name="${name}"]`);
  if (meta) {
    meta.setAttribute('content', content);
  }
}

/**
 * Helper untuk update meta tag by property
 */
function updateMetaProperty(property, content) {
  const meta = document.querySelector(`meta[property="${property}"]`);
  if (meta) {
    meta.setAttribute('content', content);
  }
}

/**
 * Initialize app dengan tenant config
 */
export function initializeApp() {
  updateAppTitle();
  updateAppMetaTags();
}

/**
 * Get current tenant info untuk debugging
 */
export function getCurrentTenantInfo() {
  const config = getCurrentTenantConfig();
  return {
    id: config.id,
    name: config.name,
    slug: config.slug,
    domain: config.domain
  };
}
