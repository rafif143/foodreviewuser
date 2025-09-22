/**
 * SEO Utilities untuk mengelola meta tags secara global
 */

/**
 * Update document head dengan SEO data
 * @param {Object} seoData - Data SEO
 */
export function updateDocumentHead(seoData) {
  if (!seoData) return;
  
  // Check if we're in browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }
  
  // Update title
  if (seoData.title) {
    document.title = seoData.title;
  }
  
  // Update meta tags
  if (seoData.description) {
    updateMetaTag('description', seoData.description);
  }
  
  if (seoData.keywords) {
    updateMetaTag('keywords', seoData.keywords);
  }
  
  if (seoData.robots) {
    updateMetaTag('robots', seoData.robots);
  }
  
  // Update canonical URL
  if (seoData.canonical) {
    updateCanonicalUrl(seoData.canonical);
  }
  
  // Update Open Graph tags
  if (seoData.openGraph) {
    Object.entries(seoData.openGraph).forEach(([key, value]) => {
      updateMetaTag(key, value);
    });
  }
  
  // Update Twitter Card tags
  if (seoData.twitterCard) {
    Object.entries(seoData.twitterCard).forEach(([key, value]) => {
      updateMetaTag(key, value);
    });
  }
  
  // Tambahkan structured data
  if (seoData.structuredData) {
    addStructuredData(seoData.structuredData);
  }
}

/**
 * Update meta tag
 * @param {string} name - Nama meta tag
 * @param {string} content - Konten meta tag
 */
export function updateMetaTag(name, content) {
  if (!content) return;
  
  // Check if we're in browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }
  
  let meta = document.querySelector(`meta[name="${name}"]`) || 
             document.querySelector(`meta[property="${name}"]`);
  
  if (meta) {
    meta.setAttribute('content', content);
  } else {
    meta = document.createElement('meta');
    if (name.startsWith('og:') || name.startsWith('twitter:')) {
      meta.setAttribute('property', name);
    } else {
      meta.setAttribute('name', name);
    }
    meta.setAttribute('content', content);
    document.head.appendChild(meta);
  }
}

/**
 * Update canonical URL
 * @param {string} url - Canonical URL
 */
export function updateCanonicalUrl(url) {
  if (!url) return;
  
  // Check if we're in browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }
  
  let canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', url);
  } else {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', url);
    document.head.appendChild(canonical);
  }
}

/**
 * Add structured data (JSON-LD)
 * @param {Object} data - Structured data
 */
export function addStructuredData(data) {
  // Check if we're in browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }
  
  // Hapus structured data yang sudah ada
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }
  
  // Tambahkan structured data baru
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

/**
 * Generate breadcrumb structured data
 * @param {Array} breadcrumbs - Array of breadcrumb items
 * @returns {Object} - Breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(breadcrumbs) {
  if (!breadcrumbs || breadcrumbs.length === 0) {
    return {};
  }
  
  const items = breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: crumb.url
  }));
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
  };
}

/**
 * Generate FAQ structured data
 * @param {Array} faqs - Array of FAQ items
 * @returns {Object} - FAQ structured data
 */
export function generateFAQStructuredData(faqs) {
  if (!faqs || faqs.length === 0) {
    return {};
  }
  
  const items = faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }));
  
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items
  };
}

/**
 * Generate local business structured data
 * @param {Object} business - Business data
 * @returns {Object} - Local business structured data
 */
export function generateLocalBusinessStructuredData(business) {
  if (!business) {
    return {};
  }
  
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    description: business.description,
    url: business.url,
    telephone: business.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address?.street,
      addressLocality: business.address?.city,
      addressRegion: business.address?.state,
      postalCode: business.address?.postalCode,
      addressCountry: business.address?.country
    },
    geo: business.coordinates ? {
      '@type': 'GeoCoordinates',
      latitude: business.coordinates.lat,
      longitude: business.coordinates.lng
    } : undefined,
    openingHours: business.openingHours,
    priceRange: business.priceRange,
    aggregateRating: business.rating ? {
      '@type': 'AggregateRating',
      ratingValue: business.rating.value,
      reviewCount: business.rating.count
    } : undefined
  };
}
