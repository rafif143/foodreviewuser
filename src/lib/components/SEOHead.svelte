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
  
  // Generate URLs
  $: canonicalUrl = customUrl || `https://${config.domain || 'foodreviewuser.netlify.app'}`;
  $: ogImage = customImage || `https://${config.domain || 'foodreviewuser.netlify.app'}/og-image-${pageType}.jpg`;
  $: twitterImage = customImage || `https://${config.domain || 'foodreviewuser.netlify.app'}/twitter-image-${pageType}.jpg`;
  
  // Dynamic favicon from database
  $: faviconUrl = websiteData?.logo_url || `https://${config.domain || 'foodreviewuser.netlify.app'}/favicon.svg`;
  $: appleTouchIcon = websiteData?.logo_url || `https://${config.domain || 'foodreviewuser.netlify.app'}/favicon.svg`;
  
  // Coordinates for Kota Bharu, Kelantan
  $: coordinates = config.coordinates || '6.1254,102.2386';
  
  // Function to clean JSON schema (remove null/undefined values and sanitize strings)
  function cleanJsonSchema(obj) {
    if (obj === null || obj === undefined) return undefined;
    if (typeof obj === 'string') {
      // Sanitize string: remove control characters, escape quotes, and handle newlines
      return obj
        .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
        .replace(/\\/g, '\\\\') // Escape backslashes
        .replace(/"/g, '\\"') // Escape quotes
        .replace(/\n/g, ' ') // Replace newlines with spaces
        .replace(/\r/g, '') // Remove carriage returns
        .replace(/\t/g, ' ') // Replace tabs with spaces
        .replace(/\s+/g, ' ') // Normalize multiple spaces
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
  
  // Validation function for schema markup
  function validateSchema(schema) {
    if (!schema || typeof schema !== 'object') return false;
    const required = ['@context', '@type'];
    return required.every(field => schema[field]);
  }
  
  // Safe JSON stringify function
  function safeJsonStringify(obj) {
    try {
      const cleaned = cleanJsonSchema(obj);
      if (!validateSchema(cleaned)) {
        console.warn('Invalid schema markup:', cleaned);
        // Return minimal valid schema if invalid
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": config.name || 'Kelantan Food Review',
          "url": canonicalUrl
        }, null, 2);
      }
      return JSON.stringify(cleaned, null, 2);
    } catch (error) {
      console.error('JSON stringify error:', error);
      // Return minimal valid schema if error
      return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": config.name || 'Kelantan Food Review',
        "url": canonicalUrl
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
    "url": restaurantData.website || canonicalUrl,
    "servesCuisine": config.localCuisine || ['Nasi Kerabu', 'Ayam Percik', 'Laksa Kelantan'],
    "priceRange": restaurantData.priceRange || "$$",
    "openingHours": restaurantData.openingHours || [
      "Mo-Su 08:00-22:00"
    ],
    "aggregateRating": restaurantData.rating ? {
      "@type": "AggregateRating",
      "ratingValue": restaurantData.rating,
      "reviewCount": restaurantData.reviewCount || 1,
      "bestRating": 5,
      "worstRating": 1
    } : undefined,
    "image": restaurantData.image || ogImage,
    "hasMenu": restaurantData.menuUrl ? {
      "@type": "Menu",
      "url": restaurantData.menuUrl
    } : undefined
  } : null;
  
  $: restaurantJsonString = restaurantSchema ? safeJsonStringify(restaurantSchema) : '';
  
  // Article schema
  $: articleSchema = pageType === 'article' && articleData ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": articleData.title || pageTitle,
    "description": articleData.summary || metaDescription,
    "image": [
      articleData.mainImage || articleData.thumbnailImage || ogImage
    ],
    "author": {
      "@type": "Organization",
      "name": config.name || 'Kelantan Food Review',
      "url": canonicalUrl.split('/').slice(0, 3).join('/')
    },
    "publisher": {
      "@type": "Organization",
      "name": config.name || 'Kelantan Food Review',
      "logo": {
        "@type": "ImageObject",
        "url": websiteData?.logo_url || faviconUrl,
        "width": 180,
        "height": 180
      },
      "url": canonicalUrl.split('/').slice(0, 3).join('/')
    },
    "datePublished": articleData.publishedDate || new Date().toISOString(),
    "dateModified": articleData.modifiedDate || new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "articleSection": articleData.category || "Kuliner",
    "keywords": keywords,
    "wordCount": articleData.wordCount || 500,
    "inLanguage": "ms-MY"
  } : null;
  
  $: articleJsonString = articleSchema ? safeJsonStringify(articleSchema) : '';
  
  // Breadcrumb schema
  $: breadcrumbItems = [];
  
  $: {
    // Always add home
    breadcrumbItems = [{
      "@type": "ListItem",
      "position": 1,
      "name": "Utama",
      "item": canonicalUrl.split('/').slice(0, 3).join('/')
    }];
    
    // Add category if exists
    if (pageType === 'article' && articleData.category) {
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": 2,
        "name": articleData.category,
        "item": `${canonicalUrl.split('/').slice(0, 3).join('/')}/kategori/${articleData.category.toLowerCase()}`
      });
    } else if (pageType === 'restaurant') {
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Restoran",
        "item": `${canonicalUrl.split('/').slice(0, 3).join('/')}/restoran`
      });
    }
    
    // Add current page if not homepage
    if (pageType !== 'homepage') {
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": breadcrumbItems.length + 1,
        "name": customTitle || pageTitle.split(' - ')[0],
        "item": canonicalUrl
      });
    }
  }
  
  $: breadcrumbSchema = breadcrumbItems.length > 1 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems
  } : null;
  
  $: breadcrumbJsonString = breadcrumbSchema ? safeJsonStringify(breadcrumbSchema) : '';
  
  // Local Business schema for homepage
  $: localBusinessSchema = pageType === 'homepage' ? {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": config.name || 'Kelantan Food Review',
    "description": metaDescription,
    "url": canonicalUrl,
    "logo": websiteData?.logo_url || faviconUrl,
    "image": ogImage,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": config.capital || 'Kota Bharu',
      "addressRegion": config.location || 'Kelantan',
      "addressCountry": "Malaysia"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": coordinates.split(',')[0],
      "longitude": coordinates.split(',')[1]
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": coordinates.split(',')[0],
        "longitude": coordinates.split(',')[1]
      },
      "geoRadius": "50000"
    },
    "knowsAbout": config.localCuisine || ['Nasi Kerabu', 'Ayam Percik', 'Laksa Kelantan'],
    "sameAs": [
      `https://facebook.com/${config.slug}`,
      `https://instagram.com/${config.slug}`,
      `https://twitter.com/${config.slug}`
    ]
  } : null;
  
  $: localBusinessJsonString = localBusinessSchema ? safeJsonStringify(localBusinessSchema) : '';
  
  // Validation warnings
  $: {
    if (schemaMarkup && !validateSchema(schemaMarkup)) {
      console.warn('Main schema validation failed:', schemaMarkup);
    }
    if (restaurantSchema && !validateSchema(restaurantSchema)) {
      console.warn('Restaurant schema validation failed:', restaurantSchema);
    }
    if (articleSchema && !validateSchema(articleSchema)) {
      console.warn('Article schema validation failed:', articleSchema);
    }
  }
