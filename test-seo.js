/**
 * Test script untuk memvalidasi implementasi SEO
 * Jalankan dengan: npm run dev (untuk test di browser)
 * Atau gunakan: node test-seo-node.js (untuk test standalone)
 */

import { 
  generateCanonicalUrl, 
  generateArticleTitle, 
  generateArticleDescription,
  generateWebsiteTitle,
  generateWebsiteDescription,
  generateArticleKeywords,
  generateArticleOpenGraph,
  generateArticleTwitterCard,
  generateArticleStructuredData
} from './src/lib/seo.js';

import { getWebsiteSEOData, getWebsiteDomain } from './src/lib/website-seo-data.js';

// Test data
const testWebsite = {
  id: 1,
  name: 'Kelantan Food Review',
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
  content: {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Nasi kerabu adalah makanan tradisional Kelantan yang sangat populer. Makanan ini terdiri dari nasi yang dicampur dengan berbagai rempah dan disajikan dengan lauk yang beragam.'
          }
        ]
      }
    ]
  },
  thumbnail_image: 'https://example.com/nasi-kerabu.jpg',
  main_image: 'https://example.com/nasi-kerabu-large.jpg',
  published_at: '2024-01-15T10:00:00Z',
  updated_at: '2024-01-15T10:00:00Z',
  tags: ['nasi-kerabu', 'kota-bharu', 'makanan-tradisional'],
  labels: ['halal', 'budget-friendly'],
  is_published: true
};

console.log('🧪 Testing SEO Implementation\n');

// Test 1: Website SEO Data
console.log('1. Testing Website SEO Data:');
try {
  const seoData = getWebsiteSEOData('kelantan');
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
