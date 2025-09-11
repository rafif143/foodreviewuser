<!-- SEO Head Component untuk Multi-tenant -->
<script>
  import { getSEOConfig, generatePageTitle, generateMetaDescription, generateKeywords, generateSchemaMarkup } from '$lib/seo-config.js';
  
  export let websiteId = 1;
  export let pageType = 'homepage';
  export let customTitle = '';
  export let customDescription = '';
  export let customKeywords = [];
  export let customImage = '';
  export let customUrl = '';
  export let articleData = {};
  export let restaurantData = {};
  export let websiteData = {}; // Data website untuk logo_url

  // Generate SEO data
  $: config = getSEOConfig(websiteId);
  $: pageTitle = generatePageTitle(websiteId, pageType, customTitle);
  $: metaDescription = generateMetaDescription(websiteId, pageType, customDescription);
  $: keywords = generateKeywords(websiteId, customKeywords);
  $: schemaMarkup = generateSchemaMarkup(websiteId, pageType, { ...articleData, ...restaurantData });
  
  // Safe JSON stringify function
  function safeJsonStringify(obj) {
    try {
      const cleaned = cleanJsonSchema(obj);
      return JSON.stringify(cleaned, null, 2);
    } catch (error) {
      console.error('JSON stringify error:', error);
      // Return minimal valid schema if error
      return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Kelantan Food Review",
        "url": "https://foodreviewuser.netlify.app"
      }, null, 2);
    }
  }
  
  // Reactive JSON strings for all schema types
  $: schemaJsonString = safeJsonStringify(schemaMarkup);
  
  // Restaurant schema
  $: restaurantSchema = pageType === 'restaurant' && restaurantData ? {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": restaurantData.name || `Restoran di ${config.capital || 'Kota Bharu'}`,
    "description": restaurantData.description || `Restoran terbaik di ${config.capital || 'Kota Bharu'}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": restaurantData.address || "",
      "addressLocality": config.capital || 'Kota Bharu',
      "addressRegion": config.location || 'Kelantan',
      "addressCountry": "Malaysia",
      "postalCode": restaurantData.postalCode || ""
    },
    "telephone": restaurantData.phone || "",
    "url": restaurantData.website || `https://${config.domain || 'foodreviewuser.netlify.app'}`,
    "servesCuisine": config.localCuisine || ['Nasi Kerabu', 'Ayam Percik'],
    "priceRange": restaurantData.priceRange || "$$",
    "openingHours": restaurantData.openingHours || [],
    "aggregateRating": restaurantData.rating ? {
      "@type": "AggregateRating",
      "ratingValue": restaurantData.rating,
      "reviewCount": restaurantData.reviewCount || 0
    } : undefined,
    "image": restaurantData.image || ogImage
  } : null;
  
  $: restaurantJsonString = restaurantSchema ? safeJsonStringify(restaurantSchema) : '';
  
  // Article schema
  $: articleSchema = pageType === 'article' && articleData ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": articleData.title || pageTitle,
    "description": articleData.summary || metaDescription,
    "image": articleData.mainImage || articleData.thumbnailImage || ogImage,
    "author": {
      "@type": "Organization",
      "name": config.name || 'Kelantan Food Review',
      "url": `https://${config.domain || 'foodreviewuser.netlify.app'}`
    },
    "publisher": {
      "@type": "Organization",
      "name": config.name || 'Kelantan Food Review',
      "logo": {
        "@type": "ImageObject",
        "url": websiteData?.logo_url || `https://${config.domain || 'foodreviewuser.netlify.app'}/logo.png`
      }
    },
    "datePublished": articleData.publishedDate || new Date().toISOString(),
    "dateModified": articleData.modifiedDate || new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "articleSection": articleData.category || "Kuliner",
    "keywords": keywords
  } : null;
  
  $: articleJsonString = articleSchema ? safeJsonStringify(articleSchema) : '';
  
  // Breadcrumb schema
  $: breadcrumbSchema = pageType !== 'homepage' ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Utama",
        "item": `https://${config.domain || 'foodreviewuser.netlify.app'}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": pageType === 'article' ? 'Artikel' : pageType === 'restaurant' ? 'Restoran' : 'Halaman',
        "item": canonicalUrl
      }
    ]
  } : null;
  
  $: breadcrumbJsonString = breadcrumbSchema ? safeJsonStringify(breadcrumbSchema) : '';
  
  // Generate URLs
  $: canonicalUrl = customUrl || `https://${config.domain}`;
  $: ogImage = customImage || `https://${config.domain}/og-image-${pageType}.jpg`;
  $: twitterImage = customImage || `https://${config.domain}/twitter-image-${pageType}.jpg`;
  
  // Dynamic favicon from database
  $: faviconUrl = websiteData?.logo_url || `https://${config.domain}/favicon.svg`;
  $: appleTouchIcon = websiteData?.logo_url || `https://${config.domain}/favicon.svg`;
  
  // Function to clean JSON schema (remove null/undefined values and sanitize strings)
  function cleanJsonSchema(obj) {
    if (obj === null || obj === undefined) return undefined;
    if (typeof obj === 'string') {
      // Sanitize string: remove control characters and escape quotes
      return obj
        .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
        .replace(/\\/g, '\\\\') // Escape backslashes
        .replace(/"/g, '\\"') // Escape quotes
        .trim();
    }
    if (typeof obj === 'number' || typeof obj === 'boolean') return obj;
    if (Array.isArray(obj)) {
      const cleaned = obj.map(cleanJsonSchema).filter(item => item !== undefined);
      return cleaned.length > 0 ? cleaned : undefined;
    }
    if (typeof obj === 'object') {
      const cleaned = {};
      for (const [key, value] of Object.entries(obj)) {
        // Clean the key as well
        const cleanKey = key.replace(/[\x00-\x1F\x7F]/g, '').trim();
        if (cleanKey) {
          const cleanedValue = cleanJsonSchema(value);
          if (cleanedValue !== undefined) {
            cleaned[cleanKey] = cleanedValue;
          }
        }
      }
      return Object.keys(cleaned).length > 0 ? cleaned : undefined;
    }
    return obj;
  }
</script>

<svelte:head>
  <!-- Basic Meta Tags -->
  <title>{pageTitle}</title>
  <meta name="description" content={metaDescription} />
  <meta name="keywords" content={keywords} />
  <meta name="author" content={config.name} />
  <meta name="robots" content="index, follow" />
  <meta name="language" content="ms" />
  <meta name="geo.region" content="MY-{websiteId.toString().padStart(2, '0')}" />
  <meta name="geo.placename" content={config.capital} />
  <meta name="geo.position" content="" />
  <meta name="ICBM" content="" />
  
  <!-- Canonical URL -->
  <link rel="canonical" href={canonicalUrl} />
  
  <!-- Dynamic Favicon -->
  <link rel="icon" type="image/svg+xml" href={faviconUrl} />
  <link rel="shortcut icon" type="image/svg+xml" href={faviconUrl} />
  <link rel="icon" type="image/svg+xml" sizes="32x32" href={faviconUrl} />
  <link rel="icon" type="image/svg+xml" sizes="16x16" href={faviconUrl} />
  <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
  <link rel="apple-touch-icon" sizes="152x152" href={appleTouchIcon} />
  <link rel="apple-touch-icon" sizes="144x144" href={appleTouchIcon} />
  <link rel="apple-touch-icon" sizes="120x120" href={appleTouchIcon} />
  <link rel="apple-touch-icon" sizes="114x114" href={appleTouchIcon} />
  <link rel="apple-touch-icon" sizes="76x76" href={appleTouchIcon} />
  <link rel="apple-touch-icon" sizes="72x72" href={appleTouchIcon} />
  <link rel="apple-touch-icon" sizes="60x60" href={appleTouchIcon} />
  <link rel="apple-touch-icon" sizes="57x57" href={appleTouchIcon} />
  <meta name="msapplication-TileImage" content={appleTouchIcon} />
  
  <!-- Open Graph Meta Tags -->
  <meta property="og:type" content={pageType === 'article' ? 'article' : 'website'} />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={metaDescription} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:site_name" content={config.name} />
  <meta property="og:locale" content="ms_MY" />
  
  <!-- Article specific Open Graph -->
  {#if pageType === 'article' && articleData}
    <meta property="article:author" content={config.name} />
    <meta property="article:publisher" content={config.name} />
    {#if articleData.publishedDate}
      <meta property="article:published_time" content={articleData.publishedDate} />
    {/if}
    {#if articleData.modifiedDate}
      <meta property="article:modified_time" content={articleData.modifiedDate} />
    {/if}
    {#if articleData.tags}
      {#each articleData.tags as tag}
        <meta property="article:tag" content={tag} />
      {/each}
    {/if}
  {/if}
  
  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={metaDescription} />
  <meta name="twitter:image" content={twitterImage} />
  <meta name="twitter:site" content="@{config.slug}" />
  <meta name="twitter:creator" content="@{config.slug}" />
  
  <!-- Additional Meta Tags -->
  <meta name="theme-color" content="#dc2626" />
  <meta name="msapplication-TileColor" content="#dc2626" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="default" />
  <meta name="apple-mobile-web-app-title" content={config.name} />
  
  <!-- Structured Data (Schema.org) -->
  <script type="application/ld+json">
    {schemaJsonString}
  </script>
  
  <!-- Additional Schema for Restaurant -->
  {#if restaurantJsonString}
    <script type="application/ld+json">
      {restaurantJsonString}
    </script>
  {/if}
  
  <!-- Additional Schema for Article -->
  {#if articleJsonString}
    <script type="application/ld+json">
      {articleJsonString}
    </script>
  {/if}
  
  <!-- Breadcrumb Schema -->
  {#if breadcrumbJsonString}
    <script type="application/ld+json">
      {breadcrumbJsonString}
    </script>
  {/if}
</svelte:head>
