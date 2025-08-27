<script>
  import { page } from '$app/stores';
  import NavigationMenu from '$lib/components/NavigationMenu.svelte';
  import TrendingSidebar from '$lib/components/Sidebar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { goto } from '$app/navigation';

  /** @type {import('./$types').PageData} */
  export let data;
  
  const articles = data.articles;
  const searchQuery = data.searchQuery;
  const websiteSlug = data.websiteSlug;
  const totalResults = data.totalResults;
  
  // Format tanggal dari ISO string ke format yang diinginkan
  function formatDate(isoString) {
    const date = new Date(isoString);
    const month = date.toLocaleString('en-US', { month: 'long' }).toUpperCase();
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }
  
  // Kategori yang diformat untuk tampilan
  function formatCategory(category) {
    return category.toUpperCase();
  }
  
  // Fungsi untuk memvalidasi URL gambar
  const validateImageUrl = (url) => {
    return url && typeof url === 'string' && url.startsWith('https://') 
      ? url 
      : 'https://via.placeholder.com/800x500';
  };
  
  // Fungsi untuk highlight search query dalam teks
  function highlightText(text, query) {
    if (!query || !text) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
  }
  
  // Fungsi untuk melakukan pencarian baru
  function performNewSearch(event) {
    event.preventDefault();
    const newQuery = event.target.search.value.trim();
    if (newQuery) {
      goto(`/${websiteSlug}/search?q=${encodeURIComponent(newQuery)}`);
    }
  }
</script>

<svelte:head>
  <title>Hasil Pencarian: {searchQuery} - {websiteSlug.charAt(0).toUpperCase() + websiteSlug.slice(1)}</title>
  <meta name="description" content="Hasil pencarian untuk '{searchQuery}' di {websiteSlug.charAt(0).toUpperCase() + websiteSlug.slice(1)}" />
</svelte:head>

<NavigationMenu />

<main class="bg-gray-50 min-h-screen">
  <div class="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
    <!-- Breadcrumb -->
    <nav class="mb-6">
      <ol class="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-gray-600">
        <li><a href="/" class="hover:text-primary-500 transition-colors">Home</a></li>
        <li class="text-gray-400">/</li>
        <li>
          <a href="/{websiteSlug}" class="hover:text-primary-500 transition-colors">
            {websiteSlug.charAt(0).toUpperCase() + websiteSlug.slice(1)}
          </a>
        </li>
        <li class="text-gray-400">/</li>
        <li class="text-gray-800 font-medium">Search: {searchQuery}</li>
      </ol>
    </nav>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
      <!-- Main Content -->
      <div class="lg:col-span-2">
        <!-- Search Header -->
        <div class="mb-8">
          <h1 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Hasil Pencarian: <span class="text-primary-500">"{searchQuery}"</span>
          </h1>
          <p class="text-gray-600 text-lg mb-6">
            {totalResults} artikel ditemukan
          </p>
          
          <!-- Search Form -->
          <form on:submit={performNewSearch} class="max-w-2xl">
            <div class="relative">
              <input
                type="text"
                name="search"
                placeholder="Cari artikel lain..."
                value={searchQuery}
                class="w-full px-6 py-3 pl-14 pr-20 text-lg border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-all duration-300 shadow-lg"
              />
              <div class="absolute left-5 top-1/2 transform -translate-y-1/2">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <button
                type="submit"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-4 py-1.5 rounded-lg font-semibold transition-all duration-300"
              >
                Cari
              </button>
            </div>
          </form>
        </div>

        <!-- Search Results -->
        {#if articles && articles.length > 0}
          <div class="space-y-6">
            {#each articles as article}
              <article class="bg-white rounded-lg shadow-sm overflow-hidden transition-transform transform hover:scale-105">
                <a href="/{websiteSlug}/article/{article.slug || article.id}" class="block">
                  <div class="flex flex-col md:flex-row">
                    <!-- Image -->
                    <div class="md:w-1/3">
                      <div class="relative h-48 md:h-full">
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
                    </div>
                    
                    <!-- Content -->
                    <div class="md:w-2/3 p-6">
                      <h2 class="text-xl font-bold text-gray-800 mb-3 hover:text-primary-500 transition-colors line-clamp-2">
                        {@html highlightText(article.title, searchQuery)}
                      </h2>
                      
                      <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                        {@html highlightText(article.summary || '', searchQuery)}
                      </p>
                      
                      <div class="flex items-center text-xs text-gray-500 mb-4">
                        <span>{article.author}</span>
                        <span class="mx-2">•</span>
                        <span>{formatDate(article.published_at)}</span>
                        <span class="mx-2">•</span>
                        <span>{article.minute_read} min read</span>
                      </div>


                    </div>
                  </div>
                </a>
              </article>
            {/each}
          </div>
        {:else if searchQuery}
          <!-- No Results -->
          <div class="bg-white rounded-lg shadow-sm p-12 text-center">
            <div class="mb-6">
              <svg class="w-20 h-20 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Tidak Ada Hasil</h2>
            <p class="text-gray-600 mb-6">
              Maaf, tidak ada artikel yang ditemukan untuk pencarian "{searchQuery}"
            </p>

          </div>
        {:else}
          <!-- Empty State -->
          <div class="bg-white rounded-lg shadow-sm p-12 text-center">
            <div class="mb-6">
              <svg class="w-20 h-20 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Mulai Pencarian</h2>
            <p class="text-gray-600 mb-6">
              Masukkan kata kunci untuk mencari artikel kuliner favorit Anda
            </p>
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

<Footer />

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
