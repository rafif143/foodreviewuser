<!-- SEO Layout untuk halaman artikel -->
<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  
  /** @type {import('./$types').PageData} */
  export let data;
  
  // Reactive SEO data
  $: seo = data?.seo;
  $: article = data?.article;
  
  // Update document head dengan SEO data hanya di client-side
  onMount(() => {
    if (seo && article) {
      updateDocumentHead();
    }
  });
  
  function updateDocumentHead() {
    // Check if we're in browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }
    
    // Update title
    if (seo.title) {
      document.title = seo.title;
    }
    
    // Update atau tambahkan meta tags
    updateMetaTag('description', seo.description);
    updateMetaTag('keywords', seo.keywords);
    updateMetaTag('robots', seo.robots);
    
    // Update canonical URL
    updateCanonicalUrl(seo.canonical);
    
    // Update Open Graph tags
    if (seo.openGraph) {
      Object.entries(seo.openGraph).forEach(([key, value]) => {
        updateMetaTag(key, value);
      });
    }
    
    // Update Twitter Card tags
    if (seo.twitterCard) {
      Object.entries(seo.twitterCard).forEach(([key, value]) => {
        updateMetaTag(key, value);
      });
    }
    
    // Tambahkan structured data
    if (seo.structuredData) {
      addStructuredData(seo.structuredData);
    }
  }
  
  function updateMetaTag(name, content) {
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
  
  function updateCanonicalUrl(url) {
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
  
  function addStructuredData(data) {
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
</script>

<!-- Slot untuk konten artikel -->
<slot />
