<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { DEFAULT_WEBSITE_ID } from '$lib/tenant';
  import SEOHead from '$lib/components/SEOHead.svelte';
  
  // SEO Configuration untuk halaman root
  $: websiteId = DEFAULT_WEBSITE_ID;
  
  onMount(() => {
    // Redirect ke halaman default website setelah 2 detik
    setTimeout(() => {
      // Fallback langsung ke kelantan untuk sementara
      goto('/kelantan');
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
  websiteData={{ logo_url: null }}
/>

<!-- Additional Meta Tags untuk SEO -->
<svelte:head>
  <meta name="robots" content="index, follow" />
  <meta name="googlebot" content="index, follow" />
  <link rel="canonical" href="https://foodreviewuser.netlify.app/kelantan" />
</svelte:head>

<main class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 flex items-center justify-center">
  <div class="text-center">
    <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
    <h1 class="text-2xl font-bold text-gray-800 mb-2">Kelantan Food Review</h1>
    <p class="text-gray-600">Mengalihkan ke halaman utama...</p>
  </div>
</main>
