<!-- Test SEO Implementation Page -->
<script>
  import { onMount } from 'svelte';
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
  } from '$lib/seo.js';
  import { getWebsiteSEOData, getWebsiteDomain } from '$lib/website-seo-data.js';

  let testResults = [];
  let isLoading = true;

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

  onMount(() => {
    runTests();
  });

  function runTests() {
    isLoading = true;
    testResults = [];

    try {
      // Test 1: Website SEO Data
      testResults.push({
        id: 1,
        name: 'Website SEO Data',
        status: 'success',
        result: getWebsiteSEOData('kelantan'),
        description: 'Mengambil data SEO untuk website Kelantan'
      });

      // Test 2: Canonical URL Generation
      const canonicalUrl = generateCanonicalUrl(testWebsite, 'article/nasi-kerabu-terbaik-kota-bharu');
      testResults.push({
        id: 2,
        name: 'Canonical URL Generation',
        status: 'success',
        result: canonicalUrl,
        description: 'Generate canonical URL untuk artikel'
      });

      // Test 3: Article Title Generation
      const title = generateArticleTitle(testArticle, testWebsite);
      testResults.push({
        id: 3,
        name: 'Article Title Generation',
        status: 'success',
        result: title,
        description: 'Generate meta title untuk artikel'
      });

      // Test 4: Article Description Generation
      const description = generateArticleDescription(testArticle, testWebsite);
      testResults.push({
        id: 4,
        name: 'Article Description Generation',
        status: 'success',
        result: description,
        description: 'Generate meta description untuk artikel'
      });

      // Test 5: Website Title Generation
      const websiteTitle = generateWebsiteTitle(testWebsite, 'Restoran Terbaik');
      testResults.push({
        id: 5,
        name: 'Website Title Generation',
        status: 'success',
        result: websiteTitle,
        description: 'Generate meta title untuk halaman website'
      });

      // Test 6: Article Keywords Generation
      const keywords = generateArticleKeywords(testArticle, testWebsite);
      testResults.push({
        id: 6,
        name: 'Article Keywords Generation',
        status: 'success',
        result: keywords,
        description: 'Generate keywords untuk artikel'
      });

      // Test 7: Open Graph Generation
      const openGraph = generateArticleOpenGraph(testArticle, testWebsite, canonicalUrl);
      testResults.push({
        id: 7,
        name: 'Open Graph Generation',
        status: 'success',
        result: openGraph,
        description: 'Generate Open Graph data untuk social sharing'
      });

      // Test 8: Twitter Card Generation
      const twitterCard = generateArticleTwitterCard(testArticle, testWebsite, canonicalUrl);
      testResults.push({
        id: 8,
        name: 'Twitter Card Generation',
        status: 'success',
        result: twitterCard,
        description: 'Generate Twitter Card data untuk Twitter sharing'
      });

      // Test 9: Structured Data Generation
      const structuredData = generateArticleStructuredData(testArticle, testWebsite, canonicalUrl);
      testResults.push({
        id: 9,
        name: 'Structured Data Generation',
        status: 'success',
        result: structuredData,
        description: 'Generate JSON-LD structured data untuk search engines'
      });

      // Test 10: Domain Mapping
      const domains = ['kelantan', 'penang', 'kualalumpur', 'sarawak'];
      const domainResults = domains.map(slug => ({
        slug,
        domain: getWebsiteDomain(slug)
      }));
      testResults.push({
        id: 10,
        name: 'Domain Mapping',
        status: 'success',
        result: domainResults,
        description: 'Test domain mapping untuk semua website'
      });

    } catch (error) {
      testResults.push({
        id: 'error',
        name: 'Test Error',
        status: 'error',
        result: error.message,
        description: 'Error occurred during testing'
      });
    }

    isLoading = false;
  }

  function formatResult(result) {
    if (typeof result === 'object') {
      return JSON.stringify(result, null, 2);
    }
    return result;
  }
</script>

<svelte:head>
  <title>SEO Test - Food Review Multi-tenant</title>
  <meta name="description" content="Test page untuk memvalidasi implementasi SEO" />
</svelte:head>

<div class="min-h-screen bg-gray-50 py-8">
  <div class="max-w-6xl mx-auto px-4">
    <div class="bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">🧪 SEO Implementation Test</h1>
      
      <div class="mb-6">
        <button 
          on:click={runTests}
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Running Tests...' : 'Run Tests'}
        </button>
      </div>

      {#if isLoading}
        <div class="flex items-center justify-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span class="ml-3 text-gray-600">Running SEO tests...</span>
        </div>
      {:else}
        <div class="space-y-4">
          {#each testResults as test}
            <div class="border rounded-lg p-4 {test.status === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-lg font-semibold text-gray-800">
                  {test.id}. {test.name}
                </h3>
                <span class="px-3 py-1 rounded-full text-sm font-medium {test.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                  {test.status === 'success' ? '✅ Success' : '❌ Error'}
                </span>
              </div>
              
              <p class="text-gray-600 mb-3">{test.description}</p>
              
              <div class="bg-gray-100 rounded p-3">
                <pre class="text-sm text-gray-800 overflow-x-auto">{formatResult(test.result)}</pre>
              </div>
            </div>
          {/each}
        </div>

        <div class="mt-8 p-6 bg-blue-50 rounded-lg">
          <h2 class="text-xl font-semibold text-blue-800 mb-4">📋 Next Steps</h2>
          <ul class="space-y-2 text-blue-700">
            <li>1. Test sitemap.xml endpoints</li>
            <li>2. Test robots.txt endpoints</li>
            <li>3. Validate structured data with Google Rich Results Test</li>
            <li>4. Test Open Graph with Facebook Debugger</li>
            <li>5. Test Twitter Cards with Twitter Card Validator</li>
          </ul>
        </div>

        <div class="mt-6 p-6 bg-green-50 rounded-lg">
          <h2 class="text-xl font-semibold text-green-800 mb-4">💡 Testing URLs</h2>
          <ul class="space-y-2 text-green-700">
            <li><a href="/kelantan" class="hover:underline">Homepage: /kelantan</a></li>
            <li><a href="/kelantan/sitemap.xml" class="hover:underline">Sitemap: /kelantan/sitemap.xml</a></li>
            <li><a href="/kelantan/robots.txt" class="hover:underline">Robots: /kelantan/robots.txt</a></li>
            <li><a href="/sitemap.xml" class="hover:underline">Master Sitemap: /sitemap.xml</a></li>
            <li><a href="/robots.txt" class="hover:underline">Master Robots: /robots.txt</a></li>
          </ul>
        </div>
      {/if}
    </div>
  </div>
</div>
