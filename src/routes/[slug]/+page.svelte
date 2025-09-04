<script>
  import { goto } from '$app/navigation';
  import FeaturedArticles from '$lib/components/PopularArticles.svelte';
  import VideoShowcase from '$lib/components/VideoShowcase.svelte';
  import RecentPost from '$lib/components/RecentPost.svelte';
  import TrendingSidebar from '$lib/components/Sidebar.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import AdBanner from '$lib/components/AdBanner.svelte';
  import SEOHead from '$lib/components/SEOHead.svelte';
  import SEOTemplates from '$lib/components/SEOTemplates.svelte';

  /** @type {import('./$types').PageData} */
  export let data;
  
  // SEO Configuration
  $: websiteId = data.website.id || 1;
  
  // Fungsi carian
  let searchQuery = '';
  
  function handleSearch() {
    if (searchQuery.trim()) {
      // Alihkan ke halaman carian dengan query
      goto(`/${data.website.slug}/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  }
</script>

<!-- SEO Head Component -->
<SEOHead 
  {websiteId}
  pageType="homepage"
  customTitle="Panduan Kuliner Terbaik"
  customDescription="Temukan restoran terbaik, resepi tradisional, dan acara kuliner. Panduan lengkap untuk makanan halal dan tempat makan enak."
  customKeywords={['restoran terbaik', 'makanan tradisional', 'tempat makan halal', 'kuliner', 'resepi']}
/>

<main class="bg-gradient-to-br from-gray-50 via-white to-red-50">
  <!-- Bahagian Banner Iklan -->
  <AdBanner websiteSlug={data.website.slug} />
  
  <!-- Bahagian Artikel Pilihan -->
  <PageHeader 
    title="Artikel Terpopuler"
    description="Artikel terbaik yang sedang trending dalam komuniti kuliner Kelantan"
    icon="book"
  />

  <!-- Bahagian Carian -->
  <section class="py-12 bg-gradient-to-r from-red-50 to-orange-50">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-xl md:text-3xl font-bold text-gray-800 mb-4">Cari Artikel Kuliner</h2>
        <p class="text-gray-600 mb-8 text-sm md:text-base">Temui artikel, resipi, dan ulasan kuliner kegemaran anda</p>
        
        <div class="relative max-w-2xl mx-auto">
          <form on:submit|preventDefault={() => handleSearch()}>
            <div class="relative">
              <input
                type="text"
                bind:value={searchQuery}
                placeholder="Cari artikel, resipi, atau kategori..."
                class="w-full px-6 py-4 pl-14 pr-20 text-lg border-2 border-gray-200 rounded-2xl focus:border-red-500 focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl"
              />
              <div class="absolute left-5 top-1/2 transform -translate-y-1/2">
                <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <button
                type="submit"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Cari
              </button>
            </div>
          </form>
          

        </div>
      </div>
    </div>
  </section>

  <!-- Artikel Popular -->
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <!-- Desktop Layout -->
      <div class="hidden lg:block">
        <FeaturedArticles articles={data.popularArticles} websiteSlug={data.website.slug} />
      </div>

      <!-- Mobile Pinterest Layout -->
      <div class="lg:hidden">
        <div class="columns-2 gap-3">
          {#each data.popularArticles as article, index}
            <div class="break-inside-avoid mb-3">
              <div class="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transform hover:scale-105 transition-all duration-300">
                <!-- Image -->
                <div class="relative">
                  <img 
                    src={article.thumbnail_image || 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&h=400&fit=crop'} 
                    alt={article.title}
                    class="w-full h-32 object-cover"
                    loading="lazy"
                  />
                  <div class="absolute top-2 left-2">
                    <span class="px-2 py-1 text-[10px] font-semibold text-white bg-red-600 rounded-full">
                      {article.category?.toUpperCase() || 'ARTIKEL'}
                    </span>
                  </div>
                </div>
                
                <!-- Content -->
                <div class="p-3">
                  <h3 class="text-sm font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                    <a href="/{data.website.slug}/article/{article.slug || article.id}" class="hover:text-red-600 transition-colors">
                      {article.title}
                    </a>
                  </h3>
                  
                  {#if article.summary}
                    <p class="text-gray-600 text-xs mb-2 line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>
                  {/if}
                  
                  <div class="flex items-center justify-between text-[10px] text-gray-500">
                    <span class="truncate">{article.author || 'Pasukan Kelantan Food'}</span>
                    <span class="ml-2 flex-shrink-0">{article.minute_read || 5} min</span>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>
  
  <!-- Video Rawak -->
  <section class="py-16 bg-gradient-to-br from-red-50 to-orange-50">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Kandungan Utama -->
        <div class="lg:col-span-3">
          <div class="text-center mb-12">
            <div class="inline-block p-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full mb-6">
              <div class="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <h2 class="text-2xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-orange-600 bg-clip-text text-transparent mb-4">
              Ulasan Makanan
            </h2>
            <div class="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto rounded-full mb-6"></div>
            <p class="text-gray-600 max-w-3xl mx-auto text-sm md:text-lg leading-relaxed">
              Tonton video-video menarik tentang kuliner dan tempat makan terbaik di Kelantan
            </p>
          </div>
          <VideoShowcase videos={data.randomVideos} websiteSlug={data.website.slug} />
        </div>
        
        <!-- Iklan Sidebar -->
        <div class="lg:col-span-1">
          <div class="sticky top-4">
            <AdBanner websiteSlug={data.website.slug} variant="vertical" />
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Kawasan Kandungan Utama -->
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <div class="inline-block p-2 bg-gradient-to-r from-red-100 to-orange-100 rounded-full mb-6">
          <div class="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
        </div>
        <h2 class="text-2xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-red-600 bg-clip-text text-transparent mb-4">
          Kandungan Terbaru
        </h2>
        <div class="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto rounded-full mb-6"></div>
        <p class="text-gray-600 max-w-3xl mx-auto text-sm md:text-lg leading-relaxed">
          Artikel dan ulasan terbaru dari pasukan {data.website.name}
        </p>
      </div>
      
      <!-- Desktop Layout -->
      <div class="hidden lg:grid grid-cols-3 gap-8">
        <!-- Kandungan Utama -->
        <div class="col-span-2">
          <div class="bg-gradient-to-br from-white to-red-50 p-8 rounded-2xl shadow-xl border border-red-100 transform hover:scale-105 transition-all duration-300">
                         <RecentPost articles={data.latestArticles} websiteSlug={data.website.slug} />
          </div>
        </div>
        
        <!-- Bar Sisi -->
        <div class="col-span-1">
          <div class="bg-gradient-to-br from-white to-orange-50 p-8 rounded-2xl shadow-xl border border-orange-100 transform hover:scale-105 transition-all duration-300">
                         <TrendingSidebar articles={data.trendingArticles} websiteSlug={data.website.slug} />
          </div>
        </div>
      </div>

      <!-- Mobile Pinterest Layout -->
      <div class="lg:hidden">
        <!-- Trending Sidebar untuk Mobile -->
        <div class="mb-8">
          <div class="bg-gradient-to-br from-white to-orange-50 p-6 rounded-2xl shadow-xl border border-orange-100">
            <TrendingSidebar articles={data.trendingArticles} websiteSlug={data.website.slug} />
          </div>
        </div>
        
        <!-- Pinterest Style Grid untuk Recent Posts -->
        <div class="columns-2 gap-3">
          {#each data.latestArticles as article, index}
            <div class="break-inside-avoid mb-3">
              <div class="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transform hover:scale-105 transition-all duration-300">
                <!-- Image -->
                <div class="relative">
                  <img 
                    src={article.thumbnail_image || 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&h=400&fit=crop'} 
                    alt={article.title}
                    class="w-full h-32 object-cover"
                    loading="lazy"
                  />
                  <div class="absolute top-2 left-2">
                    <span class="px-2 py-1 text-[10px] font-semibold text-white bg-red-600 rounded-full">
                      {article.category?.toUpperCase() || 'ARTIKEL'}
                    </span>
                  </div>
                </div>
                
                <!-- Content -->
                <div class="p-3">
                  <h3 class="text-sm font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                    <a href="/{data.website.slug}/article/{article.slug || article.id}" class="hover:text-red-600 transition-colors">
                      {article.title}
                    </a>
                  </h3>
                  
                  {#if article.summary}
                    <p class="text-gray-600 text-xs mb-2 line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>
                  {/if}
                  
                  <div class="flex items-center justify-between text-[10px] text-gray-500">
                    <span class="truncate">{article.author || 'Pasukan Kelantan Food'}</span>
                    <span class="ml-2 flex-shrink-0">{article.minute_read || 5} min</span>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- Bahagian Seruan Tindakan -->
  <section class="py-20 bg-gradient-to-br from-red-600 to-orange-600">
    <div class="container mx-auto px-4">
      <div class="text-center">
        <div class="inline-block p-2 bg-white/20 rounded-full mb-6">
          <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
        </div>
        <h2 class="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          Sertai Komuniti Kami
        </h2>
        <div class="w-32 h-1 bg-white mx-auto rounded-full mb-6"></div>
        <p class="text-white/90 max-w-3xl mx-auto text-sm md:text-lg lg:text-xl leading-relaxed mb-8">
          Dapatkan kemas kini terbaru tentang ulasan makanan, resipi, dan acara kuliner eksklusif. 
          Sertailah beribu-ribu pencinta kuliner yang lain!
        </p>
        <div class="flex flex-wrap justify-center gap-3 md:gap-4">
          <a href="/{data.website.slug}/about" class="bg-white hover:bg-gray-100 text-red-600 font-bold py-2 px-4 md:py-4 md:px-8 rounded-lg md:rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-xs md:text-base">
            Pelajari Lebih Lanjut
          </a>
          <a href="/{data.website.slug}/contact" class="bg-transparent hover:bg-white/10 text-white font-bold py-2 px-4 md:py-4 md:px-8 rounded-lg md:rounded-xl border-2 border-white hover:border-white/80 transition-all duration-300 transform hover:scale-105 text-xs md:text-base">
            Hubungi Kami
          </a>
        </div>
      </div>
    </div>
  </section>
</main>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>