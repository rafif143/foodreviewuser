<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { DEFAULT_WEBSITE_ID } from '$lib/tenant';
  
  $: websiteId = DEFAULT_WEBSITE_ID;
  
  let redirectCountdown = 2;
  
  onMount(() => {
    // Start redirect countdown
    startRedirectCountdown();
  });
  
  function startRedirectCountdown() {
    const interval = setInterval(() => {
      redirectCountdown--;
      if (redirectCountdown <= 0) {
        clearInterval(interval);
               goto('/melaka');
      }
    }, 1000);
  }
</script>

<main class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 flex items-center justify-center">
  <div class="text-center">
    <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
        <h1 class="text-2xl font-bold text-gray-800 mb-2">MakanMelaka</h1>
        <p class="text-gray-600 mb-4">Panduan kuliner terbaik di Melaka - Temukan tempat makan terbaik, resep tradisional, dan review restoran di Melaka</p>
    <p class="text-sm text-gray-500">Mengalihkan ke halaman utama dalam {redirectCountdown} detik...</p>
  </div>
</main>
