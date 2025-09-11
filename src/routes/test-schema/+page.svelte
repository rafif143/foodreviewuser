<!-- Test Schema Page -->
<script>
  import { onMount } from 'svelte';
  import { generateSchemaMarkup } from '$lib/seo-config.js';
  
  let schemaMarkup = null;
  let jsonString = '';
  let isValid = false;
  let errorMessage = '';
  
  onMount(() => {
    try {
      // Generate schema markup
      schemaMarkup = generateSchemaMarkup(1, 'homepage', {});
      
      // Convert to JSON string
      jsonString = JSON.stringify(schemaMarkup, null, 2);
      
      // Validate JSON
      JSON.parse(jsonString);
      isValid = true;
    } catch (error) {
      errorMessage = error.message;
      isValid = false;
    }
  });
</script>

<svelte:head>
  <title>Schema Test - Kelantan Food Review</title>
</svelte:head>

<main class="min-h-screen bg-gray-50 py-8">
  <div class="max-w-4xl mx-auto px-4">
    <div class="bg-white shadow rounded-lg p-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">Schema Markup Test</h1>
      
      <div class="space-y-6">
        <!-- Status -->
        <div class="p-4 rounded-lg {isValid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}">
          <h2 class="text-lg font-semibold {isValid ? 'text-green-900' : 'text-red-900'} mb-2">
            {isValid ? '✅ Valid JSON Schema' : '❌ Invalid JSON Schema'}
          </h2>
          {#if errorMessage}
            <p class="text-red-700 text-sm">{errorMessage}</p>
          {/if}
        </div>
        
        <!-- Schema Object -->
        <div>
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Schema Object</h2>
          <pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">{JSON.stringify(schemaMarkup, null, 2)}</pre>
        </div>
        
        <!-- JSON String -->
        <div>
          <h2 class="text-xl font-semibold text-gray-900 mb-4">JSON String</h2>
          <pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">{jsonString}</pre>
        </div>
        
        <!-- Test Instructions -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 class="text-lg font-semibold text-blue-900 mb-4">Testing Instructions</h2>
          <ol class="list-decimal list-inside space-y-2 text-blue-800">
            <li>Copy the JSON string above</li>
            <li>Go to <a href="https://validator.schema.org/" target="_blank" class="text-blue-600 hover:underline">Schema.org Validator</a></li>
            <li>Paste the JSON in the validator</li>
            <li>Check for any validation errors</li>
            <li>Also test with <a href="https://search.google.com/test/rich-results" target="_blank" class="text-blue-600 hover:underline">Google Rich Results Test</a></li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</main>