</script>

<svelte:head>
  <!-- Viewport and Encoding -->
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0" />
  
  <!-- Security Headers -->
  <meta http-equiv="X-Content-Type-Options" content="nosniff" />
  <meta http-equiv="X-Frame-Options" content="DENY" />
  <meta http-equiv="X-XSS-Protection" content="1; mode=block" />
  <meta name="referrer" content="origin-when-cross-origin" />
  
  <!-- Basic Meta Tags -->
  <title>{pageTitle}</title>
  <meta name="description" content={metaDescription} />
  <meta name="keywords" content={keywords} />
  <meta name="author" content={config.name || 'Kelantan Food Review'} />
  <meta name="robots" content="index, follow" />
  <meta name="googlebot" content="index, follow" />
  <meta name="language" content="ms" />
  <meta name="geo.region" content="MY-{websiteId.toString().padStart(2, '0')}" />
  <meta name="geo.placename" content={config.capital || 'Kota Bharu'} />
  <meta name="geo.position" content={coordinates} />
  <meta name="ICBM" content={coordinates} />
  
  <!-- Canonical URL -->
  <link rel="canonical" href={canonicalUrl} />
  
  <!-- Preload Critical Resources -->
  <link rel="preload" href={faviconUrl} as="image" type="image/svg+xml" />
  <link rel="dns-prefetch" href="//fonts.googleapis.com" />
  <link rel="dns-prefetch" href="//fonts.gstatic.com" />
  
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
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:site_name" content={config.name || 'Kelantan Food Review'} />
  <meta property="og:locale" content="ms_MY" />
  
  <!-- Article specific Open Graph -->
  {#if pageType === 'article' && articleData}
    <meta property="article:author" content={config.name || 'Kelantan Food Review'} />
    <meta property="article:publisher" content={config.name || 'Kelantan Food Review'} />
    <meta property="article:section" content={articleData.category || 'Kuliner'} />
    {#if articleData.publishedDate}
      <meta property="article:published_time" content={articleData.publishedDate} />
    {/if}
    {#if articleData.modifiedDate}
      <meta property="article:modified_time" content={articleData.modifiedDate} />
    {/if}
    {#if articleData.tags && Array.isArray(articleData.tags)}
      {#each articleData.tags as tag}
        <meta property="article:tag" content={tag} />
      {/each}
    {/if}
  {/if}
  
  <!-- Restaurant specific Open Graph -->
  {#if pageType === 'restaurant' && restaurantData}
    <meta property="business:contact_data:street_address" content={restaurantData.address || ''} />
    <meta property="business:contact_data:locality" content={config.capital || 'Kota Bharu'} />
    <meta property="business:contact_data:region" content={config.location || 'Kelantan'} />
    <meta property="business:contact_data:country_name" content="Malaysia" />
    {#if restaurantData.phone}
      <meta property="business:contact_data:phone_number" content={restaurantData.phone} />
    {/if}
  {/if}
  
  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={metaDescription} />
  <meta name="twitter:image" content={twitterImage} />
  <meta name="twitter:image:alt" content={`${pageTitle} - ${config.name || 'Kelantan Food Review'}`} />
  <meta name="twitter:site" content="@{config.slug || 'kelantan-food'}" />
  <meta name="twitter:creator" content="@{config.slug || 'kelantan-food'}" />
  
  <!-- Additional Meta Tags -->
  <meta name="theme-color" content="#dc2626" />
  <meta name="msapplication-TileColor" content="#dc2626" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="default" />
  <meta name="apple-mobile-web-app-title" content={config.name || 'Kelantan Food Review'} />
  
  <!-- Additional meta for better SEO -->
  <meta name="format-detection" content="telephone=no" />
  <meta name="mobile-web-app-capable" content="yes" />
  <meta name="application-name" content={config.name || 'Kelantan Food Review'} />
  <meta name="msapplication-tooltip" content={metaDescription} />
  <meta name="msapplication-starturl" content={canonicalUrl.split('/').slice(0, 3).join('/')} />
  
  <!-- Structured Data (Schema.org) - Main Schema -->
  <script type="application/ld+json">
    {@html schemaJsonString}
  </script>
  
  <!-- Local Business Schema for Homepage -->
  {#if localBusinessJsonString}
    <script type="application/ld+json">
      {@html localBusinessJsonString}
    </script>
  {/if}
  
  <!-- Additional Schema for Restaurant -->
  {#if restaurantJsonString}
    <script type="application/ld+json">
      {@html restaurantJsonString}
    </script>
  {/if}
  
  <!-- Additional Schema for Article -->
  {#if articleJsonString}
    <script type="application/ld+json">
      {@html articleJsonString}
    </script>
  {/if}
  
  <!-- Breadcrumb Schema -->
  {#if breadcrumbJsonString}
    <script type="application/ld+json">
      {@html breadcrumbJsonString}
    </script>
  {/if}
</svelte:head>