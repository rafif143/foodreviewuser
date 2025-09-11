<!-- Google Search Console Verification -->
<script>
  import { onMount } from 'svelte';
  
  let sitemapUrl = '';
  let isSubmitting = false;
  let submitMessage = '';
  
  onMount(() => {
    sitemapUrl = `${window.location.origin}/sitemap.xml`;
  });
  
  async function submitToGoogle() {
    if (!sitemapUrl) return;
    
    isSubmitting = true;
    submitMessage = '';
    
    try {
      // This would typically be done through Google Search Console API
      // For now, we'll just show the URL to submit manually
      submitMessage = `Please submit this sitemap URL to Google Search Console: ${sitemapUrl}`;
    } catch (error) {
      submitMessage = 'Error submitting sitemap: ' + error.message;
    } finally {
      isSubmitting = false;
    }
  }
</script>

<svelte:head>
  <title>Google Search Console - Sitemap Submission</title>
  <meta name="description" content="Submit sitemap to Google Search Console for better SEO indexing" />
</svelte:head>

<main class="min-h-screen bg-gray-50 py-8">
  <div class="max-w-4xl mx-auto px-4">
    <div class="bg-white shadow rounded-lg p-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">Google Search Console</h1>
      
      <div class="space-y-6">
        <!-- Sitemap URLs -->
        <div>
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Sitemap URLs</h2>
          <div class="space-y-3">
            <div class="p-4 bg-gray-50 rounded-lg">
              <h3 class="font-medium text-gray-900">Main Sitemap</h3>
              <p class="text-sm text-gray-600 mb-2">Contains all pages for the current website</p>
              <code class="text-blue-600 break-all">{sitemapUrl}</code>
            </div>
            
            <div class="p-4 bg-gray-50 rounded-lg">
              <h3 class="font-medium text-gray-900">Sitemap Index</h3>
              <p class="text-sm text-gray-600 mb-2">Contains all websites in the multi-tenant system</p>
              <code class="text-blue-600 break-all">{window.location.origin}/sitemap-index.xml</code>
            </div>
          </div>
        </div>
        
        <!-- Instructions -->
        <div>
          <h2 class="text-xl font-semibold text-gray-900 mb-4">How to Submit to Google Search Console</h2>
          <ol class="list-decimal list-inside space-y-2 text-gray-700">
            <li>Go to <a href="https://search.google.com/search-console" target="_blank" class="text-blue-600 hover:underline">Google Search Console</a></li>
            <li>Select your property (foodreviewuser.netlify.app)</li>
            <li>Go to "Sitemaps" in the left sidebar</li>
            <li>Click "Add a new sitemap"</li>
            <li>Enter the sitemap URL: <code class="bg-gray-100 px-2 py-1 rounded">sitemap.xml</code></li>
            <li>Click "Submit"</li>
            <li>Repeat for sitemap index: <code class="bg-gray-100 px-2 py-1 rounded">sitemap-index.xml</code></li>
          </ol>
        </div>
        
        <!-- Additional SEO Tips -->
        <div>
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Additional SEO Tips</h2>
          <ul class="list-disc list-inside space-y-2 text-gray-700">
            <li>Make sure all articles have proper meta descriptions</li>
            <li>Use descriptive, keyword-rich URLs</li>
            <li>Add structured data (Schema.org) to articles</li>
            <li>Ensure fast page loading times</li>
            <li>Use proper heading hierarchy (H1, H2, H3)</li>
            <li>Add alt text to all images</li>
            <li>Create internal links between related articles</li>
          </ul>
        </div>
        
        <!-- Current Status -->
        <div>
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Current SEO Status</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 border border-green-200 bg-green-50 rounded-lg">
              <h3 class="font-medium text-green-900">✅ Fixed</h3>
              <ul class="text-sm text-green-700 mt-2 space-y-1">
                <li>• No more "Redirecting..." in search results</li>
                <li>• Proper meta descriptions</li>
                <li>• Sitemap generation</li>
                <li>• Robots.txt configuration</li>
              </ul>
            </div>
            
            <div class="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
              <h3 class="font-medium text-yellow-900">⏳ Pending</h3>
              <ul class="text-sm text-yellow-700 mt-2 space-y-1">
                <li>• Google indexing (takes 1-7 days)</li>
                <li>• Search result updates</li>
                <li>• Individual article indexing</li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- Action Button -->
        <div class="pt-6 border-t border-gray-200">
          <button 
            on:click={submitToGoogle}
            disabled={isSubmitting}
            class="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium"
          >
            {isSubmitting ? 'Submitting...' : 'Get Submission Instructions'}
          </button>
          
          {#if submitMessage}
            <div class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p class="text-blue-800">{submitMessage}</p>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</main>
