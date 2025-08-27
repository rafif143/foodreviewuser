<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { DEFAULT_WEBSITE } from '$lib/tenant';
  
  onMount(() => {
    // Redirect ke halaman default website
    goto(`/${DEFAULT_WEBSITE.slug}`);
  });
</script>

<svelte:head>
  <title>Kelantan Food Review - Redirecting...</title>
</svelte:head>

<main class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 flex items-center justify-center">
  <div class="text-center">
    <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
    <h1 class="text-2xl font-bold text-gray-800 mb-2">Kelantan Food Review</h1>
    <p class="text-gray-600">Mengalihkan ke halaman utama...</p>
  </div>
</main>
