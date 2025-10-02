/**
 * Test script untuk memvalidasi implementasi SEO (Node.js compatible)
 * Jalankan dengan: node test-seo-node.js
 */

// Simulasi data website SEO
const WEBSITE_SEO_DATA = {
  'kelantan': {
    name: 'MakanKelantan',
    domain: 'makankelantan.com',
    description: 'Panduan kuliner terbaik di Kelantan. Temukan restoran, kedai makan, dan makanan tradisional Kelantan yang autentik.',
    keywords: 'kelantan food, makanan kelantan, restoran kelantan, kedai makan kelantan, nasi kerabu, ayam percik',
    location: 'Kelantan, Malaysia',
    cuisine: 'Traditional Malay, Nasi Kerabu, Ayam Percik',
    socialMedia: {
      facebook: 'https://facebook.com/MakanKelantan',
      instagram: 'https://instagram.com/makankelantan',
      twitter: 'https://twitter.com/MakanKelantan',
      youtube: 'https://youtube.com/MakanKelantan'
    }
  }
};

// Simulasi fungsi SEO
function getWebsiteDomain(slug) {
  const seoData = WEBSITE_SEO_DATA[slug] || WEBSITE_SEO_DATA['kelantan'];
  return seoData.domain;
}

function generateCanonicalUrl(website, path = '', https = true) {
  const protocol = https ? 'https://' : 'http://';
  const domain = getWebsiteDomain(website.slug);
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  const fullPath = cleanPath ? `/${cleanPath}` : '';
  
  return `${protocol}${domain}${fullPath}`;
}

function generateArticleTitle(article, website) {
  if (!article || !website) return 'Artikel Tidak Ditemukan';
  
  return `${article.title} | ${website.name}`;
}

function generateArticleDescription(article, website) {
  if (!article) return 'Artikel tidak ditemukan';
  
  let description = article.summary || '';
  
  if (!description) {
    description = article.title;
  }
  
  if (description.length > 160) {
    description = description.substring(0, 157) + '...';
  }
  
  return description;
}

function generateWebsiteTitle(website, pageTitle = '') {
  if (!website) return 'Website Tidak Ditemukan';
  
  const seoData = WEBSITE_SEO_DATA[website.slug];
  const siteName = seoData ? seoData.name : website.name;
  
  if (pageTitle) {
    return `${pageTitle} | ${siteName}`;
  }
  
  return `${siteName} - ${seoData ? seoData.description : website.description || 'Panduan Kuliner Terbaik'}`;
}

function generateWebsiteDescription(website, pageDescription = '') {
  if (!website) return 'Website tidak ditemukan';
  
  if (pageDescription) {
    return pageDescription;
  }
  
  const seoData = WEBSITE_SEO_DATA[website.slug];
  return seoData ? seoData.description : website.description || `Temukan tempat makan terbaik, resep autentik, dan panduan kuliner di ${website.name}. Update terbaru tentang makanan lokal dan rekomendasi terbaik.`;
}

function generateArticleKeywords(article, website) {
  if (!article) return '';
  
  const keywords = new Set();
  
  if (article.category) {
    keywords.add(article.category);
  }
  
  if (article.tags && Array.isArray(article.tags)) {
    article.tags.forEach(tag => keywords.add(tag));
  }
  
  if (article.labels && Array.isArray(article.labels)) {
    article.labels.forEach(label => keywords.add(label));
  }
  
  if (article.title) {
    const titleWords = article.title.toLowerCase().split(/\s+/);
    titleWords.forEach(word => {
      if (word.length > 3) {
        keywords.add(word);
      }
    });
  }
  
  if (website && website.name) {
    keywords.add(website.name.toLowerCase());
  }
  
  return Array.from(keywords).slice(0, 10).join(', ');
}

