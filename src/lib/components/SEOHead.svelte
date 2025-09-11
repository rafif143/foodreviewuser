<!-- Komponen SEO Head untuk mengelola meta tags -->
<script>
  import { onMount } from 'svelte';
  import { updateDocumentHead } from '$lib/seo-utils.js';
  
  /** @type {Object} */
  export let seoData = {};
  
  // Update document head ketika seoData berubah
  $: if (seoData && Object.keys(seoData).length > 0) {
    updateDocumentHead(seoData);
  }
  
  onMount(() => {
    if (seoData && Object.keys(seoData).length > 0) {
      updateDocumentHead(seoData);
    }
  });
</script>

<!-- Komponen ini tidak render apa-apa, hanya mengelola SEO -->
<slot />
