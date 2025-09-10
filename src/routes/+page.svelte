<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { DEFAULT_WEBSITE } from '$lib/tenant';
  import SEOHead from '$lib/components/SEOHead.svelte';
  
  // SEO Configuration untuk halaman root
  $: websiteId = DEFAULT_WEBSITE.id || 1;
  
  onMount(() => {
    // Redirect ke halaman default website setelah 2 detik
    setTimeout(() => {
      goto(`/${DEFAULT_WEBSITE.slug}`);
    }, 2000);
  });
</script>

<!-- SEO Head Component untuk halaman root -->
<SEOHead 
  {websiteId}
  pageType="homepage"
  customTitle="Kelantan Food Review - Panduan Kuliner Terbaik"
  customDescription="Temukan restoran terbaik, resepi tradisional, dan acara kuliner di Kelantan. Panduan lengkap untuk makanan halal dan tempat makan enak di Kota Bharu dan sekitarnya."
  customKeywords={['kelantan food', 'makanan kelantan', 'restoran kota bharu', 'nasi kerabu', 'laksa kelantan', 'kuliner malaysia']}
  customUrl="https://foodreviewuser.netlify.app"
/>

<main class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 flex items-center justify-center">
  <div class="text-center max-w-4xl mx-auto px-4">
    <!-- Logo/Header -->
    <div class="mb-8">
      <h1 class="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
        Kelantan Food Review
      </h1>
      <div class="w-32 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto rounded-full mb-6"></div>
      <p class="text-xl md:text-2xl text-gray-600 mb-8">
        Panduan Kuliner Terbaik di Kelantan
      </p>
    </div>

    <!-- Content untuk SEO -->
    <div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Temukan Kuliner Terbaik Kelantan</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div class="text-center p-4">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <h3 class="font-bold text-gray-800 mb-2">Resepi Tradisional</h3>
          <p class="text-gray-600 text-sm">Nasi Kerabu, Laksa Kelantan, Ayam Percik</p>
        </div>
        
        <div class="text-center p-4">
          <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <h3 class="font-bold text-gray-800 mb-2">Restoran Terbaik</h3>
          <p class="text-gray-600 text-sm">Tempat makan halal di Kota Bharu</p>
        </div>
        
        <div class="text-center p-4">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h3 class="font-bold text-gray-800 mb-2">Acara Kuliner</h3>
          <p class="text-gray-600 text-sm">Festival makanan dan event menarik</p>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="text-center">
        <a 
          href="/kelantan" 
          class="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <span>Jelajahi Kuliner Kelantan</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </a>
      </div>
    </div>

    <!-- Loading indicator -->
    <div class="text-center">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-2"></div>
      <p class="text-gray-600">Mengalihkan ke halaman utama...</p>
    </div>
  </div>
</main>