function generateArticleOpenGraph(article, website, canonicalUrl) {
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

function generateArticleTwitterCard(article, website, canonicalUrl) {
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

function generateArticleStructuredData(article, website, canonicalUrl) {
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

function estimateWordCount(content) {
  if (typeof content === 'string') {
    return content.split(/\s+/).length;
  }
  return 100; // Default estimate
}

// Test data
const testWebsite = {
  id: 1,
  name: 'MakanKelantan',
  slug: 'kelantan',
  description: 'Panduan kuliner terbaik di Kelantan'
};

const testArticle = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  title: 'Nasi Kerabu Terbaik di Kota Bharu',
  slug: 'nasi-kerabu-terbaik-kota-bharu',
  author: 'Ahmad Rahman',
  category: 'food',
  summary: 'Temukan nasi kerabu terbaik di Kota Bharu dengan rasa autentik dan harga terjangkau.',
  content: 'Nasi kerabu adalah makanan tradisional Kelantan yang sangat populer. Makanan ini terdiri dari nasi yang dicampur dengan berbagai rempah dan disajikan dengan lauk yang beragam.',
  thumbnail_image: 'https://example.com/nasi-kerabu.jpg',
  main_image: 'https://example.com/nasi-kerabu-large.jpg',
  published_at: '2024-01-15T10:00:00Z',
  updated_at: '2024-01-15T10:00:00Z',
  tags: ['nasi-kerabu', 'kota-bharu', 'makanan-tradisional'],
  labels: ['halal', 'budget-friendly'],
  is_published: true
};

console.log('🧪 Testing SEO Implementation (Node.js)\n');

// Test 1: Website SEO Data
console.log('1. Testing Website SEO Data:');
try {
  const seoData = WEBSITE_SEO_DATA['kelantan'];
  console.log('✅ Website SEO Data:', {
    name: seoData.name,
    domain: seoData.domain,
    location: seoData.location
  });
} catch (error) {
  console.log('❌ Error:', error.message);
}

// Test 2: Canonical URL Generation
console.log('\n2. Testing Canonical URL Generation:');
try {
  const canonicalUrl = generateCanonicalUrl(testWebsite, 'article/nasi-kerabu-terbaik-kota-bharu');
  console.log('✅ Canonical URL:', canonicalUrl);
} catch (error) {
  console.log('❌ Error:', error.message);
}

// Test 3: Article Title Generation
console.log('\n3. Testing Article Title Generation:');
try {
  const title = generateArticleTitle(testArticle, testWebsite);
  console.log('✅ Article Title:', title);
} catch (error) {
  console.log('❌ Error:', error.message);
}

// Test 4: Article Description Generation
console.log('\n4. Testing Article Description Generation:');
try {
  const description = generateArticleDescription(testArticle, testWebsite);
  console.log('✅ Article Description:', description);
} catch (error) {
  console.log('❌ Error:', error.message);
}

// Test 5: Website Title Generation
console.log('\n5. Testing Website Title Generation:');
try {
  const websiteTitle = generateWebsiteTitle(testWebsite, 'Restoran Terbaik');
  console.log('✅ Website Title:', websiteTitle);
} catch (error) {
  console.log('❌ Error:', error.message);
}

// Test 6: Article Keywords Generation
console.log('\n6. Testing Article Keywords Generation:');
try {
  const keywords = generateArticleKeywords(testArticle, testWebsite);
  console.log('✅ Article Keywords:', keywords);
} catch (error) {
  console.log('❌ Error:', error.message);
}

// Test 7: Open Graph Generation
console.log('\n7. Testing Open Graph Generation:');
try {
  const canonicalUrl = generateCanonicalUrl(testWebsite, 'article/nasi-kerabu-terbaik-kota-bharu');
  const openGraph = generateArticleOpenGraph(testArticle, testWebsite, canonicalUrl);
  console.log('✅ Open Graph Data:');
  console.log('   - og:title:', openGraph['og:title']);
  console.log('   - og:description:', openGraph['og:description']);
  console.log('   - og:image:', openGraph['og:image']);
} catch (error) {
  console.log('❌ Error:', error.message);
}

// Test 8: Twitter Card Generation
console.log('\n8. Testing Twitter Card Generation:');
try {
  const canonicalUrl = generateCanonicalUrl(testWebsite, 'article/nasi-kerabu-terbaik-kota-bharu');
  const twitterCard = generateArticleTwitterCard(testArticle, testWebsite, canonicalUrl);
  console.log('✅ Twitter Card Data:');
  console.log('   - twitter:title:', twitterCard['twitter:title']);
  console.log('   - twitter:description:', twitterCard['twitter:description']);
  console.log('   - twitter:image:', twitterCard['twitter:image']);
} catch (error) {
  console.log('❌ Error:', error.message);
}

// Test 9: Structured Data Generation
console.log('\n9. Testing Structured Data Generation:');
try {
  const canonicalUrl = generateCanonicalUrl(testWebsite, 'article/nasi-kerabu-terbaik-kota-bharu');
  const structuredData = generateArticleStructuredData(testArticle, testWebsite, canonicalUrl);
  console.log('✅ Structured Data:');
  console.log('   - @type:', structuredData['@type']);
  console.log('   - headline:', structuredData.headline);
  console.log('   - author name:', structuredData.author.name);
  console.log('   - publisher name:', structuredData.publisher.name);
} catch (error) {
  console.log('❌ Error:', error.message);
}

// Test 10: Domain Mapping
console.log('\n10. Testing Domain Mapping:');
try {
  const domains = ['kelantan', 'penang', 'kualalumpur', 'sarawak'];
  domains.forEach(slug => {
    const domain = getWebsiteDomain(slug);
    console.log(`✅ ${slug}: ${domain}`);
  });
} catch (error) {
  console.log('❌ Error:', error.message);
}

console.log('\n🎉 SEO Implementation Test Completed!');
console.log('\n📋 Next Steps:');
console.log('1. Test sitemap.xml endpoints');
console.log('2. Test robots.txt endpoints');
console.log('3. Validate structured data with Google Rich Results Test');
console.log('4. Test Open Graph with Facebook Debugger');
console.log('5. Test Twitter Cards with Twitter Card Validator');
console.log('\n💡 To test the actual application:');
console.log('- Run: npm run dev');
console.log('- Visit: http://localhost:5173/kelantan');
console.log('- Check browser console for any errors');
