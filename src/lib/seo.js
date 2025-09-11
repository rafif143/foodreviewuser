/**
 * SEO Utility untuk Multi-tenant Food Blog
 * Mengelola meta tags, structured data, dan SEO dinamis berdasarkan data database
 */

import { getWebsiteSEOData, getWebsiteDomain } from '$lib/website-seo-data.js';

// Mapping domain untuk setiap website (deprecated - gunakan getWebsiteDomain)
export const WEBSITE_DOMAINS = {
  'kelantan': 'makankelantan.com',
  'kedah': 'makankedah.com', 
  'penang': 'makanpenang.com',
  'perak': 'makanperak.com',
  'perlis': 'makanperlis.com',
  'terengganu': 'makanterengganu.com',
  'pahang': 'makanpahang.com',
  'kualalumpur': 'makankualalumpur.com',
  'selangor': 'makanselangor.com',
  'johor': 'makanjohor.com',
  'melaka': 'makanmelaka.com',
  'negerisembilan': 'makannegerisembilan.com',
  'sabah': 'makansabah.com',
  'sarawak': 'makansarawak.com'
};

/**
 * Generate canonical URL untuk halaman
 * @param {Object} website - Data website
 * @param {string} path - Path halaman (tanpa slug website)
 * @param {boolean} https - Gunakan HTTPS (default: true)
 * @returns {string} - Canonical URL lengkap
 */
export function generateCanonicalUrl(website, path = '', https = true) {
  const protocol = https ? 'https://' : 'http://';
  const domain = getWebsiteDomain(website.slug);
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  const fullPath = cleanPath ? `/${cleanPath}` : '';
  
  return `${protocol}${domain}${fullPath}`;
}

/**
 * Generate meta title untuk halaman artikel
 * @param {Object} article - Data artikel
 * @param {Object} website - Data website
 * @returns {string} - Meta title
 */
export function generateArticleTitle(article, website) {
  if (!article || !website) return 'Artikel Tidak Ditemukan';
  
  return `${article.title} | ${website.name}`;
}

/**
 * Generate meta description untuk halaman artikel
 * @param {Object} article - Data artikel
 * @param {Object} website - Data website
 * @returns {string} - Meta description
 */
export function generateArticleDescription(article, website) {
  if (!article) return 'Artikel tidak ditemukan';
  
  // Gunakan summary jika ada, jika tidak gunakan excerpt dari content
  let description = article.summary || '';
  
  if (!description && article.content) {
    // Extract text dari content JSON
    description = extractTextFromContent(article.content);
  }
  
  // Fallback ke title jika tidak ada description
  if (!description) {
    description = article.title;
  }
  
  // Truncate ke 160 karakter untuk optimal SEO
  if (description.length > 160) {
    description = description.substring(0, 157) + '...';
  }
  
  return description;
}

/**
 * Generate meta title untuk halaman website
 * @param {Object} website - Data website
 * @param {string} pageTitle - Judul halaman spesifik
 * @returns {string} - Meta title
 */
export function generateWebsiteTitle(website, pageTitle = '') {
  if (!website) return 'Website Tidak Ditemukan';
  
  const seoData = getWebsiteSEOData(website.slug);
  const siteName = seoData.name || website.name;
  
  if (pageTitle) {
    return `${pageTitle} | ${siteName}`;
  }
  
  return `${siteName} - ${seoData.description || website.description || 'Panduan Kuliner Terbaik'}`;
}

/**
 * Generate meta description untuk halaman website
 * @param {Object} website - Data website
 * @param {string} pageDescription - Deskripsi halaman spesifik
 * @returns {string} - Meta description
 */
export function generateWebsiteDescription(website, pageDescription = '') {
  if (!website) return 'Website tidak ditemukan';
  
  if (pageDescription) {
    return pageDescription;
  }
  
  const seoData = getWebsiteSEOData(website.slug);
  return seoData.description || website.description || `Temukan tempat makan terbaik, resep autentik, dan panduan kuliner di ${website.name}. Update terbaru tentang makanan lokal dan rekomendasi terbaik.`;
}

/**
 * Extract text dari content JSON untuk meta description
 * @param {Object|string} content - Content dari database
 * @returns {string} - Text yang diekstrak
 */
function extractTextFromContent(content) {
  try {
    let parsedContent = content;
    
    if (typeof content === 'string') {
      parsedContent = JSON.parse(content);
    }
    
    if (!parsedContent || typeof parsedContent !== 'object') {
      return '';
    }
    
    // Handle TipTap editor content
    if (parsedContent.type === 'doc' && parsedContent.content) {
      return extractTextFromTipTap(parsedContent);
    }
    
    // Handle block content
    if (Array.isArray(parsedContent)) {
      return extractTextFromBlocks(parsedContent);
    }
    
    return '';
  } catch (error) {
    console.warn('Error extracting text from content:', error);
    return '';
  }
}

/**
 * Extract text dari TipTap content
 * @param {Object} content - TipTap content object
 * @returns {string} - Text yang diekstrak
 */
