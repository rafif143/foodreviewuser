<script>
  import FoodCard from '$lib/components/FoodCard.svelte';
  import AboutKelantanCard from '$lib/components/AboutKelantanCard.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import SEOHead from '$lib/components/SEOHead.svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  
  /** @type {import('./$types').PageData} */
  export let data;
  
  // SEO Configuration
  $: websiteId = data.website.id || 1;
  
  let articlesContainer;
  let loading = false;
  let offset = 0;
  let limit = 10;
  let articles = [];
  let allArticles = [];
  
  // Pagination
  let currentPage = 1;
  let articlesPerPage = 12;
  let totalArticles = 0;
  
  // Search functionality
  let searchQuery = '';
  
  // Format tanggal dari ISO string ke format yang diinginkan
  function formatDate(isoString) {
    const date = new Date(isoString);
    const month = date.toLocaleString('en-US', { month: 'long' }).toUpperCase();
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }
  
  // Konversi data artikel dari database ke format yang dibutuhkan oleh FoodCard
  function mapArticleData(article) {
    return {
      id: article.id,
      title: article.title,
      author: article.author,
      date: formatDate(article.published_at),
      description: article.summary,
      image: article.thumbnail_image,
      category: article.category,
      slug: article.slug,
      minute_read: article.minute_read,
      tags: article.tags || [],
      labels: article.labels || []
    };
  }
  
  // Pagination logic
  $: {
    if (allArticles.length > 0) {
      const startIndex = (currentPage - 1) * articlesPerPage;
      const endIndex = startIndex + articlesPerPage;
      articles = allArticles.slice(startIndex, endIndex);
    }
  }

  onMount(() => {
    // Inisialisasi artikel dari data yang diambil di +page.js
    allArticles = data.articles.map(mapArticleData);
    totalArticles = allArticles.length;
  });
  
  // Fungsi untuk memuat artikel lebih banyak
  async function loadMoreArticles() {
    if (loading) return;
    
    loading = true;
    offset += limit;
    
    try {
      const response = await fetch(`/api/articles?websiteId=${data.website.id}&category=events&offset=${offset}&limit=${limit}`);
      const newArticles = await response.json();
      
      if (newArticles.length > 0) {
        articles = [...articles, ...newArticles.map(mapArticleData)];
        
        // Sesuaikan tinggi kartu setelah artikel baru dimuat
        setTimeout(() => {
          const cards = articlesContainer?.querySelectorAll('article');
          if (cards) {
            let maxHeight = 0;
            cards.forEach(card => {
              const height = card.offsetHeight;
              if (height > maxHeight) maxHeight = height;
            });
            
            cards.forEach(card => {
              card.style.minHeight = `${maxHeight}px`;
            });
          }
        }, 100);
      }
    } catch (error) {
      console.error('Error loading more articles:', error);
    } finally {
      loading = false;
    }
  }

  // Search functionality
  function handleSearch() {
    if (searchQuery.trim()) {
      // Redirect ke halaman search dengan query
      goto(`/${data.website.slug}/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  }
  
  $: websiteSlug = $page.params.slug;
</script>

<!-- SEO Head Component untuk halaman kategori -->
<SEOHead 
  {websiteId}
  pageType="category"
  customTitle={`Event Terbaik di ${data.website.name}`}
  customDescription={`Temukan event dan acara kuliner terbaik di ${data.website.name}. Panduan lengkap dengan rekomendasi event menarik.`}
  customKeywords={['event kuliner', 'acara makanan', 'festival makanan', data.website.name.toLowerCase()]}
  customUrl={`https://foodreviewuser.netlify.app/${data.website.slug}/events`}
/>

<main class="bg-gradient-to-br from-gray-50 via-white to-red-50">
  
  <!-- Page Header -->
  <PageHeader 
    title="Artikel Acara"
    description="Temukan acara menarik dan festival terbaik di Kelantan untuk pengalaman yang tak terlupakan"
    icon="book"
    compact={true}
  />

  <!-- Search Section -->
  <section class="py-8 bg-gradient-to-r from-red-50 to-orange-50">
    <div class="container mx-auto px-4">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Cari Artikel Acara</h2>
        <p class="text-gray-600 mb-6">Temukan artikel, acara, dan festival kegemaran anda</p>
        
        <div class="relative">
          <form on:submit|preventDefault={() => handleSearch()}>
            <div class="relative">
              <input
                type="text"
                bind:value={searchQuery}
                placeholder="Cari artikel acara, festival, atau event..."
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
  
  <!-- Main Content Area -->
  <section class="py-16 bg-gradient-to-br from-red-50 to-orange-50" id="articles">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Mobile Pinterest Grid -->
          <div class="lg:hidden columns-2 gap-3" bind:this={articlesContainer}>
            {#each articles as article, index}
              <div class="break-inside-avoid mb-3">
                <div class="bg-white rounded-xl shadow-md overflow-hidden group">
                  <a href="/{websiteSlug}/article/{article.slug || article.id}" class="block">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      class="w-full {index % 3 === 0 ? 'h-40' : index % 3 === 1 ? 'h-32' : 'h-36'} object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </a>
                  <div class="p-3">
                    <div class="flex items-center gap-2 mb-2">
                      <span class="bg-gradient-to-r from-orange-100 to-red-100 text-orange-600 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-orange-200">
                        {article.category}
                      </span>
                    </div>
                    <h3 class="text-sm font-bold text-gray-900 mb-2 leading-tight {index % 2 === 0 ? 'line-clamp-2' : 'line-clamp-3'} group-hover:text-red-600 transition-colors">
                      <a href="/{websiteSlug}/article/{article.slug || article.id}" class="block">
                        {article.title}
                      </a>
                    </h3>
                    <p class="text-xs text-gray-600 {index % 2 === 0 ? 'line-clamp-2' : 'line-clamp-3'} leading-relaxed mb-2">
                      {article.description}
                    </p>
                    <div class="flex items-center justify-between text-[10px] text-gray-500">
                      <span class="truncate">{article.author || 'Pasukan Kelantan Food'}</span>
                      <span class="ml-2 flex-shrink-0">{article.minute_read || 5} min</span>
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>

          <!-- Desktop Grid -->
          <div class="hidden lg:grid grid-cols-1 gap-8">
            {#each articles as article}
              <FoodCard {article} websiteSlug={websiteSlug} />
            {/each}
          </div>
          
          <!-- Pagination -->
          <div class="text-center mt-8 md:mt-10">
            <div class="flex justify-center items-center space-x-2">
              <button 
                class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                on:click={() => currentPage > 1 ? currentPage-- : null}
                disabled={currentPage === 1}
              >
                Sebelumnya
              </button>
              
              <div class="flex space-x-1">
                {#each Array(Math.ceil(totalArticles / articlesPerPage)) as _, page}
                  <button 
                    class="px-3 py-2 text-sm font-medium rounded-lg transition-colors {currentPage === page + 1 ? 'bg-red-600 text-white' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'}"
                    on:click={() => currentPage = page + 1}
                  >
                    {page + 1}
                  </button>
                {/each}
              </div>
              
              <button 
                class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                on:click={() => currentPage < Math.ceil(totalArticles / articlesPerPage) ? currentPage++ : null}
                disabled={currentPage === Math.ceil(totalArticles / articlesPerPage)}
              >
                Seterusnya
              </button>
            </div>
            
            <p class="text-sm text-gray-500 mt-4">
              Halaman {currentPage} dari {Math.ceil(totalArticles / articlesPerPage)} 
              ({totalArticles} artikel)
            </p>
          </div>
        </div>
        
        <!-- Sidebar -->
        <div class="lg:col-span-1 space-y-8">
          
          <!-- About Events Section -->
          <AboutKelantanCard category="events" websiteId={data.website.id} />
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
  
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>