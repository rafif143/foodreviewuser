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

  // Generate SEO data
  $: config = getSEOConfig(websiteId);
  $: pageTitle = generatePageTitle(websiteId, pageType, customTitle);
  $: metaDescription = generateMetaDescription(websiteId, pageType, customDescription);
  $: keywords = generateKeywords(websiteId, customKeywords);
  $: schemaMarkup = generateSchemaMarkup(websiteId, pageType, { ...articleData, ...restaurantData });
  
  // Generate URLs
  $: canonicalUrl = customUrl || `https://${config.domain}`;
  $: ogImage = customImage || `https://${config.domain}/og-image-${pageType}.jpg`;
  $: twitterImage = customImage || `https://${config.domain}/twitter-image-${pageType}.jpg`;
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
    {JSON.stringify(schemaMarkup)}
  </script>
  
  <!-- Additional Schema for Restaurant -->
  {#if pageType === 'restaurant' && restaurantData}
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": restaurantData.name || `Restoran di ${config.capital}`,
        "description": restaurantData.description || `Restoran terbaik di ${config.capital}`,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": restaurantData.address || "",
          "addressLocality": config.capital,
          "addressRegion": config.location,
          "addressCountry": "Malaysia",
          "postalCode": restaurantData.postalCode || ""
        },
        "telephone": restaurantData.phone || "",
        "url": restaurantData.website || `https://${config.domain}`,
        "servesCuisine": config.localCuisine,
        "priceRange": restaurantData.priceRange || "$$",
        "openingHours": restaurantData.openingHours || [],
        "aggregateRating": restaurantData.rating ? {
          "@type": "AggregateRating",
          "ratingValue": restaurantData.rating,
          "reviewCount": restaurantData.reviewCount || 0
        } : null,
        "image": restaurantData.image || ogImage
      })}
    </script>
  {/if}
  
  <!-- Additional Schema for Article -->
  {#if pageType === 'article' && articleData}
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": articleData.title || pageTitle,
        "description": articleData.description || metaDescription,
        "image": articleData.image || ogImage,
        "author": {
          "@type": "Organization",
          "name": config.name,
          "url": `https://${config.domain}`
        },
        "publisher": {
          "@type": "Organization",
          "name": config.name,
          "logo": {
            "@type": "ImageObject",
            "url": `https://${config.domain}/logo.png`
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
      })}
    </script>
  {/if}
  
  <!-- Breadcrumb Schema -->
  {#if pageType !== 'homepage'}
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Utama",
            "item": `https://${config.domain}`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": pageType === 'article' ? 'Artikel' : pageType === 'restaurant' ? 'Restoran' : 'Halaman',
            "item": canonicalUrl
          }
        ]
      })}
    </script>
  {/if}
</svelte:head>
