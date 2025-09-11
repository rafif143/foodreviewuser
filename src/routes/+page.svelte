<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { DEFAULT_WEBSITE_ID } from '$lib/tenant';
  import SEOHead from '$lib/components/SEOHead.svelte';
  import { getWebsiteById } from '$lib/tenant';
  
  // SEO Configuration untuk halaman root
  $: websiteId = DEFAULT_WEBSITE_ID;
  
  let website = null;
  let isLoading = true;
  let redirectCountdown = 3;
  let isRedirecting = false;
  
  onMount(async () => {
    try {
      // Load website data
      website = await getWebsiteById(DEFAULT_WEBSITE_ID);
    } catch (error) {
      console.error('Error loading website:', error);
    } finally {
      isLoading = false;
    }
    
    // Start redirect countdown
    startRedirectCountdown();
  });
  
  function startRedirectCountdown() {
    const interval = setInterval(() => {
      redirectCountdown--;
      if (redirectCountdown <= 0) {
        clearInterval(interval);
        isRedirecting = true;
        goto('/kelantan');
      }
    }, 1000);
  }
  
  // Redirect to specific website
  function goToWebsite(slug) {
    goto(`/${slug}`);
  }
</script>

<!-- SEO Head Component untuk halaman root -->
<SEOHead 
  {websiteId}
  pageType="homepage"
  customTitle="Kelantan Food Review - Panduan Kuliner Terbaik"
  customDescription="Temukan restoran terbaik, resepi tradisional, dan acara kuliner di Kelantan. Panduan lengkap untuk makanan halal dan tempat makan enak di Kota Bharu dan sekitarnya."
  customKeywords={['kelantan food', 'makanan kelantan', 'restoran kota bharu', 'nasi kerabu', 'laksa kelantan', 'kuliner malaysia']}
  customUrl="https://foodreviewuser.netlify.app"
  websiteData={{ logo_url: null }}
/>

<!-- Additional Meta Tags untuk SEO -->
<svelte:head>
  <meta name="robots" content="index, follow" />
  <meta name="googlebot" content="index, follow" />
  <link rel="canonical" href="https://foodreviewuser.netlify.app" />
</svelte:head>

<main class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50">
  {#if isLoading}
    <!-- Loading State -->
    <div class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Kelantan Food Review</h1>
        <p class="text-gray-600">Memuat halaman...</p>
      </div>
    </div>
  {:else if isRedirecting}
    <!-- Redirecting State -->
    <div class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Kelantan Food Review</h1>
        <p class="text-gray-600">Mengalihkan ke halaman utama...</p>
        <p class="text-sm text-gray-500 mt-2">Redirect dalam {redirectCountdown} detik</p>
      </div>
    </div>
  {:else}
    <!-- Main Content with Redirect Info -->
    <div class="min-h-screen flex items-center justify-center">
      <div class="max-w-4xl mx-auto text-center px-4">
        <!-- Hero Section -->
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Kelantan Food Review
        </h1>
        <div class="w-24 h-1 bg-red-600 mx-auto rounded-full mb-8"></div>
        
        <!-- Main Description -->
        <p class="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
          Temukan restoran terbaik, resepi tradisional, dan acara kuliner di Kelantan. 
          Panduan lengkap untuk makanan halal dan tempat makan enak di Kota Bharu dan sekitarnya.
        </p>
        
        <!-- Redirect Countdown -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div class="flex items-center justify-center mb-4">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
            <h2 class="text-lg font-semibold text-blue-900">Mengalihkan ke halaman utama...</h2>
          </div>
          <p class="text-blue-700 mb-2">Halaman akan otomatis redirect dalam <span class="font-bold text-blue-900">{redirectCountdown}</span> detik</p>
          <p class="text-sm text-blue-600">Atau klik tombol di bawah untuk langsung masuk</p>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button 
            on:click={() => goToWebsite('kelantan')}
            class="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-300 transform hover:scale-105 shadow-lg"
          >
            Mulai Jelajah Kuliner
          </button>
          <button 
            on:click={() => goToWebsite('kelantan/food')}
            class="bg-white hover:bg-gray-100 text-red-600 font-bold py-4 px-8 rounded-lg border-2 border-red-600 transition-colors duration-300 transform hover:scale-105"
          >
            Lihat Makanan Terbaik
          </button>
        </div>
        
        <!-- Features Section -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div class="bg-white p-6 rounded-lg shadow-sm border">
            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Ulasan Terpercaya</h3>
            <p class="text-gray-600 text-sm">Setiap restoran dan makanan telah diuji dan diverifikasi oleh tim kami</p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-sm border">
            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Update Terkini</h3>
            <p class="text-gray-600 text-sm">Informasi terbaru tentang restoran, menu, dan acara kuliner</p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-sm border">
            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Panduan Lengkap</h3>
            <p class="text-gray-600 text-sm">Dari resepi tradisional hingga tips makan terbaik di Kelantan</p>
          </div>
        </div>
      </div>
    </div>
  {/if}
</main>
