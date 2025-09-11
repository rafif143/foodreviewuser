<!-- src/routes/[slug]/+layout.svelte -->
<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { 
    generateCanonicalUrl, 
    generateWebsiteTitle, 
    generateWebsiteDescription,
    generateRobotsMeta
  } from '$lib/seo.js';
  
  // Import components directly to avoid dynamic import issues
  import NavigationMenu from '$lib/components/NavigationMenu.svelte';
  import Footer from '$lib/components/Footer.svelte';

  /** @type {import('./$types').PageData} */
  export let data;
  
  // Generate SEO data untuk website
  $: website = data?.website;
  $: seoData = website ? {
    title: generateWebsiteTitle(website),
    description: generateWebsiteDescription(website),
    canonical: generateCanonicalUrl(website),
    robots: generateRobotsMeta(true, true)
  } : null;
  
  // Update document head dengan SEO data website
  onMount(() => {
    if (seoData) {
      updateDocumentHead();
      updateFavicon();
    }
  });
  
  function updateDocumentHead() {
    // Update title
    if (seoData.title) {
      document.title = seoData.title;
    }

    // Update meta tags
    updateMetaTag('description', seoData.description);
    updateMetaTag('robots', seoData.robots);
    
    // Update canonical URL
    updateCanonicalUrl(seoData.canonical);
  }

  function updateFavicon() {
    if (!website) return;
    
    // Update favicon link
    const faviconLink = document.querySelector('link[rel="icon"]') || document.createElement('link');
    faviconLink.rel = 'icon';
    faviconLink.type = 'image/svg+xml';
    faviconLink.href = `/${website.slug}/favicon.ico`;
    
    if (!document.querySelector('link[rel="icon"]')) {
      document.head.appendChild(faviconLink);
    }

    // Update apple-touch-icon
    const appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]') || document.createElement('link');
    appleTouchIcon.rel = 'apple-touch-icon';
    appleTouchIcon.href = `/${website.slug}/apple-touch-icon.png`;
    
    if (!document.querySelector('link[rel="apple-touch-icon"]')) {
      document.head.appendChild(appleTouchIcon);
    }

    // Update Open Graph image jika website punya logo
    if (website.logo_url) {
      updateMetaTag('og:image', website.logo_url);
      updateMetaTag('twitter:image', website.logo_url);
    }
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

<div class="min-h-screen flex flex-col">
  <!-- Critical Navigation - Load immediately -->
  <NavigationMenu website={data.website} contactData={data.contactData} />
  
  <!-- Main Content -->
  <main class="flex-grow above-fold">
    <slot />
  </main>
  
  <!-- Footer -->
  <Footer website={data.website} />
</div>