<script>
  import { page } from '$app/stores';
  import NavigationMenu from '$lib/components/NavigationMenu.svelte';
  import Footer from '$lib/components/Footer.svelte';
  
  // Ambil error details dari page store
  $: errorDetails = $page.error;
  $: errorMessage = errorDetails?.message || 'Artikel tidak ditemukan';
  $: articleSlug = errorDetails?.slug || 'unknown';
  $: websiteSlug = errorDetails?.website || 'unknown';
</script>


<main class="bg-gradient-to-br from-gray-50 via-white to-red-50 min-h-screen">
  <!-- Navigation -->
  <NavigationMenu />
  
  <!-- Error Content -->
  <div class="container mx-auto px-4 py-16">
    <div class="max-w-2xl mx-auto text-center">
      <!-- Error Icon -->
      <div class="mb-8">
        <div class="inline-block p-4 bg-red-100 rounded-full">
          <svg class="w-16 h-16 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
        </div>
      </div>
      
      <!-- Error Message -->
      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Artikel Tidak Ditemukan
      </h1>
      
      <div class="w-24 h-1 bg-red-600 mx-auto rounded-full mb-6"></div>
      
      <p class="text-lg text-gray-600 mb-6">
        Maaf, artikel yang Anda cari tidak ditemukan atau mungkin telah dipindahkan.
      </p>
      
      <!-- Error Details (untuk debugging) -->
      {#if errorDetails}
        <div class="bg-gray-100 rounded-lg p-4 mb-6 text-left">
          <h3 class="font-semibold text-gray-800 mb-2">Detail Error:</h3>
          <p class="text-sm text-gray-600 mb-1"><strong>Slug Artikel:</strong> {articleSlug}</p>
          <p class="text-sm text-gray-600 mb-1"><strong>Website:</strong> {websiteSlug}</p>
          <p class="text-sm text-gray-600"><strong>Pesan:</strong> {errorMessage}</p>
        </div>
      {/if}
      
      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a 
          href="/{websiteSlug}" 
          class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
        >
          Kembali ke Beranda
        </a>
        
        <a 
          href="/{websiteSlug}/food" 
          class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
        >
          Lihat Artikel Lain
        </a>
      </div>
      
      <!-- Search Suggestion -->
      <div class="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">
          Cari Artikel Lain
        </h3>
        <p class="text-gray-600 mb-4">
          Mungkin Anda tertarik dengan artikel-artikel berikut:
        </p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a href="/{websiteSlug}/food" class="text-red-600 hover:text-red-700 font-medium">
            → Makanan Terbaik
          </a>
          <a href="/{websiteSlug}/cafe" class="text-red-600 hover:text-red-700 font-medium">
            → Cafe & Kopi
          </a>
          <a href="/{websiteSlug}/recipe" class="text-red-600 hover:text-red-700 font-medium">
            → Resep Tradisional
          </a>
          <a href="/{websiteSlug}/events" class="text-red-600 hover:text-red-700 font-medium">
            → Event Kuliner
          </a>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Footer -->
  <Footer />
</main>

<style>
  /* Custom styles jika diperlukan */
</style>
