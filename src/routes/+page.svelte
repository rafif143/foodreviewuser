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
  
  onMount(async () => {
    try {
      // Load website data
      website = await getWebsiteById(DEFAULT_WEBSITE_ID);
    } catch (error) {
      console.error('Error loading website:', error);
    } finally {
      isLoading = false;
    }
  });
  
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
  <!-- Hero Section -->
  <section class="py-20">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Kelantan Food Review
        </h1>
        <div class="w-24 h-1 bg-red-600 mx-auto rounded-full mb-8"></div>
        <p class="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
          Temukan restoran terbaik, resepi tradisional, dan acara kuliner di Kelantan. 
          Panduan lengkap untuk makanan halal dan tempat makan enak di Kota Bharu dan sekitarnya.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
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
      </div>
    </div>
  </section>
  
  <!-- Features Section -->
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          Mengapa Pilih Kelantan Food Review?
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Ulasan Terpercaya</h3>
            <p class="text-gray-600">Setiap restoran dan makanan telah diuji dan diverifikasi oleh tim kami</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Update Terkini</h3>
            <p class="text-gray-600">Informasi terbaru tentang restoran, menu, dan acara kuliner</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Panduan Lengkap</h3>
            <p class="text-gray-600">Dari resepi tradisional hingga tips makan terbaik di Kelantan</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- CTA Section -->
  <section class="py-20 bg-gradient-to-r from-red-600 to-orange-600">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
          Siap Jelajah Kuliner Kelantan?
        </h2>
        <p class="text-xl text-white/90 mb-8">
          Temukan pengalaman kuliner terbaik di Kelantan bersama kami
        </p>
        <button 
          on:click={() => goToWebsite('kelantan')}
          class="bg-white hover:bg-gray-100 text-red-600 font-bold py-4 px-8 rounded-lg transition-colors duration-300 transform hover:scale-105 shadow-lg"
        >
          Mulai Sekarang
        </button>
      </div>
    </div>
  </section>
</main>
