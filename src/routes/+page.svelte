<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { getCurrentTenantConfig } from '$lib/tenant';
  
  // Dapatkan konfigurasi tenant saat ini
  const tenantConfig = getCurrentTenantConfig();
  
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
        // Redirect ke slug tenant yang benar
        goto(`/${tenantConfig.slug}`);
      }
    }, 1000);
  }
</script>

<main class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 flex items-center justify-center">
  <div class="text-center">
    <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
    <h1 class="text-2xl font-bold text-gray-800 mb-2">{tenantConfig.name}</h1>
    <p class="text-gray-600 mb-4">{tenantConfig.description}</p>
    <p class="text-sm text-gray-500">Mengalihkan ke halaman utama dalam {redirectCountdown} detik...</p>
    
    <!-- Debug info (hanya untuk development) -->
    {#if typeof window !== 'undefined' && window.location.hostname === 'localhost'}
      
    {/if}
  </div>
</main>
