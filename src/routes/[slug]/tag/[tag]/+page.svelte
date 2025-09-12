<script>
  import { page } from '$app/stores';
  import NavigationMenu from '$lib/components/NavigationMenu.svelte';
  import TrendingSidebar from '$lib/components/Sidebar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import FoodCard from '$lib/components/FoodCard.svelte';
  import { formatDateMalay } from '$lib/dateUtils';

  /** @type {import('./$types').PageData} */
  export let data;
  
  const articles = data.articles;
  const tag = data.tag;
  const websiteSlug = data.websiteSlug;

  // Format tarikh dari ISO string ke format bahasa Melayu
  function formatDate(isoString) {
    return formatDateMalay(isoString);
  }

  // Kategori yang diformat untuk paparan
  function formatCategory(category) {
    return category.toUpperCase();
  }

  // Fungsi untuk mengesahkan URL gambar
  const validateImageUrl = (url) => {
    return url && typeof url === 'string' && url.startsWith('https://') 
      ? url 
      : 'https://via.placeholder.com/800x500'; // Gambar sandaran
  };
</script>


<main class="bg-gray-50 min-h-screen">

  <div class="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
    <!-- Breadcrumb -->
    <nav class="mb-6">
      <ol class="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-gray-600">
        <li><a href="/" class="hover:text-primary-500 transition-colors">Utama</a></li>
        <li class="text-gray-400">/</li>
        <li>
          <a href="/{websiteSlug}" class="hover:text-primary-500 transition-colors">
            {websiteSlug.charAt(0).toUpperCase() + websiteSlug.slice(1)}
          </a>
        </li>
        <li class="text-gray-400">/</li>
        <li class="text-gray-800 font-medium">Tag: {tag}</li>
      </ol>
    </nav>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
      <!-- Main Content -->
      <div class="lg:col-span-2">
        <!-- Page Header -->
        <div class="mb-8">
          <h1 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Artikel dengan Tag: <span class="text-primary-500">{tag}</span>
          </h1>
          <p class="text-gray-600 text-lg">
            {articles.length} artikel ditemui dengan tag "{tag}"
          </p>
        </div>

        <!-- Articles Grid -->
        {#if articles && articles.length > 0}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {#each articles as article}
              <article class="bg-white rounded-lg shadow-sm overflow-hidden transition-transform transform hover:scale-105">
                <a href="/{websiteSlug}/article/{article.slug || article.id}" class="block">
                  <div class="relative h-48">
                    <img 
                      src={validateImageUrl(article.thumbnail_image || article.main_image)} 
                      alt={article.title}
                      class="w-full h-full object-cover"
                      on:error={(e) => e.target.src = 'https://via.placeholder.com/800x500'}
                    />
                    <div class="absolute top-0 left-0 bg-primary-500 text-white text-xs font-bold px-3 py-1 m-2 rounded">
                      {formatCategory(article.category)}
                    </div>
                  </div>
                  
                  <div class="p-4">
                    <h2 class="text-lg font-bold text-gray-800 mb-2 hover:text-primary-500 transition-colors line-clamp-2">
                      {article.title}
                    </h2>
                    
                    <p class="text-gray-600 text-sm mb-3 line-clamp-3">
                      {article.summary}
                    </p>
                    
                    <div class="flex items-center text-xs text-gray-500 mb-3">
                      <span>{article.author}</span>
                      <span class="mx-2">•</span>
                      <span>{formatDate(article.published_at)}</span>
                      <span class="mx-2">•</span>
                      <span>{article.minute_read} min baca</span>
                    </div>

                    <!-- Tags -->
                    {#if article.tags && article.tags.length > 0}
                      <div class="flex flex-wrap gap-1">
                        {#each article.tags.slice(0, 3) as tagName}
                          <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            {tagName}
                          </span>
                        {/each}
                        {#if article.tags.length > 3}
                          <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            +{article.tags.length - 3}
                          </span>
                        {/if}
                      </div>
                    {/if}
                  </div>
                </a>
              </article>
            {/each}
          </div>
        {:else}
          <div class="bg-white rounded-lg shadow-sm p-8 text-center">
            <div class="mb-4">
              <svg class="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">Tiada Artikel</h2>
            <p class="text-gray-600 mb-6">
              Tiada artikel yang ditemui dengan tag "{tag}"
            </p>
            <a 
              href="/{websiteSlug}" 
              class="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              <span>Kembali ke Artikel</span>
            </a>
          </div>
        {/if}
      </div>
      
             <!-- Sidebar -->
       <div class="lg:col-span-1">
         
         <TrendingSidebar />
       </div>
    </div>
  </div>
</main>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
