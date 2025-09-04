<!-- SEO Templates Component untuk H1, H2, H3 structure -->
<script>
  import { getSEOConfig, generateH1, generateH2 } from '$lib/seo-config.js';
  
  export let websiteId = 1;
  export let pageType = 'homepage';
  export let customH1 = '';
  export let customH2 = '';
  export let customH3 = '';
  export let showBreadcrumb = true;
  export let breadcrumbItems = [];
  
  $: config = getSEOConfig(websiteId);
  $: h1Text = generateH1(websiteId, pageType, customH1);
  $: h2Text = generateH2(websiteId, pageType, customH2);
  
  // Default breadcrumb items
  $: defaultBreadcrumbItems = [
    { name: 'Utama', url: '/' },
    { name: pageType === 'article' ? 'Artikel' : pageType === 'restaurant' ? 'Restoran' : 'Halaman', url: '#' }
  ];
  $: finalBreadcrumbItems = breadcrumbItems.length > 0 ? breadcrumbItems : defaultBreadcrumbItems;
</script>

<!-- Breadcrumb Navigation -->
{#if showBreadcrumb}
  <nav class="flex items-center space-x-2 text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
    {#each finalBreadcrumbItems as item, index}
      {#if index > 0}
        <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
        </svg>
      {/if}
      {#if item.url === '#'}
        <span class="text-gray-900 font-medium">{item.name}</span>
      {:else}
        <a href={item.url} class="hover:text-red-600 transition-colors">{item.name}</a>
      {/if}
    {/each}
  </nav>
{/if}

<!-- H1 Title -->
<h1 class="text-2xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
  {h1Text}
</h1>

<!-- H2 Subtitle -->
{#if h2Text}
  <h2 class="text-lg md:text-2xl font-semibold text-gray-700 mb-6 text-center">
    {h2Text}
  </h2>
{/if}

<!-- H3 Section Title (jika ada custom H3) -->
{#if customH3}
  <h3 class="text-base md:text-xl font-semibold text-gray-800 mb-4">
    {customH3}
  </h3>
{/if}

<!-- SEO Content Structure Examples -->
{#if pageType === 'homepage'}
  <div class="seo-content-structure">
    <!-- Hero Section -->
    <section class="hero-section mb-12">
      <h2 class="text-xl md:text-3xl font-bold text-gray-900 mb-4">
        Temukan {config.signatureDish} dan Makanan Tradisional {config.location}
      </h2>
      <p class="text-base md:text-lg text-gray-600 mb-6">
        Panduan lengkap untuk menemukan restoran terbaik, makanan tradisional, dan tempat makan enak di {config.capital}.
      </p>
    </section>
    
    <!-- Popular Restaurants -->
    <section class="popular-restaurants mb-12">
      <h2 class="text-lg md:text-2xl font-bold text-gray-900 mb-6">
        Restoran Populer di {config.location}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Restaurant cards akan diisi dengan data dari database -->
      </div>
    </section>
    
    <!-- Traditional Food -->
    <section class="traditional-food mb-12">
      <h2 class="text-lg md:text-2xl font-bold text-gray-900 mb-6">
        Makanan Tradisional {config.location}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {#each config.localCuisine as dish}
          <div class="food-item">
            <h3 class="text-base md:text-lg font-semibold text-gray-800 mb-2">
              {dish}
            </h3>
            <p class="text-sm md:text-base text-gray-600">
              Makanan tradisional khas {config.location} yang wajib dicoba.
            </p>
          </div>
        {/each}
      </div>
    </section>
    
    <!-- Local Events -->
    <section class="local-events mb-12">
      <h2 class="text-lg md:text-2xl font-bold text-gray-900 mb-6">
        Acara Kuliner di {config.location}
      </h2>
      <p class="text-sm md:text-base text-gray-600 mb-4">
        Temukan acara kuliner, festival makanan, dan event menarik di {config.capital}.
      </p>
    </section>
  </div>
{/if}

{#if pageType === 'article'}
  <div class="seo-content-structure">
    <!-- Article Meta -->
    <div class="article-meta mb-6">
      <div class="flex items-center space-x-4 text-sm text-gray-500">
        <span>📅 {new Date().toLocaleDateString('ms-MY')}</span>
        <span>👤 {config.name}</span>
        <span>⏱️ 5 min baca</span>
      </div>
    </div>
    
    <!-- Article Content Structure -->
    <article class="prose prose-lg max-w-none">
      <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">
        Pengenalan
      </h2>
      <p class="text-base md:text-lg text-gray-700 mb-6">
        Artikel ini akan membahas tentang kuliner dan tempat makan terbaik di {config.location}.
      </p>
      
      <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">
        Restoran Terbaik di {config.capital}
      </h2>
      <p class="text-base md:text-lg text-gray-700 mb-6">
        Berikut adalah daftar restoran terbaik yang wajib dikunjungi di {config.capital}.
      </p>
      
      <h3 class="text-lg md:text-xl font-semibold text-gray-800 mb-3">
        1. Restoran Tradisional
      </h3>
      <p class="text-base md:text-lg text-gray-700 mb-4">
        Restoran yang menyajikan makanan tradisional {config.location}.
      </p>
      
      <h3 class="text-lg md:text-xl font-semibold text-gray-800 mb-3">
        2. Restoran Modern
      </h3>
      <p class="text-base md:text-lg text-gray-700 mb-4">
        Restoran dengan konsep modern yang menyajikan makanan {config.location}.
      </p>
      
      <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">
        Tips Makan di {config.location}
      </h2>
      <p class="text-base md:text-lg text-gray-700 mb-6">
        Beberapa tips untuk mendapatkan pengalaman makan terbaik di {config.capital}.
      </p>
      
      <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">
        Kesimpulan
      </h2>
      <p class="text-base md:text-lg text-gray-700 mb-6">
        {config.location} menawarkan berbagai pilihan kuliner yang menarik untuk dieksplorasi.
      </p>
    </article>
  </div>
{/if}

{#if pageType === 'restaurant'}
  <div class="seo-content-structure">
    <!-- Restaurant Info -->
    <div class="restaurant-info mb-8">
      <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">
        Informasi Restoran
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">
            Alamat
          </h3>
          <p class="text-base text-gray-600">
            {config.capital}, {config.location}
          </p>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">
            Jam Operasi
          </h3>
          <p class="text-base text-gray-600">
            Buka setiap hari
          </p>
        </div>
      </div>
    </div>
    
    <!-- Menu Highlights -->
    <div class="menu-highlights mb-8">
      <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">
        Menu Unggulan
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each config.localCuisine.slice(0, 4) as dish}
          <div class="menu-item">
            <h3 class="text-base font-semibold text-gray-800 mb-1">
              {dish}
            </h3>
            <p class="text-sm text-gray-600">
              Makanan khas {config.location}
            </p>
          </div>
        {/each}
      </div>
    </div>
    
    <!-- Reviews Section -->
    <div class="reviews-section mb-8">
      <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">
        Ulasan Pelanggan
      </h2>
      <p class="text-base text-gray-600">
        Baca ulasan dari pelanggan yang telah mengunjungi restoran ini.
      </p>
    </div>
  </div>
{/if}

<style>
  .seo-content-structure {
    max-width: 4xl;
    margin: 0 auto;
  }
  
  .prose h2 {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  
  .prose h3 {
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }
  
  .prose p {
    margin-bottom: 1rem;
    line-height: 1.7;
  }
</style>
