<script>
  import { page } from '$app/stores';
  import { DEFAULT_WEBSITE } from '$lib/tenant';
  import { supabase } from '$lib/supabase';
  import { onMount } from 'svelte';
  
  /** @type {import('./$types').PageData} */
  export let articles = [];
  export let websiteSlug = '';
  
  let aboutUsData = null;
  let loading = true;
  
  // Get current website ID
  $: currentWebsiteId = $page.data.website?.id || DEFAULT_WEBSITE.id;
  
  // Menggunakan data dari prop jika tersedia, jika tidak gunakan data dari halaman
  $: trendingArticles = articles && articles.length > 0 ? 
    mapArticleData(articles) : 
    ($page.data.trendingArticles ? mapArticleData($page.data.trendingArticles) : []);
  
  // Fungsi untuk memformat data artikel
  function mapArticleData(articles) {
    if (!articles || articles.length === 0) return [];
    
    return articles.map((article) => {
      return {
        id: article.id,
        slug: article.slug,
        title: article.title,
        category: article.category,
        image: article.thumbnail_image || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=80&h=80&fit=crop&crop=center',
        visitCount: article.visit_count || 0
      };
    });
  }
  
  // Ambil data tentang kami dari Supabase
  async function fetchAboutUs() {
    try {
      loading = true;
      
      const { data, error } = await supabase
        .from('about_us')
        .select('*')
        .eq('website_id', currentWebsiteId)
        .single();
      
      if (error) {
        console.error('Error fetching about us data:', error);
        // Fallback ke data default jika tiada data
        aboutUsData = {
          name: 'Dean Mel',
          description: 'Blogger makanan yang bersemangat dan penggemar kuliner. Meneroka dunia satu hidangan pada satu masa.',
          profile_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face',
          twitter_url: 'https://x.com/kelantanfoodreview',
          pinterest_url: 'https://pinterest.com/kelantanfoodreview',
          telegram_url: 'https://telegram.me/kelantanfoodreview',
          instagram_url: 'https://instagram.com/kelantanfoodreview'
        };
      } else {
        aboutUsData = data;
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      // Fallback data
      aboutUsData = {
        name: 'Dean Mel',
        description: 'Blogger makanan yang bersemangat dan penggemar kuliner. Meneroka dunia satu hidangan pada satu masa.',
        profile_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face',
        twitter_url: 'https://x.com/kelantanfoodreview',
        pinterest_url: 'https://pinterest.com/kelantanfoodreview',
        telegram_url: 'https://telegram.me/kelantanfoodreview',
        instagram_url: 'https://instagram.com/kelantanfoodreview'
      };
    } finally {
      loading = false;
    }
  }
  
  // Ambil data semasa komponen dimount
  onMount(() => {
    fetchAboutUs();
  });
  
  // Ambil semula jika ID laman web berubah
  $: if (currentWebsiteId) {
    fetchAboutUs();
  }
</script>

<div class="space-y-6 sm:space-y-8">
  <!-- About Me -->
  <div class="bg-white sm:bg-gradient-to-br sm:from-white sm:to-orange-50 p-4 sm:p-6 rounded-xl sm:rounded-[2.5rem] shadow-none sm:shadow-xl border border-gray-100 sm:border-orange-100">
    <h3 class="text-xl font-bold bg-gradient-to-r from-gray-800 to-orange-600 bg-clip-text text-transparent mb-4">TENTANG KAMI</h3>
    
    {#if loading}
      <div class="animate-pulse">
        <div class="w-full h-64 bg-gray-200 rounded-xl mb-4"></div>
        <div class="text-center mb-4">
          <div class="h-6 bg-gray-200 rounded w-24 mx-auto mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
        </div>
        <div class="flex justify-center space-x-3">
          {#each Array(4) as _}
            <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
          {/each}
        </div>
      </div>
    {:else if aboutUsData}
      <div class="mb-4">
        <img 
          src={aboutUsData.profile_image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face'} 
          alt="{aboutUsData.name} - Food Blogger"
          class="w-full h-64 object-cover rounded-xl shadow-lg"
        />
      </div>
      <div class="text-center mb-4">
        <h4 class="font-bold text-gray-800 text-lg">{aboutUsData.name}</h4>
        <p class="text-gray-600 text-sm leading-relaxed">
          {aboutUsData.description}
        </p>
      </div>
      <div class="flex justify-center space-x-3">
        {#if aboutUsData.twitter_url}
          <a href={aboutUsData.twitter_url} aria-label="X (Twitter)" target="_blank" rel="noopener noreferrer" class="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center hover:from-red-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-110 shadow-lg">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        {/if}
        
        {#if aboutUsData.pinterest_url}
          <a href={aboutUsData.pinterest_url} aria-label="Pinterest" target="_blank" rel="noopener noreferrer" class="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center hover:from-red-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-110 shadow-lg">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
            </svg>
          </a>
        {/if}
        
        {#if aboutUsData.telegram_url}
          <a href={aboutUsData.telegram_url} aria-label="Telegram" target="_blank" rel="noopener noreferrer" class="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center hover:from-red-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-110 shadow-lg">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c-.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c-.538-.196 1.006.128.832.941z"/>
            </svg>
          </a>
        {/if}
        
        {#if aboutUsData.instagram_url}
          <a href={aboutUsData.instagram_url} aria-label="Instagram" target="_blank" rel="noopener noreferrer" class="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center hover:from-red-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-110 shadow-lg">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        {/if}
      </div>
    {:else}
      <div class="text-center py-6">
        <div class="text-gray-400 text-3xl mb-2">👤</div>
        <p class="text-gray-500 text-sm">Data profil tidak ditemui</p>
      </div>
    {/if}
  </div>
  

  <!-- Trending This Week -->
  <div class="bg-white sm:bg-gradient-to-br sm:from-white sm:to-red-50 p-4 sm:p-6 rounded-xl sm:rounded-[2.5rem] shadow-none sm:shadow-xl border border-gray-100 sm:border-red-100">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-xl font-bold bg-gradient-to-r from-gray-800 to-red-600 bg-clip-text text-transparent">🔥 Trending Pekan Ini</h3>
      <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Berdasarkan kunjungan</span>
    </div>
    <div class="space-y-4">
      {#each trendingArticles.slice(0, 4) as article, index}
        <article class="flex items-start space-x-3 group">
          <div class="flex-shrink-0 relative">
            <a href="/{websiteSlug || DEFAULT_WEBSITE.slug}/article/{article.slug || article.id}" class="block">
              <img 
                src={article.image} 
                alt={article.title}
                class="w-16 h-16 object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
              />
              {#if index < 3}
                <div class="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span class="text-xs font-bold text-white">#{index + 1}</span>
                </div>
              {/if}
            </a>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                {article.category}
              </span>
              <span class="text-xs text-gray-400">👁️ {article.visitCount}</span>
            </div>
            <h4 class="text-sm font-semibold text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2">
              <a href="/{websiteSlug || DEFAULT_WEBSITE.slug}/article/{article.slug || article.id}" class="block">
                {article.title}
              </a>
            </h4>
          </div>
        </article>
      {/each}
    </div>
    
    {#if trendingArticles.length === 0}
      <div class="text-center py-6">
        <div class="text-gray-400 text-3xl mb-2">📊</div>
        <p class="text-gray-500 text-sm">Belum ada artikel trending</p>
      </div>
    {/if}
  </div>
</div>