<script>
  import FoodCard from '$lib/components/FoodCard.svelte';
  import AboutKelantanCard from '$lib/components/AboutKelantanCard.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import AdBanner from '$lib/components/AdBanner.svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  
  /** @type {import('./$types').PageData} */
  export let data;
  
  let articlesContainer;
  let loading = false;
  let offset = 0;
  let limit = 10;
  let articles = [];
  
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
  
  onMount(() => {
    // Inisialisasi artikel dari data yang diambil di +page.js
    articles = data.articles.map(mapArticleData);
    
    // Ensure all cards have consistent height
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
  });
  
  // Search functionality
  function handleSearch() {
    if (searchQuery.trim()) {
      // Redirect ke halaman search dengan query
      goto(`/${data.website.slug}/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  }
  
  // Fungsi untuk memuat artikel lebih banyak
  async function loadMoreArticles() {
    if (loading) return;
    
    loading = true;
    offset += limit;
    
    try {
      const response = await fetch(`/api/articles?websiteId=${data.website.id}&category=food&offset=${offset}&limit=${limit}`);
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

  $: websiteSlug = $page.params.slug;
</script>

<svelte:head>
  <title>Food - {data.website.name}</title>
  <meta name="description" content="Discover the best local food in Kelantan. Reviews, recommendations, and culinary adventures." />
</svelte:head>

<main class="bg-gradient-to-br from-gray-50 via-white to-red-50">
  <!-- Ad Banner Section -->
  <AdBanner websiteSlug={data.website.slug} />
  
  <!-- Page Header -->
  <PageHeader 
    title="Artikel Makanan"
    description="Temukan artikel terbaik tentang makanan lokal Kelantan dan review restoran terpercaya"
    icon="book"
    compact={true}
  />

  <!-- Search Section -->
  <section class="py-8 bg-gradient-to-r from-red-50 to-orange-50">
    <div class="container mx-auto px-4">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Cari Artikel Makanan</h2>
        <p class="text-gray-600 mb-6">Temukan artikel, resep, dan review makanan favorit Anda</p>
        
        <div class="relative">
          <form on:submit|preventDefault={() => handleSearch()}>
            <div class="relative">
              <input
                type="text"
                bind:value={searchQuery}
                placeholder="Cari artikel makanan, resep, atau restoran..."
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
  <section class="py-8 md:py-10 bg-gradient-to-br from-red-50 to-orange-50" id="articles">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Articles List -->
          <div class="grid grid-cols-1 gap-5 md:gap-6" bind:this={articlesContainer}>
            {#each articles as article}
              <FoodCard {article} websiteSlug={websiteSlug} />
            {/each}
          </div>
          
          <!-- Load More Button -->
          <div class="text-center mt-8 md:mt-10">
            <button 
              class="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow"
              on:click={loadMoreArticles}
              disabled={loading}
            >
              <span class="flex items-center justify-center">
                {#if loading}
                  Memuat...
                {:else}
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                  Muat Artikel Lainnya
                {/if}
              </span>
            </button>
          </div>
        </div>
        
        <!-- Sidebar -->
        <div class="lg:col-span-1 space-y-6 md:space-y-8">
          <!-- Ad Banner Vertical -->
          <AdBanner websiteSlug={data.website.slug} variant="vertical" />
          
          <!-- About Food Section -->
          <AboutKelantanCard category="food" />
        </div>
      </div>
    </div>
  </section>
</main>