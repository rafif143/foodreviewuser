<!-- SEO Layout untuk halaman kategori -->
<script>
  import { onMount } from 'svelte';
  
  /** @type {import('./$types').PageData} */
  export let data;
  
  // Reactive SEO data
  $: seo = data?.seo;
  
  // Update document head dengan SEO data
  onMount(() => {
    if (seo) {
      updateDocumentHead();
    }
  });
  
  function updateDocumentHead() {
    // Update title
    if (seo.title) {
      document.title = seo.title;
    }
    
    // Update meta tags
    updateMetaTag('description', seo.description);
    updateMetaTag('keywords', seo.keywords);
    updateMetaTag('robots', seo.robots);
    
    // Update canonical URL
    updateCanonicalUrl(seo.canonical);
  }
  
  function updateMetaTag(name, content) {
    if (!content) return;
    
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (meta) {
      meta.setAttribute('content', content);
    } else {
      meta = document.createElement('meta');
      meta.setAttribute('name', name);
      meta.setAttribute('content', content);
      document.head.appendChild(meta);
    }
  }
  
  function updateCanonicalUrl(url) {
    if (!url) return;
    
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
</script>

<!-- Slot untuk konten kategori -->
<slot />