function extractTextFromTipTap(content) {
  if (!content.content || !Array.isArray(content.content)) {
    return '';
  }
  
  let text = '';
  
  function traverse(node) {
    if (node.type === 'text' && node.text) {
      text += node.text + ' ';
    }
    
    if (node.content && Array.isArray(node.content)) {
      node.content.forEach(traverse);
    }
  }
  
  content.content.forEach(traverse);
  
  return text.trim();
}

/**
 * Extract text dari block content
 * @param {Array} blocks - Array of content blocks
 * @returns {string} - Text yang diekstrak
 */
function extractTextFromBlocks(blocks) {
  let text = '';
  
  blocks.forEach(block => {
    if (block.type === 'paragraph' && block.data && block.data.text) {
      text += block.data.text + ' ';
    }
  });
  
  return text.trim();
}

/**
 * Generate keywords untuk artikel
 * @param {Object} article - Data artikel
 * @param {Object} website - Data website
 * @returns {string} - Keywords untuk meta tag
 */
export function generateArticleKeywords(article, website) {
  if (!article) return '';
  
  const keywords = new Set();
  
  // Tambahkan kategori
  if (article.category) {
    keywords.add(article.category);
  }
  
  // Tambahkan tags
  if (article.tags && Array.isArray(article.tags)) {
    article.tags.forEach(tag => keywords.add(tag));
  }
  
  // Tambahkan labels
  if (article.labels && Array.isArray(article.labels)) {
    article.labels.forEach(label => keywords.add(label));
  }
  
  // Tambahkan kata kunci dari title
  if (article.title) {
    const titleWords = article.title.toLowerCase().split(/\s+/);
    titleWords.forEach(word => {
      if (word.length > 3) {
        keywords.add(word);
      }
    });
  }
  
  // Tambahkan nama website sebagai keyword
  if (website && website.name) {
    keywords.add(website.name.toLowerCase());
  }
  
  return Array.from(keywords).slice(0, 10).join(', ');
}

/**
 * Generate Open Graph data untuk artikel
 * @param {Object} article - Data artikel
 * @param {Object} website - Data website
 * @param {string} canonicalUrl - Canonical URL
 * @returns {Object} - Open Graph data
 */
export function generateArticleOpenGraph(article, website, canonicalUrl) {
  if (!article || !website) {
    return {};
  }
  
  const ogImage = article.main_image || article.thumbnail_image || 
    'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1200&h=630&fit=crop';
  
  return {
    'og:title': generateArticleTitle(article, website),
    'og:description': generateArticleDescription(article, website),
    'og:image': ogImage,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:url': canonicalUrl,
    'og:type': 'article',
    'og:site_name': website.name,
    'article:author': article.author,
    'article:published_time': article.published_at,
    'article:modified_time': article.updated_at,
    'article:section': article.category,
    'article:tag': article.tags ? article.tags.join(', ') : ''
  };
}

/**
 * Generate Twitter Card data untuk artikel
 * @param {Object} article - Data artikel
 * @param {Object} website - Data website
 * @param {string} canonicalUrl - Canonical URL
 * @returns {Object} - Twitter Card data
 */
export function generateArticleTwitterCard(article, website, canonicalUrl) {
  if (!article || !website) {
    return {};
  }
  
  const cardImage = article.main_image || article.thumbnail_image || 
    'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1200&h=630&fit=crop';
  
  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': generateArticleTitle(article, website),
    'twitter:description': generateArticleDescription(article, website),
    'twitter:image': cardImage,
    'twitter:site': '@' + website.name.toLowerCase().replace(/\s+/g, ''),
    'twitter:creator': '@' + article.author.toLowerCase().replace(/\s+/g, '')
  };
}

/**
 * Generate structured data (JSON-LD) untuk artikel
 * @param {Object} article - Data artikel
 * @param {Object} website - Data website
 * @param {string} canonicalUrl - Canonical URL
 * @returns {Object} - Structured data object
 */
export function generateArticleStructuredData(article, website, canonicalUrl) {
  if (!article || !website) {
    return {};
  }
  
  const articleImage = article.main_image || article.thumbnail_image || 
    'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1200&h=630&fit=crop';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: generateArticleDescription(article, website),
    image: articleImage,
    url: canonicalUrl,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: {
      '@type': 'Person',
      name: article.author
    },
    publisher: {
      '@type': 'Organization',
      name: website.name,
      url: generateCanonicalUrl(website),
      logo: {
        '@type': 'ImageObject',
        url: website.logo_url || 'https://via.placeholder.com/200x200?text=' + encodeURIComponent(website.name)
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl
    },
    articleSection: article.category,
    keywords: generateArticleKeywords(article, website),
    wordCount: estimateWordCount(article.content)
  };
}

/**
 * Estimate word count dari content
 * @param {Object|string} content - Content dari database
 * @returns {number} - Estimated word count
 */
function estimateWordCount(content) {
  const text = extractTextFromContent(content);
  return text.split(/\s+/).length;
}

/**
 * Generate robots meta untuk halaman
 * @param {boolean} isPublished - Apakah artikel sudah dipublish
 * @param {boolean} allowIndex - Apakah halaman boleh di-index
 * @returns {string} - Robots meta content
 */
export function generateRobotsMeta(isPublished = true, allowIndex = true) {
  if (!isPublished || !allowIndex) {
    return 'noindex, nofollow';
  }
  
  return 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
}
