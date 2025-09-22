<script>
  import { page } from '$app/stores';
  
  $: errorDetails = $page.error;
  $: status = $page.status;
</script>

<main class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
  <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
    <!-- Error Icon -->
    <div class="mb-6">
      <div class="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
        <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
        </svg>
      </div>
    </div>
    
    <!-- Error Message -->
    <h1 class="text-2xl font-bold text-gray-900 mb-2">
      {#if status === 404}
        Halaman Tidak Ditemukan
      {:else if status >= 500}
        Terjadi Kesalahan Server
      {:else}
        Terjadi Kesalahan
      {/if}
    </h1>
    
    <p class="text-gray-600 mb-6">
      {#if status === 404}
        Halaman yang Anda cari tidak ditemukan.
      {:else if status >= 500}
        Terjadi kesalahan pada server. Silakan coba lagi nanti.
      {:else}
        {errorDetails?.message || 'Terjadi kesalahan yang tidak diketahui.'}
      {/if}
    </p>
    
    <!-- Error Code -->
    <div class="mb-6">
      <span class="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-mono">
        Error {status}
      </span>
    </div>
    
    <!-- Action Buttons -->
    <div class="space-y-3">
      <a 
        href="/" 
        class="block w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Kembali ke Beranda
      </a>
      
      <button 
        on:click={() => window.location.reload()} 
        class="block w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Muat Ulang Halaman
      </button>
    </div>
    
    <!-- Debug Info (only in development) -->
    {#if errorDetails && typeof window !== 'undefined' && window.location.hostname === 'localhost'}
      <details class="mt-6 text-left">
        <summary class="text-sm text-gray-500 cursor-pointer">Debug Info</summary>
        <pre class="mt-2 text-xs text-gray-600 bg-gray-100 p-3 rounded overflow-auto">{JSON.stringify(errorDetails, null, 2)}</pre>
      </details>
    {/if}
  </div>
</main>

<style>
  /* Additional styles if needed */
</style>
